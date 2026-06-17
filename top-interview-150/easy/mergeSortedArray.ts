/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    //* sorted ascending
    //TASK: merge nums 1 and nums2 to 1 ascending array
    let pointerA = 0;
    let pointerB = 0;
    let mergedArr = [];

    while (pointerA + pointerB < m + n) {
        if (nums1[pointerA] < nums2[pointerB] && pointerA < m) {
            mergedArr.push(nums1[pointerA])
            pointerA++;
        } else if (isNaN(nums2[pointerB])) {
            mergedArr.push(nums1[pointerA])
            pointerA++;
        } else {
            mergedArr.push(nums2[pointerB])
            pointerB++;
        }
    }
    nums1.splice(0, nums1.length, ...mergedArr)
};