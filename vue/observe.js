import Observer from "./Observer";
function observe(data) {
  console.log("observe",data);
  //data不是对象也不是数组直接return
  if (typeof data !== "object" || typeof data == "undefined") return;
  return new Observer(data);
}
export default observe;
