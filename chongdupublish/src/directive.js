import Vue from 'vue';
import ElementUI from "element-ui";
import { Message } from "element-ui";
import store from "./store";
Vue.use(ElementUI);
Vue.directive("check", {
  bind(el, binding, vnode, oldVnode) {
    // console.log("指令绑定成功")
  },
  inserted(el, binding, vnode, oldVnode) {

  },
  update(el, binding, vnode, oldVnode) {
    if (binding.oldValue.val !== binding.value.val) {
      let checkStatus = true;
      if (binding.value.type == "textarea" || binding.value.type == "text") {
        if (binding.value.val.length >= binding.value.long) {
          Message({
            message: "不能超过" + binding.value.long + "个字符",
            type: "warning"
          });
        }
      } else if (binding.value.type == "price") {
        if (!/^\d+$/g.test(binding.value.val)) {
          Message({ message: "只能输入纯数字", type: "warning" });
          checkStatus = false;
        }
      } else if (binding.value.type == "tel") {
        if (binding.value.val.length > 11 || binding.value.val.length == 11) {
          console.log(binding.value.val);
          if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(binding.value.val)) {
            checkStatus = true;
          } else {
            checkStatus = false;
          }
          if (checkStatus == false) {
            Message({ message: "手机号输入有误", type: "warning" });
           }
         }
      }

    }

    // 进行判断,避免同时触发多个判断
  },
  componentUpdated(el, binding, vnode, oldVnode) {

  },
  unbind(el, binding, vnode, oldVnode) {

  }
});



