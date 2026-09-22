function isIsomorphic(s: string, t: string): boolean {
    let mapS = new Map<string, string>();
    let mapT = new Map<string, string>();

    for (let i = 0; i < s.length; i++) {
        if (mapS.has(s[i]) && mapS.get(s[i]) !== t[i]) return false;
        if (mapT.has(t[i]) && mapT.get(t[i]) !== s[i]) return false;

        mapS.set(s[i], t[i]);
        mapT.set(t[i], s[i]);
    }

    return true
};