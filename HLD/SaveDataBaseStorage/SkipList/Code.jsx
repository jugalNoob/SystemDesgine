🟣 Simple JavaScript Skip List (Basic Version)
class Node {
  constructor(value, level) {
    this.value = value;
    this.forward = new Array(level).fill(null);
  }
}

class SkipList {
  constructor(maxLevel = 4, probability = 0.5) {
    this.maxLevel = maxLevel;
    this.probability = probability;
    this.level = 0;
    this.header = new Node(null, maxLevel);
  }

  randomLevel() {
    let level = 1;
    while (Math.random() < this.probability && level < this.maxLevel) {
      level++;
    }
    return level;
  }

  insert(value) {
    let update = new Array(this.maxLevel).fill(null);
    let current = this.header;

    for (let i = this.level - 1; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < value) {
        current = current.forward[i];
      }
      update[i] = current;
    }

    current = current.forward[0];

    if (!current || current.value !== value) {
      let newLevel = this.randomLevel();

      if (newLevel > this.level) {
        for (let i = this.level; i < newLevel; i++) {
          update[i] = this.header;
        }
        this.level = newLevel;
      }

      const newNode = new Node(value, newLevel);

      for (let i = 0; i < newLevel; i++) {
        newNode.forward[i] = update[i].forward[i];
        update[i].forward[i] = newNode;
      }
    }
  }

  search(value) {
    let current = this.header;

    for (let i = this.level - 1; i >= 0; i--) {
      while (current.forward[i] && current.forward[i].value < value) {
        current = current.forward[i];
      }
    }

    current = current.forward[0];
    return current && current.value === value;
  }
}

const list = new SkipList();
list.insert(10);
list.insert(20);
list.insert(15);

console.log(list.search(15)); // true
