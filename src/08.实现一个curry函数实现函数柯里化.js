function add(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  // 柯里化函数返回的是一个函数
  let argsLength = fn.length;

  // 用来存放，调用柯里化函数传入的参数
  let allArgs = [];
  function calc(...args) {
    // 积累参数，如果参数的数量达到了原始函数的参数，就执行原来的函数
    allArgs = [...allArgs, ...args];
    // 参数够了
    if (allArgs.length >= argsLength) {
      // 调用原始函数，把收集到的参数传进去， 并返回函数执行结果
      return fn.apply(this, allArgs.slice(0, argsLength));
    } else {
      // 返回收集参数的函数
      return calc;
    }
  }

  return calc;
}

console.log(add(10, 20, 30));

let c = curry(add);
let ret = c(10)(20)(30);
console.log(ret);
