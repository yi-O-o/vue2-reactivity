import Vue from "vue"
let vm = new Vue({
  el: "#app",
  data() {
    return {
      title: "学生列表",
      class: {
        name:"2班",
        b:123
      },
      teachers: ["大明", "大白", "超白", "大红"],
      students: [
        {
          id:1,
          name:"小明"
        },
        {
          id:2,
          name:'小红'
        }
      ]
    }
  }
})
// eslint-disable-next-line no-debugger
// debugger
setTimeout(() => {
vm.class.b = 123213
},1000)