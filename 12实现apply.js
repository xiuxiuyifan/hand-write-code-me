Function.prototype.customApply = function (context, args) {
  // 如果是 null 或者 undefined
  if (context == null) context = globalThis;

  // 如果是值类型的话，需要进行包装
  if (typeof context !== "object") {
    // new Object(1)  => 在内部会进行类型转换  成 Number(1)
    context = new Object(context);
  }
  // 给 context 设置一个属性
  const key = Symbol(); // 防止与 context 上面 的 key 冲突
  context[key] = this; // 值是当前调用的函数

  let ret = context[key](...args); // 调用对象上的属性函数，并传入参数

  delete context[key];

  return ret;
};

function fn(a, b, c) {
  console.log(this);
  return a + b + c;
}

let ret = fn.customApply({ x: 100 }, [10, 20, 30]);

console.log(ret);
