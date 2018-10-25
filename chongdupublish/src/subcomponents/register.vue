<template>
    <div class="register">
        <img src="../../static/img/photo.png" :style="{height:imgheight+'px'}">
        <div class="register_content">
            <div class="register_title">
                <div class="title_item active">
                    <span>手机号注册</span>
                </div>
            </div>
            <div class="register_body">
                <div class="chongdu_logo">
                    <img src="../../static/img/yhtl.png" alt="">
                </div>
                <div class="form_body">
                    <form action="" class="form_register" @submit.prevent="ischoose&&getsubmit()">
                        <p>
                            <input type="text" placeholder="手机号" v-model="telphone" v-check="{type:'tel',val:telphone}" name="bindAccount">
                            <span @click="isclickcode&&sendphonecode()" class="getcode">{{getcode}}</span>
                        </p>
                        <p>
                            <input type="text" placeholder="动态码" v-model='phonecode' name="value">
                        </p>
                        <p>
                            <input type="text" placeholder="设置密码" v-model="password" name="password">
                        </p>
                        <p>
                            <input type="text" placeholder="确认密码" v-model="againpassword" @blur="samepassword()">
                            <span class="wrong" v-if="wrongpassword">两次密码输入不一致</span>
                        </p>
                        <div class="hava_read">
                            <input type="checkbox" v-model="choosecheck">
                            <!-- <input type="checkbox"> -->
                            <label>
                                       我已阅读并同意"<a href="#"> 用户协议</a>"
                                </label>
                        </div>
                        <div class="register_button">
                            <!-- <em :class="ischoose?'active':''" @click="ischoose&&getsubmit()">注册</em> -->
                            <button type="submit" :class="ischoose?'active':''">注册</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                imgheight: $(document).height(),
                getcode: '获取动态码', //点击获取动态码与倒计时的切换
                isclickcode: true, //是否能点击倒数计时
                //手机提交表单的内容
                telphone: '', //手机号
                phonecode: '', //手机接收到的code
                password: '', //第一次密码
                againpassword: '', //再次输入密码
                wrongpassword: false, //两次密码不一致提示
                timer: null, //定时器
                ischoose: false, //是否点击我已阅读
                choosecheck: false, //是否点击我已阅读的radio          
            }
        },
        created() {
        },
        mounted() {
            window.onresize = () => {
                return (() => {
                    this.imgheight = $(document).height();
                })()
            }
        },
        watch: {
            telphone(val) {
                if (val == "") {
                    this.phonecode = "";
                    this.password = "";
                    this.againpassword = "";
                    this.choosecheck = false;
                }
            },
            ischoose(val) {},
            choosecheck(val) {
                if (this.telphone == "" || this.phonecode == "" || this.password == "" || this.againpassword == "") {
                    this.ischoose = false;
                } else {
                    this.ischoose = false;
                    this.ischoose = val;
                }
            },
            againpassword(val) {
                if (val == "") {
                    this.wrongpassword = false;
                    this.ischoose = false;
                }
            },
            password(val) {
                this.initdata();
                if (val == "") {
                    this.wrongpassword = false;
                    this.againpassword = "";
                    this.ischoose = false;
                }
            }
        },
        methods: {
            //点击提交
            getsubmit() {
                let fomdata = $(".form_register").serialize();
                this.$http({
                    url: 'chongdu/user/register.do',
                    method: 'post',
                    data: fomdata
                }).then(res => {
                    if(res.data.code == 0){
                         localStorage.setItem("token",res.data.token);
                         this.getcode = "获取动态码";
                         this.isclickcode = true;
                         this.ischoose = false;
                         this.choosecheck = false; 
                        this.$router.push({
                            path:'/home'
                        })
                    }
                   
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击发送验证码
            sendphonecode() {
                if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.telphone)) {
                    this.$http({
                        url: "chongdu/user/validatecode.do",
                        method: 'post',
                        params: {
                            bindAccount: this.telphone
                        }
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            let second = 60;
                            this.isclickcode = true;
                            let timer = setInterval(() => {
                                if (second > 0) {
                                    second--;
                                    this.isclickcode = false;
                                    this.getcode = second + '秒';
                                    $(".getcode").css({
                                        'backgroundColor': '#cdcdcd'
                                    })
                                } else {
                                    second = 0;
                                    clearInterval(timer);
                                    this.getcode = "获取动态码";
                                    this.isclickcode = true;
                                    $(".getcode").css({
                                        'backgroundColor': '#2ec2b4'
                                    })
                                    this.ischoose = false;
                                }
                            }, 1000)
                            this.$message({
                                message: '发送成功',
                                type: 'success'
                            })
                        }else if(res.data.code == 1){
                            return false;
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message({
                        message: '手机号码格式有误',
                        type: 'warning'
                    })
                    this.ischoose = false;
                }
            },
            //再次输入密码是否一致
            samepassword() {
                if (this.againpassword !== this.password) {
                    this.wrongpassword = true;
                    this.ischoose = false;
                }
            },
            //判定是否为空,空不能点击
            initdata() {
                if (this.telphone == "" || this.phonecode == "" || this.password == "" || this.againpassword == "") {
                    this.ischoose = false;
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    @import '../../static/css/common.less';
    .register {
        width: 100%;
        img {
            width: 100%;
            height: auto;
        }
        .register_content {
            width: 480px;
            height: 630px;
            position: absolute;
            background-color: rgba(255, 255, 255, 0.9);
            left: 50%;
            top: 95px;
            transform: translateX(-50%);
            border-top: 2px solid @commonColor;
            box-sizing: border-box;
            .register_title {
                width: 100%;
                height: 50px;
                .title_item {
                    width: 100%;
                    float: left;
                    height: 100%;
                    text-align: center;
                    line-height: 50px;
                    font-size: 18px;
                    cursor: pointer;
                    &.active {
                        background-color: @commonColor;
                        color: #fff;
                    }
                }
            }
            .register_body {
                width: 100%;
                height: 613px;
                padding: 0 40px;
                box-sizing: border-box;
                .chongdu_logo {
                    width: 100%;
                    padding: 20px 0;
                    img {
                        display: block;
                        margin: 0 auto;
                        height: 60px;
                        width: 140px;
                    }
                }
                .form_body {
                    width: 100%;
                    height: 513px;
                    form {
                        p {
                            width: 100%;
                            height: 50px;
                            display: block;
                            border-radius: 5px;
                            border: 1px solid #b8b6b4;
                            box-sizing: border-box;
                            padding-left: 1px;
                            margin-bottom: 30px;
                            position: relative;
                            .wrong {
                                width: 200px;
                                color: red;
                                height: 20px;
                                line-height: 20px;
                                background-color: rgba(255, 255, 255, 0);
                                text-align: left;
                                position: absolute;
                                top: -13px;
                                left: 0;
                                font-size: 12px;
                            }
                            span {
                                display: block;
                                width: 115px;
                                height: 34px;
                                position: absolute;
                                right: 10px;
                                top: 50%;
                                transform: translateY(-50%);
                                text-align: center;
                                line-height: 34px;
                                background-color: @commonColor;
                                color: #fff;
                                font-size: 14px;
                                border-radius: 4px;
                                cursor: pointer;
                                &.active {
                                    background-color: #dcd8d7;
                                    color: #b9b7b7;
                                }
                            }
                            input {
                                width: 100%;
                                background-color: rgba(255, 255, 255, 0) !important;
                                height: 48px;
                                box-shadow: none !important;
                                border: 0 !important;
                                box-shadow: none !important;
                                -webkit-box-shadow: none !important;
                                padding-left: 10px;
                                font-size: 16px;
                                box-sizing: border-box;
                            }
                            &:nth-of-type(1) {
                                input {
                                    width: 270px;
                                }
                            }
                        }
                        .hava_read {
                            width: 100%;
                            height: 45px;
                            line-height: 45px;
                            box-sizing: border-box;
                            padding-left: 100px;
                            input {
                                width: 15px;
                                height: 15px;
                                margin-right: 12px;
                            }
                            label {
                                font-size: 12px;
                                a {
                                    color: #3e61de;
                                }
                            }
                        }
                        .register_button {
                            width: 100%;
                            height: 52px;
                            border-radius: 5px;
                            cursor: pointer;
                            em,
                            button {
                                width: 100%;
                                height: 100%;
                                display: block;
                                background-color: #b8b6b4;
                                text-align: center;
                                font-size: 22px;
                                letter-spacing: 10px;
                                line-height: 52px;
                                color: #fff;
                                cursor: pointer;
                                &.active {
                                    background-color: @commonColor;
                                }
                            }
                            button {
                                border: 0;
                                outline: none;
                            }
                            &:hover {
                                opacity: 0.6;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


