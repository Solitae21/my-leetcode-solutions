function groupAnagrams(strs: string[]): string[][] {
    const records = new Map<string, string[]>();

    for (const str of strs) {
        const key = str.split("").sort().join("");

        if (!records.has(key)) {
            records.set(key, []);
        }

        records.get(key)!.push(str);
    }

    return [...records.values()];
}