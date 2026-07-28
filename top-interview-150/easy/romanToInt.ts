function romanToInt(s: string): number {
  const roman: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let numeral = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i + 1] && roman[s[i]] < roman[s[i + 1]]) {
      numeral += roman[s[i + 1]] - roman[s[i]];
      i++;
    } else {
      numeral += roman[s[i]];
    }
  }

  return numeral;
}
