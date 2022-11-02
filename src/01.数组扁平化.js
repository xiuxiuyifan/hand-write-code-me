//   数组扁平化，浅层的
function flattenArray(arr) {
  let ret = [];
  arr.forEach((item) => {
    // 如果是数组
    if (Array.isArray(item)) {
      // 再进行一次循环，取出深一层的数据
      item.forEach((n) => ret.push(n));
    } else {
      ret.push(item);
    }
  });
  return ret;
}
// 数组扁平化，深层的数组
function flattenArray(arr) {
  let ret = [];
  arr.forEach((item) => {
    // 如果是数组，则再调用，扁平化函数
    if (Array.isArray(item)) {
      let res = flattenArray(item);
      ret.push(...res);
    } else {
      ret.push(item);
    }
  });
  return ret;
}

// concat 实现 浅层的
function flattenArray(arr) {
  let ret = [];
  arr.forEach((item) => {
    ret = ret.concat(item);
  });
  return ret;
}

function flattenArray(arr) {
  let ret = [];
  arr.forEach((item) => {
    // 如果当前项是数组，就进行递归
    if (Array.isArray(item)) {
      let res = flattenArray(item);
      // 把递归到的结果再加入到要返回的结果里面
      // concat 一个数组
      ret = ret.concat(res);
    } else {
      // concat 单个变量
      ret = ret.concat(item);
    }
  });
  return ret;
}

let list = [1, 2, 3, [4, 5, 6, [7]]];
console.log(flattenArray(list));
