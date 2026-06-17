function removeDuplicates(nums: number[]): number {
    // for (let i = 0; i < nums.length; ){
    //     if(nums[i] === nums[i-1]) {
    //         nums.splice(i,1);
    //     }
    //     else {
    //         i++;
    //     }
    // }
    // return nums.length;

    let i = 1;

    for (let j = 0; j < nums.length ; j++){
        if (nums[i-1] !== nums[j]) {
            nums[i] = nums[j];
            i++;
        }
    }

    return i;
};