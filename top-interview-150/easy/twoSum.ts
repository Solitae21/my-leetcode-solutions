function twoSum(nums: number[], target: number): number[] {
    let passedNum = new Map<number, number>()

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i]
        if (passedNum.has(complement)) {
            return [passedNum.get(complement), i]
        }

        passedNum.set(nums[i], i);
    }

    return []
};