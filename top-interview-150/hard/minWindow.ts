/**
 * LeetCode 76 — Minimum Window Substring
 *
 * Find the shortest slice of `s` that contains every character of `t`,
 * counting duplicates. Return "" if no such slice exists.
 *
 * Technique: sliding window (two pointers) + frequency counting.
 * Time:  O(m + n)   — each pointer moves forward at most m times, never backward
 * Space: O(n)       — at most 52 distinct letters in the maps
 *
 * ---------------------------------------------------------------------------
 * THE MENTAL MODEL
 *
 * Imagine a stretchy window over `s`, defined by two indices: left and right.
 *
 *   1. GROW: move `right` forward one char at a time, collecting characters.
 *   2. When the window finally contains everything `t` needs, it's VALID.
 *   3. SHRINK: move `left` forward, throwing away chars from the front, for as
 *      long as the window stays valid. Record the size each time — the last
 *      valid size before it breaks is the tightest window ending at `right`.
 *   4. The window is now invalid again, so go back to step 1.
 *
 * Both pointers only ever move right, so we touch each character at most
 * twice. That's what gives us linear time instead of checking every substring.
 * ---------------------------------------------------------------------------
 */
function minWindow(s: string, t: string): string {
  // Quick exit: a window can never be longer than the string it lives in.
  if (t.length > s.length) return "";

  // ── STEP 1: What does `t` actually require? ───────────────────────────────
  // "AABC" → { A: 2, B: 1, C: 1 }. We need TWO A's, not just "an A".
  const need = new Map<string, number>();
  for (const c of t) {
    need.set(c, (need.get(c) ?? 0) + 1);
  }

  // What the current window is holding right now. Same shape as `need`.
  const window = new Map<string, number>();

  // `required` = how many DISTINCT characters we must satisfy. For "AABC"
  // that's 3 (A, B, C) — not 4. We track distinct chars, not total chars,
  // because it lets us check validity in O(1) with a single comparison.
  const required = need.size;

  // `have` = how many of those distinct characters are FULLY satisfied.
  // "A" only counts toward `have` once the window holds all 2 of them.
  // The window is valid exactly when have === required.
  let have = 0;

  let left = 0;                // left edge of the window
  let bestLen = Infinity;      // length of the best window found so far
  let bestStart = 0;           // where that best window starts

  // ── STEP 2: Slide the right edge forward, one character at a time ─────────
  for (let right = 0; right < s.length; right++) {
    const c = s[right];

    // This character isn't in `t`, so it can't help us. Skip it.
    //
    // Is skipping safe? Yes. Every time the window becomes valid, the shrink
    // loop below runs until it's invalid again. So at the top of every
    // iteration we know have < required — there's never a valid window sitting
    // around waiting to be measured. An irrelevant char can't make it valid.
    if (!need.has(c)) continue;

    // Add the character to our window's tally.
    window.set(c, (window.get(c) ?? 0) + 1);

    // *** THE CRITICAL LINE ***
    // Use === (exact match), never >=.
    //
    // This fires exactly once: on the moment we go from "not enough C's" to
    // "just enough C's". If we used >=, a 3rd or 4th 'C' would fire it again
    // and `have` would overcount past `required`, making garbage windows look
    // valid. The === turns this into a one-time edge trigger.
    if (window.get(c) === need.get(c)) have++;

    // ── STEP 3: Window is valid — squeeze it as tight as possible ───────────
    // WHILE, not IF. After dropping one char from the left the window may
    // STILL be valid (e.g. leading junk, or a duplicate we didn't need).
    // Keep going until it actually breaks.
    while (have === required) {
      // Measure BEFORE we break anything — the window is valid right now.
      const currentLen = right - left + 1;
      if (currentLen < bestLen) {
        bestLen = currentLen;
        bestStart = left;
      }

      // Now evict the leftmost character.
      const lc = s[left];
      if (need.has(lc)) {
        // Mirror of the critical line above. We're about to drop below the
        // required count for `lc`, so this character stops being satisfied.
        // Check BEFORE decrementing — again, exact match, not >=.
        if (window.get(lc) === need.get(lc)) have--;

        window.set(lc, window.get(lc)! - 1);
      }

      left++; // shrink from the left
      // If `have` just dropped, the loop exits and we go grow the right edge
      // again. If it didn't (the evicted char was a spare duplicate), we loop
      // and squeeze further.
    }
  }

  // ── STEP 4: Report ────────────────────────────────────────────────────────
  // bestLen untouched means we never found a valid window at all.
  return bestLen === Infinity ? "" : s.slice(bestStart, bestStart + bestLen);
}

/**
 * ---------------------------------------------------------------------------
 * TRACE: s = "ADOBECODEBANC", t = "ABC"
 *
 * need = { A:1, B:1, C:1 }, required = 3
 *
 *   right lands on 'C' at index 5 → window "ADOBEC" is valid (have = 3)
 *     measure: length 6 → best = "ADOBEC"
 *     evict 'A' → have drops to 2, window invalid, resume growing
 *
 *   right lands on 'A' at index 10 → window "ADOBECODEBA"... but left has
 *     already advanced to 1, so the live window is "DOBECODEBA" — wait, no C.
 *     Growing continues.
 *
 *   right lands on 'C' at index 12 → window is valid again
 *     measure, then shrink: D, O, B, E, C... are dropped one by one, each
 *     time re-measuring, until left = 9 → window "BANC", length 4
 *     evict 'B' → have drops, loop exits
 *
 *   End of string. bestLen = 4, bestStart = 9 → "BANC" ✓
 *
 * ---------------------------------------------------------------------------
 * THE THREE BUGS EVERYONE WRITES
 *
 *   1. `if (have === required)` instead of `while` → you find A valid window,
 *      not the SMALLEST one. Fails on "ADOBECODEBANC" (returns "ADOBEC").
 *
 *   2. `>=` instead of `===` when updating `have` → duplicates inflate the
 *      counter and invalid windows pass. Fails on s = "a", t = "aa".
 *
 *   3. Measuring after shrinking instead of before → off-by-one, you record
 *      the length of a window that's already broken.
 *
 * ---------------------------------------------------------------------------
 * OPTIONAL SPEEDUP
 *
 * Constraints say ASCII letters only, so both Maps can become fixed arrays
 * indexed by char code. Same O(m + n), but noticeably faster at m = 10^5
 * because there's no hashing:
 *
 *   const need = new Int32Array(128);
 *   for (let i = 0; i < t.length; i++) need[t.charCodeAt(i)]++;
 *   // `required` = count of non-zero entries in `need`
 *   // replace `need.has(c)` with `need[code] > 0`
 * ---------------------------------------------------------------------------
 */

// Quick sanity checks
console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a"));               // "a"
console.log(minWindow("a", "aa"));              // ""
console.log(minWindow("ab", "b"));              // "b"

export { minWindow };