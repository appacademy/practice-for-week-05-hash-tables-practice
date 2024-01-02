const sha256 = require("js-sha256");
const { hexadecimalToDecimal } = require("./helpers/hexadecimal-to-decimal");
class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 4) {
    // Your code here
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
    this.capacity = numBuckets;
  }

  hash(key) {
    const hex = sha256(key).slice(0, 8);

    return hexadecimalToDecimal(hex);
  }

  hashMod(key) {
    const index = this.hash(key) % this.capacity;

    return index;
  }

  insertNoCollisions(key, value) {
    const positionIndex = this.hashMod(key);

    if (this.data[positionIndex]) {
      throw new Error("hash collision or same key/value pair already exists!");
    }

    const dataValue = new KeyValuePair(key, value);
    this.data[positionIndex] = dataValue;
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    const dataValue = new KeyValuePair(key, value);

    const positionIndex = this.hashMod(key);

    if (this.data[positionIndex]) {
      dataValue.next = this.data[positionIndex];
      this.data[positionIndex] = dataValue;
    } else {
      this.data[positionIndex] = dataValue;
    }
    this.count++;
  }

  insert(key, value) {
    const newDataValue = new KeyValuePair(key, value);
    const positionIndex = this.hashMod(key);

    if (!this.data[positionIndex]) {
      this.data[positionIndex] = newDataValue;
      this.count++;
      return;
    }

    if (
      this.data[positionIndex].key !== newDataValue.key &&
      !this.data[positionIndex].next
    ) {
      newDataValue.next = this.data[positionIndex];
      this.data[positionIndex] = newDataValue;
      this.count++;
      return;
    }

    if (this.data[positionIndex].key === newDataValue.key) {
      newDataValue.next = this.data[positionIndex].next;
      this.data[positionIndex] = newDataValue;
    }

    if (this.data[positionIndex].next) {
      let current = this.data[positionIndex];

      while (current) {
        let next = current.next;

        if (next?.key === newDataValue.key) {
          newDataValue.next = next.next;
          current.next = newDataValue;
        }
        current = current.next;
      }
    }
  }
}

module.exports = HashTable;
