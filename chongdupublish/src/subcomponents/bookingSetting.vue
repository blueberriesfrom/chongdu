<template>
  <div class="booking_setting">
    <div class="yygl_top">
      <div>预约设置</div>
    </div>
    <div class="yysz_info">
      <form enctype="multipart/form-data" id="yysz_form">
        <div class="yysz_btn">是否开启
          <el-switch v-model="witchvalue" :width="50" active-color="#2ec2b4" @change="choosereadonly()">
          </el-switch>
        </div>
        <div class="yysz_kssj">接受预约开始时间
          <!-- <input type="text" id="timedd" name="timebegin"> -->
          <el-time-picker v-model="starttime" placeholder="选择开始时间">
          </el-time-picker>
        </div>
        <div class="yysz_jssj">接受预约结束时间
          <!-- <input type="text" id="timenn" name="timeend" readonly> -->
          <el-time-picker v-model="endtime"  placeholder="选择结束时间"  @change="changeendingtime()">
          </el-time-picker>
        </div>
        <div class="yysz_sjcd">接受预约时间段长度
          <select class="yycd" v-model="length">
                  <option v-for="(item,index) in timelist" :key="index" :value="item.time">{{item.time}}</option>
           </select>
        </div>
        <div class="yysz_yyrs">时间段可预约人数
          <input type="text" v-model="number">&nbsp;&nbsp;人
        </div>
        <div class="yysz_save">
          <a href="javascript:void(0);" @click="clicksubmit()">保存</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        witchvalue: true,
        starttime: '', //开始时间
        endtime: '', //结束时间
        length: '', //时间长度
        number: "", //人数
        isset: 1, //1,开,2,关
        timelist: [],
        chooseissset: -1, //1,是增加,2,是编辑    
        setid: "",
        betweentime:'',  //时间差
      }
    },
    created() {
      this.initlist();
    },
    watch: {
    
    },
    methods: {
      //监听结束时间
      changeendingtime(){
        if(this.starttime.getTime() > this.endtime.getTime()){
          this.$message({
            message:'结束时间不得晚于开始时间',
            type:'warning'
          })
        }else{
           if(Math.floor((this.endtime.getTime() - this.starttime.getTime())/(1000*3600))<1){
             this.$message({
               message:'时间差不能小于1小时',
               type:'warning'
             })
           }else{
             this.betweentime = Math.floor((this.endtime.getTime() - this.starttime.getTime())/(1000*3600));
             console.log(this.betweentime);
             this.inittimelong();
           }
        }
       
      },
      //初始化列表,看看有无数据
      initlist() {
        this.$http({
          url: '/chongdu/appointmentset/list.do',
          method: 'post'
        }).then(res => {
          console.log(res.data)
          if (res.data.code == 0) {
            if (res.data.rows.length == 0) {
              //调用增加的接口
              this.chooseissset = 1;
              this.witchvalue = true;
            } else if (res.data.rows.length !== 0) {
              //调用编辑的接口
              this.chooseissset = 2;
              if (res.data.rows[0].isset == 1) {
                this.witchvalue = true;
                this.setid = res.data.rows[0].id;
              } else {
                this.witchvalue = false;
              }
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 初始化时间
      inittimelong() {
        for (var b = 1, i = 0.5; i < this.betweentime; i = i + 0.5, b++) {
          this.timelist.push({
            value: 'b',
            time: (i + 0.5) + '小时'
          })
        }
      },
      //如果开,就能出入,如果关,就不能输入
      choosereadonly() {
        if (this.witchvalue == true) {
          this.isset = 1
        } else if (this.witchvalue == false) {
          this.isset = 2
        }
      },
      //点击提交
      clicksubmit() {
        if (this.chooseissset == 1) {
          this.$http({
            url: '/chongdu/appointmentset/add.do',
            method: 'post',
            params: {
              isset: this.isset,
              timebegin: this.starttime,
              timeend: this.endtime,
              length: this.length,
              number: this.number
            }
          }).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: '预约设置添加成功',
                type: 'success'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else if (this.chooseissset == 2) {
          //编辑的接口
          this.$http({
            url: '/chongdu/appointmentset/edit.do',
            method: 'post',
            params: {
              isset: this.isset,
              timebegin: this.starttime,
              timeend: this.endtime,
              length: this.length,
              number: this.number,
              id: this.setid,
            }
          }).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: '修改成功',
                type: "success"
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
</script>
<style lang="less">
  .el-time-panel.el-popper {
    left: 730px !important;
  }
  .booking_setting {
    width: 100%;
    color: #333;
    input {
      outline: none;
      border: 1px solid #c1bfbf !important;
      border-radius: 3px !important;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
      -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
    }
    input:focus {
      border: 1px solid #3ab2a7 !important;
    }
    select {
      outline: none;
      border: 1px solid #c1bfbf !important;
      border-radius: 3px !important;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
      -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
    }
    select:focus {
      border: 1px solid #3ab2a7 !important;
    }
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
    .yysz_info {
      background: #fff;
      padding-top: 60px;
      padding-bottom: 10px;
      .yysz_btn {
        margin-left: 247px;
        position: relative;
        margin-bottom: 40px;
        .el-switch {
          margin-left: 43px;
          height: 30px;
          line-height: 30px; // .el-switch__core{
          //   height: 30px;
          //   border-radius: 15px;
          //   &:after{
          //     width:26px;
          //     height:26px;
          //     margin-left: -58px;
          //   }
          // }
        } // a {
        //   position: absolute;
        //   top: -8.5px;
        //   left: 109px;
        // }
        // .btn_close,
        // .btn_start {
        //   border: 1px solid #3AB2A7;
        //   padding: 5px 21px;
        //   cursor: pointer;
        //   box-sizing: border-box;
        // }
        // .btn_start {
        //   color: #fff;
        //   background: #3AB2A7;
        // }
        // .btn_close {
        //   margin-left: 45px;
        //   color: #3AB2A7;
        // }
      }
      .yysz_kssj,
      .yysz_jssj {
        margin-left: 190px;
        margin-bottom: 40px;
        input {
          width: 220px;
          height: 34px;
          margin-left: 45px;
          text-indent: 10px;
          border: 1px solid #c0bebe;
        }
        .el-input__prefix {
          left: 55px;
          top: -3px;
        }
      }
      .yysz_sjcd {
        margin-left: 174px;
        margin-bottom: 40px;
        select {
          margin-left: 46px;
          width: 224px;
          height: 38px;
          border: 1px solid #c0bebe;
        }
      }
      .yysz_yyrs {
        margin-left: 190px;
        margin-bottom: 40px;
        input {
          width: 195px;
          height: 34px;
          margin-left: 45px;
          text-indent: 10px;
          border: 1px solid #c0bebe;
        }
      }
      .yysz_save {
        text-align: right;
        margin-right: 50px;
        a {
          color: #fff;
          background: #3AB2A7;
          font-size: 14px;
          padding: 5px 35px;
          border-radius: 5px;
          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }
</style>


