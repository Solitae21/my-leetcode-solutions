function removeElement(nums: number[], val: number): number {
    // let k = nums.length;
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] === val) {
    //         k--;
    //         // nums.push(nums[i]);
    //         nums[i] = -1;
    //     }
    // }
    // nums.sort((a,b) => b-a);

    for (let i = 0; i < nums.length;) {
        if (nums[i] === val) {
            nums.splice(i, 1)
        } else {
            i++;
        }
    }
    return nums.length;
};