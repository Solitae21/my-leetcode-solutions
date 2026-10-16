function wordPattern(pattern: string, s: string): boolean {
    // if s = pattern 
    // 1 letter in pattern = 1 word in s
    // s exactly pattern
    // 1:1 for s and pattern

    let combinationA = new Map<string, string>();
    let combinationB = new Map<string, string>();
    let arrayS = s.split(" ");

    if (arrayS.length !== pattern.length) return false


    for (let i = 0; i < pattern.length; i++) {
        if (!combinationA.has(pattern[i]) && !combinationB.has(arrayS[i])) {
            combinationA.set(pattern[i], arrayS[i])
            combinationB.set(arrayS[i], pattern[i])
        } else {
            if (combinationA.get(pattern[i]) !== arrayS[i] && combinationB.get(arrayS[i]) !== pattern[i]) return false;
        }
    }

    return true;
};