import defineReactiveData from './reactive'
import myselfArrMethods from './array'
import observeArr from './observeArr';
function Observer(data) {
  console.log("ObserverData",data);
  if (Array.isArray(data)) {
    data.__proto__ = myselfArrMethods
    observeArr(data)
  } else {
    //不是函数 -》是对象遍历他们 让他们变成响应式数据
    this.walk(data);
  }
}
Observer.prototype.walk = function (data) {
  let keys = Object.keys(data);
  keys.forEach((item) => {
    defineReactiveData(data, item, data[item]);
  });
};

export default Observer;
