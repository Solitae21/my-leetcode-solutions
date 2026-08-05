// Find the Index of the First Occurrence in a String
function strStr(haystack: string, needle: string): number {
    let separateNeedle =  haystack.split(needle).join("+");
    for (let i = 0; i < separateNeedle.length; i++){
        if (separateNeedle[i] === "+") return i;
    }

    return -1;
};