/**
 * Dep用来收集订阅者
 * 并告诉订阅者 
 */

class Dep {
  constructor() {
    //存放订阅者的数组
    this.subs = [];
  }
  //收集订阅者方法
  addSub(watcher) {
    this.subs.push(watcher);
  }

  //通知订阅者
  notify(){
    console.log("this.subs",this.subs);
    this.subs.forEach(watcher => {
        watcher.update()
    })
  }
}




export default Dep 