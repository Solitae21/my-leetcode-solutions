function trap(height: number[]): number {
  // Two pointers walking inward from both ends
  let left = 0;
  let right = height.length - 1;

  // Tallest bar seen so far from each side
  let leftMax = 0;
  let rightMax = 0;

  let total = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      // Left bar is shorter, so the shorter of the two walls
      // is guaranteed to be on the left. leftMax alone decides
      // the water level here — no need to know the real rightMax.

      // Update before subtracting, so leftMax >= height[left]
      // and we never add a negative amount.
      leftMax = Math.max(leftMax, height[left]);

      // Water sits from the bar's top up to leftMax
      total += leftMax - height[left];

      left++; // this position is settled, move on
    } else {
      // Mirror case: right bar is shorter (or equal), so
      // rightMax is the limiting wall for this position.
      rightMax = Math.max(rightMax, height[right]);
      total += rightMax - height[right];
      right--;
    }
  }

  return total;
}