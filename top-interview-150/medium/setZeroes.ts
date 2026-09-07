/**
 Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix: number[][]): void {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let firstRowZero = false;
    let firstColZero = false;

    // Check if the first row originally contains a 0
    for (let col = 0; col < cols; col++) {
        if (matrix[0][col] === 0) {
            firstRowZero = true;
            break;
        }
    }

    // Check if the first column originally contains a 0
    for (let row = 0; row < rows; row++) {
        if (matrix[row][0] === 0) {
            firstColZero = true;
            break;
        }
    }

    // Use first row and first column as markers
    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            if (matrix[row][col] === 0) {
                matrix[row][0] = 0;
                matrix[0][col] = 0;
            }
        }
    }

    // Zero cells based on the markers
    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            if (matrix[row][0] === 0 || matrix[0][col] === 0) {
                matrix[row][col] = 0;
            }
        }
    }

    // Zero the first row if needed
    if (firstRowZero) {
        for (let col = 0; col < cols; col++) {
            matrix[0][col] = 0;
        }
    }

    // Zero the first column if needed
    if (firstColZero) {
        for (let row = 0; row < rows; row++) {
            matrix[row][0] = 0;
        }
    }
}