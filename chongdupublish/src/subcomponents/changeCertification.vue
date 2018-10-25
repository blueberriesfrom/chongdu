<template>
    <div class="changecertify">
        <div class="wdrz_fr">
            <div class="wdrz_top">
                <!-- <div class="wdrz_grtap xxk_tap">个人认证</div> -->
                <div class="wdrz_qytap xxk_tap">企业名称变更</div>
            </div>
            <div class="wdrz_qydiv">
                <div class="nodata" v-if="passstatus == 12">
                    <img src="../../static/img/passing.png" alt="">
                </div>
                <div class="nodata" v-if="passstatus == 13">
                    <img src="../../static/img/passing.png" alt="">
                </div>
                <div class="nodata" v-if="passstatus == 14">
                    <img src="../../static/img/fail_pass.png" alt="">
                    <!-- <button @click="passstatus = 0">重新提交变更</button> -->
                    <!-- <button>重新提交变更</button> -->
                </div>
                <form id="fbcw_form" v-if="passstatus == 0">
                    <p>
                        <label>企业变更后名称</label>
                        <input type="text" class="changname" v-model="name">
                    </p>
                    <p>
                        <label>企业变更通知书上传</label>
                        <span>
                                            {{notice}} 
                                            <input type="file" @change="noticeImg($event)">
                                        </span>
                    </p>
                    <p class="notice_img" style="margin-top:0">
                        <!-- 放企业变更通知书上传 -->
                        <em>
                                            {{nocticename}}
                                            <i>{{nocticesize}}</i>
                                        </em>
                    </p>
                    <p>
                        <label>法人身份证上传</label>
                        <span>
                                            {{IDfront}}
                                            <input type="file" @change="IDfrontchange($event)">
                                        </span>
                    </p>
                    <p style="margin-top:0" class="IDfrontimg">
                        <!-- 放企业变更通知书上传 -->
                        <em>
                                           {{IDfrontname}}
                                            <i>{{IDfrontsize}}</i>
                                        </em>
                    </p>
                    <p>
                        <label></label>
                        <span>
                                            {{IDback}}
                                            <input type="file" @change="IDbackchange($event)">
                                        </span>
                    </p>
                    <p style="margin-top:0" class="IDbackimg">
                        <!-- 身份证反面  -->
                        <em>
                                           {{IDbackname}}
                                            <i>{{IDbacksize}}</i>
                                        </em>
                    </p>
                    <div class="change_button">
                        <span @click="confirmchange()">认证变更</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '', //企业变更后名称
                notice: '通知书上传', //通知书上传的名称 
                nocticename: '', //通知书图片名称    
                nocticesize: '', //通知书图片大小 
                noticefile: '', //通知书的文件对象 
                IDfront: '正面', //身份证正面
                IDfrontname: '', //身份证正面图片名称
                IDfrontsize: '', //身份证正面图片大小
                IDfrontfile: '', //通知书的文件对象 
                IDback: '反面', //身份证反面
                IDbackname: '', //身份证反面图片名称
                IDbacksize: '', //身份证反面图片大小
                IDbackfile: '', //通知书的文件对象 
                companyId: '', //企业认证的Id
                passstatus: -1, //是否审核通过,0,是审核通过,1,审核失败2,审核认证中
                initconfirm:{}, //是否认证的对象
            }
        },
        created() {
            this.checkcompany();
        },
        watch: {
            notice(val) {}
        },
        methods: {
            //先查看是否进行认证
            checkcompany() {
                this.$http({
                    url: '/chongdu/companyauthen/checkCompanyAuthent.do',
                    method: 'post',
                }).then(res => {
                    console.log(res.data);
                    this.initconfirm = res.data.rows;
                    this.passstatus = res.data.code;
                    if (res.data.code == 13) {
                        //企业或者个体户正在认证审核中
                        this.$router.push({
                            path:"/again/certification"
                        })
                    }else if(res.data.code == 0){
                        this.companyId = res.data.rows.id;
                    }
                 
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击更换
            confirmchange() {
                if (this.name !== "") {
                    if (this.noticefile !== "") {
                        if (this.IDfrontfile !== "") {
                            if (this.IDbackfile !== "") {
                                let formdata = new FormData();
                                formdata.append('name', this.name);
                                formdata.append('NameChanged', this.noticefile);
                                formdata.append('NewIdentityCardFront', this.IDfrontfile);
                                formdata.append('id', this.companyId);
                                formdata.append('NewIdentityCardReverse', this.IDbackfile);
                                if (this.noticefile == "" || this.IDfrontfile == "" || this.IDbackfile == "") {
                                    this.$message({
                                        message: '请选择要更改的图片',
                                        type: 'warning'
                                    })
                                } else {
                                    this.$http({
                                        url: "/chongdu/companyauthen/changeName.do",
                                        method: "post",
                                        data: formdata,
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    }).then(res => {
                                        console.log(res.data);
                                        if (res.data.code == 0) {
                                            this.$message({
                                                message: '变更成功',
                                                type: 'success'
                                            })
                                            this.checkcompany();
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                }
                            } else {
                                this.$message({
                                    message: "请上传身份证反面",
                                    type: 'warning'
                                })
                            }
                        } else {
                            this.$message({
                                message: "请上传身份证正面",
                                type: 'warning'
                            })
                        }
                    } else {
                        this.$message({
                            message: "请上传变更通知书",
                            type: 'warning'
                        })
                    }
                } else {
                    this.$message({
                        message: "名称不能为空",
                        type: 'warning'
                    })
                }
            },
            //通知书上传
            noticeImg(event) {
                this.noticefile = event.target.files[0];
                this.nocticename = event.target.files[0].name;
                this.nocticesize = event.target.files[0].size + 'kb';
                if (this.nocticename !== "") {
                    this.notice = "重新上传";
                    $("p.notice_img").css({
                        "margin-top": "25px"
                    })
                } else {
                    this.notice = "通知书上传";
                    $("p.notice_img").css({
                        "marginTop": "0"
                    })
                }
            },
            //身份证正面
            IDfrontchange(event) {
                this.IDfrontfile = event.target.files[0];
                this.IDfrontname = event.target.files[0].name;;
                this.IDfrontsize = event.target.files[0].size + 'kb';
                if (this.IDfrontname !== "") {
                    this.IDfront = "重新上传";
                    $("p.IDfrontimg").css({
                        "margin-top": "25px"
                    })
                } else {
                    this.IDfront = "上传正面";
                    $("p.IDfrontimg").css({
                        "margin-top": "0"
                    })
                }
            },
            //身份证反面
            IDbackchange(event) {
                this.IDbackfile = event.target.files[0];
                this.IDbackname = event.target.files[0].name;;
                this.IDbacksize = event.target.files[0].size + 'kb';
                if (this.IDbackname !== "") {
                    this.IDback = "重新上传";
                    $("p.IDbackimg").css({
                        "margin-top": "25px"
                    })
                } else {
                    this.IDback = "上传反面";
                    $("p.IDbackimg").css({
                        "margin-top": "0"
                    })
                }
            }
        }
    }
</script>
<style lang='less'>
    @import '../../static/css/common.less';
    .changecertify {
        color: #333;
        width: 100%;
        .wdrz_fr {
            background: #fff;
            border: 1px solid #f1f1f1;
            overflow: hidden;
            .wdrz_top {
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #2EC2B4;
                .wdrz_qytap {
                    width: 170px;
                    float: left;
                    text-align: center;
                    border-right: 1px solid #DEDEDE;
                    cursor: pointer;
                    font-size: 16px;
                    &.xxk_tap {
                        background: #2EC2B4;
                        color: #fff;
                    }
                }
            }
            .wdrz_qydiv {
                width: 100%;
                height: 748px;
                .nodata {
                    width: 100%;
                    height: 600px;
                    position: relative;
                    overflow: hidden;
                    img {
                        display: block;
                        margin: 100px auto 0;
                    }
                    button {
                        width: 120px;
                        height: 35px;
                        outline: none;
                        border: 0;
                        background-color: @commonColor;
                        color: #fff;
                        font-size: 16px;
                        cursor: pointer;
                        border-radius: 7px;
                        position: absolute;
                        right: 50px;
                        top: 280px;
                    }
                }
                #fbcw_form {
                    width: 100%;
                    p {
                        margin-top: 50px;
                        width: 100%;
                        label {
                            width: 240px;
                            display: inline-block;
                            text-align: right;
                            font-size: 16px;
                            margin-right: 113px;
                        }
                        .changname {
                            font-size: 16px;
                            width: 342px;
                            height: 35px;
                            padding-left: 10px;
                        }
                        span {
                            display: inline-block;
                            width: 168px;
                            height: 35px;
                            position: relative;
                            vertical-align: middle;
                            border: 1px solid #c1bfbf !important;
                            border-radius: 3px !important;
                            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                            -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                            font-size: 12px;
                            text-align: center;
                            line-height: 35px;
                            cursor: pointer;
                            overflow: hidden;
                            input[type="file"] {
                                width: 35px;
                                height: 168px;
                                position: absolute;
                                left: 67px;
                                top: -66px;
                                opacity: 0;
                                cursor: pointer;
                                transform: rotate(90deg);
                                -ms-transform: rotate(90deg);
                                -moz-transform: rotate(90deg);
                                /* Firefox */
                                -webkit-transform: rotate(90deg);
                                /* Safari 和 Chrome */
                                -o-transform: rotate(90deg);
                            }
                        }
                        em {
                            display: block;
                            margin-left: 355px;
                            font-size: 12px;
                            cursor: pointer;
                            i {
                                color: #8a8a8a;
                                margin-left: 10px;
                            }
                        }
                    }
                    .change_button {
                        width: 100%;
                        height: 36px;
                        text-align: right;
                        padding-right: 50px;
                        box-sizing: border-box;
                        margin-top: 150px;
                        span {
                            color: #fff;
                            background-color: @commonColor;
                            display: inline-block;
                            text-align: center;
                            width: 125px;
                            height: 36px;
                            line-height: 36px;
                            font-size: 16px;
                            border-radius: 7px;
                            cursor: pointer;
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


