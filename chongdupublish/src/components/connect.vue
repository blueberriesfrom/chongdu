<template>
    <div class="connect">
        <label>联系人信息</label>
        <div class="connnet_content">
            <div class="address_list" v-if="Object.keys(onelist).length !== 0">
                <div class="address_name">
                    <span>{{onelist.name}}</span>
                    <img src="../../static/img/squery.png" v-if="onelist.isdefault == 1">
                    <i v-if="onelist.isdefault == 1">默</i>
                </div>
                <div class="address_phone">
                    <span>{{onelist.phonenumber}}</span>
                </div>
                <div class="address_street">
                    {{onelist.allArea+onelist.street}}
                </div>
            </div>
            <span class="button" v-if="addressList.length >= 2" @click="showaddresslist()">选择地址</span>
            <span class="button" v-if="addressList.length < 2 ">
                    <router-link to="/address/management">添加地址</router-link>
             </span>
        </div>
        <el-dialog title="选择地址" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false">
            <div class="list" v-for="(item,index) in addressList" :key="index" @click="checkitem(item,index)" :class="checkindex == index?'check':''">
                <div class="ischeck">
                    <img src="../../static/img/no_check.png" v-if="checkindex !== index">
                    <img src="../../static/img/inputxz.png" v-if="checkindex == index">
                </div>
                <div class="list_context">
                    <div class="list_name">
                        <span v-text="item.name"></span>
                        <img src="../../static/img/squery.png" v-if="item.isdefault == 1">
                        <i v-if="item.isdefault == 1">默</i>
                    </div>
                    <div class="list_tel" v-text="item.phonenumber">
                      
                    </div>
                    <div class="list_text" v-text="item.allArea+item.street">
                    </div>
                    <img src="../../static/img/checkimg.png" class="checkImg" v-if="checkindex == index">
                </div>
            </div>
            <div class="add_more">
                <div class="add_text">
                    <router-link to="/address/management">
                        <img src="../../static/img/add_blue.png" alt="">
                        <span>添加新的地址</span>
                    </router-link>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmItem()">确认地址</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                addressList: [], //地址集合
                onelist: {}, //只显示页面上一条的地址信息
                dialogVisible: false, //是否显示信息列表
                checkindex: -1, //选中的索引
                checkItem: {}, //选中的当前的item
            }
        },
        mounted() {
            this.initaddresslist();
        },
        methods: {
            //点击确认地址
            confirmItem() {
                this.onelist = this.checkItem;
                this.$store.state.publishid = this.onelist.id;
                this.dialogVisible = false;
            },
            //点击选择当前
            checkitem(item, index) {
                this.checkindex = index;
                this.checkItem = item;
            },
            //点击显示弹窗
            showaddresslist() {
                this.dialogVisible = true;
            },
            //获取地址信息
            initaddresslist() {
                this.$http({
                    url: '/chongdu/address/list.do',
                    method: 'post',
                }).then(res => {
                    if (res.data.code == 0) {
                        this.addressList = res.data.rows;
                        if (this.addressList.length > 0) {
                            this.onelist = this.addressList.filter(o => {
                                return o.isdefault == 1
                            })
                            if (this.onelist.length == 0) {
                                this.onelist = this.addressList[0];
                            } else {
                                this.onelist = this.onelist[0];
                            }
                            this.$store.state.publishid = this.onelist.id;
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .connect {
        width: 100%;
        height: 300px;
        padding-left: 15px;
        label {
            display: inline-block;
            width: 80px;
            position: relative;
            &:before {
                position: absolute;
                content: "*";
                color: red;
                left: 85px;
                top: 3px;
            }
        }
        .connnet_content {
            width: 600px;
            display: inline-block;
            vertical-align: top;
            margin-left: 73px;
            .button {
                width: 135px;
                display: block;
                text-align: center;
                height: 38px;
                line-height: 38px;
                border-radius: 5px;
                font-size: 16px;
                outline: none;
                border: 0;
                border: 1px dashed @commonColor;
                background-color: #dff9f6;
                color: #357f77;
                cursor: pointer;
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    line-height: 36px;
                }
            }
            .address_list {
                width: 100%;
                height: 40px;
                padding-right: 10px;
                margin-bottom: 30px;
                background-color: #f7f7f7;
                display: -moz-box;
                /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;
                /* 混合版本语法: IE 10 */
                display: -webkit-flex;
                /* 新版本语法: Chrome 21+ */
                display: flex;
                .address_name {
                    width: 152px;
                    height: 100%;
                    background-color: #dff9f6;
                    font-size: 16px;
                    text-align: center;
                    line-height: 40px;
                    position: relative;
                    padding: 0 10px;
                    box-sizing: border-box;
                    overflow: hidden;
                    img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 1999;
                    }
                    i {
                        position: absolute;
                        left: 3px;
                        top: -13px;
                        z-index: 2000;
                        font-size: 12px;
                        color: #fff;
                    }
                }
                .address_phone {
                    width: 150px;
                    height: 100%;
                    line-height: 40px;
                    text-align: center;
                    overflow: hidden;
                }
                .address_street {
                    max-width: 435px;
                    height: 100%;
                    line-height: 40px;
                    overflow: hidden;
                }
            }
        }
        .el-dialog {
            .el-dialog__header {
                padding: 0;
                height: 30px;
                line-height: 30px;
                background-color: @commonColor;
                padding-left: 15px;
                .el-dialog__title {
                    font-size: 12px;
                    color: #fff;
                }
                .el-dialog__headerbtn {
                    right: 5px;
                    top: 5px;
                    .el-dialog__close {
                        color: #fff;
                        font-weight: 600;
                    }
                }
            }
            .el-dialog__body {
                padding: 23px 18px;
                min-height: 370px;
                box-sizing: border-box;
                width: 100%;
                .list {
                    width: 100%;
                    height: 36px;
                    margin-bottom: 18px;
                    display: -moz-box;
                    /* 老版本语法: Firefox (buggy) */
                    display: -ms-flexbox;
                    /* 混合版本语法: IE 10 */
                    display: -webkit-flex;
                    /* 新版本语法: Chrome 21+ */
                    display: flex;
                    cursor: pointer;
                    .ischeck {
                        width: 47px;
                        height: 100%;
                        position: relative;
                        img {
                            width: 16px;
                            height: 16px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            display: block;
                            transform: translate(-50%, -50%);
                        }
                    }
                    .list_context {
                        flex: 1;
                        height: 100%;
                        display: -moz-box;
                        /* 老版本语法: Firefox (buggy) */
                        display: -ms-flexbox;
                        /* 混合版本语法: IE 10 */
                        display: -webkit-flex;
                        /* 新版本语法: Chrome 21+ */
                        display: flex;
                        position: relative;
                        .list_name {
                            width: 127px;
                            height: 100%;
                            background-color: #f1f1f1;
                            color: #b4b2b2;
                            line-height: 36px;
                            padding: 0 10px;
                            box-sizing: border-box;
                            text-align: center;
                            overflow: hidden;
                            img {
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: 1999;
                            }
                            i {
                                position: absolute;
                                left: 3px;
                                top: -8px;
                                z-index: 2000;
                                font-size: 12px;
                                color: #fff;
                            }
                        }
                        .list_tel {
                            width: 124px;
                            height: 100%;
                            background-color: #f7f7f7;
                            line-height: 36px;
                            padding: 0 10px;
                            box-sizing: border-box;
                            text-align: center;
                            overflow: hidden;
                            color: #b4b2b2;
                        }
                        .list_text {
                            flex: 1;
                            height: 100%;
                            background-color: #f7f7f7;
                            line-height: 36px;
                            padding-right: 10px;
                            box-sizing: border-box;
                            overflow: hidden;
                            color: #b4b2b2;
                        }
                        .checkImg {
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                    }
                    &.check {
                        .list_context {
                            .list_name {
                                background-color: #dff9f6;
                                color: #333;
                            }
                            .list_tel,
                            .list_text {
                                background-color: #eefaf9;
                                color: #333;
                            }
                        }
                    }
                }
                .add_more {
                    width: 100%;
                    height: 35px;
                    .add_text {
                        width: 110px;
                        height: 100%;
                        float: right;
                        position: relative;
                        cursor: pointer;
                        span {
                            font-size: 14px;
                            color: #7b92f7;
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        img {
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                }
            }
            .el-dialog__footer {
                padding: 0;
                padding-bottom: 18px;
                text-align: center;
                .el-button--primary {
                    width: 137px;
                    height: 39px;
                    font-size: 16px;
                }
            }
        }
    }
</style>


