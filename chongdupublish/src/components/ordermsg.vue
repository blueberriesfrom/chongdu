<template>
    <div class="order_com">
        <!-- 订单信息 -->
        <div class="order_msg">
            <div class="order_msg_title" v-if="!this.$props.isshowrefulsh">
                <h2>订单信息</h2>
                <div class="noimg" v-if="Object.keys($store.state.orderlist).length == 0">
                    <img src="../../static/img/nosj.png" alt="">
                </div>
                <div class="list" v-if="Object.keys($store.state.orderlist).length !== 0 && $store.state.orderlist.orderinfo.indexOf('undefined') == -1">
                    <div class="order_title">
                        <el-col :span="5">订单名称</el-col>
                        <el-col :span="9">订单规格</el-col>
                        <el-col :span="5">订单数量</el-col>
                        <el-col :span="5">订单价格</el-col>
                    </div>
                    <div class="order_list">
                        <el-col :span="5">{{$store.state.orderlist.ordername}}</el-col>
                        <el-col :span="9">{{$store.state.orderlist.orderinfo}}</el-col>
                        <el-col :span="5">{{$store.state.orderlist.num}}</el-col>
                        <el-col :span="5">{{$store.state.orderlist.price}}</el-col>
                    </div>
                    <div class="total_price">
                        <p>
                            <span>合计:</span>
                            <em v-html="$store.state.orderlist.totalPrice"></em>
                        </p>
                    </div>
                    <!-- 取消订单提交订单按钮 -->
                    <div class="buttons" v-if="!this.$props.isshowrefulsh">
                        <span class="cancle_button" @click="cancelOrder()">取消订单</span>
                        <span class="confirm_button" @click='submitOrder()'>提交订单</span>
                    </div>
                </div>
            </div>
            <div class="buttons" v-if="this.$props.isshowrefulsh">
                <span class="confirm_button" @click='submitOrder("refreshimmediately")'>立即刷新</span>
             
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
         
            }
        },
        methods: {
            //提交订单
            submitOrder(info) {
                var formdata = {};
                if (info !== "refreshimmediately") {
                    formdata.type = this.$store.state.orderlist.type;
                    formdata.relateid = this.$route.query.relateid;
                    formdata.relatetype = this.$route.query.relatetype;
                    formdata.realmoney = this.$store.state.orderlist.realmoney;
                    formdata.residue = this.$store.state.orderlist.residue;
                    if (this.$store.state.orderlist.platformgoodsid !== undefined) {
                        //非优选            
                        formdata.platformgoodsid = this.$store.state.orderlist.platformgoodsid;
                    }
                    if (this.$store.state.orderlist.oneprice !== undefined) {
                        formdata.oneprice = this.$store.state.orderlist.oneprice;
                    }
                    if (this.$store.state.orderlist.timestep !== undefined) {
                        formdata.timestep = this.$store.state.orderlist.timestep;
                    }
                } else {
                    formdata.type = 3;
                }
                  this.$http({
                        url: '/chongdu/order/payOrder.do',
                        method: 'post',
                        params:formdata
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.$store.state.payorderlist = res.data.item;
                            this.$message({
                                message: '创建订单成功!',
                                type: 'success'
                            })
                            this.$router.push({
                                path: '/cashier', //跳转到
                                query: {
                                    orderid: res.data.item.id
                                }
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            },
            //点击取消订单
            cancelOrder() {
                this.$store.state.orderlist = {};
                this.$store.commit('extansionList')
            },
        },
        props: ["isshowrefulsh", "residue"]
    }
</script>
<style lang='less' scoped>
    @import '../../static/css/common.less';
    .order_com {
        width: 100%;
        .order_msg {
            width: 100%;
            h2 {
                width: 100%;
                margin-left: 10px;
                padding-left: 25px;
                height: 27px;
                line-height: 27px;
                border-left: 15px solid @commonColor;
                font-size: 24px;
                margin: 35px 0 10px 10px;
            }
            .noimg {
                width: 151px;
                height: 118px;
                margin: 30px auto;
            }
            .order_title {
                width: 100%;
                display: -webkit-box;
                /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;
                /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;
                /* 混合版本语法: IE 10 */
                display: -webkit-flex;
                /* 新版本语法: Chrome 21+ */
                display: flex;
                line-height: 80px;
                padding: 0 40px;
                box-sizing: border-box;
                .el-col-7,
                .el-col-5,
                .el-col-9 {
                    height: 80px;
                    text-align: center;
                    font-size: 18px;
                    border-bottom: 1px solid #eaeaea;
                    border-top: 1px solid #eaeaea;
                }
            }
            .order_list {
                width: 100%;
                display: -webkit-box;
                /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;
                /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;
                /* 混合版本语法: IE 10 */
                display: -webkit-flex;
                /* 新版本语法: Chrome 21+ */
                display: flex;
                line-height: 100px;
                padding: 0 40px;
                box-sizing: border-box;
                .el-col-7,
                .el-col-5,
                .el-col-9 {
                    height: 100px;
                    text-align: center;
                    font-size: 18px;
                    border-bottom: 1px solid #eaeaea;
                }
            }
            .total_price {
                width: 100%;
                height: 75px;
                overflow: hidden;
                p {
                    text-align: right;
                    padding-right: 200px;
                    font-size: 20px;
                    line-height: 125px;
                    em {
                        color: #ff0d0d;
                    }
                }
            }
        }
        .buttons {
            width: 100%;
            height: 120px;
            text-align: right;
            line-height: 150px;
            padding-right: 100px;
            box-sizing: border-box;
            span {
                display: inline-block;
                width: 176px;
                height: 40px;
                text-align: center;
                color: #fff;
                border-radius: 7px;
                line-height: 40px;
                font-size: 24px;
                font-weight: 500;
                background-color: #f94949;
                cursor: pointer;
            }
            .confirm_button {
                background-color: @commonColor;
                margin-left: 30px;
            }
        }
    }
</style>
