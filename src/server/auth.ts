import { createServerFn } from "@tanstack/react-start";

export const getAuthState = createServerFn({ method: "GET" }).handler(
  async () => {
    const auth = await import("./auth.server");
    const [user, demoUsers] = await Promise.all([
      auth.getCurrentUser(),
      auth.listDemoUsers().catch(() => []),
    ]);
    return {
      user,
      enforced: auth.isAuthEnforced(),
      demoUsers,
      demoHint: "seed accounts use password: demo",
    };
  },
);

export const login = createServerFn({ method: "POST" })
  .validator((data: { email: string; pin: string }) => data)
  .handler(async ({ data }) => {
    const auth = await import("./auth.server");
    if (!data.email?.trim() || !data.pin?.trim()) {
      throw new Error("请填写邮箱和密码");
    }
    const user = await auth.loginWithPin(data.email, data.pin);
    return { user };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const auth = await import("./auth.server");
  await auth.logoutCurrent();
  return { ok: true as const };
});
