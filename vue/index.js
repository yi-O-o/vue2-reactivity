/**
 * vue的构造函数
 */
import {initData,compile} from './init'

function Vue(options){
   this._init(options)
}

Vue.prototype._init = function (options){
  let vm = this 
  vm.$options = options
  let data  = vm.$options.data
  //禁止直接修改用户的data (data是一个函数 需要执行才能取得return里的值) 用户输入的有可能是对象
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {}
  console.log("vm2",vm);
  initData(vm)
  compile(vm.$options.el,vm)
}

export default Vue

