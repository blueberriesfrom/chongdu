<template>
    <div class="invoice_list">
        <!-- 发票列表 -->
        <div class="fpgl_top">
            <div class="fpgl_h">
                <div class="xxk_tap">发票列表</div>
            </div>
            <div class="fp_cx">
                <span class="kjcx">快捷查询
                                                                        <input type="text" placeholder="请输入服务名称" name="head" maxlength="10">
                                                        </span>
                <span class="fp_time">
                                                    <span>时间</span>
                <el-date-picker v-model="ct" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
            </div>
            <div class="fp_ss">
                <span class="fp_sousuo" @click="choosesearch()">搜索</span>
            </div>
        </div>
        <div class="all_fp">
            <div class="afp_top">已开发票
                <!-- <a href="#" class="tm_px">按时间排序</a>
                                                        <a href="#" class="mc_px">按名称排序</a>
                                                        <a href="#" class="lb_px">按类别排序</a> -->
            </div>
            <div class="fp_table">
                <ul class="fp_table_title">
                    <li class='ykfp_zfsj'>申请时间</li>
                    <li class='fpsq_fwmc'>发票抬头</li>
                    <li class='fpsq_ddbh'>发票性质</li>
                    <li class='fpsq_sfje' style="color:#fff">发票状态</li>
                    <li class='fpsq_kpje'>发票总额</li>
                    <li class='fpsq_opera'>操作</li>
                </ul>
                <div class="nodata" v-if="invioceList.length == 0">
                    <img src="../../static/img/nodata.png" alt="">
                </div>
                <div class="havesj" v-if="invioceList.length !== 0">
                    <ul v-for="(item,index) in invioceList" :key="index" class="fp_table_body">
                        <li class='ykfp_zfsj'>{{item.ct | datesplite}}</li>
                        <li class='fpsq_fwmc'>{{item.head}}</li>
                        <li class='fpsq_ddbh' v-if="item.nature == 0">纸质</li>
                        <li class='fpsq_ddbh' v-if="item.nature == 1">电子</li>
                        <li class='fpsq_sfje' v-if="item.s == 2">申请中</li>
                        <li class='fpsq_sfje' v-if="item.s == 0">已寄出</li>
                        <li class='fpsq_sfje' v-if="item.s == 1">未通过</li>
                        <li class='fpsq_sfje' v-if="item.s == 4">已开票</li>
                        <li class='fpsq_sfje' v-if="item.s == 5">作废中</li>
                        <li class='fpsq_sfje' v-if="item.s == 6">已作废</li>
                        <li class='fpsq_kpje'>{{item.money}}元</li>
                        <li class='fpsq_opera'>
                            <span class="opera_none" @click="item.s == 5?false:true&&cancelinvoice(item)">作废</span>
                        </li>
                    </ul>
                    <div class="cd_fy" style="margin-top:5px;">
                        <span class="page_total">共{{listtotal}}条</span><span class="page_fy">{{page}}/{{totalpage}}页</span>
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
</template>
<script>
    export default {
        data() {
            return {
                ct: "", //时间
                head: '', //关键字
                page: 1, //当前页码,
                pageNum: '', //总页数
                searchpage: '', //搜索页数
                invioceList: [], //发票集合
                listtotal: "", //总条数
            }
        },
        watch: {
            page(val, oldval) {
                this.initvoicelist();
            },
            ct(val) {
                console.log(val)
            }
        },
        computed: {
            totalpage: {
                get() {
                    return Math.ceil(this.listtotal / 10)
                }
            }
        },
        created() {
            this.initvoicelist();
        },
        methods: {
            //点击作废
            cancelinvoice(item) {
                this.$msgbox({
                    title: "提示",
                    message: '您确定要作废此发票吗',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action == 'cancel') {
                            done()
                        } else if (action == 'confirm') {
                            this.$http({
                                url: "chongdu/orderinvoice/edit.do",
                                method: 'post',
                                params: {
                                    id: item.id,
                                    s: 5
                                }
                            }).then(res => {
                                console.log(res.data);
                                if (res.data.code == 0) {
                                    this.initvoicelist();
                                }
                            }).catch(err => {
                                console.log(err)
                            });
                            done()
                        }
                    }
                })
            },
            //点击搜索
            choosesearch() {
                if (this.searchname == "" || this.ct == "") {
                    this.$message({
                        message: '请输入关键字/时间',
                        type: 'warning'
                    })
                } else {
                    this.initvoicelist();
                    this.searchname = "";
                    this.ct = "";
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
                this.initvoicelist();
                this.searchpage = "";
            },
            //发票列表初始化
            initvoicelist() {
                this.$http({
                    url: '/chongdu/orderinvoice/list.do',
                    method: 'post',
                    params: {
                        ct: this.ct,
                        head: this.head,
                        page: this.page,
                    }
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        this.invioceList = res.data.rows;
                        this.listtotal = this.invioceList.length;
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
    .invoice_list {
        width: 100%;
        color: #333;
        .fpgl_top {
            border: 1px solid #f1f1f1;
            background: #fff;
            padding-bottom: 20px;
            .fpgl_h {
                font-size: 16px;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #96E0D9;
                div {
                    float: left;
                    width: 180px;
                    text-align: center;
                    border-right: 1px solid #EEEEEE;
                    cursor: pointer;
                }
                .xxk_tap {
                    background: #2EC2B4;
                    color: #fff;
                }
            }
            .fp_cx {
                padding-top: 35px;
                padding-left: 35px;
                .kjcx {
                    input {
                        box-sizing: border-box;
                        padding-left: 10px;
                        font-size: 14px;
                        width: 225px;
                        height: 38px;
                        margin-left: 15px;
                        border: 1px solid #c0bebe;
                    }
                }
                .fp_time {
                    margin-left: 320px;
                    span {
                        margin-right: 20px;
                    }
                    .shzc_year {
                        width: 92px;
                        height: 38px;
                        margin-left: 35px;
                        border: 1px solid #c0bebe;
                    }
                    .shzc_month,
                    .shzc_day {
                        width: 50px;
                        height: 38px;
                        border: 1px solid #c0bebe;
                    }
                }
            }
            .fp_ss {
                span {
                    display: block;
                    width: 90px;
                    height: 24px;
                    background-color: @commonColor;
                    color: #fff;
                    line-height: 24px;
                    text-align: center;
                    border-radius: 5px;
                    cursor: pointer;
                }
                margin-top: 35px;
                padding-left: 35px;
            }
        }
        .all_fp {
            margin-top: 10px;
            border: 1px solid #f1f1f1;
            background: #fff;
            .afp_top {
                font-size: 16px;
                height: 40px;
                line-height: 40px;
                padding-left: 25px;
                border-bottom: 1px solid #96E0D9;
                .tm_px {
                    margin-left: 640px;
                }
                .tm_px,
                .mc_px,
                .lb_px {
                    font-size: 12px;
                    font-weight: 400;
                    border: 1px solid #2EC2B4;
                    padding: 2px 6px;
                    border-radius: 7px;
                    margin-right: 20px;
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }
            .fp_table {
                .nodata {
                    height: 450px;
                    width: 100%;
                    overflow: hidden;
                    img {
                        display: block;
                        margin: 100px auto 0;
                    }
                }
                .havesj {
                    width: 100%;
                }
                .fp_table_title,
                .fp_table_body {
                    width: 100%;
                    height: 50px;
                    font-size: 14px;
                    line-height: 50px;
                    width: 100%;
                    background: #2EC2B4;
                    color: #fff;
                    border-bottom: 2px solid #2EC2B4;
                    padding-left: 7px;
                    box-sizing: border-box;
                    li {
                        float: left;
                        height: 100%;
                    }
                    .ykfp_zfsj {
                        width: 140px;
                        text-align: center;
                        input {
                            position: relative;
                            top: 2px;
                            margin-right: 10px;
                        }
                    }
                    .fpsq_fwmc {
                        width: 200px;
                        text-align: center;
                    }
                    .fpsq_ddbh {
                        width: 145px;
                        text-align: center;
                    }
                    .fpsq_sfje {
                        width: 170px;
                        text-align: center;
                        color: red;
                    }
                    .fpsq_kpje {
                        width: 150px;
                        text-align: center;
                    }
                    .fpsq_opera {
                        width: 200px;
                        text-align: center;
                        .opera_none {
                            width: 60px;
                            height: 24px;
                            border-radius: 7px;
                            background-color: @commonColor;
                            display: block;
                            color: #fff;
                            text-align: center;
                            line-height: 24px;
                            margin: 0 auto;
                            cursor: pointer;
                            &:hover {
                                opacity: 0.6;
                            }
                        }
                    }
                }
                .fp_table_body {
                    color: #333;
                    background-color: #fff;
                    border-bottom: 0;
                    border-bottom: 1px solid #f2f2f2;
                    &:nth-of-type(even) {
                        background-color: #f2f2f2;
                    }
                }
                .cd_fy {
                    text-align: right;
                    background: #fff;
                    padding-top: 15px;
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
                            width: 18px;
                            height: 18px;
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
</style>


