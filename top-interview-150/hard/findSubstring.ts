/**
 * LC 30. Substring with Concatenation of All Words
 *
 * Approach: Sliding window per starting offset (0..wordLen-1)
 *
 * Why offsets? Any valid match starts at some index i. If we group indices
 * by i % wordLen, each group's word-boundaries never shift relative to
 * each other, so within a group we can slide a window one WORD at a time
 * (not one character at a time) and reuse work instead of re-scanning.
 *
 * Time:  O(n * wordLen)   n = s.length
 * Space: O(k * wordLen)   k = words.length (for the two frequency maps)
 */
function findSubstring(s: string, words: string[]): number[] {
  const result: number[] = [];
  if (words.length === 0 || s.length === 0) return result;

  const wordLen = words[0].length;
  const numWords = words.length;
  const totalLen = wordLen * numWords;
  if (s.length < totalLen) return result;

  // Target frequency of each word we need.
  const need = new Map<string, number>();
  for (const w of words) {
    need.set(w, (need.get(w) || 0) + 1);
  }

  // One pass per remainder class mod wordLen.
  for (let offset = 0; offset < wordLen; offset++) {
    let left = offset;
    let count = 0; // number of words currently "matched" in the window
    const windowCounts = new Map<string, number>();

    for (let right = offset; right + wordLen <= s.length; right += wordLen) {
      const word = s.substring(right, right + wordLen);

      if (!need.has(word)) {
        // Invalid word breaks any possible window that spans it.
        // Reset entirely and start fresh right after it.
        windowCounts.clear();
        count = 0;
        left = right + wordLen;
        continue;
      }

      // Add the new word to the window.
      windowCounts.set(word, (windowCounts.get(word) || 0) + 1);
      count++;

      // If we now have too many of this word, shrink from the left
      // until the excess is gone (handles duplicate words correctly).
      while (windowCounts.get(word)! > need.get(word)!) {
        const leftWord = s.substring(left, left + wordLen);
        windowCounts.set(leftWord, windowCounts.get(leftWord)! - 1);
        count--;
        left += wordLen;
      }

      // Window has exactly numWords matched words -> record start,
      // then slide the window forward by one word to look for the next.
      if (count === numWords) {
        result.push(left);
        const leftWord = s.substring(left, left + wordLen);
        windowCounts.set(leftWord, windowCounts.get(leftWord)! - 1);
        count--;
        left += wordLen;
      }
    }
  }

  return result;
}

// --- quick sanity checks against the examples in the prompt ---
console.log(findSubstring("barfoothefoobarman", ["foo", "bar"]));        // [0, 9]
console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"])); // []
console.log(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"])); // [6, 9, 12]