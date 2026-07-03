function canJump(nums: number[]): boolean {
    let lastIndex = nums.length - 1
    let mustReachIndex = lastIndex;
    for (let i = lastIndex - 1; i >= 0; i--) {
        if(nums[i] + i >= mustReachIndex) {
            mustReachIndex = i;
        }
    }
    return mustReachIndex === 0
};