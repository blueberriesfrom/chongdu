// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from "./store"
import '../static/css/reset.css'
import 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from "echarts"
import axios from 'axios'
import Base from './base'
import "../static/js/html5"
//import QRcode from 'qrcodejs2'
// import QRcode from 'qrcodejs2'
import directive from "./directive";
require("es6-promise").polyfill();
require("es6-promise/auto");
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts;
Vue.prototype.base = Base;
Vue.use(ElementUI, Vuex)
Vue.config.productionTip = false
import { Loading } from "element-ui";
import { Message } from "element-ui";
import "babel-polyfill";
import "es6-promise/auto";

let Base64 = require("js-base64").Base64;
//axios.defaults.baseURL = "https://www.chongdu.com";  //打包后使用
axios.defaults.timeout = 60000;//超时时间
//拦截器
var loadinginstace;
axios.interceptors.request.use(config=>{
  //添加判定条件
  loadinginstace = Loading.service({ fullscreen: true, text: 'Loading', spinner: 'el-icon-loading', });
  //  config.headers.token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MjAzMjVlZC04NjYzLTExZTgtOGQzMS1mYTE2M2UwZmRmYzMiLCJzdWIiOiJ3d3cuY2hvbmdkdS5jb20iLCJpYXQiOjE1MzY5MDU2NTN9.In569yfTe4PqocH6EPTgYskpSoMZTYPSQVA7Xa-XZPQ";
  if(localStorage.getItem("token")){
    if(localStorage.getItem("token") !== undefined || localStorage.getItem("token") == ""){
      config.headers.token = localStorage.getItem("token");
    } 
  }
  return config
}, err => {
   return Promise.reject(err);
});
axios.interceptors.response.use(response=>{
  //添加状态码的判定
  if (response.data.code == 0){
    //正常状态
  } else if (response.data.code == 1){
    Message({
      message: Base64.decode(response.data.desc),
      type: "warning"
    });
    //通用错误
  } else if (response.data.code == 2){
    // 密码错误
  } else if (response.data.code == 3) {
    // 登录超时
      router.replace({
        path: '/login',
      })
  } else if (response.data.code == 4){
    Message({
      message: Base64.decode(response.data.desc),
      type: "warning"
    })
    // 权限不足
  } else if (response.data.code == 5){
    Message({
      message: Base64.decode(response.data.desc),
      type: "warning"
    })
    //账户停用
  } else if (response.data.code == 6) {
    Message({
      message: Base64.decode(response.data.desc),
      type: "warning"
    })
    //副账户停用
  } else if (response.data.code == 7) {
    Message({
      message: Base64.decode(response.data.desc),
      type: "warning"
    })
    //标签不存在
  } else if (response.data.code == 8) {
    Message({
      message: Base64.decode(response.data.desc),
      type: "warning"
    })
    //标签请求已失效
  }else if (response.data.code == 2001) {
    Message({
      message: Base64.decode(response.data.desc),
      type: "warning"
    })
    //标签请求已失效
  }
  else if (response.data.code == 2002) {
    Message({
      message: Base64.decode(response.data.desc),
      type: "warning"
    })
    //标签请求已失效
  }
  loadinginstace.close();  
  return response;
},
 (error) => {
     loadinginstace.close();
      router.replace({
        path: '/offline',
      })
//请求超时
    //  var originalRequest = error.config;
    //  if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
    //    originalRequest._retry = true
    //    return axios.request(originalRequest);
    //  }
    //  Message.error({
    //    message: '加载失败'
    //  })
     return Promise.reject(error);
  })
//时间过滤器
Vue.filter("datesplite", function(value) {
  return value.substring(0, 10);
});
//转换日期
Vue.filter("dataformate",(value)=>{
  var daytime = new Date(value);
  var hours = daytime.getHours() < 10 ? "0" + daytime.getHours() : daytime.getHours();
  var minutes = daytime.getMinutes() < 10 ? "0" + daytime.getMinutes() : daytime.getMinutes();
  var seconds = daytime.getSeconds() < 10 ? "0" + daytime.getSeconds() : daytime.getSeconds();
  return  hours + ":" + minutes + ":" + seconds;  
})
//服务时间回显
Vue.filter("splittime",(value)=>{
  return value.splice(" ")[1]
})
//截取数组前三项
Vue.filter("sliceIMgs",(value)=>{
  return value.slice(0,2)
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
