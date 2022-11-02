// 实现一个 LRU 缓存
// 顾名思义，就是将最近使用最少的缓存淘汰掉

class createLRU {
  // 我们这里使用 Map 来实现
  constructor(max) {
    this.max = max;
    this.map = new Map();
  }

  set(key, val) {
    // 如果已经存在了就将其先删掉， 再往后面添加
    if (this.map.get(key)) {
      this.map.delete(key);
    }
    this.map.set(key, val);
    //如果长度超出了，就删除最前面的
    if (this.map.size > this.max) {
      // 获取最前面的那个 key
      let key = this.map.keys().next().value;
      this.map.delete(key);
    }
  }
  get(key) {
    let value = this.map.get(key);
    if (!value) {
      return null;
    } else {
      this.map.delete(key);
      this.map.set(key, value);
    }
  }
}

let map = new createLRU(2);
map.set(1, 1);
map.set(2, 2);
console.log(map.map);
map.get(1);
console.log(map.map);
map.set(2, 333);
console.log(map.map);
map.set(3, 3);
map.set(4, 4);
map.set(5, 5);
console.log(map.map);
