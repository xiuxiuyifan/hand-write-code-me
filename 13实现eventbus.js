//   {
//     key1: [
//       { fn: () => {}, isOnce: false },
//       { fn: () => {}, isOnce: false },
//       { fn: () => {}, isOnce: false },
//     ],
//     key2: [
//       { fn: () => {}, isOnce: true },
//       { fn: () => {}, isOnce: true },
//       { fn: () => {}, isOnce: true },
//     ],
//   };
class EventBus {
  constructor() {
    this.events = {};
  }
  on(type, fn, isOnce = false) {
    // 默认不是 once 的
    // 如果没有当前类型
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push({
      fn,
      isOnce,
    });
  }
  once(type, fn) {
    this.on(type, fn, true);
  }
  // 解绑
  off(type, fn) {
    // 如果没有 fn 则全部清除
    if (!fn) {
      this.events[type] = [];
    } else {
      // 解除单个的 fn
      const fnList = this.events[type]; // 如果能找到要解除的类型
      if (fnList) {
        // 保留 除了要解绑的函数之外的 fn
        this.events[type] = fnList.filter((item) => item.fn !== fn);
      }
    }
  }
  emit(type, ...args) {
    // 找到当前 type 对应的 key 的值进行遍历
    if (this.events[type]) {
      // 并过滤掉 once 的函数
      this.events[type] = this.events[type].filter((item) => {
        item.fn(...args);
        // 如果是 once 的需要过滤掉
        if (item.isOnce) {
          return false;
        }
        return true;
      });
    }
  }
}

let e = new EventBus();

function fn1() {
  console.log("fn1");
}
function fn2() {
  console.log("fn2");
}
function fn3() {
  console.log("fn3");
}
e.on("key1", fn1);
e.on("key1", fn2);
e.once("key1", fn3);
e.emit("key1");
// e.emit("key1");
e.off("key1", fn1);
e.emit("key1");
