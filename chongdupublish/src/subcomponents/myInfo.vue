<template>
    <div class="myinfo">
        <div class="myinfo_tab">
            <h4>基本资料</h4>
        </div>
        <!-- 账户信息 -->
        <div class="account_info">
            <div class="account_info_title">
                <h4>账户信息</h4>
            </div>
            <div class="account_info_list">
                <!-- 头像 -->
                <div class="account_info_userimg">
                    <form action="">
                        <label for="">头像</label>
                        <img :src="userinfo.icon" class="icon_head">
                        <span class="head_edit">编辑</span>
                        <input type="file" @change="headimg($event)" id="headfile">
                        <i class="head_text">上传文件类型:jpg/png/jpeg 文件大小不超过5M</i>
                    </form>
                   
                </div>
                <!-- 手机号码 -->
                <div class="account_info_tel">
                    <label for="">用户名</label>
                    <input type="text" disabled v-model="userinfo.username">
                    <a href="javascript:void(0);" @click="changeusername('changename')" v-if="userinfo.isaudit == 1">修改</a>
                </div>
                <!-- 手机号码 -->
                <div class="account_info_tel">
                    <label for="">手机号码</label>
                    <input type="text" disabled v-model="userinfo.userPhone">
                    <router-link :to="{path:'/myInfo/changePhone',query:{step:1,code:'phone',param:userinfo.userPhone}}" v-if="userinfo.userPhone !== undefined">更换号码</router-link>
                     <a href="javascript:void(0);" v-if="userinfo.userPhone == undefined" @click="bindemailclick('bindphone')">绑定手机</a>
                </div>
                <!-- 更换邮箱 -->
                <div class="account_info_email">
                    <label for="">邮箱</label>
                    <input type="text" disabled v-model.trim="userinfo.userMail">
                    <router-link :to="{path:'/myInfo/changePhone',query:{step:1,code:'email',param:userinfo.userMail}}" v-if="userinfo.userMail!==''">更换邮箱</router-link>
                    <a href="javascript:void(0);" v-if="userinfo.userMail == ''" @click="bindemailclick('bindemail')">注册邮箱</a>
                </div>
            </div>
        </div>
        <!-- 企业信息 -->
        <!-- <div class="company_info">
            <div class="company_info_title">
                <h4>企业/个体户信息</h4>
            </div>
            <div class="company_info_list">
              
            </div>
        </div> -->
        <!-- 弹窗 -->
        <el-dialog :title="dialog_title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="554px">
            <div class="dialog_content1" v-if="contenttype == '1'">
                <p>
                    <label>用户名</label>
                    <input type="text" v-model.trim="newusername">
                    <em>说明:每个人账户只能修改一次用户名</em>
                    <em>用户名由数字,字母,中文字符组成,最多12个字符</em>
                </p>
            </div>
            <div class="dialog_content2" v-if="contenttype == '2'">
                <p>
                    <label>{{bindname}}</label>
                    <input type="text" v-model.trim="bindemailnum" v-if="bindtype == 'mail'" placeholder="邮箱">
                    <input type="text" v-model.trim="bindephonenum" v-if="bindtype == 'phone'" placeholder="手机号">
                </p>
                <p v-if="bindtype == 'mail'">
                    <label>验证码</label>
                    <input type="text" class="email_input" style="width:240px" v-model.trim="emailcode">
                    <span @click="canclick&&sendbindfirstemailcode()" class="emailcode">{{sendcontent}}</span>
                </p>
                 <p v-if="bindtype == 'phone'">
                    <label>验证码</label>
                    <input type="text" class="email_input" style="width:240px" v-model.trim="phonecode">
                    <span @click="canphone&&sendbindfirstphonecode()" class="phonecode">{{sendcontentphone}}</span>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="contenttype==1?confirmusername(): (bindtype == 'mail'?confirmbindemail():confirmbindphone())">确 定</el-button>
                    </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userinfo: {}, //用户信息
                companyInfo:{}, //企业信息
                dialogVisible: false, //是否显示弹窗
                dialog_title: "", //弹窗的内容title
                contenttype: "", //显示的内容
                isaudit: '', //是否可以修改用户名用来判定是否可以修改,1可以,0不可以
                newusername: '', //修改后的用户名
                sendcontent: '发送验证码', //点击发送验证码文字改变
                canclick: true, //可以点击发送验证码
                bindemailnum: '', //第一次绑定的邮箱号码
                emailcode: "", //发送到邮箱的验证码
                statuscode:'',  //显示企业用户的状态码
                bindname:'',//标记绑定手机号还是邮箱
                bindtype:'', //第一次绑定是手机还是邮箱
                bindephonenum:'', //第一次绑定的手机号
                phonecode:'',//第一次绑定的验证码
                canphone:true, //能否点击
                sendcontentphone:'发送验证码',//击发送验证码文字改变
            }
        },
        created() {
            this.initmyinfo();
        },
        methods: {
             //点击第一次绑定邮箱发送code
            sendbindfirstphonecode() {
                if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.bindephonenum)) {
                    this.$http({
                        url: "/chongdu/user/getCodeByPhone.do",
                        method: 'post',
                        params: {
                            phone: this.bindephonenum,
                            subType: 2,
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.code == 0) {
                            this.canphone = false;
                            let second = 60;
                            let timer = setInterval(() => {
                                if (second > 0) {
                                    second--;
                                    this.sendcontentphone = second + '秒';
                                    $(".phonecode").css({
                                        'backgroundColor': "#cdcdcd"
                                    });
                                } else {
                                    second = 0;
                                    this.sendcontentphone = "发送验证码";
                                    clearInterval(timer);
                                    $(".phonecode").css({
                                        'backgroundColor': "#3ab2a7"
                                    });
                                    this.canphone = true;
                                }
                            }, 1000)
                            this.$message({
                                message: '发送成功',
                                type: 'success'
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message({
                        message: '手机格式错误',
                        type: 'warning'
                    })
                }
            },
            //第一次绑定的手机号
            confirmbindphone(){
                 if (this.bindephonenum !== "" && this.phonecode !== "") {
                    this.$http({
                        url: "/chongdu/user/updateUserInfoByPhone.do",
                        method: 'post',
                        params: {
                            phone: this.bindephonenum,
                            value: this.phonecode,
                            subType: 2,
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.code == 0) {
                            this.dialogVisible = false;
                            this.initmyinfo()
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message({
                        message: '输入不能为空',
                        type: 'warning'
                    })
                }
            },
            //点击第一次绑定邮箱确认绑定的按钮
            confirmbindemail() {
                if (this.bindemailnum !== "" && this.emailcode !== "") {
                    this.$http({
                        url: "chongdu/user/updateUserInfoByMail.do",
                        method: 'post',
                        params: {
                            mail: this.bindemailnum,
                            value: this.emailcode,
                            subType: 2,
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.code == 0) {
                            this.dialogVisible = false;
                            this.initmyinfo()
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message({
                        message: '输入不能为空',
                        type: 'warning'
                    })
                }
            },
            //点击第一次绑定邮箱发送code
            sendbindfirstemailcode() {
                if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.bindemailnum)) {
                    this.$http({
                        url: "/chongdu/user/getCodeByMail.do",
                        method: 'post',
                        params: {
                            mail: this.bindemailnum,
                            subType: 2,
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.code == 0) {
                            this.canclick = false;
                            let second = 60;
                            let timer = setInterval(() => {
                                if (second > 0) {
                                    second--;
                                    this.sendcontent = second + '秒';
                                    $(".emailcode").css({
                                        'backgroundColor': "#cdcdcd"
                                    });
                                } else {
                                    second = 0;
                                    this.sendcontent = "发送验证码";
                                    clearInterval(timer);
                                    $(".emailcode").css({
                                        'backgroundColor': "#3ab2a7"
                                    });
                                    this.canclick = true;
                                }
                            }, 1000)
                            this.$message({
                                message: '发送成功',
                                type: 'success'
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message({
                        message: '邮箱格式错误',
                        type: 'warning'
                    })
                }
            },
            //获取个人资料信息
            initmyinfo() {
                this.$http({
                    url: '/chongdu/user/myInfo.do',
                    method: 'post',
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        this.userinfo = res.data.item.userInfo;
                        this.companyInfo = res.data.item.companyInfo;
                        this.statuscode = this.companyInfo.authentState;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击确认修改用户名
            confirmusername() {
                if (this.newusername !== "") {
                    this.$http({
                        url: "chongdu/user/editUserName.do",
                        method: 'post',
                        params: {
                            userName: this.newusername
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.code == 0) {
                            this.dialogVisible = false;
                            this.initmyinfo();
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.$message({
                        message: '用户名不能为空',
                        type: 'warning',
                    })
                }
            },
            //点击绑定邮箱
            bindemailclick(name) {
                this.dialogVisible = true;
                if (name == 'bindemail') {
                    this.dialog_title = "绑定邮箱";
                    this.contenttype = "2"; //使用第一种模式
                    this.bindname ="绑定邮箱";
                    this.bindtype="mail"
                }else if(name =="bindphone"){
                     this.dialog_title = "绑定手机";
                    this.contenttype = "2"; //使用第一种模式
                     this.bindname ="绑定手机";
                     this.bindtype="phone"
                }
            },
            //点击更改用户名
            changeusername(name) {
                this.dialogVisible = true;
                if (name == 'changename') {
                    this.dialog_title = "修改用户名";
                    this.contenttype = "1"; //使用第一种模式
                }
            },
            //获取图片路劲
            headimg(event) {
                let headfile = event.target.files[0];
                let formdata = new FormData();
                 if(this.userinfo.imgId == undefined){
                     formdata.append('file',headfile);
                 }else{
                    formdata.append('file',headfile);
                    formdata.append('id', this.userinfo.imgId);
                 }
                this.$http({
                    url: "/chongdu/user/editIcon.do",
                    method: 'post',
                    data:formdata,
                    headers: { 'Content-Type': 'multipart/form-data'}
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        this.initmyinfo();
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .myinfo {
        width: 100%;
        color: #333;
        background-color: #fff;
        .myinfo_tab {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid @commonColor;
            h4 {
                width: 180px;
                height: 100%;
                background-color: @commonColor;
                font-size: 16px;
                font-weight: 900;
                color: #fff;
                text-align: center;
                line-height: 60px;
            }
        }
        .account_info,
        .company_info {
            width: 100%;
            padding-bottom: 20px;
            .account_info_title,
            .company_info_title {
                width: 100%;
                height: 80px;
                h4 {
                    padding-left: 12px;
                    height: 25px;
                    line-height: 25px;
                    border-left: 10px solid @commonColor;
                    position: relative;
                    left: 5px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 18px;
                }


            }
            .account_info_list,
            .company_info_list{
                width: 720px;
                margin: 0 auto;
                .account_info_userimg {
                    height: 120px;
                    margin-bottom: 38px;
                    position: relative;
                    .head_edit {
                        position: absolute;
                        left: 170px;
                        bottom: 10px;
                        color: #a1a1a1;
                    }
                    label {
                        line-height: 120px;
                        margin-right: 40px;
                        display: inline-block;
                        width: 80px;
                        text-align: right;
                    }
                    .add_img {
                        width: 120px;
                        height: 120px;
                        cursor: pointer;
                        border-radius: 120px;
                        text-align: center;
                        line-height: 120px;
                        z-index: 1999;
                        position: absolute;
                        left: 120px;
                        top: 0;
                        background: url('../../static/img/default_head.png') no-repeat center;
                    }
                    .head_text {
                        font-size: 12px;
                        color: #b5b5b5;
                        display: block;
                        position: absolute;
                        width: 180px;
                        left: 260px;
                        bottom: 15px;
                    }
                    img {
                        width: 120px;
                        height: 120px;
                        vertical-align: middle;
                        border-radius: 120px;
                    }
                    input {
                        width: 120px;
                        height: 120px;
                        position: absolute;
                        left: 120px;
                        top: 0;
                        cursor: pointer;
                        opacity: 0;
                        z-index: 2000;
                    }
                }
                .account_info_tel,
                .account_info_email,
                .company_info_name,
                .company_leader,
                .company_address,
                .company_tel,
                {
                    height: 40px;
                    margin-bottom: 32px;
                    label {
                        display: inline-block;
                        width: 80px;
                        text-align: right;
                        line-height: 40px;
                        margin-right: 40px;
                    }
                    input {
                        width: 323px;
                        height: 100%;
                        box-sizing: border-box;
                        font-size: 16px;
                        padding-left: 10px;
                        box-sizing: border-box;
                    }
                    a {
                        display: inline-block;
                        width: 67px;
                        height: 22px;
                        text-align: center;
                        line-height: 22px;
                        margin-left: 46px;
                        background-color: @commonColor;
                        color: #fff;
                        border-radius: 5px;
                        letter-spacing: 1px;
                    }
                }
                .company_img,
                .company_decri {
                    margin-bottom: 32px;
                    label {
                        display: inline-block;
                        width: 80px;
                        text-align: right;
                        line-height: 40px;
                        margin-right: 40px;
                    }
                    .company_img_list {
                        display: inline-block;
                        width: 500px;
                        vertical-align: top;
                        img {
                            width: 100px;
                            height: 100px;
                            float: left;
                            position: relative;
                            &:after {
                                display: block;
                                width: 20px;
                                height: 20px;
                                position: absolute;
                                right: 0;
                                top: 0;
                                background: url("../../static/img/delimg.png") no-repeat center;
                                background-size: 20px 20px;
                            }
                        }
                        .add_button {
                            width: 100px;
                            height: 100px;
                            background-color: red;
                            float: left;
                            box-sizing: border-box;
                            background: url('../../static/img/djh.png') no-repeat center;
                            border: 3px solid #f2f2f2;
                            input[type="file"] {
                                width: 100px;
                                height: 100px;
                                cursor: pointer;
                                opacity: 0;
                            }
                        }
                    }
                    textarea {
                        width: 561px;
                        height: 208px;
                        overflow: auto;
                        vertical-align: top;
                        text-indent: 2em;
                        font-size: 16px;
                        padding-left: 10px;
                        box-sizing: border-box;
                    }
                }
            }
             .company_info_list{
                padding-bottom: 20px;
                width:100%;
            }
        }
        .save_btn {
            width: 100%;
            height: 150px;
            text-align: right;
            padding-right: 50px;
            box-sizing: border-box;
            position: relative;
            span {
                position: absolute;
                padding: 10px 32px;
                background-color: @commonColor;
                color: #fff;
                font-weight: 700;
                font-size: 16px;
                border-radius: 7px;
                right: 50px;
                top: 25px;
                cursor: pointer;
            }
        }
        .el-dialog {
            .el-dialog__header {
                padding: 0;
                background-color: @commonColor;
                height: 45px;
                line-height: 45px;
                padding-left: 18px;
                .el-dialog__title {
                    color: #fff;
                }
                .el-dialog__headerbtn {
                    top: 12px;
                    .el-icon-close {
                        color: #fff;
                        font-size: 26px;
                    }
                }
            }
            .el-dialog__footer {
                text-align: center;
                .el-button--default {
                    color: @commonColor;
                    &:hover {
                        background-color: rgba(46, 194, 180, 0.3)
                    }
                }
                .el-button--primary {
                    background-color: @commonColor;
                    border-color: @commonColor;
                    width: 110px;
                    height: 32px;
                    border-radius: 5px;
                    padding: 0;
                    line-height: 32px;
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }
            .el-dialog__body {
                padding: 0;
                width: 100%;
                .dialog_content1 {
                    padding-top: 50px;
                    width: 100%;
                    padding-bottom: 65px;
                    p {
                        label {
                            display: inline-block;
                            width: 135px;
                            margin-right: 46px;
                            text-align: right;
                            font-size: 12px;
                        }
                        input {
                            width: 251px;
                            height: 46px;
                            padding-left: 10px;
                            box-sizing: border-box;
                            border-radius: 5px;
                        }
                        em {
                            font-size: 12px;
                            color: #9c9c9c;
                            display: block;
                            width: 251px;
                            position: relative;
                            left: 138px;
                            margin-top: 5px;
                            margin-left: 50px;
                        }
                    }
                }
                .dialog_content2 {
                    width: 100%;
                    padding-top: 46px;
                    p {
                        margin-bottom: 56px;
                        label {
                            display: inline-block;
                            text-align: right;
                            width: 70px;
                            margin-right: 44px;
                            font-size: 12px;
                        }
                        input {
                            width: 343px;
                            height: 46px;
                            padding-left: 10px;
                            box-sizing: border-box;
                        }
                        span {
                            width: 65px;
                            height: 35px;
                            line-height: 35px;
                            text-align: center;
                            color: #fff;
                            background-color: @commonColor;
                            font-size: 12px;
                            display: inline-block;
                            margin-left: 8px;
                            vertical-align: middle;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>


