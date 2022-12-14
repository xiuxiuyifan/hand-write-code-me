// 直接在函数原型上面进行扩展
// call 传入的第一个参数 是 需要绑定的 this
// 其他参数是原来函数的参数
Function.prototype.custom = function (context, ...args) {
  // 如果传入 的 this 是 undefined 或者 null 的话, 则 this 就变成了 window
  if (context == null) context = globalThis;
  // 如果传输的是值类型，则需要用对象包装
  if (typeof context !== "object") {
    context = new Object(context);
  }

  // 我们人为的 给传递进来的 context对象设置一个 属性，值是原来的函数

  const key = Symbol(); // 防止与传进来的 context 上面的 key 冲突

  context[key] = this;
  // 然后调用这个函数，其内部的 this 自然就变成了 context 了 , 并传入函数的参数
  const ret = context[key](...args);

  delete context[key];

  return ret;
};

function fn(a, b, c) {
  console.log(this);
  return a + b + c;
}

let ret = fn.custom({ x: 100 }, 10, 20, 30);

console.log(ret);
