function removeDuplicates(nums: number[]): number {
    let frequency = {
        [nums[0]]: 1
    };
    let j = 1;

    for (let i = 1; i < nums.length; i++) {
        let pointerNum = nums[j];
        let pointerLoop = nums[i]
        let isSeen = frequency[pointerLoop] !== undefined

        if (!isSeen) {
            frequency[pointerLoop] = 1;
            nums[j] = nums[i]
            j++;
        } else if (frequency[pointerLoop] < 2) {
            frequency[pointerLoop]++;
            nums[j] = nums[i];
            j++;
        }

    }
    return j;
};