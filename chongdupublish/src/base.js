import router from "./router";
import Vue from "vue";
import "jquery";
import store from "./store";
import ElementUI from "element-ui";
import { MessageBox } from "element-ui";
import axios from "axios";
Vue.prototype.$http = axios;
Vue.use(ElementUI);
export default {
    //选择当前某一项
    isCheckedItem(item, alllist, cb) {
        item.ischecked = !item.ischecked;
        const checkedlength = alllist.filter(o => {
            return o.ischecked == true;
        }).length;
        if (checkedlength == alllist.length) {
            alllist.ischeckedall = true;
        } else if (checkedlength == 0 || checkedlength !== alllist.length) {
            alllist.ischeckedall = false;
        }
        typeof cb == "function" && cb(alllist.ischeckedall);
    },
    //全选
    ischeckedAll(alllist,cb) {
        alllist.ischeckedall = !alllist.ischeckedall;
        if (alllist.ischeckedall == true) {
            alllist.forEach((ele, i) => {
                ele.ischecked = true;
            });
        } else if (alllist.ischeckedall == false) {
            alllist.forEach((ele, i) => {
                ele.ischecked = false;
            });
        }
        typeof cb == "function" && cb(alllist.ischeckedall);
    },
    //去宠物详情
    godetail(item, currentId) {
        router.push({
            path: "/petdetail",
            query: {
                id: item.id,
                currentid: currentId
            }
        });
    },
    //去推广中心
    goextansion(item, currentId, event) {
        var relatetype;
        if (currentId == 1) {
            relatetype = 1;
        } else if (currentId == 2 || currentId == 3) {
            relatetype = 2;
        }
        if(event.target.getAttribute("data-link-type") == "extansion"){
            router.push({
                path: "/extension_center",
                query: {
                    relateid: item.id,
                    relatetype: relatetype,
                    targetlink: event.target.getAttribute("data-link-type"),//用来标记初始化时选中哪个服务选项
                }
            });
        }else{
            router.push({
                path: "/extension_center/"+ event.target.getAttribute("data-link-type"),
                query: {
                    relateid: item.id,
                    relatetype: relatetype,
                    targetlink: event.target.getAttribute("data-link-type"),//用来标记初始化时选中哪个服务选项
                }
            });
        } 
    },
    //去置顶
    gosettop(item, currentId) {
        var relatetype;
        if (currentId == 0) {
            relatetype = 1;
        } else if (currentId == 1 || currentId == 2) {
            relatetype = 2;
        }
        router.push({
            path: "/extension_center",
            query: {
                id: item.id,
                relatetype: relatetype
            }
        });
    },
    //点击下架
    undercarriage(item, currentId) {
        if (currentId == 1) {
            axios({
              url: "/chongdu/pet/modiPetState.do",
              methods: "post",
              params: {
                id: item.id,
                s: 3
              }
            }).then(res => {
                if (res.data.code == 0) {
                  MessageBox({
                    showClose: true,
                    message: "下架成功",
                    type: "success"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
        } else if (currentId == 2 || currentId == 3){
            axios({
              url: "/chongdu/goods/modifyState.do",
              method: "post",
              params: {
                id: item.id,
                s: 3
              }
            })
              .then(res => {
                if (res.data.code == 0) {
                  MessageBox({
                    showClose: true,
                    message: "下架成功",
                    type: "success"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });


        }
    },
    //上传读取文件
    readupload(ele, fn) {
        let file = ele.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            typeof fn == "function" && fn(file, event);
        };
        //使用案例
        // this.base.readupload(document.querySelector("#again"), function (e) {
        //     console.log(e)
        // });
    },
};