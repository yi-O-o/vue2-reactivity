import proxyData from "./proxy";
import observe from "./observe";
import Watcher from "./Watcher";
//数据劫持
function initData(vm) {
  for (let key in vm._data) {
      //对vm进行观察
       proxyData(vm,'_data',key)
    }
    
    //对data 内部的数据进行观察
    observe(vm._data)
}


//模板编译
function compile(el,vm) {
  console.log("vm",vm);
  //获取el中的dom元素
  vm.$el = document.querySelector(el)
  //创建文档碎片(在内存中) 这样可以减少重绘和重排，提高性能
  const fragment = document.createDocumentFragment()
  //将el中的DOM元素放入到文档碎片中
  //这里不能用children[0]因为el中第一个节点是换行，children[0]是一个子节点
  while(vm.$el.firstChild){
    fragment.appendChild(vm.$el.firstChild)
  }
  //对模板进行编译
  replace(fragment)
  //重新渲染回去
  vm.$el.appendChild(fragment)
/**
 * replace这个函数是把{{***}}
 * ***提取出来然后拿到和vm.data中的值比较
 * 如果命中则替换
 */
  function replace(node) {
   
    /**
     * 提取{{}}中的值
     * { \{
     * } \}
     * {{  }}中间可能有空格 \s*
     * 中间的值 \S  \S非空白符，不包括换行。
     */
    let regMustache = /\{\{\s*(\S+)\s*\}\}/
    //表示是文本
    if(node.nodeType === 3){
      const text = node.textContent
      const execResult = regMustache.exec(text)
      if(execResult){
       const value = execResult[1].split(".").reduce((prev,item) => prev[item],vm)
       //这个是第一次初始化的时候才能调用(后面数据变化，视图变化就不会更新了)
       node.textContent = text.replace(regMustache,value);
       //这里解决初始化之后，数据变化视图也变化所以要建立watcher实例
       new Watcher(vm,execResult[1],(value) => {
        node.textContent = text.replace(regMustache,value);
       })
      }
      return
    }


    //表示是元素并且是input
    if(node.nodeType === 1 && node.nodeName === "INPUT"){
      console.dir(node);
      //将伪数组变成数组
      const nodeValue = Array.prototype.slice.call(node.attributes)
      //取v-model出来
      const resultVmodle =  nodeValue.find(item => item.name == "v-model")
      //就可以取得v-model的值 通过reduce拿取vm中的值
      const value =  resultVmodle.value.split(".").reduce((prev,item) => prev[item],vm) 
      node.value = value
      //创建Watcher实例
      new Watcher(vm,resultVmodle.value,(value) => {
        node.value = value
      })



      /**
       * 实现输入框中输入内容，vm。data也会改变
       */
      //监听输入框的value值的变化
      node.addEventListener("input",(e) => {
        const arrKeys = resultVmodle.value.split(".")
        //这里要拿到.前面的哪一个 就是比如 a.b.c.d 要拿到 a.b.c这个对象 然后a.b.c[d]不然赋值不了
        const resultKeys = arrKeys.slice(0,arrKeys.length - 1)
        const obj = resultKeys.reduce((prev,item) => prev[item],vm)
        console.log(arrKeys);
        obj[arrKeys[arrKeys.length - 1]] = e.target.value 
      })


    }
    node.childNodes.forEach(item => {
      replace(item)
    })
    }
  }
export { initData,compile};
