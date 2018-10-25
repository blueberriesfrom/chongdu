<template>
    <div class="forget">
        <div class="header">
            <div class="container">
                <div class="fl">
                    <img src="../../static/img/yhtl.png" onerror="onerror=null;src='../../static/img/cd12.png'">
                    <h2>忘记密码</h2>
                </div>
                <div class="fr">
                    <router-link to="/">登录</router-link>
                    <router-link to="/register">注册</router-link>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="main">
                <div class="stepone" v-if="stepone">
                    <p style="marginBottom:70px;">
                        <span>1、填写验证方式</span>
                        <em></em>
                        <span>2、重置密码</span>
                    </p>
                    <p>
                        <input type="text" placeholder="手机号" v-model="telNum">
                    </p>
                    <p>
                        <button @click="clicknext()">下一步</button>
                    </p>
                </div>
                <div class="steptwo" v-if="!stepone">
                    <form @submit.prevent="finishsend()">
                        <p style="marginBottom:70px;">
                            <span>1、填写验证方式</span>
                            <em></em>
                            <span>2、重置密码</span>
                        </p>
                        <p>
                            <input type="text" v-model="sendnum" style="color:#c0c0c0" readonly>
                            <i @click="issendcode&&sendcode()">{{sendtext}}</i>
                        </p>
                        <p>
                            <input type="text" placeholder="验证码" v-model="value">
                        </p>
                        <p>
                            <input type="password" placeholder="输入密码" v-model="password">
                        </p>
                        <p>
                            <input type="password" placeholder="确认密码">
                        </p>
                        <p>
                            <button type="submit">完成</button>
                        </p>
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
                stepone: true,
                telNum: "",
                password:'', //password
                sendnum: '',  //phone
                value:'',  //验证码
                sendtext: '获取动态码',
                issendcode: true,
            }
        },
        methods: {
            //点击完成
            finishsend() {
                let formdata = new FormData();
                formdata.append('phone',this.sendnum);
                formdata.append('password',this.password);
                formdata.append('value',this.value);
                this.$http({
                    url:"/chongdu/user/pasFindBack.do",
                    method:'post',
                    data:formdata,
                    headers: {    'Content-Type': 'multipart/form-data'   }
                }).then(res=>{
                    console.log(res.data);
                if(res.data.code == 0){
                    this.$router.push({
                        path: "/"
                    })
                }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //点击发送验证码
            sendcode() {
                this.$http({
                    url:'/chongdu/user/findBackPas.do',
                    methos:'post',
                    params:{
                        	phone:this.telNum
                    }
                }).then(res=>{
                    // console.log(res.data);
                    if(res.data.code == 0){
                         this.issendcode =  false;
                        let second = 60;
                        let timer = setInterval(()=>{
                            if(second> 0){
                                second--;
                                this.sendtext = second+'秒';
                            }else{
                                second=0;
                                clearInterval(timer);
                                this.issendcode =  true;
                                this.sendtext = "获取动态码";
                            }
                        },1000)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            //点击下一步
            clicknext() {
                if (this.telNum !== "") {
                    if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.telNum)) {
                        this.stepone = false;
                        this.sendnum = this.telNum;
                    } else {
                        this.$message({
                            message: '手机号格式有误',
                            type: 'warning'
                        })
                    }
                } else {
                    this.$message({
                        message: '手机号不能为空',
                        type: 'warning'
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../static/css/common.less';
    .forget {
        .header {
            width: 100%;
            height: 52px;
            padding-top: 30px;
            padding-bottom: 12px;
            border-bottom: 1px solid #c1c1c1;
            .fl {
                width: 400px;
                height: 100%;
                img {
                    width: 100%;
                    width: 126px;
                    float: left;
                    overflow: hidden;
                }
                h2 {
                    width: 150px;
                    display: block;
                    height: 100%;
                    line-height: 52px;
                    font-size: 30px;
                    line-height: 65px;
                    float: left;
                    margin-left: 44px;
                    position: relative;
                    &:before {
                        display: block;
                        content: "";
                        width: 2px;
                        height: 52px;
                        background-color: #c1c1c1;
                        position: absolute;
                        left: -24px;
                        top: 0;
                    }
                }
            }
            .fr {
                height: 100%;
                line-height: 75px;
                a {
                    font-size: 18px;
                    color: #7c7c7c;
                    position: relative;
                    display: block;
                    width: 50px;
                    float: left;
                    text-align: center;
                    &:nth-of-type(1):after {
                        display: block;
                        position: absolute;
                        content: "";
                        width: 1px;
                        height: 22px;
                        background-color: #c1c1c1;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
        }
        .main {
            width: 443px;
            height: 600px;
            margin: 78px auto 0;
            .stepone {
                width: 100%;
                p {
                    text-align: center;
                    color: #a0a0a0;
                    span {
                        font-size: 18px;
                        &:nth-of-type(1) {
                            color: @commonColor;
                        }
                    }
                    em {
                        display: inline-block;
                        width: 70px;
                        height: 1px;
                        background-color: #c1c1c1;
                        vertical-align: middle;
                        margin: 0 28px;
                    }
                    input {
                        width: 100%;
                        height: 45px;
                        padding-left: 10px;
                        box-sizing: border-box;
                        font-size: 16px;
                    }
                    button {
                        width: 100%;
                        height: 45px;
                        background-color: @commonColor;
                        color: #fff;
                        font-size: 18px;
                        outline: 0;
                        border: 0;
                        cursor: pointer;
                        margin-top: 42px;
                        border-radius: 5px;
                    }
                }
            }
            .steptwo {
                width: 100%;
                p {
                    text-align: center;
                    color: #a0a0a0;
                    margin-bottom: 40px;
                    position: relative;
                    i {
                        display: block;
                        width: 113px;
                        height: 38px;
                        position: absolute;
                        right: 6px;
                        top: 50%;
                        transform: translateY(-50%);
                        line-height: 38px;
                        background-color: #f1f1f1;
                        cursor: pointer;
                        border-radius: 5px;
                    }
                    span {
                        font-size: 18px;
                        color: @commonColor;
                    }
                    em {
                        display: inline-block;
                        width: 70px;
                        height: 1px;
                        background-color: @commonColor;
                        vertical-align: middle;
                        margin: 0 28px;
                    }
                    input {
                        width: 100%;
                        height: 55px;
                        padding-left: 10px;
                        box-sizing: border-box;
                        font-size: 16px;
                    }
                    button {
                        width: 100%;
                        height: 55px;
                        background-color: @commonColor;
                        color: #fff;
                        font-size: 18px;
                        outline: 0;
                        border: 0;
                        cursor: pointer;
                        margin-top: 42px;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
</style>


