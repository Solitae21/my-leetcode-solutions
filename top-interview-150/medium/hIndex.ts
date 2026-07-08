function hIndex(citations: number[]): number {
    let sortedCitations = citations.sort((a, b) => b - a);
    let h = 1
    while (h <= citations.length) {
        for (let i = 0; i < h; i++) {
            if (sortedCitations[i] < h) {
                return h - 1;
            }
        }
        h++;
    }
    return h - 1;
};

/* COMMUNITY SOLUTION
var hIndex = function(citations) {
    let papers = citations.length;
    let citationBuckets = new Array(papers + 1).fill(0);

    for (let citation of citations) {
        citationBuckets[Math.min(citation, papers)] += 1;
    }

    let cumulativePapers = 0;
    for (let hIndex = papers; hIndex >= 0; hIndex--) {
        cumulativePapers += citationBuckets[hIndex];
        if (cumulativePapers >= hIndex) {
            return hIndex;
        }
    }    
};
*/