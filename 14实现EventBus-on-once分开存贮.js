class EventBus {
  constructor() {
    this.onEvents = {};
    this.onceEvents = {};
  }
  on(type, fn) {
    if (!this.onEvents[type]) {
      this.onEvents[type] = [];
    }
    this.onEvents[type].push(fn);
  }
  once(type, fn) {
    if (!this.onceEvents[type]) {
      this.onceEvents[type] = [];
    }
    this.onceEvents[type].push(fn);
  }
  off(type, fn) {
    if (!fn) {
      this.onList = {};
      this.onceList = {};
    }
    // 在两个缓存池中分别查找
    // 如果有就移除掉
    if (this.onEvents[type]) {
      this.onEvents[type] = this.onEvents[type].filter(
        (item) => item !== fn
      );
    }

    if (this.onceEvents[type]) {
      this.onceEvents[type] = this.onceEvents[type].filter(
        (item) => item !== fn
      );
    }
  }
  emit(type, ...args) {
    // 触发各自的 回调函数
    if (this.onEvents[type]) {
      this.onEvents[type].forEach((fn) => fn());
    }
    if (this.onceEvents[type]) {
      this.onceEvents[type].forEach((fn) => fn());
      this.onceEvents[type] = [];
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
