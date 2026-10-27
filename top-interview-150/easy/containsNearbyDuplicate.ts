function containsNearbyDuplicate(nums: number[], k: number): boolean {
    let passedNums = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        if (passedNums.get(nums[i]) === undefined) {
            passedNums.set(nums[i], i);
        } else {
            let result = Math.abs(passedNums.get(nums[i])! - i) <= k;

            if (result) return true;
            passedNums.set(nums[i], i)
        }

    }

    return false;
};