import { ARR_METHODS } from "./config";
import observeArr from './observeArr'

//得到原来arr中的方法
const originArrMethods = Array.prototype;
//自己重写的arr方法
const myselfArrMethods = Object.create(originArrMethods);

//开始重写
ARR_METHODS.forEach(function (item) {
  myselfArrMethods[item] = function () {
    //把参数变成数组
    const args = Array.prototype.slice.call(arguments);
    //再把参数传入源数组方法中并执行
    originArrMethods[item].apply(this, args);
    console.log("args",args);
    let newArr;
    switch (item) {
      case "push":
        newArr = args;
        break;
      case "pop":
        newArr = args;
        break;
      case "splice":
        newArr = args[2];
        break;
      default:
        break;
    }
    newArr && observeArr(newArr)
  };
});

export default myselfArrMethods;
