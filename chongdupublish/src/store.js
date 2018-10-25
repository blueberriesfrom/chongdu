import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    username: null, //用户名
    token:'',
    onlinelist: null,
    ischeckedall: false,
    // extansionList: {}, //推广中心生成的订单
    orderlist:{},
    payorderlist: {}, //生成订单成功后返回的item传入支付页面
    publishid: "", //发布地址的id
    addpublishId:'',//第二步保存后记录的id,用来判定发布宠物第二步的值是否跟这个一样,一样就不访问此接口

  },
  mutations:{
    extansionList(state){    
      state.orderlist = Object.assign({},state.orderlist);
      //console.log(state.orderlist)
    }
  }
});
export default store