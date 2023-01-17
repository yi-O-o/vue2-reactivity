import Dep from "./dep";

/**
 * 这个类是为了数据更新的时候可以更新自己的dom元素
 */
class Watcher {
/**
 * vm:是vm对象，为了拿到最新的数据（vm存放着最新的数据）
 * key：是为了知道在vm众多的数据中哪一个数据才是自己所需要的订阅的
 * cd：是回调函数，回调函数写的是如何更新自己的文本内容
 */
  constructor(vm,key,cd) {
    this.vm = vm 
    this.key = key
    this.cd = cd;
    //new 完watcher就要将watcher存入Dep中
    /**
     * target 是自定义属性 不代表什么意思 可以换成 Dep.a = this
     * key.split(".").reduce((prev,item) =>prev[item] ,vm)  这一段是拿vm.data中某一个值，
     * 一取值就会触发Observer中数据拦截方法（defineReactiveData）get的方法，
     * 在那里就把watcher直接存入dep中
     */
    Dep.target = this
    key.split(".").reduce((prev,item) =>prev[item] ,vm)
    Dep.target = null

  }
  update() {
    const value = this.key.split(".").reduce((prev,item) =>prev[item] ,this.vm)
    this.cd(value);
  }
}
export default Watcher;
