function lengthOfLongestSubstring(s: string): number {
    let record = new Map<string, number>(); // use map if keys are still unknown
    let start = 0;
    let maxLen = 0;

    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        let lastSeenIndex = record.get(c);

        if (lastSeenIndex !== undefined && lastSeenIndex >= start) {
            start = lastSeenIndex + 1
        }

        record.set(c, i);
        maxLen = Math.max(maxLen, i - start + 1)
    }

    return maxLen;
};