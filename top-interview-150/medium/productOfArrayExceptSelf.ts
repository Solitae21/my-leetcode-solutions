function productExceptSelf(nums: number[]): number[] {
    let n = nums.length - 1;
    let right = 1;

    let ans = new Array(nums.length).fill(1)

    for (let i = 1; i < nums.length; i++) {
        ans[i] = nums[i - 1] * ans[i - 1]
    }

    for (let j = n; j >= 0; j--) {
        ans[j] = ans[j] * right;
        right = right * nums[j]
    }

    return ans;
};