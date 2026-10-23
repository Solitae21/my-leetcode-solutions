function isHappy(n: number): boolean {
  function getNext(n: number): number {
    let sum = 0;

    while (n > 0) {
      const digit = n % 10;
      sum += digit * digit;
      n = Math.floor(n / 10);
    }

    return sum;
  }

  let slow = n;
  let fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1;
}


function isHappy2(n: number): boolean {
    const seen = new Set<number>();

    while (n !== 1 && !seen.has(n)) {
        seen.add(n);

        let sum = 0;

        while (n > 0) {
            const digit = n % 10;
            sum += digit * digit;
            n = Math.floor(n / 10);
        }

        n = sum;
    }

    return n === 1;
}
