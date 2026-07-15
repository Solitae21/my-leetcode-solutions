function canCompleteCircuit(gas: number[], cost: number[]): number {
    let totalTank = 0;
    let currTank = 0;
    let start = 0;

    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        totalTank += diff;
        currTank += diff;

        if (currTank < 0) {
            // Can't reach i+1 starting from `start`, so try i+1 as new start
            start = i + 1;
            currTank = 0;
        }
    }

    return totalTank >= 0 ? start : -1;
};