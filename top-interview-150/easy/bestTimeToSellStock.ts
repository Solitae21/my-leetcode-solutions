function maxProfit(prices: number[]): number {
    let x = prices[0];
    let profit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < x) {
            x = prices[i];
        } else if (calculateProfit(prices[i], x) > profit) {
            profit = calculateProfit(prices[i], x);
        }
    }

    return profit;
};

function calculateProfit(sell: number, buy: number) {
    return sell - buy;
}