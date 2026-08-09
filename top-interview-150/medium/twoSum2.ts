function twoSum(numbers: number[], target: number): number[] {
    let x = 0;
    let y = numbers.length - 1;

    while (x < y) {
        if (numbers[x] + numbers[y] === target) {
            break;
        }

        if (numbers[x] + numbers[y] > target) {
            y--;
        } else if (numbers[x] + numbers[y] < target) {
            x++;
        }
    }

    return [x + 1, y + 1]
};