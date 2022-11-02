// 实现一个 lazyman 函数，实现 sleep 机制
// 调用形式  lazyman.eat('辣条').eat('香蕉').eat('橘子').sleep(2).eat('苹果').eat('火龙果').eat('甜薯').sleep(3).eat('火龙果')

// 需要先把调用的这些任务存储起来

class LazyMan {
  constructor(name) {
    this.name = name;
    // 队列的模型
    this.pool = [];
    // 在这里要 开启异步任务，等待同步的任务都加入到了队列当中去
    Promise.resolve().then(() => {
      this.next();
    });
  }

  next() {
    // 取出队头的元素，并执行
    let head = this.pool.shift();
    if (head) head();
  }
  eat(some) {
    // 生成一个任务，
    const task = () => {
      console.log(`${this.name}吃${some}`);
      // 当一个任务执行完成之后要开启下一个任务
      this.next();
    };
    // 把任务先放进池子里面
    this.pool.push(task);
    // 链式调用
    return this;
  }

  sleep(time) {
    const task = () => {
      console.log(`开始睡觉了`);
      setTimeout(() => {
        console.log(`睡觉结束了`);
        // 开启下一个任务
        this.next();
      }, 1000 * time);
    };
    this.pool.push(task);
    return this;
  }
}

const me = new LazyMan("小明");
console.log(me);
me.eat("辣条")
  .eat("香蕉")
  .eat("橘子")
  .sleep(2)
  .eat("苹果")
  .eat("火龙果")
  .eat("甜薯")
  .sleep(3)
  .eat("火龙果");
