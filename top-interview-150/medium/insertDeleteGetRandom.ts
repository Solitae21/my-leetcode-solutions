class RandomizedSet {
    private arr: number[];
    private map: Map<number, number>;

    constructor() {
        this.arr = [];
        this.map = new Map();
    }

    insert(val: number): boolean {
        if (this.map.has(val)) return false;
        this.arr.push(val);
        this.map.set(val, this.arr.length - 1);
        return true;
    }

    remove(val: number): boolean {
        if (!this.map.has(val)) return false;

        const indexToRemove = this.map.get(val)!;
        const lastElement = this.arr[this.arr.length - 1];

        // move last element into the removed slot
        this.arr[indexToRemove] = lastElement;
        this.map.set(lastElement, indexToRemove);

        this.arr.pop();
        this.map.delete(val);
        return true;
    }

    getRandom(): number {
        const randomIndex = Math.floor(Math.random() * this.arr.length);
        return this.arr[randomIndex];
    }
}
/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */