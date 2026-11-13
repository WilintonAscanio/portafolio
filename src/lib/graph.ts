export type Point = { x: number; y: number };

/** Undirected edges joining each point to its `k` nearest neighbours, without duplicates. */
export function nearestNeighborEdges(points: Point[], k: number): { edges: [number, number][]; adjacency: number[][] } {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  const adjacency: number[][] = points.map(() => []);
  points.forEach((p, i) => {
    points
      .map((q, j) => [j, Math.hypot(q.x - p.x, q.y - p.y)] as const)
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, k)
      .forEach(([j]) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) return;
        seen.add(key);
        edges.push([i, j]);
        adjacency[i].push(j);
        adjacency[j].push(i);
      });
  });
  return { edges, adjacency };
}

/** Fewest-hops path from `from` to `to` (breadth-first), or null when unreachable. */
export function shortestPath(adjacency: number[][], from: number, to: number): number[] | null {
  const previous = new Map<number, number>([[from, -1]]);
  const queue = [from];
  while (queue.length) {
    const node = queue.shift()!;
    if (node === to) break;
    for (const next of adjacency[node]) {
      if (!previous.has(next)) {
        previous.set(next, node);
        queue.push(next);
      }
    }
  }
  if (!previous.has(to)) return null;
  const path: number[] = [];
  for (let node = to; node !== -1; node = previous.get(node)!) path.unshift(node);
  return path;
}
