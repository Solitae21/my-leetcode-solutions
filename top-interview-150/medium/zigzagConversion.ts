function convert(s: string, numRows: number): string {
  if (numRows === 1) return s;

  const rows: string[] = new Array(numRows).fill("");
  let row = 0;
  let step = -1;

  for (const char of s) {
    rows[row] += char;
    if (row === 0 || row === numRows - 1) step = -step;
    row += step;
  }

  return rows.join("");
}