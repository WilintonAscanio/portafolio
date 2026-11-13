import { describe, expect, it } from 'vitest';
import { nearestNeighborEdges, shortestPath } from './graph';

describe('shortestPath', () => {
  const adjacency = [[1], [0, 2], [1, 3], [2], []];

  it('walks the fewest hops', () => {
    expect(shortestPath(adjacency, 0, 3)).toEqual([0, 1, 2, 3]);
  });

  it('returns the single node when start equals end', () => {
    expect(shortestPath(adjacency, 2, 2)).toEqual([2]);
  });

  it('returns null for an unreachable node', () => {
    expect(shortestPath(adjacency, 0, 4)).toBeNull();
  });
});

describe('nearestNeighborEdges', () => {
  it('links neighbours both ways without duplicate edges', () => {
    const { edges, adjacency } = nearestNeighborEdges([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 10, y: 0 }], 1);
    expect(edges).toEqual([[0, 1], [2, 1]]);
    expect(adjacency).toEqual([[1], [0, 2], [1]]);
  });
});
