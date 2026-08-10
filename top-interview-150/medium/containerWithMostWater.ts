function computeArea(h1: number, h2: number, i1: number, i2: number): number {
    let maxHeight = h1 <= h2 ? h1 : h2;
    let width = i2 - i1;
    return maxHeight * width;
}

function maxArea(height: number[]): number {
    let maxAreaVal = 0;
    let left = 0;
    let right = height.length - 1;

    while (left < right) {
        let computedArea = computeArea(height[left], height[right], left, right)
        if (computedArea > maxAreaVal) {
            maxAreaVal = computedArea;
        }
        if (height[left] < height[right]) {
            left++;
        } else if (height[right] <= height[left]) {
            right--;
        }
    }

    return maxAreaVal
};