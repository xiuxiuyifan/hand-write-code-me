function myInstanceof(instance, origin) {
  // 如果是值类型，则直接返回 false
  const type = typeof instance;
  if (type !== "object" && type !== "function") {
    return false;
  }

  let tempInstance = instance; // 为了防止修改 instance 引入的中间变量

  // 如果 没有遍历到 顶端 null,就一直遍历
  while (tempInstance) {
    if (tempInstance.__proto__ === origin.prototype) {
      return true;
    }
    // 如果没有匹配到，则顺着原型链网上找
    tempInstance = tempInstance.__proto__;
  }
  // 如果找到 null 还没找到 就返回 false
  return false;
}

console.log(myInstanceof({}, Object));
console.log(myInstanceof([], Array));
console.log(myInstanceof([], Object));
console.log(myInstanceof(() => { }, Object));
