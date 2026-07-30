function lengthOfLastWord(s: string): number {
  const splitStr = s.trim().split(" ");
  return splitStr[splitStr.length - 1].length;
}
