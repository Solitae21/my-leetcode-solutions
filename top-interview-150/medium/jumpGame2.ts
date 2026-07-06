function jump(nums: number[]): number {
    let lastJumpIndex = nums.length-1;
    let count = 0;
    while (lastJumpIndex !== 0) {
        lastJumpIndex = getLastJump(nums, lastJumpIndex);
        count++;
    }
    return count;
};

function getLastJump(items: number[], length: number): number {
    let min: number = 0;
    for (let i = length; i >= 0; i--) {
        if (items[i] + i >= length) {
            min = i;
        }
    }
    return min;
}