function isSubsequence(s: string, t: string): boolean {
    let x = 0;
    for (let i = 0; i < t.length; i++) {
        if(t[i] === s[x]) {
            x++;
        }
    }

    return x === s.length;
};