<template>
  <!-- 已购订单 -->
  <div class="ygdd">
    <div class="ygdd_h">已购订单</div>
    <div class='nodata' v-if="isshowNonelist"><img src='../../static/img/nosj.png'></div>
    <div class="havedata" v-if="!isshowNonelist">
      <div class='dingdan_box' v-for="(item,index) in orderList" :key="index">
        <div class='dingdan_top'>
          <div class="checkimg_order"><em>订单编号:</em>{{item.sn}}</div>
          <a class='ljx_btn' href='javascript:void(0);' @click="delitem(item)">
            <img src='../../static/img/ljx.png'>
          </a>
        </div>
        <div class="dingdan_body">
          <div class="dingdan_list">
            <div class="dingdan_list_title">
              <el-col :span="5">订单名称</el-col>
              <el-col :span="5">数量</el-col>
              <el-col :span="5">购买时间</el-col>
              <el-col :span="5">到期时间</el-col>
              <el-col :span="4">价格</el-col>
            </div>
            <!-- 后期可能会有duo额订单g -->
            <div class="dingdan_list_body">
              <el-col :span="5">
                <div class="grid-content bg-purple">
                  <img src="../../static/img/dd_zdb.png" alt="">
                  <span>{{item.ordername}}</span>
                </div>
              </el-col>
              <el-col :span="5">1</el-col>
              <el-col :span="5">{{item.paymenttime | datesplite}}</el-col>
              <el-col :span="5">{{item.platformtype == 1 || item.platformtype == 4 ? item.residue+'天': item.residue+'次'}}</el-col>
              <el-col :span="4">{{item.realmoney}}</el-col>
            </div>
          </div>
          <div class="dingdan_buy_again" :style="{height:byeheight+'px'}">
            <span @click="clickbyeagain(item)">再次购买</span>
          </div>
        </div>
      </div>
      <div class="page_turn" v-if="!isshowNonelist">
        <div class="cd_fy" style="margin-top:5px;">
          <span class="page_total">共{{listtotal}}条</span><span class="page_fy">{{pageNum}}/{{totalpage}}页</span>
          <a href="javascript:void(0);" class="cd_fyzjt"><img src="../../static/img/zjt.png" @click="reducepage()"></a>
          <a href="javascript:void(0);" class="cd_fyyjt"><img src="../../static/img/yjt.png" @click="pluspage()"></a>
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
  export default {
    data() {
      return {
        byeheight: '', //获取再次购买居中
        pageNum: 1, //分页时的当前页码当前页码
        orderList: [], //已经购买的订单
        listtotal: '', //总条数
        currentpage: 1, //当前页数
        searchpage: "", //搜索页面
        isshowNonelist: false, //显示没有数据的图片
      }
    },
    watch: {
      pageNum(val, oldval) {
        this.initbuyorder();
      }
    },
    computed: {
      totalpage: {
        get() {
          return Math.ceil(this.listtotal / 6)
        }
      }
    },
    created() {
      this.initbuyorder();
    },
    updated() {
      this.initbyeagain();
    },
    methods: {
      //点击再次购买
      clickbyeagain(item) {
        console.log(item);
          console.log("type---------" + item.platformtype) //2的时候是优选
          console.log("relateid----------" + item.relateid)
           console.log("relatetype------------" + item.relatetype)
          console.log("maxmoney------------" + item.realmoney)
          console.log("maxclick-------------" + this.maxclick)
          console.log("residue---------" + parseInt(this.maxmoney / this.maxclick))
           console.log("platformgoodsid-----------" + this.platformgoodsid)
          console.log("timestep------------" + this.timestep)
          let jsonOne = {}
          if(item.platformtype == 2){
            jsonOne={
              type:item.platformtype,
              relateid:item.relateid,
              relatetype:item.relatetype,
              realmoney:item.realmoney,
              oneprice:item.oneprice,
              residue:item.residue,
            }
          }

        // this.$http({
        //   url: '/chongdu/order/payOrder.do',
        //   method: 'post',
        //   params: {
        //     type: this.extactive,
        //     relateid: this.$route.query.id,
        //     relatetype: this.$route.query.relatetype,
        //     realmoney: this.maxmoney,
        //     oneprice: this.maxclick,
        //     residue: parseInt(this.maxmoney / this.maxclick), //不能小于1
        //     timestep: this.timestep
        //   }
        // }).then(res => {
        //   console.log(res.data)
        // }).catch(err => {
        //   console.log(err)
        // })
      },
      //初始化已购订单
      initbuyorder() {
        this.$http({
          url: '/chongdu/order/list.do',
          method: 'post',
          params: {
            s: 1,
            page: this.pageNum,
            rows: 6
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code == 0) {
            if (res.data.rows == 0) {
              this.isshowNonelist = true;
            } else {
              this.isshowNonelist = false;
              this.listtotal = res.data.total;
              this.orderList = res.data.rows;
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //初始化再次购买居中的样式
      initbyeagain() {
        this.byeheight = $(".dingdan_body").height();
      },
      //点击删除
      delitem(item) {
        console.log(item);
        this.$http({
          url: '/chongdu/order/delete.do',
          method: 'post',
          params: {
            ids: item.id
          }
        }).then(res => {
          console.log(res.data);
          if (res.data.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.initbuyorder();
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //点击上一页
      reducepage() {
        this.pageNum--;
        if (this.pageNum < 1) {
          this.pageNum = 1
        }
      },
      //点击下一页
      pluspage() {
        this.pageNum++;
        if (this.pageNum > this.totalpage) {
          this.pageNum = this.totalpage
        }
      },
      //点击跳转到某一页
      choosepage() {
        this.pageNum = this.searchpage;
        this.initbuyorder();
      }
    },
  }
</script>
<style lang="less">
  @import '../../static/css/common.less';
  .ygdd {
    color: #333;
    border: 1px solid #f1f1f1;
    background: #fff;
    width: 100%;
    .nodata {
      width: 100%;
      height: 300px;
      img {
        display: block;
        margin: 50px auto 0;
      }
    }
    .ygdd_h {
      font-size: 16px;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
      padding-left: 25px;
      border-bottom: 1px solid #96E0D9;
    }
    .dingdan_box {
      border-bottom: 1px solid #ECEDE6;
      .dingdan_top {
        font-size: 14px;
        height: 60px;
        line-height: 60px;
        padding-left: 25px;
        background: url("/static/img/background.png") no-repeat center;
        background-size: 100% 60px;
        .checkimg {
          cursor: pointer;
          float: left;
          margin-top: 5px;
          margin-right: 20px;
          img {
            width: 20px;
            height: 20px;
          }
        }
        .checkimg_order {
          float: left;
          color: #fff;
        }
        .ljx_btn {
          float: right;
          margin-right: 30px;
          margin-top: 5px;
          img {
            width: 20px;
            height: 20px;
          }
          &:hover {
            opacity: 0.6;
          }
        }
      }
      .dingdan_body {
        width: 100%;
         display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
        .dingdan_list {
          flex: 1;
          height: 100%;
          border-right: 1px solid #ecede6;
          .dingdan_list_title,
          .dingdan_list_body {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #ecede6;
            .el-col-5,
            .el-col-4 {
              height: 60px;
              line-height: 60px;
              text-align: center;
              .bg-purple {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                  width: 22px;
                  height: 22px;
                  position: absolute;
                  left: 20px;
                  top: 50%;
                  transform: translateY(-50%);
                  cursor: pointer;
                }
              }
            }
          }
        }
        .dingdan_buy_again {
          width: 168px;
          height: 100%;
          position: relative;
          line-height: 100%;
          span {
            display: inline-block;
            width: 70px;
            height: 25px;
            background-color: @commonColor;
            text-align: center;
            line-height: 25px;
            color: #fff;
            border-radius: 7px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            &:hover {
              opacity: 0.6;
            }
          }
        }
      }
    }
    .page_turn {
      width: 100%;
      .nodata {
        text-align: center;
        padding-top: 100px;
        padding-bottom: 200px;
        background: #fff;
        height: 445px;
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


