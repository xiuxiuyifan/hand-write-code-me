// 在函数的原型上进行扩展

Function.prototype.customBind = function (context, ...args) {
  // 返回一个新的函数
  // 改变函数的 this 指向
  // 收集参数

  let self = this; // 获取原来的函数本身   fn.custom   fn 就是 当前函数的 this
  return function (innerArgs) {
    // 调用原始函数，并改变 this 同时合并参数
    return self.apply(context, args.concat(innerArgs));
  };
};

function f(a, b, c) {
  console.log(this);
  return a + b + c;
}

let r = f.customBind({ x: 100 }, 10, 20);
let ret = r(30);
console.log(ret);
