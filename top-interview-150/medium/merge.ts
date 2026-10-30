function merge(intervals: number[][]): number[][] {
    intervals.sort((a, b) => a[0] - b[0]);

    let result: number[][] = []

    for (let i = 0; i < intervals.length; i++) {
        let last = result[result.length - 1];

        if (!last || intervals[i][0] > last[1]) {
            result.push(intervals[i])
        }
        else {
            result[result.length - 1] = [last[0], Math.max(last[1], intervals[i][1])];
        }
    }

    return result;
};