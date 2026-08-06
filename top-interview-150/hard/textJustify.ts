function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = [];
  let currentLine: string[] = [];
  let currentLength = 0; // total length of words in currentLine (no spaces yet)

  for (const word of words) {
    // Check if adding this word (plus at least one space per word already in line)
    // would exceed maxWidth. currentLine.length spaces are needed minimum
    // (one before each word except the first, i.e. currentLine.length gaps).
    if (currentLength + currentLine.length + word.length > maxWidth) {
      // Time to justify the current line before starting a new one
      const numGaps = currentLine.length - 1;
      const totalSpaces = maxWidth - currentLength;

      if (numGaps === 0) {
        // Only one word on the line -> left-justify, pad on the right
        result.push(currentLine[0] + ' '.repeat(totalSpaces));
      } else {
        const spacesPerGap = Math.floor(totalSpaces / numGaps);
        let extraSpaces = totalSpaces % numGaps; // leftover spaces go to leftmost gaps first

        let line = '';
        for (let i = 0; i < currentLine.length; i++) {
          line += currentLine[i];
          if (i < numGaps) {
            // base spaces for this gap
            let spacesToAdd = spacesPerGap;
            // distribute the extra (remainder) spaces to the leftmost gaps
            if (extraSpaces > 0) {
              spacesToAdd++;
              extraSpaces--;
            }
            line += ' '.repeat(spacesToAdd);
          }
        }
        result.push(line);
      }

      // reset for next line
      currentLine = [];
      currentLength = 0;
    }

    // add the word to the current line
    currentLine.push(word);
    currentLength += word.length;
  }

  // Handle the last line: left-justified, single space between words,
  // padded with trailing spaces to reach maxWidth
  const lastLine = currentLine.join(' ');
  result.push(lastLine + ' '.repeat(maxWidth - lastLine.length));

  return result;
}