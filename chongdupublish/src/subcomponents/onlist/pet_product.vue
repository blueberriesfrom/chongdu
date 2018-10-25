<template>
    <div class="pet_product">
        <div class="push_search">
            <a class='time_xs' @click="chooseSort()">按时间排序&nbsp;&nbsp;
                                                <img src="../../../static/img/sx.png">
                                 </a>
            <span class="fdj_pic">
                                    <i @click="choosesearch()"></i>
                                    <input type="text" name='search' placeholder="请输入宠物名称" maxlength="10" v-model="searchname">
                      </span>
        </div>
        <div class="cwfb_list">
            <div class="cwfb_list_title">
                <div class="title_width" v-for="(item,index) in titletwo" :key="index" :style="{width:item.width}">
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div class="nosj" v-if="isshowNonelist">
                <img src='../../../static/img/nosj.png'>
            </div>
            <div class="havesj" v-if="!isshowNonelist">
                <div class="cwfb_list_body" v-for="(item,index) in productlist" :key="index">
                    <div class="list_item" style="width:110px">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="list_item" style="width:90px">
                        <span>{{item.goodstype.name}}</span>
                    </div>
                    <div class="list_item" style="width:80px">
                        <span>{{item.price}}</span>
                    </div>
                    <div class="list_item" style="width:100px">
                        <span>{{item.allArea}}</span>
                    </div>
                    <div class="list_item" style="width:150px">
                        <span>{{item.ct|datesplite}}</span>
                    </div>
                    <div class="list_item" style="width:100px">
                        <span>{{item.stock}}</span>
                    </div>
                    <div class="list_item" style="width:60px">
                        <span>无数据</span>
                    </div>
                    <div class="list_item" style="width:300px">
                        <div class="list_item_1">
                            <p>
                                <span @click="godetailclick(item,2)">详细信息</span>
                            </p>
                            <p>
                                <span @click="goundercarriage(item,2)" style="background-color:#2ec2b4;color:#fff">下架</span>
                            </p>
                        </div>
                        <div class="list_item_1">
                            <p><span @click="goextansioncenter(item,2,$event)" data-link-type="extansion">推广中心</span></p>
                            <p><span @click="goextansioncenter(item,2,$event)" data-link-type="preference">优选</span></p>
                        </div>
                        <div class="list_item_1">
                            <p><span @click="goextansioncenter(item,2,$event)" data-link-type="settop">置顶</span></p>
                            <p><span @click="goextansioncenter(item,2,$event)" data-link-type="refresh">刷新</span></p>
                        </div>
                    </div>
                </div>
                <div class="cd_fy" style="margin-top:5px;">
                    <span class="page_total">共{{pageNum}}条</span><span class="page_fy">{{page}}/{{totalpage}}页</span>
                    <a href="javascript:void(0);" class="cd_fyzjt"><img src="../../../static/img/zjt.png" @click="reducepage()"></a>
                    <a href="javascript:void(0);" class="cd_fyyjt"><img src="../../../static/img/yjt.png" @click="pluspage()"></a>
                    <span class="fy_tz">跳转到
                                    <input type="text" v-model="searchpage">
                                    <a href="javascript:void(0);" class='page_tz' @click="choosepage()">Go</a>
                                </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isshowNonelist: false, //是否有数据
                titletwo: [{
                        title: "商品标题",
                        width: "110px"
                    }, {
                        title: "类别",
                        width: "90px"
                    }, {
                        title: "价格(元)",
                        width: "80px"
                    }, {
                        title: "区域",
                        width: "100px"
                    }, {
                        title: "发布时间",
                        width: "150px"
                    },
                   {
                        title: "库存",
                        width: "100px"
                    },
                    {
                        title: "已售",
                        width: "60px"
                    },
                    {
                        title: "操作",
                        width: "300px"
                    }
                ],
                searchname: '', //搜索参数的名字
                productlist: [], //初始化数据
                type: 1, //宠物商品
                page: 1, //当前页
                sort: "Desc", //默认排序
                pageNum: '', //总页数
                searchpage: '', //搜索页数
            }
        },
        created() {
            this.initproduct();
        },
        watch: {
            page(val, oldval) {
                this.initproduct();
            }
        },
        computed: {
            totalpage: {
                get() {
                    return Math.ceil(this.pageNum / 10)
                }
            }
        },
        methods: {
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
                this.initproduct();
            },
            //点击搜索
            choosesearch() {
                if (this.searchname == "") {
                    this.$message({
                        message: '请输入关键字',
                        type: 'warning'
                    })
                } else {
                    this.initproduct();
                    this.searchname = "";
                }
            },
            //点击排序
            chooseSort() {
                this.page = 1;
                if (this.sort == "Desc") {
                    this.sort = "asc";
                } else if (this.sort == "asc") {
                    this.sort = "Desc";
                }
                this.initproduct();
            },
            //推广中心currentId传2;
            goextansioncenter(item, currentId, event) {
                this.base.goextansion(item, currentId, event)
            },
            //下架currentId传2;
            goundercarriage(item, currentId) {
                this.base.undercarriage(item, currentId);
                this.initproduct();
            },
            //去详细信息,currentId传2;
            godetailclick(item, currentId) {
                this.base.godetail(item, currentId)
            },
            //初始化数据
            initproduct() {
                this.$http({
                    url: "/chongdu/goods/list.do",
                    params: {
                        type: this.type,
                        s: 0,
                        page: this.page,
                        pdtname: this.searchname,
                        sort: "ct",
                        order: this.sort
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        if (res.data.rows == 0) {
                            this.isshowNonelist = true;
                        } else {
                            this.isshowNonelist = false;
                            this.pageNum = res.data.total;
                            this.productlist = res.data.rows;
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../static/css/common.less';
    .pet_product {
        .push_search {
            height: 50px;
            line-height: 45px;
            cursor: pointer;
            a {
                margin-left: 40px;
                padding: 4px 10px;
                border: 1px solid #2EC2B4;
                font-size: 12px;
                border-radius: 5px;
                &:hover {
                    opacity: 0.6;
                }
            }
            span {
                position: relative;
                i {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: url(../../../static/img/fdj.png);
                    top: 5px;
                    right: 10px;
                    cursor: pointer;
                }
                input {
                    border-radius: 10px;
                    border: 1px solid #C4C4C4;
                    width: 160px;
                    margin-left: 30px;
                    outline: none;
                    font-size: 12px;
                    box-sizing: border-box;
                    padding-left: 15px;
                    height: 25px;
                    padding-right: 25px;
                    &:focus {
                        border: 1px solid #3DA9DD;
                    }
                }
            }
        }
        .cwfb_list {
            //表单列表
            width: 100%;
            overflow: hidden;
            .cwfb_list_title {
                width: 100%;
                height: 45px;
                background-color: @commonColor;
                  display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                padding-left: 24px;
                .title_width {
                    height: 100%;
                    text-align: center;
                    font-size: 16px;
                    color: #fff;
                    line-height: 45px;
                }
            }
            .nosj {
                width: 100%;
                height: 350px;
                img {
                    display: block;
                    margin: 100px auto 0;
                }
            }
            .cwfb_list_body {
                width: 100%;
                height: 80px;
                border-bottom: 1px solid #efefef;
                  display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                padding-left: 24px;
                box-sizing: border-box;
                &:nth-of-type(even) {
                    background-color: #efefef;
                }
                .list_item {
                    height: 80px;
                    text-align: center;
                    position: relative;
                    padding: 0 10px;
                    box-sizing: border-box;
                    overflow: hidden;
                     display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                    .list_item_1 {
                        flex: 1;
                        height: 80px;
                        padding: 10px 0;
                        box-sizing: border-box;
                        p {
                            display: block;
                            height: 50%;
                            width: 100%;
                            box-sizing: border-box;
                            text-align: center;
                            line-height: 50px;
                            position: relative;
                            span {
                                width: 80px;
                                height: 20px;
                                border-radius: 7px;
                                display: block;
                                border: 1px solid @commonColor;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                transform: translate(-50%, -50%);
                                line-height: 20px;
                                color: @commonColor;
                                cursor: pointer;
                            }
                        }
                    }
                    span {
                        display: block;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        padding: 0 8px;
                        box-sizing: border-box;
                    }
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
</style>


