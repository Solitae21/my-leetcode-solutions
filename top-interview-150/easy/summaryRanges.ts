function formatOutput(a: number, b: number): string {
    if (a === b) return `${a}`
    return `${a}->${b}`
}

function summaryRanges(nums: number[]): string[] {
    if (nums.length === 0) return [];

    let result = [];
    let slow = 0;
    let fast = 0;
    let interval = 0;

    while (fast < nums.length) {
        if (nums[slow] + interval !== nums[fast]) {
            result.push(formatOutput(nums[slow], nums[fast - 1]))
            interval = 1;
            slow = fast;
        } else {
            interval++;
        }
        console.log(nums[slow], interval, nums[fast])
        fast++;
    }

    result.push(formatOutput(nums[slow], nums[fast - 1]))

    return result
};

//optimized code
function summaryRanges2(nums: number[]): string[] {
    const result: string[] = []
    let start = 0
    for (let i = 0; i < nums.length; i++) {
        const runEnds = i === nums.length - 1 || nums[i + 1] !== nums[i] + 1
        if (!runEnds) continue
        result.push(start === i ? `${nums[i]}` : `${nums[start]}->${nums[i]}`)
        start = i + 1
    }
    return result
}