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
    const hashModVariable = this.hash(key) % this.capacity;

    return hashModVariable;
  }

  insertNoCollisions(key, value) {
    // Your code here
  }

  insertWithHashCollisions(key, value) {
    // Your code here
  }

  insert(key, value) {
    // Your code here
  }
}

module.exports = HashTable;
