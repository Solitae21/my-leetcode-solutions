function minSubArrayLen(target: number, nums: number[]): number {
    // "left" is the START of our window. "right" is the END.
    // The window is just the chunk of the array between them.
    let left = 0;

    // The total of all numbers currently INSIDE the window.
    // We keep this updated instead of re-adding everything each time.
    let sum = 0;

    // The best (smallest) window length we've found so far.
    // Start at Infinity so that ANY real answer we find is smaller than it.
    let minLength = Infinity;

    // STEP 1: Move "right" forward one number at a time.
    // Each loop = we GROW the window by one number on the right side.
    for (let right = 0; right < nums.length; right++) {

        // Add the new number into the window's total.
        sum += nums[right];

        // STEP 2: Is the window big enough now (sum reached the target)?
        // If yes, this window is a VALID answer — but maybe not the smallest one.
        // So we try to make it smaller by cutting numbers off the LEFT side,
        // and we keep cutting as long as it's STILL valid.
        while (sum >= target) {

            // Measure the current window.
            // Example: left=1, right=3 -> 3 - 1 + 1 = 3 numbers wide.
            const windowSize = right - left + 1;

            // Save it if it beats our previous best.
            minLength = Math.min(minLength, windowSize);

            // Now shrink: remove the leftmost number from the total...
            sum -= nums[left];

            // ...and slide the left edge one step to the right.
            left++;

            // Loop back up: if the sum is STILL >= target, the smaller window
            // also works, so we record it and shrink again.
            // If the sum dropped below target, we exit and go grow "right" again.
        }
    }

    // STEP 3: If minLength never changed, it means we NEVER found a valid window
    // (no subarray ever reached the target). The problem says return 0 in that case.
    return minLength === Infinity ? 0 : minLength;
}