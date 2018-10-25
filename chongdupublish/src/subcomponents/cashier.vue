<template>
    <div class="cashier">
        <Header></Header>
        <Nav></Nav>
        <div class="container">
            <div class="main">
                <div class="cashier_title">
                    <img src="../../static/img/yhtl.png" alt="">
                    <p>收银员</p>
                </div>
                <div class="cashier_content">
                    <div class="cashier_left">
                        <p>订单已经提交,请尽快支付</p>
                        <p>订单编号:
                            <span>{{orderdata.sn}}</span>
                        </p>
                        <p>订单名称:
                            <span>{{orderdata.ordername}}</span>
                        </p>
                    </div>
                    <div class="cashier_right">
                        <em>应付金额:</em>
                        <span>{{orderdata.realmoney}}元/{{orderdata.realmoney}}宠币</span>
                    </div>

                </div>
                <div class="cashier_method">
                    <div class="method_type">
                        <p>选择支付方式</p>
                        <ul>
                            <li v-for="(item,index) in payImg" :key="index" :class="payId==item.typeId?'active':''" @click="choosepaymethod(item)">
                                <img :src="item.img">
                            </li>
                        </ul>
                        <div class="canuse" v-if="showmoney">
                            <em>可用余额:</em>
                            <span>{{balance}}</span>
                            <i>宠币</i>
                        </div>
                        <div class="we_chart" v-if="isshowerwema">
                            <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
                        </div>
                    </div>
                     <div class="comfirm_button" @click="comfirmpay()" v-if='showbutton'>
                         <span>确认支付</span>
                    </div>
                </div>               
            </div>
        </div>
        <Footer></Footer>
    </div>    
</template>
<script>
    import Header from "@/components/Header"
    import Nav from "@/components/Nav"
    import Footer from '@/components/footer'
    import QrcodeVue from 'qrcode.vue';
    export default {
        data(){
            return{
                value: '',
                size: 120,
                payId:-1,    // 支付的类型,1,宠币支付2,支付宝支付3,微信支付
                payImg:[
                    {
                        img:'../../static/img/cbzf_pic.png',
                        typeId:1,
                    },{
                        img:"../../static/img/zfb_pic.png",
                        typeId:2,
                    },{
                        img:'../../static/img/wxzf_pic.png',
                        typeId:3,
                    }
                ],
                showbutton:false,  //是否显示确认支付按钮
                showmoney:false,   //是否显示宠币余额
                listId:0,    //支付订单的Id
                balance:0,
                orderdata:{},   //生成的订单传到支付页面的item
                isshowerwema:false,
            }
        },
        created(){
            this.initorderInfo();
        },
        methods:{
            //获取订单信息
            initorderInfo(){
                this.$http({
                    url:"/chongdu/order/list.do",
                    method:'post',
                    params:{
                        id:this.$route.query.orderid
                    }
                }).then(res=>{
                    
                    if(res.data.code == 0){
                        this.orderdata = res.data.rows[0];
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //确认支付
            comfirmpay(){
               switch (this.payId) { 
                   case 1:
                //    调用宠币支付的接口 
                        this.$http({
                            url:'/chongdu/user/chongBiPay.do',
                            method:'post',
                            params:{
                                id:this.listId
                            }
                        }).then(res=>{
                            console.log(res.data)
                        }).catch(err=>{
                            console.log(err)
                        })       
                   case 2:
                      //调用阿里支付的接口
                      window.location.href="https://www.chongdu.com/chongdu/alipay/payOrder.do?id="+this.orderdata.id;
                     break;                                      
                   default:
                       break;
               }
            },
            //选择支付方式
            choosepaymethod(item){
                this.payId = item.typeId;
                switch (this.payId) {
                   case 1:   
                   //显示宠币支付的金额的接口,成功之后显示
                   this.$http({
                       url:'/chongdu/user/info.do',
                       method:'post'
                   }).then(res=>{
                       console.log(res.data)
                       if(res.data.code == 0){
                        this.showmoney  = true;  
                           this.balance = res.data.item.balance;
                           if(this.balance !== 0){
                                this.showbutton = true;
                           }else{
                               this.showbutton = false;
                           }
                       }
                   }).catch(err=>{
                       console.log(err)
                   })
                       break;                 
                   case 2:
                        this.showbutton = true;
                        this.showmoney  = false; 
                        break;                   
                   case 3:
                        this.showbutton = false; 
                         this.showmoney  = false;  
                        //显示支付的二维码
                        this.$http({
                            url:'/chongdu/Wxpay/wxPay.do',
                            method:'post',
                            params:{
                                id:this.orderdata.id
                            }
                        }).then(res=>{
                           if(res.data !== null){
                                this.isshowerwema = true;
                                this.value = res.data;
                           }
                        }).catch(err=>{
                            console.log(err);
                        })
                        break;                    
                   default:
                       break;
               }
                
            },
        },
        components: {
            Header,
            Nav,
            Footer,
            QrcodeVue
        }
    }
</script>
<style lang='less'>
    @import '../../static/css/common.less';
    .cashier {
        width: 100%;
        background-color: #F1F1F1;
        .main {
            width: 100%;
            background-color: #fff;
            padding:0 30px;
            margin-top: 30px; 
            .cashier_title{
                width:100%;
                height:75px;
                border-bottom: 2px solid #d2d2d2;
                position: relative;
                img{
                    position: absolute;
                    top:50%;
                    left: 0;
                    transform: translateY(-50%);
                }
                p{
                    width:300px;
                    height:100%;
                    position: absolute;
                    left:150px;
                    line-height: 75px;
                    font-size: 24px;
                }
            } 
            .cashier_content{
                width:100%;
                height: 130px;
                background-color: #efefef;
                 display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                padding: 0 40px;
                box-sizing: border-box;
                .cashier_left{
                    width:400px;
                    height:100%;
                    padding-top: 26px;
                    box-sizing: border-box;
                    p{
                        font-size: 18px;
                        line-height: 28px;
                    }
                }
                .cashier_right{
                    flex: 1;
                    height:100%;
                    text-align: right;
                    line-height: 130px;
                    font-size: 18px;
                    box-sizing: border-box;
                    span{
                        color: #F60505;
                    }
                }
            }
            .cashier_method{
                width: 100%;
                height: 340px;
                  position: relative;
                .method_type{
                    width:100%;
                    height:60px;
                    margin-top: 30px;
                    padding-left: 40px;
                    box-sizing: border-box;
                    position: relative;
                    p{
                        width:150px;
                        height: 100%;
                        line-height: 60px;
                        font-size: 18px;
                         float: left;
                    }
                    ul{
                        float: left;
                        height: 100%;
                        li{
                            float: left;
                            height: 60px;
                            width: 175px;
                            position: relative;
                             border: 1px solid #cfcfcf;
                             margin-right: 60px;
                             border-radius: 3px;
                             cursor: pointer;
                            img{
                                width:104px;
                                height:35px;
                                position: absolute;
                                top:50%;
                                left:50%;
                                transform: translate(-50%,-50%);
                            }
                            &.active{
                                border:2px solid @commonColor;
                            }
                        }
                    }
                    .canuse{
                        width:300px;
                        height:100px;
                        position: absolute;
                        left:0;
                        top:60px;
                        padding-left: 40px;   
                        font-size: 18px;
                        line-height: 100px;
                        span{
                            font-size: 22px;
                            font-weight: 700;
                            margin-left: 15px;
                            color: #F60505;
                        } 
                        i{
                            font-size: 16px;
                        }
                    }
                    .we_chart{
                        width:120px;
                        height:120px;
                        position: absolute;
                        right:380px;
                        top:70px;
                        div{
                            width:100%;
                            height:100%;
                            border: 0;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                    }
                }
                .comfirm_button{
                        width:145px;
                        height:50px;
                        background-color: @commonColor;
                        position: absolute;
                        bottom: 50px;
                        right: 0;
                        border-radius: 7px;
                        color: #fff;
                        font-size: 24px;
                        text-align: center;
                        line-height: 50px;
                        cursor: pointer;
                    }
            } 
        }
    }
</style>


