import observe from "./observe";
import Dep from "./dep";
function reactive(data,key,value) {
    //递归如果取的数还是object类型的话 就递归
    if(typeof value === "object") observe(value)
    let dep = new Dep()
  
    Object.defineProperty(data,key,{
        get(){
            Dep.target && dep.addSub(Dep.target)
            return value
        },
        set(newValue){
            if(newValue === value) return 
            observe(newValue)
            value = newValue
            //通知每一个订阅者更新数据
            dep.notify()
        }
    })
 
  }

  export default reactive