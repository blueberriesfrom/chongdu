<template>
    <div class="invoicing">
        <!-- 发票索取 -->
        <div class="fpgl_top">
            <div class="fpgl_h">
                <div class="xxk_tap">发票索取</div>
            </div>
            <div class="fp_cx">
                <span class="kjcx">快捷查询
                                            <input type="text" placeholder="请输入服务名称" name="head" maxlength="10" v-model="ordername">
                </span>
                <!-- <span class="fp_time">时间
                                            <select class="shzc_year" id="sel_year">
                                                <option></option>
                                            </select>&nbsp;年&nbsp;
                                            <select class="shzc_month" id="sel_month">
                                                <option></option>
                                            </select>&nbsp;月&nbsp;
                                            <select class="shzc_day" id="sel_day">
                                                <option></option>
                                            </select>&nbsp;日
                                            
                            </span> -->
            </div>
            <div class="fp_ss">
                <span class="fp_sousuo" @click="choosesearch()">搜索</span>
            </div>
        </div>
        <div class="all_fp">
            <div class="afp_top">开票订单
                <!-- <span href="javascript:void(0);" class="tm_px" @click="chooseSort()">按时间排序</span> -->
                <!-- <a href="#" class="mc_px">按名称排序</a>
                <a href="#" class="lb_px">按类别排序</a> -->
            </div>
            <!-- //无数据 -->
            <div class="nosj" v-if="isshowNonelist">
                <img src='../../static/img/nosj.png'>
            </div>
            <div class="havesj" v-if="!isshowNonelist">
                <table class="fp_table" cellspacing="0">
                    <thead>
                        <tr>
                            <td class='fpsq_zfsj' >支付时间</td>
                            <td class='fpsq_fwmc'>服务名称</td>
                            <td class='fpsq_ddbh'>订单编号</td>
                            <td class='fpsq_sfje'>订单金额</td>
                            <td class='fpsq_kpje'>支付方式</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in invoiceList" :key="index">
                            <td class='fpsq_zfsj'>
                                <div class="check_box" @click="ischeckedItem(item,invoiceList)">
                                    <img src="../../static/img/inputxz.png" v-if="item.ischecked == true">
                                    <img src="../../static/img/no_check.png" v-if="item.ischecked == false">
                                </div>
                                {{item.ct | datesplite}}</td>
                            <td class='fpsq_fwmc'>{{item.ordername}}</td>
                            <td class='fpsq_ddbh'>{{item.ordercode}}</td>
                            <td class='fpsq_sfje'>{{item.realmoney}}元</td>
                            <td class='fpsq_kpje' v-if="item.payment == 1">支付宝</td>
                            <td class='fpsq_kpje' v-if="item.payment == 2">微信</td>
                            <td class='fpsq_kpje' v-if="item.payment == 3">宠币</td>
                        </tr>
                    </tbody>
                </table>
                <div class="cd_fy" style="margin-top:5px;">
                    <span class="fy_btn" style='left:8px;'>
                                        <div  @click="checkedAll(invoiceList)" style='cursor:pointer'>
                                            <img src="../../static/img/inputxz.png" v-if="ischeckedAll">
                                                                            <img src="../../static/img/no_check.png" v-if="!ischeckedAll"> 
                                        </div>
                                        <a href="javascript:void(0);" class='sc_pic' style='left:46px;' @click="getinvioce(invoiceList)">发票索取</a>
                                    </span>
                    <span class="page_total">共{{listtotal}}条</span><span class="page_fy">{{page}}/{{totalpage}}页</span>
                    <a href="javascript:void(0);" class="cd_fyzjt" @click="reducepage()">
                        <img src="../../static/img/zjt.png">
                    </a>
                    <a href="javascript:void(0);" class="cd_fyyjt" @click="pluspage()">
                        <img src="../../static/img/yjt.png">
                    </a>
                    <span class="fy_tz">跳转到
                                            <input type="text" v-model="searchpage">
                                            <a href="javascript:void(0);" class='page_tz' @click="choosepage()">Go</a>
                                        </span>
                                      
                                       
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pageTurn from "@/components/pageTurn"
    export default {
        data() {
            return {
                paymenttime: "", //付款时间
                page: 1, //当前页码
                ordername: "", //搜索关键字
                invoiceList: [], //发票列表
                ischeckedAll: false, //是否全部选中
                page: 1, //当前页码
                listtotal: '', //总条数
                currentpage: 1, //当前页数
                searchpage: "",
                isshowNonelist: false,
                isneedinvoice:[], //是否需要发票的容器
                totalprice:0,  //发票总金额
                ids:"",    //需要发票的Ids
                orders:'',  //订单号
               
                
            }
        },
        computed: {
            totalpage: {
                get() {
                    return Math.ceil(this.listtotal / 10)
                }
            },
        },
      
        created() {
            this.initvoice();
        },
        methods: {
            //点击发票索取
            getinvioce(item){               
                this.isneedinvoice = item.filter(o=>{
                    return o.ischecked == true
                });
                if( this.isneedinvoice.length == 0){
                    this.$message({
                        message:'请选择至少一条数据',
                        type:'warning'
                    })
                }else{
                      let sum = 0;
                    for(var i= 0 ;i< this.isneedinvoice.length; i++) {
                            sum += this.isneedinvoice[i].realmoney;
                    }
                    this.ids = this.isneedinvoice.map((ele,i)=>{
                        return ele.id
                    }).join(",");
                     this.$msgbox({
                        title: '温馨提示',
                        dangerouslyUseHTMLString: true,
                        message:`<h4>
                        <img src='../../static/img/mzje.png' style='width:60px;height:60px;margin-left:20px;vertical-align: middle;'>
                        <span style="margin-left:15px">总共选择${this.isneedinvoice.length}条订单,发票总金额${sum.toFixed(2)}元</span>
                        </h4>`,
                        closeOnClickModal:false,
                        confirmButtonClass:"confirminvoice",
                        beforeClose: (action, instance, done)=>{
                              console.log(action);
                              if(action == "confirm"){
                                  done();
                                  this.$http({
                                      url:'/chongdu/order/checkOrder.do',
                                      method:'post',
                                      params:{
                                          ids: this.ids
                                      }
                                  }).then(res=>{
                                      console.log(res.data);
                                      if(res.data.code == 0){
                                        let price = 0;
                                        for(var i= 0 ;i< res.data.rows.length; i++) {
                                                price += res.data.rows[i].realmoney;
                                        }
                                            this.$router.push({
                                              path:'/invoicing/address',
                                              query:{
                                                 price:price.toFixed(2),
                                                 ids:this.ids,
                                              }
                                          })
                                      }
                                  }).catch(err=>{
                                      console.log(err)
                                  })
                             
                              }else if(action == "cancel" ){
                                  done();
                              }
                          }

                        // 
                     })
                }
            },
           
        
            //初始化发票数据
            initvoice() {
                this.$http({
                    url: '/chongdu/order/getInvoiceOrderList.do',
                    method: 'post',
                    params: {
                        s: 1,
                        paymenttime: this.paymenttime, //付款时间,
                        page: this.page,
                        ordername: this.ordername,
                    }
                }).then(res => {
                    // console.log(res.data);
                    if (res.data.rows == 0) {
                        this.isshowNonelist = true;
                    } else {
                        this.isshowNonelist = false;
                        res.data.rows.ischeckedall = false;
                        this.listtotal = res.data.rows.length;
                        $(res.data.rows).each((i, ele) => {
                            ele.ischecked = false;
                        })
                        this.invoiceList = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            
              //点击搜索
            choosesearch() {
                this.page =1;
                this.initvoice();
                this.ordername = "";
            },
             //选中每一项,单选
            ischeckedItem(item, alllist) {
                this.base.isCheckedItem(item, alllist, (check) => {
                    alllist.ischeckedall = check;
                    this.ischeckedAll = check;
                });
            },
             //全选
            checkedAll(alllist) {
                this.base.ischeckedAll(alllist, (check) => {
                    this.ischeckedAll = check;
                });
            },
                //点击上一页
            reducepage() {
                this.page--;
                if (this.page < 1) {
                    this.page = 1
                }
            },
            //点击下一页
            pluspage() {
                this.page++;
                if (this.page > this.totalpage) {
                    this.page = this.totalpage
                }
            },
              //点击跳转到某一页
            choosepage() {
                this.page = this.searchpage;
                this.initvoice();                
            }
        },
        components: {
            pageTurn
        }
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .confirminvoice{
        background-color: @commonColor;
        &:hover,&:active,&:visited{
             background-color: @commonColor;
        }
    }
    .invoicing {
        width: 100%;
        color: #333;
        .fpgl_top {
            border: 1px solid #f1f1f1;
            background: #fff;
            padding-bottom: 20px;
            .fpgl_h {
                font-size: 16px;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #96E0D9;
                
                div {
                    float: left;
                    width: 180px;
                    text-align: center;
                    border-right: 1px solid #EEEEEE;
                    cursor: pointer;
                }
                .xxk_tap {
                    background: #2EC2B4;
                    color: #fff;
                }
            }
            .fp_cx {
                padding-top: 35px;
                padding-left: 35px;
                .kjcx {
                    input {
                        box-sizing: border-box;
                        padding-left: 10px;
                        font-size: 14px;
                        width: 225px;
                        height: 38px;
                        margin-left: 15px;
                        border: 1px solid #c0bebe;
                    }
                }
                .fp_time {
                    margin-left: 340px;
                    .shzc_year {
                        width: 92px;
                        height: 38px;
                        margin-left: 35px;
                        border: 1px solid #c0bebe;
                    }
                    .shzc_month,
                    .shzc_day {
                        width: 50px;
                        height: 38px;
                        border: 1px solid #c0bebe;
                    }
                }
            }
            .fp_ss {
                margin-top: 35px;
                padding-left: 35px;
                span {
                    background-color: #2EC2B4;
                    display: block;
                    border-radius: 3px;
                    text-align: center;
                    line-height: 24px;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                    border: 0;
                    width: 90px;
                    height: 24px;
                    line-height: 24px;
                }
            }
        }
        .all_fp {
            margin-top: 10px;
            border: 1px solid #f1f1f1;
            background: #fff;
            width: 100%;
            overflow: hidden;
            .afp_top {
                font-size: 16px;
                height: 40px;
                line-height: 40px;
                padding-left: 25px;
                border-bottom: 1px solid #96E0D9;
                .tm_px {
                    margin-left: 600px;

                }
                .tm_px,
                .mc_px,
                .lb_px {
                    font-size: 12px;
                    font-weight: 400;
                    border: 1px solid #2EC2B4;
                    padding: 2px 6px;
                    border-radius: 7px;
                    margin-right: 20px;cursor: pointer;
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }
            .nosj {
                width: 100%;
                height: 350px;
                img {
                    display: block;
                    margin: 100px auto 0;
                }
            }
            .fp_table {
                .fpsq_zfsj {
                    width: 174px;
                    text-align: center;
                    position: relative;
                    .check_box {
                        position: absolute;
                        left: 20px;
                        top: 32px;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                        img {
                            display: block;
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
                .fpsq_fwmc {
                    width: 180px;
                    text-align: center;
                }
                .fpsq_ddbh {
                    width: 260px;
                    text-align: center;
                }
                .fpsq_sfje {
                    width: 154px;
                    text-align: center;
                }
                .fpsq_kpje {
                    width: 240px;
                    text-align: center;
                }
                thead {
                    font-size: 14px;
                    height: 40px;
                    width: 100%;
                    line-height: 40px;
                    background: #2EC2B4;
                    color: #fff;
                    border-bottom: 2px solid #2EC2B4;
                    tr td {
                        border-bottom: 2px solid #B2B2B2;
                        color: #fff;
                    }
                }
                tbody tr {
                    font-size: 14px;
                    height: 80px;
                    td {
                        border-bottom: 1px solid #E9E9E9;
                        height: 100%;
                        line-height: 80px;
                    }
                }
            }
            .cd_fy {
                text-align: right;
                background: #fff;
                padding-top: 15px;
                padding-bottom: 15px;
                font-size: 14px;
                position: relative;
                .invoice {
                    width: 75px;
                    height: 30px;
                    background-color: @commonColor;
                    display: block;
                    border-radius: 7px;
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    position: relative;
                    left: 50px;
                    top: 20px;
                }
                .fy_btn {
                    position: absolute;
                    left: 30px;
                    top: 15px;
                    input {
                        z-index: 2000;
                        position: absolute;
                        width: 18px;
                        height: 18px;
                        visibility: hidden;
                    }
                    img {
                        width: 18px;
                        height: 18px;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 1999;
                    }
                    a {
                        display: inline-block;
                        width: 60px;
                        height: 22px;
                        background: #2EC2B4;
                        color: #fff;
                        text-align: center;
                        font-size: 12px;
                        line-height: 22px;
                        border-radius: 7px;
                        margin-left: 30px;
                    }
                }
                .page_total {
                    margin-right: 10px;
                }
                .cd_fyzjt {
                    position: relative;
                    width: 26px;
                    display: inline-block;
                    margin-left: 15px;
                    margin-right: 2px;
                    img {
                        position: absolute;
                        top: -20px;
                        left: 0px;
                    }
                    &:hover {
                        opacity: 0.6;
                    }
                }
                .cd_fyyjt {
                    position: relative;
                    width: 26px;
                    display: inline-block;
                    margin-left: 2px;
                    margin-right: 15px;
                    img {
                        position: absolute;
                        top: -20px;
                        left: 0px;
                    }
                }
                .fy_tz {
                    input {
                        background: #F3F3F3;
                        border: 1px solid #E6E6E6;
                        height: 21px;
                        width: 30px;
                        margin-left: 5px;
                        margin-right: 5px;
                        text-align: center;
                    }
                    a {
                        margin-right: 35px;
                        border: 1px solid #E6E6E6;
                        display: inline-block;
                        height: 23px;
                        line-height: 23px;
                        width: 24px;
                        text-align: center;
                        background: #F3F3F3;
                        font-size: 14px;
                        &:hover {
                            opacity: 0.6;
                        }
                    }
                }
            }
        }
    }
</style>


