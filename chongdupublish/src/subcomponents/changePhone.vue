<template>
    <div class="changephone">
        <div class='bind_fr'>
            <div class="bind_top">
                <div class="bind_process">
                    <span :class="step == 1?'bind_xz':''">1、&nbsp;{{code=='phone'?'旧手机号解绑':'旧邮箱解绑'}}&nbsp;</span>———<span :class="step == 2?'bind_xz':''">&nbsp;&nbsp;2、&nbsp;解绑成功&nbsp;</span>———<span :class="step == 3?'bind_xz':''">&nbsp;&nbsp;3、&nbsp;{{code=='phone'?'新手机绑定':'新邮箱绑定'}}&nbsp;</span>———
                    <span :class="step == 4?'bind_xz':''">&nbsp;&nbsp;4、&nbsp;绑定成功</span>
                </div>
            </div>
            <div class="bind_main">
                <div class="step1" v-if="step == 1">
                    <div class="bind_oldinfo" v-if="code == 'phone'">原手机号码
                        <input type="text" disabled v-model="paramcode">
                    </div>
                    <div class="bind_yzm" v-if="code == 'phone'">验证码
                        <input type="text" maxlength="6" v-model.trim="sendphonecode">
                        <span class="push_yzm1" @click="cansendphonecode&&unbindphonecode(paramcode)">{{sendcodetext}}</span>
                    </div>
                    <div class="bind_oldinfo" v-if="code == 'email'">原邮箱号
                        <input type="text" disabled v-model="paramcode">
                    </div>
                    <div class="bind_yzm" v-if="code == 'email'">验证码
                        <input type="text" maxlength="6" v-model.trim="unbindemailcode">
                        <span class="push_yzm3" @click="cansendemailcode&&senunbindemailcode()">{{bindnewemailtext}}</span>
                    </div>
                </div>
                <div class="step2" v-if="step == 2">
                    <img src="../../static/img/bind_yes.png">
                    <p>解绑成功</p>
                </div>
                <div class="step3" v-if="step == 3">
                    <div class="bind_oldinfo" v-if="code == 'phone'">新手机号码
                        <input type="text" v-model.trim="newphone">
                    </div>
                    <div class="bind_yzm" v-if="code == 'phone'">验证码
                        <input type="text" name="yzm" maxlength="6" v-model="newphonecode">
                        <span class="push_yzm2" @click="canclickbindphone&&rebindphone()">{{bindnewphonetext}}</span>
                    </div>
                    <div class="bind_oldinfo" v-if="code == 'email'">新邮箱号
                        <input type="text" v-model.trim="newbindemail">
                    </div>
                    <div class="bind_yzm" v-if="code == 'email'">验证码
                        <input type="text" name="yzm" maxlength="6" v-model.trim="rebindemailcode">
                        <span class="push_yzm4" @click="isclickrebindemail&&clickrebindemail()">{{senemailcontent}}</span>
                    </div>
                </div>
                <div class="step2" v-if="step == 4">
                    <img src="../../static/img/bind_yes.png">
                    <p>绑定成功</p>
                </div>
                <div class="bind_btn">
                    <span @click="code=='phone'?unbindphonebutton():clickunbindemail()" v-if="step == 1">解除绑定</span>
                    <span @click="nextclick()" v-if="step == 2">下一步</span>
                    <span @click="code=='phone'?confirmbindnewphone():confirmbindemail()" v-if="step == 3">绑定</span>
                    <span @click="finishbutton()" v-if="step == 4">完成</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //手机更换流程参数
                sendphonecode: "", //手机解绑的code
                sendcodetext: '发送验证码', //显示发送验证码的倒计时
                cansendphonecode: true, //可以点击发送验证码
                newphone: '', //绑定的新号码
                newphonecode: '', //绑定新手机的code
                bindnewphonetext: '发送验证码', //显示重新绑定的倒计时效果
                canclickbindphone: true, //能都点击绑定新手机号的发送验证码页面
                //邮箱更换流程参数
                unbindemailcode: '', //解绑邮箱的code
                cansendemailcode: true, //是否能点击发送验证码
                bindnewemailtext: '发送验证码', //显示重新绑定的倒计时效果

                newbindemail:'',//新绑定的邮箱号码
                rebindemailcode:'', //重新绑定的code
                isclickrebindemail:true, //是否能点击发送验证码
                senemailcontent:"发送验证码",////显示重新绑定的倒计时效果
                second:60, // 倒计时的时间
            }
        },
        computed: {
            code: {
                get() {
                    return this.$route.query.code; //返回的数据,判定是否是手机还是邮箱   
                }
            },
            step: {
                get() {
                    return this.$route.query.step; // 返回的数据判定是第几步  
                }
            },
            paramcode: {
                get() {
                    return this.$route.query.param; //上一页传过来的参数
                }
            }
        },
        created() {},
        methods: {
            //---------绑定邮箱部分-----------
            //点击确认绑定邮箱
            confirmbindemail(){
               if(this.newbindemail !== "" && this.rebindemailcode !== ""){
                     this.$http({
                       url:"chongdu/user/updateUserInfoByMail.do",
                       method:'post',
                       params:{
                           mail:this.newbindemail,
                           value:this.rebindemailcode,
                           subType:2,
                       }
                   }).then(res=>{
                       console.log(res.data);
                       if(res.data.code == 0){
                            this.$router.push({
                                path: '/myInfo/changePhone',
                                query: {
                                    step: 4,
                                    code: this.code
                                }
                            })


                       }
                   }).catch(err=>{
                       console.log(err)
                   })
               }else{
                   this.$message({
                       message:'输入不能为空',
                       type:'warning'
                   })
               }
            },
            //点击重新绑定发送的code
            clickrebindemail(){
                    if(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.newbindemail)){
                         this.$http({
                        url:"/chongdu/user/getCodeByMail.do",
                        method:'post',
                        params:{
                            mail:this.newbindemail,
                            subType:2,
                        }
                    }).then(res=>{
                        console.log(res.data);
                        if(res.data.code == 0){
                               this.isclickrebindemail = false;
                                // let second = 60;
                                let timer = setInterval(()=>{
                                    if(this.second>0){
                                        this.second--;
                                        this.senemailcontent = this.second+'秒';
                                        $(".push_yzm4").css({'backgroundColor':"#cdcdcd"});
                                    }else{
                                        this.second= 0;
                                        this.senemailcontent = "发送验证码";
                                        clearInterval(timer);
                                        $(".push_yzm4").css({'backgroundColor':"#3ab2a7"});
                                        this.isclickrebindemail = true;
                                    }
                                },1000)
                            this.$message({
                                message:'发送成功',
                                type:'success'
                            })
                        }
                    }).catch(err=>{
                        console.log(err)
                    })




                }else{
                     this.$message({
                        message:'邮箱格式错误',
                        type:'warning'
                    })
                }
            },
           

            //点击解绑email
            clickunbindemail(){
               if(this.unbindemailcode !== ""){
                 this.$http({
                     url:'/chongdu/user/updateUserInfoByMail.do',
                     method:'post',
                     params:{
                         mail:this.paramcode,
                         value:this.unbindemailcode,
                         subType:1
                     }
                 }).then(res=>{
                     console.log(res.data);
                     if(res.data.code == 0){
                          this.$router.push({
                                path: '/myInfo/changePhone',
                                query: {
                                    step: 2,
                                    code: this.code
                                }
                         })
                     }
                 }).catch(err=>{
                     console.log(err)
                 })
               }else{
                   this.$message({
                       message:'请输入验证码',
                       type:'warning'
                   })
               }
            },
            //发送解绑验证码
            senunbindemailcode() {  
                this.$http({
                    url:'chongdu/user/getCodeByMail.do',
                    method:'post',
                    params:{
                        mail:this.paramcode,
                        subType:1
                    }
                }).then(res=>{
                    if(res.data.code == 0){
                         this.cansendemailcode = false;
                 let second = 60;
                let timer = setInterval(() => {
                    if (this.second > 0) {
                        this.second--;
                        this.bindnewemailtext = this.second + '秒';
                        $(".push_yzm3").css({
                            'backgroundColor': '#cdcdcd'
                        })
                    } else {
                        this.second = 0;
                        this.cansendemailcode = true;
                        this.bindnewemailtext = "发送验证码";
                        $(".push_yzm3").css({
                            'backgroundColor': '#3AB2A7'
                        });
                        clearInterval(timer);
                    }
                }, 1000);
                        this.$message({
                            message:'发送成功',
                            type:'success'
                        })
                    }
                })        
            },
            //---------绑定手机部分-----------
            //确定绑定新手机号
            confirmbindnewphone(code) {
                if (this.newphone !== "" && this.newphonecode !== "") {
                    this.$http({
                        url: 'chongdu/user/updateUserInfoByPhone.do',
                        method: 'post',
                        params: {
                            phone: this.newphone,
                            value: this.newphonecode,
                            subType: 2,
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.code == 0) {
                            this.$router.push({
                                path: '/myInfo/changePhone',
                                query: {
                                    step: 4,
                                    code: this.code
                                }
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message({
                        message: '不能为空',
                        type: 'warning',
                    })
                }
            },
            //点击重新绑定发送code
            rebindphone() {
                if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.newphone)) {
                    this.$http({
                        url: 'chongdu/user/getCodeByPhone.do',
                        method: "post",
                        params: {
                            phone: this.newphone,
                            subType: 1
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.code == 0) {
                            // let second = 60;
                            this.canclickbindphone = false;
                            let timer = setInterval(() => {
                                if (this.second > 0) {
                                    this.second--;
                                    this.bindnewphonetext = this.second + '秒';
                                    $(".push_yzm2").css({
                                        'backgroundColor': '#cdcdcd'
                                    })
                                } else {
                                    this.second = 0;
                                    this.canclickbindphone = true;
                                    this.bindnewphonetext = "发送验证码";
                                    $(".push_yzm2").css({
                                        'backgroundColor': '#3AB2A7'
                                    });
                                    clearInterval(timer);
                                }
                            }, 1000);
                            this.$message({
                                message: "发送成功",
                                type: 'success',
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message({
                        message: '手机号码格式有误',
                        type: 'warning'
                    })
                }
            },
            //点击解绑发送的code
            unbindphonecode(paramcode) {
                this.$http({
                    url: 'chongdu/user/getCodeByPhone.do',
                    method: "post",
                    params: {
                        phone: paramcode,
                        subType: 1
                    }
                }).then(res => {
                    console.log(res.data);
                    if (res.data.code == 0) {
                        // let second = 60;
                        this.cansendphonecode = false;
                        let timer = setInterval(() => {
                            if (this.second > 0) {
                                this.second--;
                                this.sendcodetext = this.second + '秒';
                                $(".push_yzm1").css({
                                    backgroundColor: '#cdcdcd'
                                })
                            } else {
                                this.second = 0;
                                this.cansendphonecode = true;
                                this.sendphonecode = "";
                                this.sendcodetext = '发送验证码';
                                $(".push_yzm1").css({
                                    backgroundColor: '#3AB2A7'
                                });
                                clearInterval(timer);
                            }
                        }, 1000);
                        this.$message({
                            message: "发送成功",
                            type: 'success'
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击解除绑定手机号
            unbindphonebutton() {
                if (this.sendphonecode !== "") {
                    this.$http({
                        url: 'chongdu/user/updateUserInfoByPhone.do',
                        method: 'post',
                        params: {
                            phone: this.paramcode,
                            value: this.sendphonecode,
                            subType: 1,
                        }
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.$router.push({
                                path: '/myInfo/changePhone',
                                query: {
                                    step: 2,
                                    code: this.code
                                }
                            })
                        }
                    })
                } else {
                    this.$message({
                        message: '请输入验证码',
                        type: 'warning',
                    })
                }
            },
            //点击下一步
            nextclick(code) {
                console.log(this.step)
                this.$router.push({
                    path: '/myInfo/changePhone',
                    query: {
                        step: 3,
                        code: this.code
                    }
                })
            },
            //点击完成
            finishbutton(code) {
                this.$router.push({
                    path: '/myInfo'
                })
            }
        }
    }
</script>
<style lang='less'>
    @import '../../static/css/common.less';
    .changephone {
        width: 100%;
        color: #333;
        .bind_fr {
            background: #fff;
            .bind_top {
                padding-top: 30px;
                padding-left: 50px;
                padding-right: 50px;
                .bind_process {
                    border-bottom: 1px solid #A0A0A0;
                    text-align: center;
                    padding-bottom: 20px;
                    .bind_xz {
                        color: #3BC1B4;
                    }
                }
            }
            .bind_main {
                height: 400px;
                .step1,
                .step3 {
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                    .bind_oldinfo {
                        margin-top: 60px;
                        margin-left: 246px;
                        input {
                            height: 34px;
                            width: 350px;
                            margin-left: 40px;
                            text-indent: 10px;
                            border: 1px solid #c0bebe;
                        }
                    }
                    .bind_yzm {
                        margin-top: 40px;
                        margin-left: 278px;
                        input {
                            height: 34px;
                            width: 200px;
                            margin-left: 40px;
                            text-indent: 10px;
                            border: 1px solid #c0bebe;
                        }
                        .push_yzm1,
                        .push_yzm2,
                        .push_yzm4,
                        .push_yzm3 {
                            color: #fff;
                            background: #3AB2A7;
                            display: inline-block;
                            width: 120px;
                            height: 35px;
                            line-height: 35px;
                            text-align: center;
                            border-radius: 7px;
                            margin-left: 50px;
                            border: none;
                            cursor: pointer;
                            outline: none;
                            &:hover {
                                opacity: 0.6;
                            }
                        }
                    }
                }
                .step2 {
                    width: 100%;
                    height: 300px;
                    overflow: hidden;
                    img {
                        display: block;
                        margin: 50px auto 0;
                    }
                    p {
                        height: 60px;
                        text-align: center;
                        line-height: 60px;
                        color: #333;
                    }
                }
                .bind_btn {
                    margin-top: 60px;
                    text-align: right;
                    margin-right: 100px;
                    span {
                        color: #fff;
                        background: #3AB2A7;
                        padding: 5px 15px;
                        border-radius: 7px;
                        cursor: pointer;
                        &:hover {
                            opacity: 0.6;
                        }
                        &.canclick{
                            background-color: #cdcdcd;
                        }
                    }
                }
            }
        }
    }
</style>

