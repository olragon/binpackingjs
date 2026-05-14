import type { FreeRect, PlacementResult } from './types';

export class FreeRectManager {
  private rects: FreeRect[];

  constructor(width: number, height: number) {
    this.rects = [{ x: 0, y: 0, width, height }];
  }

  getRects(): readonly FreeRect[] {
    return this.rects;
  }

  clone(): FreeRectManager {
    const copy = Object.create(FreeRectManager.prototype) as FreeRectManager;
    copy.rects = this.rects.map((r) => ({ ...r }));
    return copy;
  }

  insert(placed: PlacementResult): void {
    let numToProcess = this.rects.length;
    let i = 0;
    while (i < numToProcess) {
      if (this.splitFreeNode(this.rects[i]!, placed)) {
        this.rects.splice(i, 1);
        numToProcess--;
      } else {
        i++;
      }
    }
    this.pruneFreeList();
  }

  private splitFreeNode(freeNode: FreeRect, usedNode: PlacementResult): boolean {
    if (
      usedNode.x >= freeNode.x + freeNode.width ||
      usedNode.x + usedNode.width <= freeNode.x ||
      usedNode.y >= freeNode.y + freeNode.height ||
      usedNode.y + usedNode.height <= freeNode.y
    ) {
      return false;
    }

    this.trySplitVertically(freeNode, usedNode);
    this.trySplitHorizontally(freeNode, usedNode);
    return true;
  }

  private trySplitVertically(freeNode: FreeRect, usedNode: PlacementResult): void {
    if (usedNode.x < freeNode.x + freeNode.width && usedNode.x + usedNode.width > freeNode.x) {
      // Free space at top
      if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.height) {
        this.rects.push({
          x: freeNode.x,
          y: freeNode.y,
          width: freeNode.width,
          height: usedNode.y - freeNode.y,
        });
      }

      // Free space at bottom
      if (usedNode.y + usedNode.height < freeNode.y + freeNode.height) {
        this.rects.push({
          x: freeNode.x,
          y: usedNode.y + usedNode.height,
          width: freeNode.width,
          height: freeNode.y + freeNode.height - (usedNode.y + usedNode.height),
        });
      }
    }
  }

  private trySplitHorizontally(freeNode: FreeRect, usedNode: PlacementResult): void {
    if (usedNode.y < freeNode.y + freeNode.height && usedNode.y + usedNode.height > freeNode.y) {
      // Free space on left
      if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width) {
        this.rects.push({
          x: freeNode.x,
          y: freeNode.y,
          width: usedNode.x - freeNode.x,
          height: freeNode.height,
        });
      }

      // Free space on right
      if (usedNode.x + usedNode.width < freeNode.x + freeNode.width) {
        this.rects.push({
          x: usedNode.x + usedNode.width,
          y: freeNode.y,
          width: freeNode.x + freeNode.width - (usedNode.x + usedNode.width),
          height: freeNode.height,
        });
      }
    }
  }

  private pruneFreeList(): void {
    let i = 0;
    while (i < this.rects.length) {
      let j = i + 1;
      let pruned = false;
      while (j < this.rects.length) {
        if (this.isContainedIn(this.rects[i]!, this.rects[j]!)) {
          this.rects.splice(i, 1);
          pruned = true;
          break;
        }
        if (this.isContainedIn(this.rects[j]!, this.rects[i]!)) {
          this.rects.splice(j, 1);
        } else {
          j++;
        }
      }
      if (!pruned) i++;
    }
  }

  private isContainedIn(rectA: FreeRect, rectB: FreeRect): boolean {
    return (
      rectA.x >= rectB.x &&
      rectA.y >= rectB.y &&
      rectA.x + rectA.width <= rectB.x + rectB.width &&
      rectA.y + rectA.height <= rectB.y + rectB.height
    );
  }
}
