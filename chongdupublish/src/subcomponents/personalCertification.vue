<template>
    <div class="personalCertification">
        <div class="isreviewing">
            <div class="title">
                <h4>实名认证</h4>
            </div>
            <div class="main_content">
                <!-- 未实名认证 -->
                <form action="">
                    <p style="margin-bottom:32px">
                        <label>真实姓名</label>
                        <input type="text" v-model.trim="realname">
                    </p>
                    <p style="margin-bottom:32px">
                        <label>身份证号码</label>
                        <input type="text" v-model.trim="cardnum" @blur="checkId()">
                    </p>
                    <p style="margin-bottom:37px">
                        <label>地址</label>
                        <span class="address_picker">
                                                            <el-select v-model="provincevalue" clearable placeholder="请选择">
                                                                <el-option v-for="item in provinceOptions" :key="item.value" :label="item.name" :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                            <i>省</i>
                                                            <el-select v-model="cityvalue" clearable placeholder="请选择">
                                                                <el-option v-for="item in cityOptions" :key="item.value" :label="item.name" :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                            <i>市</i>
                                                            <el-select v-model="citycode" clearable placeholder="请选择">
                                                                <el-option v-for="item in districtOptions" :key="item.value" :label="item.name" :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                            <i>区</i>
                                                        </span>
                    </p>
                    <p style="margin-bottom:35px">
                        <label style="float:left">身份证正反面照片</label>
                        <span class="IDs">
                                                            <p class="ID_photo">
                                                            <em>
                                                                <img :src="IdentityCardFrontImg" alt="">
                                                               <input type="file" @change="changeIDfront($event)" accept="image/jpg, image/jpeg,image/png">
                                                                <input type="file" @change="changeIDfront($event)" accept="image/jpg, image/jpeg,image/png" class="input_hidden">
                                                            </em>
                                                                <em>
                                                                <img :src="IdentityCardReverseImg" alt="">
                                                               <input type="file" @change="changeIDback($event)" accept="image/jpg, image/jpeg,image/png">
                                                                <input type="file" @change="changeIDback($event)" accept="image/jpg, image/jpeg,image/png" class="input_hidden">
                                                            </em>
                                                            </p>
                                                            <i>1、请上传身份证扫描件或者清晰的照片</i>
                                                            <i>2、上传文件类型:JPG/PNG/JPEG,文件大小不超过5M</i>
                                                        </span>
                    </p>
                    <p style="margin-bottom:35px">
                        <label style="float:left">手持身份证照片</label>
                        <span class="IDs">
                                                       <p class="ID_have">
                                                               <img :src="HandPhoneImg" alt="">
                                                               <input type="file" @change="changeHandPhone($event)" accept="image/jpg, image/jpeg,image/png">
                                                               <input type="file" @change="changeHandPhone($event)" class="input_hidden" accept="image/jpg, image/jpeg,image/png">
                                                        </p> 
                                                        
                                                         <i>1、请上传身份证扫描件或者清晰的照片</i>
                                                        <i>2、上传文件类型:JPG/PNG/JPEG,文件大小不超过5M</i>
                                                    </span>
                    </p>
                    <div class="confirm_button">
                        <span @click="submitdata()">确认认证</span>
                    </div>
                </form>
                <!-- 已经实名认证通过 -->
                <!-- 实名认证数据回显
                                        <trueName v-if="showstatus == 0 || showstatus == 10 || showstatus == 11"  :companyObject="truenameuserinfo"/> -->
            </div>
        </div>
    </div>
</template>
<script>
    import trueName from "@/subcomponents/childrencomponents/truename";
    export default {
        data() {
            return {
                provinceOptions: [], //省的地址
                provincevalue: "", //省的初始化
                cityOptions: [], //市的地址
                cityvalue: '', //市的初始化
                districtOptions: [], //区的地址
                citycode: '', //区的初始化   
                lastcode: '', //最终传递的城市code
                realname: "", //真是姓名
                cardnum: '', //身份证号码
                IdentityCardFront: '', //身份证正面
                IdentityCardFrontImg: '../../static/img/IDfront.png', //身份证正面照片
                IdentityCardReverse: '', //身份证反面
                IdentityCardReverseImg: '../../static/img/IDback.png', //身份证反面
                HandPhone: '', //手持身份证照片
                HandPhoneImg: '../../static/img/photo1.png', //手持身份证照片
                IDcode: "", //是否调用验证身份证接口
            }
        },
        created() {
            this.initaddress();
            this.checktruename();
        },
        watch: {
            //区的变化
            citycode(val) {},
            //市的变化
            cityvalue(val, oldval) {
                this.citycode = "";
                this.initdistrict();
            },
            //省的变化
            provincevalue(val) {
                this.cityvalue = "";
                this.citycode = "";
                this.initcity();
            },
        },
        methods: {
            //验证身份号码
            checkId() {
                if (this.IDcode !== 0) {
                    if (this.cardnum !== "") {
                        this.$http({
                            url: '/chongdu/userauthent/checkCardNum.do',
                            params: {
                                cardnum: this.cardnum
                            },
                            method: 'post'
                        }).then(res => {
                            this.IDcode = res.data.code;
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        this.$message({
                            message: "身份证号码不能为空",
                            type: 'warning'
                        })
                    }
                }
            },
            //查看实名认证的资料并显示数据
            checktruename() {
                if (this.$route.query.opera == undefined) {
                    this.$http({
                        url: '/chongdu/userauthent/checkIsAuthent.do',
                        method: 'post',
                    }).then(res => {
                        //console.log(res.data);
                        if (res.data.code == 0 || res.data.code == 10 || res.data.code == 11) {
                            this.$router.push({
                                path: "/personal/certification/info",
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            //点击提交实名认证
            submitdata() {
                if (this.realname !== "") {
                    if (/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(this.cardnum)) {
                        if (this.cityvalue !== "") {
                            if (this.IdentityCardFront !== "") {
                                if (this.IdentityCardReverse !== "") {
                                    if (this.HandPhone !== "") {
                                        if (this.citycode !== "") {
                                            this.lastcode = this.citycode
                                        } else {
                                            if (this.cityvalue !== "") {
                                                this.lastcode = this.cityvalue
                                            } else {
                                                if (this.provincevalue !== "") {
                                                    this.lastcode = this.provincevalue
                                                } else {
                                                    this.lastcode = "";
                                                }
                                            }
                                        }
                                        if (this.$route.query.opera == undefined) {
                                            let formdata = new FormData();
                                            formdata.append("realname", this.realname);
                                            formdata.append("cardnum", this.cardnum);
                                            formdata.append("IdentityCardFront", this.IdentityCardFront);
                                            formdata.append("IdentityCardReverse", this.IdentityCardReverse);
                                            formdata.append("HandPhone", this.HandPhone);
                                            formdata.append("citycode", this.lastcode);
                                            this.$http({
                                                url: "/chongdu/userauthent/add.do",
                                                data: formdata,
                                                method: 'post',
                                                headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            }).then(res => {
                                                if (res.data.code == 0) {
                                                    this.$message({
                                                        message: "提交成功",
                                                        type: 'success'
                                                    })
                                                    this.$router.push({
                                                        path: "/personal/certification/info"
                                                    })
                                                }
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        } else {
                                            let formdata = new FormData();
                                            formdata.append("realname", this.realname);
                                            formdata.append("legalnumber", this.cardnum);
                                            formdata.append("IdentityCardFront", this.IdentityCardFront);
                                            formdata.append("IdentityCardReverse", this.IdentityCardReverse);
                                            formdata.append("HandPhone", this.HandPhone);
                                            formdata.append("citycode", this.lastcode);
                                            formdata.append("id", this.$route.query.id);
                                            this.$http({
                                                url: "/chongdu/userauthent/edit.do",
                                                data: formdata,
                                                method: 'post',
                                                headers: {
                                                    'Content-Type': 'multipart/form-data'
                                                }
                                            }).then(res => {
                                                console.log(res.data)
                                                if (res.data.code == 0) {
                                                    this.$message({
                                                        message: "提交成功",
                                                        type: 'success'
                                                    })
                                                    this.$router.push({
                                                        path: "/personal/certification/info"
                                                    })
                                                }
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        }
                                    } else {
                                        this.$message({
                                            message: "上传手持身份证照片",
                                            type: 'warning'
                                        })
                                    }
                                } else {
                                    this.$message({
                                        message: "上传身份证反面照片",
                                        type: 'warning'
                                    })
                                }
                            } else {
                                this.$message({
                                    message: "上传身份证正面照片",
                                    type: 'warning'
                                })
                            }
                        } else {
                            this.$message({
                                message: "至少选择市级地址",
                                type: 'warning'
                            })
                        }
                    } else {
                        this.$message({
                            message: "身份证号码有误",
                            type: 'warning'
                        })
                    }
                } else {
                    this.$message({
                        message: "姓名不能为空",
                        type: 'warning'
                    })
                }
            },
            //手持身份证
            changeHandPhone(event) {
                this.HandPhone = event.target.files[0];
                let read = new FileReader();
                read.readAsDataURL(event.target.files[0]);
                read.onload = (ele) => {
                    this.HandPhoneImg = ele.target.result;
                }
            },
            //改变反面照
            changeIDback(event) {
                this.IdentityCardReverse = event.target.files[0];
                let read = new FileReader();
                read.readAsDataURL(event.target.files[0]);
                read.onload = (ele) => {
                    this.IdentityCardReverseImg = ele.target.result;
                }
            },
            //改变正面照
            changeIDfront(event) {
                this.IdentityCardFront = event.target.files[0];
                let read = new FileReader();
                read.readAsDataURL(event.target.files[0]);
                read.onload = (ele) => {
                    this.IdentityCardFrontImg = ele.target.result;
                }
            },
            //获取区的地址
            initdistrict() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=' + this.cityvalue,
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.districtOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取市的地址
            initcity() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=' + this.provincevalue,
                    method: 'post',
                }).then(res => {
                    if (res.data.code == 0) {
                        this.cityOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取省市区的地址
            initaddress() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=',
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.provinceOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        components: {
            trueName
        }
    }
</script>
<style scoped lang='less'>
    @import '../../static/css/common.less';
    .personalCertification {
        width: 100%;
        background-color: #fff;
        .isreview {
            width: 100%;
            overflow: hidden;
            img {
                display: block;
                margin: 225px auto;
            }
        }
        .isreviewing {
            width: 100%;
            .title {
                width: 100%;
                height: 60px;
                border-bottom: 1px solid @commonColor;
                h4 {
                    display: block;
                    width: 170px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    font-size: 16px;
                    color: #fff;
                    background-color: @commonColor;
                }
            }
            .main_content {
                width: 100%;
                height: 737px;
                padding-top: 40px;
                position: relative;
                p {
                    label {
                        width: 247px;
                        margin-right: 94px;
                        text-align: right;
                        display: inline-block;
                        position: relative;
                        &:after {
                            display: block;
                            content: '*';
                            color: red;
                            position: absolute;
                            right: -10px;
                            font-size: 18px;
                            top: 0px;
                        }
                    }
                    input {
                        width: 323px;
                        height: 46px;
                        padding-left: 10px;
                        box-sizing: border-box;
                    }
                    .address_picker {
                        color: #333;
                        display: inline-block;
                        .el-select {
                            width: 160px;
                        }
                        i {
                            color: #333;
                        }
                    }
                    .IDs {
                        display: block;
                        margin-left: 341px;
                        .ID_photo {
                            width: 510px;
                            height: 150px;
                            display: -webkit-box;
                            /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                            display: -moz-box;
                            /* 老版本语法: Firefox (buggy) */
                            display: -ms-flexbox;
                            /* 混合版本语法: IE 10 */
                            display: -webkit-flex;
                            /* 新版本语法: Chrome 21+ */
                            display: flex;
                            justify-content: space-between;
                            em {
                                display: block;
                                width: 240px;
                                height: 150px;
                                position: relative;
                                overflow: hidden;
                                img {
                                    width: 240px;
                                    height: 150px;
                                    display: block;
                                    position: absolute;
                                }
                                input {
                                    width: 150px;
                                    height: 240px;
                                    display: block;
                                    position: absolute;
                                    opacity: 0;
                                    transform: rotate(90deg);
                                    -ms-transform: rotate(90deg);
                                    -moz-transform: rotate(90deg);
                                    /* Firefox */
                                    -webkit-transform: rotate(90deg);
                                    /* Safari 和 Chrome */
                                    -o-transform: rotate(90deg);
                                    /* Opera */
                                    cursor: pointer;
                                    right: 45px;
                                    top: -110px;
                                    &.input_hidden {
                                        transform: rotate(-90deg);
                                        -ms-transform: rotate(-90deg);
                                        -moz-transform: rotate(-90deg);
                                        /* Firefox */
                                        -webkit-transform: rotate(-90deg);
                                        /* Safari 和 Chrome */
                                        -o-transform: rotate(-90deg);
                                        /* Opera */
                                        top: 32px;
                                    }
                                }
                            }
                        }
                        i {
                            color: #cbcbcd;
                            font-size: 12px;
                            display: block;
                            height: 25px;
                            line-height: 35px;
                        }
                        .ID_none,
                        .ID_have {
                            width: 100px;
                            height: 100px;
                            position: relative;
                            em {
                                display: block;
                                width: 100px;
                                height: 100px;
                                position: absolute;
                                overflow: hidden;
                            }
                            input {
                                width: 100px;
                                height: 100px;
                                display: block;
                                position: absolute;
                                right: 0;
                                top: 0;
                                overflow: hidden;
                                cursor: pointer;
                                opacity: 0;
                            }
                        }
                        .ID_have {
                            width: 240px;
                            height: 150px;
                            overflow: hidden;
                            em,
                            input {
                                width: 150px;
                                height: 240px;
                                display: block;
                                position: absolute;
                                opacity: 0;
                                transform: rotate(90deg);
                                -ms-transform: rotate(90deg);
                                -moz-transform: rotate(90deg);
                                /* Firefox */
                                -webkit-transform: rotate(90deg);
                                /* Safari 和 Chrome */
                                -o-transform: rotate(90deg);
                                /* Opera */
                                cursor: pointer;
                                right: 45px;
                                top: -110px;
                                &.input_hidden {
                                    transform: rotate(-90deg);
                                    -ms-transform: rotate(-90deg);
                                    -moz-transform: rotate(-90deg);
                                    /* Firefox */
                                    -webkit-transform: rotate(-90deg);
                                    /* Safari 和 Chrome */
                                    -o-transform: rotate(-90deg);
                                    /* Opera */
                                    top: 32px;
                                }
                            }
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
                .confirm_button {
                    width: 100%;
                    height: 35px;
                    padding-right: 25px;
                    box-sizing: border-box;
                    position: absolute;
                    bottom: 28px;
                    span {
                        display: block;
                        width: 120px;
                        height: 35px;
                        background-color: @commonColor;
                        text-align: center;
                        line-height: 35px;
                        color: #fff;
                        border-radius: 7px;
                        float: right;
                        cursor: pointer;
                        &:hover {
                            opacity: 0.6;
                        }
                    }
                }
            }
        }
    }
</style>


