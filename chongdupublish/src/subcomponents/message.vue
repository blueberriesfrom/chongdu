<template>
    <div class="message">
        <div class="tzxx_fr">
            <div class="tzxx_tc">
                <a href="javascript:void(0);">
                    <img src="../../static/img/xxx.png">
                </a>
                <div class="tzxx_tctop">系统消息</div>
                <div class="tzxx_tcbt">读取中</div>
                <div class="tzxx_jwrq">读取中</div>
                <div class="tzxx_tcnr">读取中</div>
            </div>
            <div class="tzxx_top">
                <div class="tzxx_qbtap fl" :class="item.itemid ==isclickindex ?'liebiao_xz':''" v-for="(item,index) in titleitems" :key="index" @click="choosetype(item)">{{item.name}}</div>
                <!-- <div class="tzxx_xttap fl">系统消息</div>
                                    <div class="tzxx_kftap fl">客服消息</div> -->
                <!-- <div class="tzxx_jftap fl">积分消息</div>
                                                <div class="tzxx_zftap fl">支付消息</div> -->
            </div>
            <div class="tzxx_qbdiv">
                <!-- <div class="tzxx_read">
                                                    <a href="javascript:void(0);" class="tzxx_del">删除</a>
                                                    <a href="javascript:void(0);" class="tzxx_yyd">已读</a>
                                                </div> -->
                <div class="xxnr_box" cellpadding="0" cellspacing="0">
                    <div class="xxnr_box_title">
                        <el-col :span="6">消息类型</el-col>
                        <el-col :span="6">消息标题</el-col>
                        <el-col :span="4">消息时间</el-col>
                        <el-col :span="3">状态</el-col>
                        <el-col :span="5">操作</el-col>
                    </div>
                    <div class="nosj" v-if="lastlist.length <= 0">
                        <img src="../../static/img/nomessage.png" alt="">
                    </div>
                    <div class="xxnr_box_body" v-if="lastlist.length >0">
                        <div class="xxnr_box_body_list" v-for="(item,index) in lastlist" :key="index">
                            <el-col :span="6">
                                <div class="grid-content bg-purple">
                                    <div class="check_box" @click="ischeckedItem(item,lastlist)">
                                        <img src="../../static/img/inputxz.png" v-if="item.ischecked == true">
                                        <img src="../../static/img/no_check.png" v-if="item.ischecked == false">
                                    </div>
                                    <em v-if="isclickindex == 0">系统消息</em>
                                    <em v-if="isclickindex == 1">审核消息</em>
                                    <em v-if="isclickindex== 2">积分消息</em>
                                    <em v-if="isclickindex == 3">支付消息</em>
                                </div>
                            </el-col>
                            <el-col :span="6">{{item.title}}</el-col>
                            <el-col :span="4">{{item.pushtime | datesplite}}</el-col>
                            <el-col :span="3">
                                <div class="grid-content bg-purple">
                                    <i v-if="item.s == 0">未读</i>
                                    <i v-if="item.s == 1">已读</i>
                                </div>
                            </el-col>
                            <el-col :span="5">
                                <div class="grid-content bg-purple">
                                    <i class="xxnr_detail" @click="messagedetail(item)">详细信息</i>
                                </div>
                            </el-col>
                        </div>
                        <div class="cd_fy" style="margin-top:5px;">
                            <span class="fy_btn">
                                        <div @click="checkedAll(lastlist)" style='cursor:pointer'>
                                                                                                              <img src="../../static/img/inputxz.png" v-if="ischeckedAll">
                                        <img src="../../static/img/no_check.png" v-if="!ischeckedAll"> 
                                </div>
                                <a href="javascript:void(0);" class='sc_pic' style='left:46px;' @click="dellist(lastlist)">删除</a>
                                    </span>
                            <span class="page_total">共{{lastlist.length}}条</span><span class="page_fy">{{page}}/{{totalpage}}页</span>
                            <a href="javascript:void(0);" class="cd_fyzjt" @click="reducepage()">
                                <img src="../../static/img/zjt.png">
                            </a>
                            <a href="javascript:void(0);" class="cd_fyyjt" @click="pluspage()">
                                <img src="../../static/img/yjt.png">
                            </a>
                            <span class="fy_tz">跳转到
                                            <input type="text" v-model="searchpage">
                                                        <a href="javascript:void(0);" class='page_tz' @click="choosepage()">Go</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="dialog" :visible.sync="dialogVisible" width="730px" :close-on-click-modal=false >
            <div class="dialog_body">
                <h4>{{detailObj.title}} <span>{{detailObj.ct}}</span></h4>
                <div class="dialog_content">
                    <div class="content_img" v-if="detailObj.imageList == 'undefined'">
                        <img :src="msgImg" alt="">
                        <img src="../../static/img/1366_dog.png" alt="">
                    </div>
                    <div class="content_text">
                        <p>{{detailObj.content}}</p>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
         inject:['reload'], //注入依赖
        data() {
            return {
                page: 1, //当前页码
                noticelist: [], //通知信息消息
                titleitems: [{
                    name: '系统消息',
                    itemid: 0
                }, {
                    name: '审核消息', //审核
                    itemid: 1
                }, {
                    name: '积分消息',
                    itemid: 2
                }, {
                    name: '支付消息',
                    itemid: 3
                }],
                isclickindex: 0, //默认显示全部消息
                dialogVisible: false, //是否显现详情的弹框
                dialog: '系统消息', //消息弹框的标题
                lastlist: [], //接收过滤后的数组
                ischeckedAll: false, //全部是否删除
                searchpage: "", //搜索的页面
                detailObj: {}, //详情信息对象
                msgImg: "", //详情的图片
            }
        },
        created() {
            this.initmessage();
        },
        watch: {
            noticelist(val) {
                deep: true
            },
            page(val, oldval) {
                this.initmessage();
            }
        },
        computed: {
            totalpage: {
                get() {
                    return Math.ceil(this.lastlist.length / 10)
                }
            }
        },
        methods: {
            //点击显示详情
            messagedetail(item) {
                this.$http({
                    url: "/chongdu/notice/noticeInfo.do?id=" + item.id,
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.dialogVisible = true;
                        this.detailObj = res.data.item;
                        this.isclickindex = detailObj.type;
                        if (res.data.item.imageList !== undefined) {
                            this.msgImg = res.data.item.imageList[0].path;
                        };
                        this.initmessage();
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //初始话消息
            initmessage() {
                this.$http({
                    url: '/chongdu/notice/list.do',
                    method: 'post',
                    params: {
                        page: this.page
                    },
                }).then(res => {
                    if (res.data.code == 0) {
                        $(res.data.rows).each((i, ele) => {
                            ele.ischecked = false;
                        })
                        this.noticelist = res.data.rows;
                        this.lastlist = this.noticelist.filter(ele => {
                            ele.ischecked = false;
                            if (ele.s == 0) {
                                return ele
                            }
                        })
                        console.log(this.lastlist)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //选择类型,是否增加点击样式
            choosetype(item) {
                this.isclickindex = item.itemid;
                this.ischeckedAll = false;
                this.page = 1;
                if (this.isclickindex == 0) {
                    this.lastlist = this.noticelist.filter(ele => {
                        ele.ischecked = false;
                        if (ele.s == 0) {
                            return ele
                        }
                    })
                } else if (this.isclickindex == 1) {
                    this.lastlist = this.noticelist.filter(ele => {
                        ele.ischecked = false;
                        if (ele.s == 1) {
                            return ele
                        }
                    })
                } else if (this.isclickindex == 2) {
                    this.lastlist = this.noticelist.filter(ele => {
                        ele.ischecked = false;
                        if (ele.s == 2) {
                            return ele
                        }
                    })
                } else if (this.isclickindex == 3) {
                    this.lastlist = this.noticelist.filter(ele => {
                        ele.ischecked = false;
                        if (ele.s == 3) {
                            return ele
                        }
                    })
                }
            },
            //选中每一项,单选
            ischeckedItem(item, alllist) {
                this.base.isCheckedItem(item, alllist, (check) => {
                    alllist.ischeckedall = check;
                    this.ischeckedAll = check;
                });
            },
            //全选
            checkedAll(alllist) {
                this.base.ischeckedAll(alllist, (check) => {
                    this.ischeckedAll = check;
                });
            },
            //点击删除
            dellist(alllist) {
                console.log(alllist)
                if (alllist.filter(o => {
                        if (o.ischecked == true) {
                            return o
                        }
                    }).length <= 0) {
                    this.$message({
                        message: '请至少选择一项',
                        type: 'warning'
                    })
                } else {
                    //    调用删除的接口
                    let ids = alllist.filter(o => {
                        return o.ischecked == true
                    }).map((ele, i) => {
                        return ele.id
                    }).join(",");
                    this.$http({
                        url: '/chongdu/notice/delete.do',
                        method: 'post',
                        params: {
                            ids: ids
                        }
                    }).then(res => {
                        console.log(res.data);
                        if (res.data.code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.initmessage();
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            //点击上一页
            reducepage() {
                this.page--;
                if (this.page < 1) {
                    this.page = 1
                }
            },
            //点击下一页
            pluspage() {
                this.page++;
                if (this.page > this.totalpage) {
                    this.page = this.totalpage
                }
            },
            //点击跳转到某一页
            choosepage() {
                this.page = this.searchpage;
                this.initmessage();
            }
        },
    }
</script>

<style lang="less">
    @import '../../static/css/common.less';
    .message {
        width: 100%;
        color: #333;
        .tzxx_fr {
            background: #fff;
            border: 1px solid #f1f1f1;
            position: relative;
            .tzxx_tc {
                position: absolute;
                background: #fff;
                left: 110px;
                top: 0px;
                width: 725px;
                border: 1px solid #A0A0A0;
                z-index: 7788;
                display: none;
                padding-left: 18px;
                padding-right: 18px;
                height: 500px;
                a {
                    position: absolute;
                    right: 20px;
                    top: 17px;
                }
                .tzxx_tctop {
                    height: 50px;
                    line-height: 50px;
                    text-align: left;
                    font-size: 22px;
                    border-bottom: 1px solid #C4C3C3;
                    padding-left: 16px;
                }
                .tzxx_tcbt {
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    font-size: 24px;
                }
                .tzxx_tcnr {
                    padding-left: 100px;
                    padding-right: 100px;
                    height: 300px;
                    overflow-y: scroll;
                    line-height: 24px;
                    img {
                        width: 500px;
                        height: 230px;
                    }
                }
                .tzxx_jwrq {
                    text-align: right;
                    margin-right: 115px;
                    margin-bottom: 10px;
                    font-size: 12px;
                }
            }
            .tzxx_top {
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #2EC2B4;
                .tzxx_qbtap,
                .tzxx_xttap,
                .tzxx_kftap,
                .tzxx_jftap,
                .tzxx_zftap {
                    width: 110px;
                    text-align: center;
                    border-right: 1px solid #EAEAEA;
                    cursor: pointer;
                    font-size: 16px;
                    &.liebiao_xz {
                        background: @commonColor;
                        color: #fff;
                    }
                }
            }
            .tzxx_qbdiv {
                .tzxx_read {
                    height: 30px;
                    line-height: 30px;
                    background: #EAEAEA;
                    border-bottom: 2px solid #A6A6A6;
                    .tzxx_del,
                    .tzxx_yyd {
                        background: #2EC2B4;
                        color: #fff;
                        font-size: 12px;
                        padding: 3px 15px;
                        border-radius: 7px;
                        margin-left: 30px;
                    }
                }
                .xxnr_box {
                    width: 100%;
                    .xxnr_box_title {
                        width: 100%;
                        overflow: hidden;
                        border-bottom: 1px solid #eaeaea;
                        .el-col-6,
                        .el-col-3,
                        .el-col-4,
                        .el-col-5 {
                            height: 60px;
                            text-align: center;
                            line-height: 60px;
                            font-size: 16px;
                        }
                    }
                    .nosj {
                        width: 100%;
                        height: 400px;
                        overflow: hidden;
                        img {
                            display: block;
                            margin: 50px auto;
                        }
                    }
                    .xxnr_box_body {
                        width: 100%;
                        .xxnr_box_body_list {
                            width: 100%;
                            height: 50px;
                            border-bottom: 1px solid #eaeaea;
                            .el-col-6,
                            .el-col-3,
                            .el-col-4,
                            .el-col-5 {
                                height: 50px;
                                text-align: center;
                                line-height: 50px;
                                font-size: 14px;
                                overflow: hidden;
                                .bg-purple {
                                    position: relative;
                                    height: 50px;
                                    overflow: hidden;
                                    line-height: 50px;
                                    position: relative;
                                    .check_box {
                                        width: 20px;
                                        height: 20px;
                                        display: block;
                                        position: absolute;
                                        left: 50px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        img {
                                            width: 20px;
                                            height: 20px;
                                            display: block;
                                            cursor: pointer;
                                        }
                                    }
                                    input {
                                        width: 16px;
                                        height: 16px;
                                        position: absolute;
                                        top: 50%;
                                        left: 75px;
                                        transform: translateY(-50%);
                                        margin: 0;
                                    }
                                    i {
                                        position: relative;
                                        margin: 0 auto;
                                        border: 1px solid @commonColor;
                                        padding: 3px 5px;
                                        border-radius: 7px;
                                    }
                                    .xxnr_detail {
                                        color: @commonColor;
                                        padding: 3px 10px;
                                        border-radius: 7px;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                    }
                    .cd_fy {
                        text-align: right;
                        background: #fff;
                        padding-top: 15px;
                        padding-left: 15px;
                        padding-bottom: 15px;
                        font-size: 14px;
                        position: relative;
                        .invoice {
                            width: 75px;
                            height: 30px;
                            background-color: @commonColor;
                            display: block;
                            border-radius: 7px;
                            color: #fff;
                            text-align: center;
                            line-height: 30px;
                            position: relative;
                            left: 50px;
                            top: 20px;
                        }
                        .fy_btn {
                            position: absolute;
                            left: 30px;
                            top: 15px;
                            input {
                                z-index: 2000;
                                position: absolute;
                                width: 18px;
                                height: 18px;
                                visibility: hidden;
                            }
                            img {
                                width: 20px;
                                height: 20px;
                                position: absolute;
                                left: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                z-index: 1999;
                            }
                            a {
                                display: inline-block;
                                width: 60px;
                                height: 22px;
                                background: #2EC2B4;
                                color: #fff;
                                text-align: center;
                                font-size: 12px;
                                line-height: 22px;
                                border-radius: 7px;
                                margin-left: 30px;
                            }
                        }
                        .page_total {
                            margin-right: 10px;
                        }
                        .cd_fyzjt {
                            position: relative;
                            width: 26px;
                            display: inline-block;
                            margin-left: 15px;
                            margin-right: 2px;
                            img {
                                position: absolute;
                                top: -20px;
                                left: 0px;
                            }
                            &:hover {
                                opacity: 0.6;
                            }
                        }
                        .cd_fyyjt {
                            position: relative;
                            width: 26px;
                            display: inline-block;
                            margin-left: 2px;
                            margin-right: 15px;
                            img {
                                position: absolute;
                                top: -20px;
                                left: 0px;
                            }
                        }
                        .fy_tz {
                            input {
                                background: #F3F3F3;
                                border: 1px solid #E6E6E6;
                                height: 21px;
                                width: 30px;
                                margin-left: 5px;
                                margin-right: 5px;
                                text-align: center;
                            }
                            a {
                                margin-right: 35px;
                                border: 1px solid #E6E6E6;
                                display: inline-block;
                                height: 23px;
                                line-height: 23px;
                                width: 24px;
                                text-align: center;
                                background: #F3F3F3;
                                font-size: 14px;
                                &:hover {
                                    opacity: 0.6;
                                }
                            }
                        }
                    }
                }
            }
        }
        .el-dialog {
            .el-dialog__header {
                padding: 0 20px;
                .el-dialog__title {
                    font-size: 22px;
                    font-weight: 500;
                    width: 100%;
                    display: block;
                    height: 55px;
                    line-height: 55px;
                    border-bottom: 1px solid #c4c3c3;
                }
            }
            .el-dialog__body {
                padding: 0 20px;
                min-height: 200px;
                padding-bottom: 40px;
                overflow: auto;
                .dialog_body {
                    width: 530px;
                    margin: 0 auto;
                    h4 {
                        width: 100%;
                        height: 78px;
                        line-height: 78px;
                        font-size: 24px;
                        text-align: center;
                        position: relative;
                        span {
                            position: absolute;
                            right: 0;
                            bottom: -30px;
                            font-size: 12px;
                        }
                    }
                    .dialog_content {
                        width: 100%;
                        margin-top: 10px;
                        .content_img {
                            display: -webkit-box;
                            /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                            display: -moz-box;
                            /* 老版本语法: Firefox (buggy) */
                            display: -ms-flexbox;
                            /* 混合版本语法: IE 10 */
                            display: -webkit-flex;
                            /* 新版本语法: Chrome 21+ */
                            display: flex;
                            height: 210px;
                            justify-content: space-between;
                            img {
                                width: 260px;
                                height: 210px;
                            }
                        }
                        .content_text {
                            width: 100%;
                            p {
                                font-size: 18px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

