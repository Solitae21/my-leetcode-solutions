/**
 Do not return anything, modify board in-place instead.
 */

const deadToLive = 3;
const liveToDead = 2;

function underPop(cell: number, living: number): number {
    return cell === 1 && living < 2 ? liveToDead : cell
}

function nextGen(cell: number, living: number): number {
    return cell === 1 && living > 1 && living < 4 ? 1 : cell
}

function overPop(cell: number, living: number): number {
    return cell === 1 && living > 3 ? liveToDead : cell
}

function revive(cell: number, living: number): number { return cell === 0 && living === 3 ? deadToLive : cell }

function removeMark(cell: number): number {
    switch (cell) {
        case deadToLive:
            return 0;
        case liveToDead:
            return 1;
        default:
            return cell;
    }
}

function convertMark(cell: number): number {
    switch (cell) {
        case deadToLive:
            return 1;
        case liveToDead:
            return 0;
        default:
            return cell;
    }
}


function gameOfLife(board: number[][]): void {
    let rowLength = board.length;
    let colLength = board[0].length;

    for (let row = 0; row < rowLength; row++) {
        for (let col = 0; col < colLength; col++) {
            let top = 0;
            let topRight = 0;
            let right = 0;
            let bottom = 0;
            let bottomRight = 0;
            let left = 0;
            let bottomLeft = 0;
            let topLeft = 0;

            //right
            if (col + 1 < colLength) {
                right = removeMark(board[row][col + 1])
            }

            //left
            if (col - 1 >= 0) {
                left = removeMark(board[row][col - 1])
            }

            //top
            if (row - 1 >= 0) {
                top = removeMark(board[row - 1][col]);
            }

            //topright
            if (row > 0 && col + 1 < colLength) {
                topRight = removeMark(board[row - 1][col + 1]);
            }

            //top left
            if (row > 0 && col - 1 >= 0) {
                topLeft = removeMark(board[row - 1][col - 1]);
            }

            //bottom
            if (row < rowLength - 1) {
                bottom = removeMark(board[row + 1][col]);
            }

            //bottom right
            if (row < rowLength - 1 && col + 1 < colLength) {
                bottomRight = removeMark(board[row + 1][col + 1]);
            }

            //bottom left
            if (row < rowLength - 1 && col - 1 >= 0) {
                bottomLeft = removeMark(board[row + 1][col - 1]);
            }

            let living = top + topRight + right + bottom + bottomRight + left + bottomLeft + topLeft;
            let cell = board[row][col];

            if (living < 2) board[row][col] = underPop(cell, living)
            else if (living === 3) board[row][col] = revive(cell, living)
            else if (living > 1 && living < 4) board[row][col] = nextGen(cell, living)
            else if (living > 3) board[row][col] = overPop(cell, living)

        }
    }

    for (let row = 0; row < rowLength; row++) {
        for (let col = 0; col < colLength; col++) {
            board[row][col] = convertMark(board[row][col])
        }
    }
};