function sanitizeString(value: string): string {
    return value.replace(/\s+/g, " ").trim();
}

function reverseWords(s: string): string {
    const sanitizedStr = sanitizeString(s);
    const splitStr = sanitizedStr.split(" ");
    
    return splitStr.reverse().join(" ")

};