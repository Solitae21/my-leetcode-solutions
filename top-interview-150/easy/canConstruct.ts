function canConstruct(ransomNote: string, magazine: string): boolean {
    if (magazine.length === 0) return false;

    for (let char of ransomNote) {
        let ix = magazine.indexOf(char)
        if (ix === -1) return false;

        magazine = magazine.slice(0, ix) + magazine.slice(ix + 1);
    }

    return true
};