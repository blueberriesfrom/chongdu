<template>
    <!--实名,个体户,企业回显 -->
    <div class="data_retrieval">
        <ul>
            <li class="first_label">
                <label>真实姓名</label>
                <p>{{infodata.realname}}</p>
            </li>
            <li>
                <label>认证状态</label>
                <p v-if="infodata.s == 0">
                    <img src="../../../static/img/realname_have_update.png" alt="">
                    <span>企业已认证</span>
                </p>
                <p v-if="infodata.s == 1">
                    <img src="../../../static/img/realname_no_update.png" alt="">
                    <span>认证失败</span>
                </p>
                <p v-if="infodata.s == 2">
                    <img src="../../../static/img/realname_no_update.png" alt="">
                    <span>认证中</span>
                </p>
            </li>
            <li>
                <label>身份证号</label>
                <p>{{infodata.legalnumber}}</p>
            </li>
            <li>
                <label>身份证正面照片</label>
                <p>
                    <img :src="frontImg" style="width:22px;height:auto">
                    <span>身份证正面照已上传</span>
                </p>
            </li>
            <li>
                <label>身份证反面照片</label>
                <p>
                    <img :src="backImg" style="width:22px;height:auto">
                    <span>身份证反面照已上传</span>
                </p>
            </li>
            <li class="last_li">
                <label>手持身份证照片</label>
                <p>
                    <img :src="handImg" style="width:22px;height:auto">
                    <span>手持身份证已上传</span>
                </p>
            </li>
            <div class="passstatus">
                <!-- 未通过 -->
                <img src="../../../static/img/fail_passing_icon.png" v-if="infodata.s == 1">
                <!-- 审核中 -->
                <img src="../../../static/img/passing_icon.png" v-if="infodata.s == 2">
                <!-- 审核通过 -->
                <img src="../../../static/img/pass_icon.png" v-if="infodata.s == 0">
            </div>
        </ul>
        <div class="button_company">
            <span v-if="infodata.s == 1" @click="showform()">重新认证</span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              
            }
        },
        computed: {
            infodata: {
                get() {
                    return this.$props.companyObject
                }
            },
            frontImg: {
                get() {
                    if (this.infodata.imageList !== undefined) {
                        return this.infodata.imageList.filter(o => {
                            return o.customtype == 3
                        })[0].path
                    }
                }
            },
            backImg: {
                get() {
                    if (this.infodata.imageList !== undefined) {
                        return this.infodata.imageList.filter(o => {
                            return o.customtype == 4
                        })[0].path
                    }
                }
            },
            handImg: {
                get() {
                    if (this.infodata.imageList !== undefined) {
                        return this.infodata.imageList.filter(o => {
                            return o.customtype == 5
                        })[0].path
                    }
                }
            }
        },
        props: ['companyObject']
    }
</script>
<style lang="less" scoped>
    @import '../../../static/css/common.less';
    .data_retrieval {
        width: 100%;
        ul {
            width: 600px;
            margin-left: 150px;
            background-color: #f3f3f3;
            border: 1px solid #d0d0d0;
            position: relative;
            li {
                width: 100%;
                height: 52px;
                  display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                label {
                    display: block;
                    width: 133px;
                    background-color: #c9eae7;
                    height: 100%;
                    box-sizing: border-box;
                    border-bottom: 1px solid #d0d0d0;
                    font-size: 16px;
                    color: #6d6d6d;
                    text-align: center;
                    line-height: 52px;
                    overflow: hidden;
                }
                .first_label {
                    position: relative;
                    overflow: hidden;
                    &:after {
                        display: block;
                        content: "";
                        position: absolute;
                        background: url("../../../static/img/trangle.png") no-repeat center;
                        width: 35px;
                        height: 35px;
                        left: 0;
                        top: 0;
                    }
                }
                p {
                    display: block;
                    flex: 1;
                    height: 100%;
                    overflow: hidden;
                    border-bottom: 1px solid #d0d0d0;
                    padding-left: 26px;
                    box-sizing: border-box;
                    line-height: 52px;
                    position: relative;
                    img {
                        display: block;
                        float: left;
                        position: relative;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    span {
                        display: block;
                        float: left;
                        font-size: 12px;
                        margin-left: 12px;
                    }
                }
            }
            .last_li {
                label,
                p {
                    border-bottom: 0;
                }
            }
            .passstatus {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(50%, -50%);
                border-radius: 100%;
            }
        }
        .button_company {
            width: 100%;
            overflow: hidden;
            span {
                display: block;
                display: block;
                float: right;
                width: 120px;
                height: 35px;
                border-radius: 5px;
                background-color: @commonColor;
                text-align: center;
                color: #fff;
                line-height: 35px;
                font-size: 16px;
                margin-right: 75px;
                margin-top: 40px;
                cursor: pointer;
                opacity: 0.6;
            }
        }
    }
</style>


