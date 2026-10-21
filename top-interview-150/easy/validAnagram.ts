function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    let fs = new Map<string, number>()

    for (const ltr of s) {
        fs.set(ltr, (fs.get(ltr) ?? 0) + 1)
    }

    for (const ltr of t) {
        let count = fs.get(ltr)

        if (count === undefined || count === 0) return false;

        fs.set(ltr, count - 1);
    }

    return true
};