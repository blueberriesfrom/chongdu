<template>
    <div class="login">
        <div class="container">
            <div class="top_bar">
                <img src="../../static/img/cdlogox.png">
            </div>
        </div>
        <div class="subject">
            <div class="site_main">
                <div class="login_image">
                    <img src="../../static/img/dog_gg.png">
                </div>
                <div class="land_win">
                    <ul class="login_tap">
                        <li class="zhdl tap_active">账号登录</li>
                    </ul>
                    <div class="login_zh">
                        <div class="login_error" v-if="isshowerror">账号或密码输入错误,请重新输入</div>
                        <form name="formLogin" id="login_form" method="post" onsubmit="return checkForm();" autocomplete="off">
                            <div class="login_item">
                                <i class="pic_dl"></i>
                                <input type="text" name="name" autocomplete="off" v-model="username">
                            </div>
                            <div class="login_item">
                                <i class="pic_pw"></i>
                                <input type="password" name="password" AUTOCOMPLETE="off" v-model="password">
                            </div>
                            <div class="forget">
                                <span class="fl" style="margin-top:5px;">其他方式登录:</span>
                                <a class="fl" style="margin-right:10px;margin-left:10px;" href="https://www.chongdu.com/chongdu/wxLogin/QQhandleRequest.do"><img src="../../static/img/qq2.png"></a>
                                <!-- <a class="fl" href="javascript:void(0);" @click="loginwechat()"> <img src="../../static/img/wx2.png"> </a> -->
                                <a class="fl" href="https://www.chongdu.com/chongdu/wxLogin/weixin.do"><img src="../../static/img/wx2.png"></a>
                                <router-link class="fr" style="margin-top:5px;text-decoration:underline;" to="/forget/password">忘记密码</router-link>
                            </div>
                            <div class="loginbtn">
                                <input type="submit" class="login_btn" value="登 录"  @click.prevent="checkFrom()"/>
                            </div>
                            <div class="entries">
                                <router-link to="/register" class="entries_btn">注册</router-link>
                            </div>
                        </form>
                    </div>
                    <div class="login_sm">
                        <img src="../../static/img/sm.png" />
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="site_footer">
                    <div><a href="javascript:void(0);">关于我们&nbsp;&nbsp;法律声明及隐私权政策</a></div>
                    <div><a href="javascript:void(0);">网络文化经营许可证:&nbsp;&nbsp;文网文[2018]0008号</a></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            return {
                username:null,
                password:null,
                isshowerror:false, //是否显示错误信息
            }
        },
        created(){      
        },
        methods: {
            //微信登录
            loginwechat(){
                this.$http({
                    url:'/chongdu/wxLogin/weixin.do',
                    method:'get',
                }).then(res=>{
                    console.log(res.data)
                }).catch(err=>{
                    console.log(err)
                })
            },
            checkFrom(){
                this.$http({
                    method:'post',
                    url:'/chongdu/user.do',
                    params:{
                        username:this.username,
                        password:this.password,
                        isDynamic:1,
                    }
                }).then(res=>{
                    console.log(res.data)
                    if(res.data.code == 0){
                        localStorage.setItem("username",this.username);
                        this.$store.state.token = res.data.rows.token;
                        localStorage.setItem("token",res.data.rows.token);
                        this.$router.push({
                            path:'/home'
                        })
                    }else if(res.data.code == 1){
                        this.isshowerror = true;
                    }else if(res.data.code == 2){
                        this.isshowerror = true;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .login {
        width: 100%;
        overflow: hidden;
        .top_bar {
            width: 100%;
            height: 80px;
            img {
                display: block;
                width: 234px;
                height: 72px;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
                -webkit-transform:translateY(-50%);
                -moz-transform:translateY(-50%);
                 -ms-transform:translateY(-50%);
                 -o-transform:translateY(-50%);
                left: 0;
            }
        }
        .subject {
            width: 100%;
            padding-top: 100px;
            box-sizing: border-box;
            background-color: @commonColor;
            min-height: 810px;
            .site_main {
                margin: 0 auto;
                height: 100%;
                width: 1200px;
                height: 600px;
                position: relative;
                .login_image {
                    position: absolute;
                    top: 2%;
                    left: 35px;
                }
                .land_win {
                    z-index: 999;
                    position: absolute;
                    right: 5%;
                    top: 15%;
                    width: 330px;
                    height: 400px;
                    background: #F4FCFB;
                    overflow: hidden;
                    border-radius: 7px;
                    .login_tap {
                        li {
                            height: 60px;
                            float: left;
                            width: 100%;
                            font-size: 16px;
                            text-align: center;
                            line-height: 60px;
                            background-color: #1B998B;
                            color: #fff;
                            font-size: 18px;
                            font-weight: 600;
                            &:hover {
                                cursor: pointer;
                            }
                        }
                    }
                    .login_zh {
                        width: 270px;
                        height: 330px;
                        clear: both;
                        margin: 0 auto;
                        overflow: hidden;
                        position: relative;
                        .login_error {
                            border: 1px solid #F4241E;
                            background: #FEF5DF url(../../static/img/error.png) no-repeat 10px 5px;
                            font-size: 12px;
                            line-height: 20px;
                            height: 20px;
                            margin-bottom: -20px;
                            width: 240px;
                            text-align: center;
                            position: absolute;
                            left: 0;
                            top:10px;
                           
                        }
                        #login_form {
                            .login_item {
                                margin: 35px 0;
                                position: relative;
                                input {
                                    width: 210px;
                                    height: 38px;
                                    padding-left: 50px;
                                    font-size: 16px;
                                    border: 1px solid #D8D8D8;
                                }
                                .pic_dl {
                                    position: absolute;
                                    left: 2px;
                                    top: 4px;
                                    width: 37px;
                                    height: 33px;
                                    background: #fff url(../../static/img/dl.png) no-repeat center center;
                                }
                                .pic_pw {
                                    position: absolute;
                                    left: 2px;
                                    top: 4px;
                                    width: 37px;
                                    height: 33px;
                                    background: #fff url(../../static/img/mm.png) no-repeat center center;
                                }
                            }
                            .forget {
                                font-size: 14px;
                                margin-bottom: 100px;
                                a {
                                    color: #BDB3AE;
                                    img {
                                        width: 30px;
                                        height:30px;
                                    }
                                }
                            }
                            .loginbtn {
                                .login_btn {
                                    width: 100%;
                                    font-size: 22px;
                                    height: 45px;
                                    background: #1B998B;
                                    border: none;
                                    color: #fff;
                                    &:hover {
                                        cursor: pointer;
                                        opacity: 0.6;
                                    }
                                }
                            }
                            .entries {
                                //margin-top: 25px;
                                a {
                                    float: left;
                                }
                                .entries_btn {
                                    display: block;
                                    width: 50px;
                                    height: 20px;
                                    font-size: 14px;
                                    color: #fff;
                                    background: rgba(27,153,139,0.4);
                                    display: inline-block;
                                    margin-top: 8px;
                                    text-align: center;
                                    line-height: 20px;
                                    border-radius: 5px;
                                }
                            }
                        }
                    }
                    .login_sm {
                        display: none;
                        text-align: center;
                        padding-top: 155px;
                    }
                }
            }
            .footer {
                text-align: center;
                background: #2EC2B4;
                position: relative;
                bottom: -10%;
                .site_footer {
                    a {
                        color: #fff;
                        font-size: 12px !important;
                        line-height: 20px;
                    }
                }
            }
        }
    }
</style>


