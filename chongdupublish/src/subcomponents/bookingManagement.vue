<template>
  <!-- 预约管理 -->
  <div class="booking_management">
    <div class="yygl_top">
      <div>预约管理</div>
    </div>
    <div class="yygl_number">
      <span class="yygl_jryy">今日预约人数<span><i>{{topitem.todayNum}}&nbsp;&nbsp;</i></span>人</span>
      <span class="yygl_yyz">预约中的人数<span><i>{{topitem.ingNum}}&nbsp;&nbsp;</i></span>人</span>
      <span class="yygl_yjs">已经接受预约的人数<span><i>{{topitem.accpetNum}}&nbsp;&nbsp;</i></span>人</span>
    </div>
    <div class="yygl_list">
      <div class="fl yygl_bt">预约列表</div>
      <!-- <div class="fr">
            <select class="yygl_xs">
                                  				<option>只显示寄养</option>
                                  				<option>只显示购宠</option>
                                  				<option>只显示服务</option>
                                  			</select>
            <a href="javascript:void(0);" class="yygl_sjpx">按时间排序</a>
            <a href="javascript:void(0);" class="yygl_lxpx">按类型排序</a>
            <a href="javascript:void(0);" class="yygl_pzpx">按品种排序</a>
          </div> -->
    </div>
     <div class='nodata' v-if="isshowNonelist">
        <img src='../../static/img/nosj.png'>
      </div>
    <table cellspacing="0" cellpadding="0" v-if="!isshowNonelist" class="yygl_box">
      <thead>
        <tr>
          <td class="yygl_xh">序号</td>
          <td class="yygl_id">预约人</td>
          <td class="yygl_time">预约时间</td>
          <td class="yygl_yylx">预约类型</td>
          <td class="yygl_cwpz">宠物品种</td>
          <td class="yygl_yyzt">预约状态</td>
          <td class="yygl_yycz">操作</td>
        </tr>
      </thead>     
      <tbody>
        <tr v-for="(item,index) in datalist" :key="index">
          <td class='yygl_xh'>{{index+1}}</td>
          <td class='yygl_id'>{{item.user.nickname}}</td>
          <td class='yygl_time'>{{item.appointime}}</td>
          <td class='yygl_yylx' v-if="item.type == 1">寄养</td>
          <td class='yygl_yylx' v-if="item.type == 2">购宠</td>
          <td class='yygl_yylx' v-if="item.type == 3">服务</td>
          <td class='yygl_cwpz'>{{item.petstype.name}}</td>
          <td class='yygl_yyzt' v-if="item.state == 1">预约成功</td>
          <td class='yygl_yyzt' v-if="item.state == 0">预约中</td>
          <td class='yygl_yyzt' v-if="item.state == 2">预约失败</td>
          <td class='yygl_yycz'>
            <!--item.id-->
            <router-link to="/"><img src='../../static/img/bjxq.png'>编辑详情</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="page_turn">
          <div class='nodata' v-if="isshowNonelist">
            <img src='../../static/img/nosj.png'>
          </div>
          <div class="cd_fy" style="margin-top:5px;" v-if="!isshowNonelist">
            <span class="page_total">共{{pageNum}}条</span><span class="page_fy">{{page}}/{{totalpage}}页</span>
            <a href="javascript:void(0);" class="cd_fyzjt"><img src="../../static/img/zjt.png" @click="(totalpage !== 1)&&((page--)&&(page< 0 ||page == 0) ?page = 1:page) && (type==0?getalllist():getaround())"></a>
            <a href="javascript:void(0);" class="cd_fyyjt"><img src="../../static/img/yjt.png"  @click="(totalpage !== 1)&&((page++)&&(page> 0 || page == totalpage) ?page = totalpage:page) && (type==0?getalllist():getaround())"></a>
            <span class="fy_tz">跳转到
                                  <input type="text" v-model="searchpage">
                                  <a href="javascript:void(0);" class='page_tz' @click="choosepage()">Go</a>
                              </span>
          </div>
        </div> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isshowNonelist: false,
        page: 1, //第一页
        topitem: {}, //人数管理
        datalist: [], //预约列表显示
      }
    },
    created() {
      this.initdata()
    },
    methods: {
      //初始化数据
      initdata() {
        this.$http({
          url: '/chongdu/appointment/list.do',
          method: 'post',
          params: {
            page: this.page
          }
        }).then(res => {
          console.log(res.data)
          if (res.data.code == 0) {
            this.topitem = res.data.item;
            if (res.data.rows == 0) {
              this.isshowNonelist = true;
            } else {
              this.isshowNonelist = false;
              this.datalist = res.data.rows;
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>
<style lang="less">
  @import '../../static/css/common.less';
  .booking_management {
    width: 100%;
    color: #333;
    .yygl_top {
      height: 60px;
      line-height: 60px;
      background: #fff;
      overflow: hidden;
      border: 1px solid #f1f1f1;
      div {
        float: left;
        width: 180px;
        background: #2EC2B4;
        text-align: center;
        color: #fff;
      }
    }
    .yygl_number {
      height: 60px;
      line-height: 60px;
      background: #fff;
      margin-top: 10px;
      overflow: hidden;
      font-size: 14px;
      .yygl_jryy,
      .yygl_yyz,
      .yygl_yjs {
        border-left: 6px solid #2EC2B4;
        padding-left: 18px;
        margin-left: 12px;
        span {
          color: red;
          margin-left: 20px;
        }
      }
      .yygl_yyz {
        border-left: 6px solid #EFABAB;
        margin-left: 80px;
      }
      .yygl_yjs {
        border-left: 6px solid #2EC2B4;
        margin-left: 80px;
      }
    }
    .yygl_list {
      height: 45px;
      line-height: 45px;
      background: #fff;
      margin-top: 5px;
      overflow: hidden;
      border-bottom: 1px solid #2EC2B4;
      .yygl_bt {
        padding-left: 36px;
      }
      .yygl_xs {
        border: 1px solid #2EC2B4;
        font-size: 12px;
        border-radius: 14px;
        color: #2EC2B4;
        outline: none;
        margin-right: 30px;
      }
      .yygl_sjpx,
      .yygl_lxpx,
      .yygl_pzpx {
        font-size: 12px;
        color: #2EC2B4;
        border: 1px solid #2EC2B4;
        padding: 1px 5px;
        border-radius: 7px;
        margin-right: 30px;
      }
    }
    .nodata{
      width:100%;
      height: 400px;
       overflow: hidden;
       background-color: #fff;
      img{
        display: block;
        margin:80px auto 0;
      }
    }
    .yygl_box {
      background: #fff;
      font-size: 14px;
      width:100%;
      tr {
        border-bottom: 1px solid #dcdcdc
      }
      tr td {
        text-align: center;
        height: 60px;
        line-height: 60px;
      }
      .yygl_xh {
        width: 76px;
      }
      .yygl_id {
        width: 154px;
      }
      .yygl_time {
        width: 180px;
      }
      .yygl_time div {
        float: left;
        margin-left: 4px;
        margin-right: 4px;
      }
      .yygl_yylx {
        width: 140px;
      }
      .yygl_cwpz {
        width: 120px;
      }
      .yygl_yyzt {
        width: 160px;
      }
      .yygl_yycz {
        width: 190px;
        position: relative;
        a:hover {
          opacity: 0.6;
        }
        img {
          position: absolute;
          left: 40px;
          top: 20px;
        }
      }
      thead {
        background: #DEDEDE;
      }
      tbody tr:nth-child(even) {
        background: #EDECEC
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


