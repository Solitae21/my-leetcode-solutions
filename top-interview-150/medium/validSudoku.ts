function isValidSudoku(board: string[][]): boolean {
  const rows = Array.from({ length: 9 }, () => new Set<string>());
  const columns = Array.from({ length: 9 }, () => new Set<string>());
  const boxes = Array.from({ length: 9 }, () => new Set<string>());

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const value = board[row][column];

      // Ignore empty cells
      if (value === ".") continue;

      const boxIndex =
        Math.floor(row / 3) * 3 + Math.floor(column / 3);

      if (
        rows[row].has(value) ||
        columns[column].has(value) ||
        boxes[boxIndex].has(value)
      ) {
        return false;
      }

      rows[row].add(value);
      columns[column].add(value);
      boxes[boxIndex].add(value);
    }
  }

  return true;
}