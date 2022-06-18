export class EventBus {
  // 定义所有事件列表,此时需要修改格式：
  // // {
  //   key: {
  //     D+id: Function,
  //     id: Function
  //   },
  //   key: Object,
  // }
  // Array存储的是注册的回调函数
  public eventObj: Record<string, any> = {};
  public callbcakId = 0;
  // 订阅事件,类似监听事件$on('key',()=>{})
  $on(name: string, callbcak: (...args: []) => void) {
    // 判断是否存储过
    if (!this.eventObj[name]) {
      this.eventObj[name] = {};
    }
    // 定义当前回调函数id
    const id = this.callbcakId++;
    this.eventObj[name][id] = callbcak; // 以键值对的形式存储回调函数
    return id; // 将id返回出去，可以利用该id取消订阅
  }
  // 发布事件,类似于触发事件$emit('key')
  $emit<T>(name: string, ...args: T[]) {
    // 获取存储的事件回调函数数组
    const eventList = this.eventObj[name];
    // 执行所有回调函数且传入参数
    for (const id in eventList) {
      eventList[id](...args);
      // 如果是订阅一次，则删除
      if (id.indexOf("D") !== -1) {
        delete eventList[id];
      }
    }
  }
  // 取消订阅函数，类似于$off('key1', id)
  $off(name: string, id: number) {
    console.log(this.eventObj);
    // 删除存储在事件列表中的该事件
    delete this.eventObj[name][id];
    console.info(`${id}id事件已被取消订阅`);
    // 如果这是最后一个订阅者，则删除整个对象
    if (!Object.keys(this.eventObj[name]).length) {
      delete this.eventObj[name];
    }
  }
  
  $once(name: string, callbcak: (...args: any) => void) {
    const id = this.$on(name, (...args: any[]) => {
      callbcak(...args);
      this.$off(name, id);
    });
    return id;
  }
}
// 初始化EventBus
let EB = new EventBus();

// 订阅事件
EB.$on("key1", () => {
  console.info("我是订阅事件A:");
});
EB.$once("key1", (name, age) => {
  console.info("我是订阅事件B:", name, age);
});
EB.$on("key2", () => {
  console.info("我是订阅事件C:");
});

// 发布事件key1
EB.$emit("key1", "小猪课堂");
console.info("在触发一次key1");
EB.$emit("key1", "小猪课堂");
// 发布事件
EB.$emit("key2", "小猪课堂");
