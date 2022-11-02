// 获取数据类型
function getType(obj) {
  // 使用 Object.prototype.toString.call()
  let str = Object.prototype.toString.call(obj);
  // 找到位置，进行截取
  let spaceIndex = str.indexOf(" ");
  // 然后转成小写  strLength + endIndex
  return str.slice(spaceIndex, -1);
}

console.log(getType(null));
console.log(getType({}));
console.log(getType(undefined));
console.log(getType("abc"));
console.log(getType(123));
