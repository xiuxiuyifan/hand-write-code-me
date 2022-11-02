function GenerateObj(name, age) {
  this.name = name;
  this.age = age;
}

function customNew(fn, ...args) {
  // 创建一个空对象，继承构造函数的原型
  let obj = Object.create(fn.prototype);
  // 执行构造函数，并把 obj 作为 this 传进去
  fn.apply(obj, args);
  return obj;
}

let obj = customNew(GenerateObj, "小明", 10);
console.log(obj);

let a = {};
console.log(a);
console.log(a.__proto__ === Object.prototype);
let b = Object.create({ x: 100 });
console.log(b);
