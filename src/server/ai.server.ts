/** Shared tiny helpers for finance/commerce AI hooks */

export function parseJsonArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export function jaccard(a: string[], b: string[]): number {
  const A = new Set(a.map((x) => x.toLowerCase()));
  const B = new Set(b.map((x) => x.toLowerCase()));
  if (A.size === 0 && B.size === 0) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter += 1;
  const union = A.size + B.size - inter;
  return union === 0 ? 0 : inter / union;
}

/** Simple SMA forecast — honest heuristic, not marketed as deep learning */
export function smaForecast(
  values: number[],
  horizon = 4,
  window = 3,
): number[] {
  if (values.length === 0) return Array.from({ length: horizon }, () => 0);
  const out: number[] = [];
  const series = [...values];
  for (let h = 0; h < horizon; h += 1) {
    const slice = series.slice(-window);
    const avg = slice.reduce((s, v) => s + v, 0) / slice.length;
    // light momentum from last delta
    const last = series[series.length - 1];
    const prev = series[series.length - 2] ?? last;
    const momentum = (last - prev) * 0.35;
    const next = Math.max(0, avg + momentum);
    out.push(Number(next.toFixed(2)));
    series.push(next);
  }
  return out;
}

export type MatchCandidate = {
  id: string;
  name: string;
  score: number;
  reason: string;
};

export function rankByContent(args: {
  selfId: string;
  selfCrops: string[];
  selfRegion: string;
  selfTags: string[];
  peers: Array<{
    id: string;
    name: string;
    region: string;
    crops: string[];
    tags: string[];
  }>;
  limit?: number;
}): MatchCandidate[] {
  const limit = args.limit ?? 5;
  return args.peers
    .filter((p) => p.id !== args.selfId)
    .map((p) => {
      const cropScore = jaccard(args.selfCrops, p.crops);
      const tagScore = jaccard(args.selfTags, p.tags);
      const regionScore =
        args.selfRegion === p.region
          ? 1
          : args.selfRegion.split(/\s+/)[0] === p.region.split(/\s+/)[0]
            ? 0.45
            : 0;
      const score = Number(
        (cropScore * 0.5 + tagScore * 0.3 + regionScore * 0.2).toFixed(3),
      );
      const reasons: string[] = [];
      if (cropScore > 0) reasons.push(`crops overlap ${Math.round(cropScore * 100)}%`);
      if (regionScore > 0) reasons.push(regionScore === 1 ? "same region" : "nearby region");
      if (tagScore > 0) reasons.push(`tags overlap ${Math.round(tagScore * 100)}%`);
      return {
        id: p.id,
        name: p.name,
        score,
        reason: reasons.join(" · ") || "weak overlap",
      };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
