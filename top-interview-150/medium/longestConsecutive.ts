
function longestConsecutive(nums: number[]): number {
    const numSet = new Set(nums);
    let longest = 0;

    for (const num of numSet) {
        // Only start counting at the beginning of a sequence
        if (!numSet.has(num - 1)) {
            let current = num;
            let count = 1;

            // Count consecutive numbers
            while (numSet.has(current + 1)) {
                current++;
                count++;
            }

            longest = Math.max(longest, count);
        }
    }

    return longest;
}
