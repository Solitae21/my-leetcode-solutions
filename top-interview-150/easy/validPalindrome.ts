function isPalindrome(s: string): boolean {
  let cleanedStr = s.replace(/[^a-zA-Z0-9]/g, "");
  cleanedStr.toLowerCase();
  return cleanedStr === cleanedStr.split("").reverse().join("");
}

// Time	O(n)
// Space O(n)

/* Two pointer Approach 
Time O(n)
Space O(1)

function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  const isAlphanumeric = (char: string): boolean => {
    return /[a-zA-Z0-9]/.test(char);
  };

  while (left < right) {
    // Skip non-alphanumeric chars from the left
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    // Skip non-alphanumeric chars from the right
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }
    // Compare the characters (case-insensitive)
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};

*/

