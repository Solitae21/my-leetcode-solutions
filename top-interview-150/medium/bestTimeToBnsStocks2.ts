function maxProfit(prices: number[]): number {
    let buy = prices[0];
    let profit = 0;
    let totalProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < prices[i - 1]) {
            totalProfit += profit;
            profit = 0;
            buy = prices[i]
        }
        else if (prices[i] < buy) {
            buy = prices[i];
        }
        else if (prices[i] - buy > profit) {
            profit = prices[i] - buy;
        }

    }

    return totalProfit + profit;
};