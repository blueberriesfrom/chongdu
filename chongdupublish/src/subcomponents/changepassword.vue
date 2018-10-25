<template>
    <div class="forget">
        <div class="header">
            <div class="container">
                <div class="fl">
                    <img src="../../static/img/yhtl.png" onerror="onerror=null;src='../../static/img/cd12.png'">
                    <h2>修改登录密码</h2>
                </div>
                <div class="fr">
                    <router-link to="/">登录</router-link>
                    <router-link to="/register">注册</router-link>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="main">
               <form @submit.prevent="submitform()">
                   <p>
                       <label>输入原密码</label>
                       <input type="text" v-model="pwd">
                       <span v-if="pwd_error">请输入密码</span>
                   </p>
                   <p>
                       <label>输入新密码</label>
                       <input type="text"  v-model="newpwd">
                       <span v-if="newpwd_error">请输入新密码</span>
                   </p>
                   <p>
                       <label>再次输入密码</label>
                       <input type="text" v-model="newpwdagain">
                       <span v-if="newpwdagain_error">请确认新密码</span>
                       <span v-if="defferent">输入不一致</span>
                   </p>
                   <button type="submit">确认修改</button>
               </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
           return{
                pwd:"",   //旧密码
                pwd_error:false, //错误提示
                newpwd:"",  //新密码
                newpwd_error:false, //错误提示
                newpwdagain:"", //确认新密码
                newpwdagain_error:false, //错误提示
                defferent:false,  //两次密码是否输入一致
           }
        },
        methods:{
            submitform(){
                if(this.pwd !== ""){
                    this.pwd_error = false;
                    if(this.newpwd !== ""){
                        this.newpwd_error = false;
                        if(this.newpwdagain !== ""){
                             this.newpwdagain_error = false;
                            if(this.newpwd == this.newpwdagain){
                                this.defferent = false;
                                this.$http({
                                    url:"/chongdu/user/editPwd.do",
                                    params:{
                                        pwd:this.pwd,
                                        newpwd:this.newpwd,
                                    },
                                    method:'post'
                                }).then(res=>{
                                    console.log(res.data);
                                    if(res.data.code == 0){
                                        this.$router.push({
                                            path:'/'
                                        })
                                    }
                                }).catch(err=>{
                                    console.log(err)
                                })
                            }else{
                                this.defferent = true
                            }
                        }else{
                            this.newpwdagain_error = true;
                        }
                    }else{
                        this.newpwd_error = true;
                    }
                }else{
                    this.pwd_error = true;
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
                    width: 200px;
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
           form{
               p{
                   width:100%;
                   position: relative;
                   padding-bottom: 60px;
                   label{
                       display: inline-block;
                       width:100px;
                       text-align: right;
                       margin-right: 20px;
                       font-size: 16px;
                       color: #adabab;
                   }
                   input{
                       width:315px;
                       height: 45px;
                       padding-left: 15px;
                       box-sizing: border-box;
                   }
                   span{
                       position: absolute;
                       left:125px;
                       color: red;
                   }
               }
               button{
                   width: 137px;
                   height: 45px;
                   color: #fff;
                   background-color: @commonColor;
                   border: 0;
                   border-radius: 5px;
                   margin-left: 125px;
                   font-size: 18px;
                   cursor: pointer;
               }
           }
        }
    }
</style>


