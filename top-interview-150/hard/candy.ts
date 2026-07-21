function candy(ratings: number[]): number {
    const n = ratings.length;
    // Every child starts with 1 candy — satisfies the "at least one" rule.
    const candies = new Array(n).fill(1);

    // Pass 1 (left -> right): enforce the "left neighbor" rule.
    // If this child's rating is higher than the child to their left,
    // give them one more candy than that left neighbor.
    // Increasing runs (e.g. ratings 1,2,3) become strictly increasing candies.
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Pass 2 (right -> left): enforce the "right neighbor" rule.
    // If this child's rating is higher than the child to their right,
    // they need one more candy than that right neighbor.
    // We take Math.max instead of overwriting, because Pass 1 may have
    // already set a higher value to satisfy the left-neighbor rule —
    // we must keep whichever requirement is larger to satisfy both at once.
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    // Sum up everyone's candies for the minimum total distribution.
    return candies.reduce((sum, c) => sum + c, 0);
}