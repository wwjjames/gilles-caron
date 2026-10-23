// Justified rows: photographs keep their proportions (no cropping), every row shares one
// height and fills the full width, and the rows are balanced so the last one is never a
// lonely half-empty line. Returns the photos split into rows (indexes into `ratios`).

// Splits `ratios` (width / height) into `k` consecutive rows whose summed ratios are as even
// as possible, minimising the squared deviation from the ideal row (simple DP, n is small).
const balance = (ratios: number[], k: number): number[][] => {
  const n = ratios.length;
  const prefix = [0];
  ratios.forEach(r => prefix.push(prefix[prefix.length - 1] + r));
  const ideal = prefix[n] / k;
  const cost = (i: number, j: number) => (prefix[j] - prefix[i] - ideal) ** 2;
  // best[r][j]: minimum cost of putting the first j photos into r rows.
  const best = Array.from({ length: k + 1 }, () => Array<number>(n + 1).fill(Infinity));
  const cut = Array.from({ length: k + 1 }, () => Array<number>(n + 1).fill(0));
  best[0][0] = 0;
  for (let r = 1; r <= k; r++)
    for (let j = r; j <= n; j++)
      for (let i = r - 1; i < j; i++) {
        const c = best[r - 1][i] + cost(i, j);
        if (c < best[r][j]) {
          best[r][j] = c;
          cut[r][j] = i;
        }
      }
  const rows: number[][] = [];
  for (let r = k, j = n; r > 0; j = cut[r][j], r--) rows.unshift(Array.from({ length: j - cut[r][j] }, (_, x) => cut[r][j] + x));
  return rows;
};

// Picks the number of rows so that rows come out close to `targetHeight` pixels tall.
export const justifyRows = (ratios: number[], width: number, targetHeight: number, gap: number): number[][] => {
  if (ratios.length === 0) return [];
  const total = ratios.reduce((a, b) => a + b, 0);
  const k = Math.min(ratios.length, Math.max(1, Math.round((total * targetHeight) / Math.max(width - gap, 1))));
  return balance(ratios, k);
};
