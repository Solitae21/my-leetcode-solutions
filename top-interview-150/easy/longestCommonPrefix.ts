//** MY EARLY SOLUTION */
function longestCommonPrefix(strs: string[]): string {
    let prefix = "";
    let strLengths = strs.map((str) => str.length);
    let minStr = Math.min(...strLengths);


    for (let x = 0; x < minStr; x++) {
        let frequency = 0;
        let prevStr = strs[0][x];
        for (let y = 0; y < strs.length; y++) {
            if (prevStr === strs[y][x]) {
                frequency++;
                prevStr = strs[y][x];
            }
        }
        if (frequency !== strs.length) {
            break;
        } else {
            prefix += prevStr;
        }
    }
    return prefix;
};

//* OPTIMIZED SOLUTION

// function longestCommonPrefix(strs: string[]): string {
//     if (strs.length === 0) return "";

//     for (let i = 0; i < strs[0].length; i++) {
//         const char = strs[0][i];

//         for (let j = 1; j < strs.length; j++) {
//             if (i === strs[j].length || strs[j][i] !== char) {
//                 return strs[0].slice(0, i);
//             }
//         }
//     }

//     return strs[0];
// }