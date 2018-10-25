import Vue from "vue";
import Router from "vue-router";
import Index from "@/home/Index";

Vue.use(Router);
export default new Router({
  routes: [
    {
      //登录页面
      path: "/",
      redirect: "/login",
      component: resolve => require(["@/home/Login"], resolve)
    },
    {
      path: "/login",
      component: resolve => require(["@/home/Login"], resolve)
    },
    {
      path: "/home",
      name: "index",
      component: Index,
      children: [
        {
          path: "/home",
          component: resolve => require(["@/subcomponents/home"], resolve)
        },
        {
          //积分
          path: "/credit",
          component: resolve => require(["@/subcomponents/credit"], resolve)
        },
        {
          //发布
          path: "/release",
          component: resolve => require(["@/subcomponents/release"], resolve)
        },
        {
          path: "/release/connect", //发布联系人信息,描述
          component: resolve =>
            require(["@/subcomponents/releaseConnect"], resolve)
        },
        {
          path: "/release/add/message", //添加疫苗,驱虫信息
          component: resolve => require(["@/subcomponents/addmessage"], resolve)
        },
        {
          //通知消息
          path: "/message",
          component: resolve => require(["@/subcomponents/message"], resolve)
          // component: message
        },
        {
          //在售列表
          path: "/onList",
          redirect: "/onList/pet",
          component: resolve =>
            require(["@/subcomponents/onlist/onList"], resolve),
          children: [
            {
              path: "/onList/pet",
              component: resolve =>
                require(["@/subcomponents/onlist/onlistPet"], resolve)
            },
            {
              path: "/onList/pet_product",
              component: resolve =>
                require(["@/subcomponents/onlist/pet_product"], resolve)
            },
            {
              path: "/onList/pet_service",
              component: resolve =>
                require(["@/subcomponents/onlist/pet_service"], resolve)
            }
          ]
        },
        {
          path: "/postMessage",
          redirect: "/postMessage/publish_pets_list",
          component: resolve =>
            require(["@/subcomponents/postMsg/postMessage"], resolve),
          children: [
            {
              path: "/postMessage/publish_pets_list",
              component: resolve =>
                require(["@/subcomponents/postMsg/publish_pets_list"], resolve)
            },
            {
              path: "/postMessage/publish_goods_list",
              component: resolve =>
                require(["@/subcomponents/postMsg/publish_goods_list"], resolve)
            },
            {
              path: "/postMessage/publish_service_list",
              component: resolve =>
                require([
                  "@/subcomponents/postMsg/publish_service_list"
                ], resolve)
            }
          ]
        },
        {
          path: "/release/around",
          component: resolve =>
            require(["@/subcomponents/releasearound"], resolve)
        },
        {
          path: "/release/service",
          component: resolve =>
            require(["@/subcomponents/releaseservice"], resolve)
        },
        {
          path: "/purchase/order",
          component: resolve =>
            require(["@/subcomponents/purchaseorder"], resolve)
        },
        {
          path: "/booking/management",
          component: resolve =>
            require(["@/subcomponents/bookingManagement"], resolve)
        },
        {
          path: "/booking/setting",
          component: resolve =>
            require(["@/subcomponents/bookingSetting"], resolve)
        },
        {
          path: "/account/flow",
          component: resolve =>
            require(["@/subcomponents/accountFlow"], resolve)
        },
        {
          path: "/credit/exchange",
          component: resolve =>
            require(["@/subcomponents/creditexchange"], resolve)
        },
        {
          path: "/invoicing",
          component: resolve => require(["@/subcomponents/invoicing"], resolve)
        },
        {
          path: "/invoicing/list",
          component: resolve =>
            require(["@/subcomponents/InvoicingList"], resolve)
        },
        {
          path: "/invoicing/address",
          component: resolve =>
            require(["@/subcomponents/invoice_address"], resolve)
        },
        {
          path: "/myInfo",
          component: resolve => require(["@/subcomponents/myInfo"], resolve)
        },
        {
          //宠物详情
          path: "/petdetail",
          component: resolve => require(["@/subcomponents/petDetail"], resolve)
        },
        {
          //修改手机号码
          path: "/myInfo/changePhone",
          name: "changePhone",
          component: resolve =>
            require(["@/subcomponents/changePhone"], resolve)
          // component: changePhone
        },
        {
          //宠物编辑
          path: "/pet_edit",
          component: resolve => require(["@/subcomponents/pet_edit"], resolve)
        },
        {
          //个人认证
          path: "/personal/certification",
          component: resolve =>
            require(["@/subcomponents/personalCertification"], resolve)
          // component: myCertification
        },
        {
          //个人认证资料回显
          path: "/personal/certification/info",
          component: resolve =>
            require(["@/subcomponents/personalCertificationInfo"], resolve)
          // component: myCertification
        },
        {
          path: "/change/certification",
          component: resolve =>
            require(["@/subcomponents/changeCertification"], resolve)
        },
        {
          //开始认证
          path: "/again/certification",
          component: resolve =>
            require(["@/subcomponents/againcertify"], resolve)
        },
        {
          //网路链接错误
          path: "/offline",
          component: resolve => require(["@/components/offline"], resolve)
        },
        {
          //地址管理
          path: "/address/management",
          component: resolve =>
            require(["@/subcomponents/addressmanagement"], resolve)
        }
      ]
    },
    {
      //推广中心
      path: "/extension_center",
      redirect: "/extension_center/settop",
      component: resolve =>
        require(["@/subcomponents/extension/extensionCenter"], resolve),
      children: [
        {
          path: "/extension_center/settop",
          component: resolve =>
            require(["@/subcomponents/extension/settop"], resolve)
        },
        {
          path: "/extension_center/preference",
          component: resolve =>
            require(["@/subcomponents/extension/preference"], resolve)
        },
        {
          path: "/extension_center/refresh",
          component: resolve =>
            require(["@/subcomponents/extension/refresh"], resolve)
        },
        {
          path: "/extension_center/vip",
          component: resolve =>
            require(["@/subcomponents/extension/vip"], resolve)
        }
      ]
    },
    {
      //忘记密码
      path: "/forget/password",
      component: resolve => require(["@/subcomponents/forgetpassword"], resolve)
    },
    {
      //修改密码
      path: "/change/password",
      component: resolve => require(["@/subcomponents/changepassword"], resolve)
    },
    {
      path: "/register",
      component: resolve => require(["@/subcomponents/register"], resolve)
    },
    {
      //订单成功后的待付款页面
      path: "/cashier",
      component: resolve => require(["@/subcomponents/cashier"], resolve).then()
    },
    {
      //支付成功的页面
      path: "/pay_success",
      component: resolve => require(["@/subcomponents/paysuccess"], resolve)
    }
  ]
});
