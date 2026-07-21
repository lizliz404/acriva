import { env } from "cloudflare:workers";
import {
  getCookie,
  setCookie,
  deleteCookie,
  getRequestProtocol,
} from "@tanstack/react-start/server";
import { getDb, newId, nowIso } from "./db.server";

export type AppRole = "farmer" | "bank" | "buyer" | "expert" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  role: AppRole;
  farmerId?: string;
  expertId?: string;
  bankName?: string;
};

const SESSION_COOKIE = "acriva_session";
const SESSION_DAYS = 14;
const PIN_PEPPER = "acriva-v1";

type UserRow = {
  id: string;
  email: string;
  display_name: string;
  pin_hash: string;
  role: AppRole;
  farmer_id: string | null;
  expert_id: string | null;
  bank_name: string | null;
  active: number;
};

function mapUser(row: UserRow): AuthUser {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    role: row.role,
    farmerId: row.farmer_id || undefined,
    expertId: row.expert_id || undefined,
    bankName: row.bank_name || undefined,
  };
}

/** When false (default), open demo desk keeps visitor writes. Set Worker var AUTH_ENFORCE=1 to require roles. */
export function isAuthEnforced(): boolean {
  const raw = String(
    (env as { AUTH_ENFORCE?: string | boolean }).AUTH_ENFORCE ?? "",
  )
    .trim()
    .toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

export async function hashPin(pin: string): Promise<string> {
  const data = new TextEncoder().encode(`${pin}|${PIN_PEPPER}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashToken(token: string): Promise<string> {
  const data = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function randomToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function listDemoUsers(): Promise<
  Array<Pick<AuthUser, "email" | "displayName" | "role">>
> {
  const { results } = await getDb()
    .prepare(
      `SELECT email, display_name, role FROM users WHERE active = 1 ORDER BY role`,
    )
    .all<{ email: string; display_name: string; role: AppRole }>();
  return results.map((r) => ({
    email: r.email,
    displayName: r.display_name,
    role: r.role,
  }));
}

export async function loginWithPin(
  email: string,
  pin: string,
): Promise<AuthUser> {
  const row = await getDb()
    .prepare(`SELECT * FROM users WHERE email = ? AND active = 1`)
    .bind(email.trim().toLowerCase())
    .first<UserRow>();
  if (!row) throw new Error("账号或密码错误");
  const pinHash = await hashPin(pin);
  if (pinHash !== row.pin_hash) throw new Error("账号或密码错误");

  const token = randomToken();
  const tokenHash = await hashToken(token);
  const sessionId = newId("sess");
  const createdAt = nowIso();
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();

  await getDb()
    .prepare(
      `INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(sessionId, row.id, tokenHash, expires, createdAt)
    .run();

  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    // localhost http dev cannot set Secure cookies
    secure: getRequestProtocol() === "https",
    sameSite: "lax",
    path: "/",
    expires: new Date(expires),
  });

  await writeAudit({
    actorUserId: row.id,
    action: "auth.login",
    entityType: "user",
    entityId: row.id,
  });

  return mapUser(row);
}

export async function logoutCurrent(): Promise<void> {
  const token = getCookie(SESSION_COOKIE);
  if (token) {
    const tokenHash = await hashToken(token);
    const sess = await getDb()
      .prepare(`SELECT user_id FROM sessions WHERE token_hash = ?`)
      .bind(tokenHash)
      .first<{ user_id: string }>();
    await getDb()
      .prepare(`DELETE FROM sessions WHERE token_hash = ?`)
      .bind(tokenHash)
      .run();
    if (sess?.user_id) {
      await writeAudit({
        actorUserId: sess.user_id,
        action: "auth.logout",
        entityType: "user",
        entityId: sess.user_id,
      });
    }
  }
  deleteCookie(SESSION_COOKIE, { path: "/" });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = getCookie(SESSION_COOKIE);
  if (!token) return null;
  const tokenHash = await hashToken(token);
  const row = await getDb()
    .prepare(
      `SELECT u.* FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > ? AND u.active = 1`,
    )
    .bind(tokenHash, nowIso())
    .first<UserRow>();
  return row ? mapUser(row) : null;
}

/**
 * Guard for write paths.
 * - AUTH_ENFORCE off: returns current user if any, never throws for missing auth.
 * - AUTH_ENFORCE on: requires login + one of allowed roles.
 */
export async function requireRole(
  allowed: AppRole | AppRole[],
): Promise<AuthUser | null> {
  const roles = Array.isArray(allowed) ? allowed : [allowed];
  const user = await getCurrentUser();
  if (!isAuthEnforced()) return user;
  if (!user) throw new Error("需要登录");
  if (user.role === "admin") return user;
  if (!roles.includes(user.role)) {
    throw new Error(`需要角色：${roles.join(" / ")}`);
  }
  return user;
}

export async function writeAudit(input: {
  actorUserId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  fromStatus?: string | null;
  toStatus?: string | null;
  meta?: Record<string, unknown>;
}): Promise<void> {
  await getDb()
    .prepare(
      `INSERT INTO audit_log (
        id, actor_user_id, action, entity_type, entity_id,
        from_status, to_status, meta_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      newId("aud"),
      input.actorUserId ?? null,
      input.action,
      input.entityType,
      input.entityId ?? null,
      input.fromStatus ?? null,
      input.toStatus ?? null,
      JSON.stringify(input.meta ?? {}),
      nowIso(),
    )
    .run();
}
