<template>
    <div class="publish_service">
        <div class="time_search">
            <div class="time_change">
                <span>按时间排序</span>
                <img src="../../../static/img/jx.png" alt="">
            </div>
            <div class="search_change">
                <input type="text" placeholder="请输入宠物名称">
                <label for="">
                                            <img src="../../../static/img/fdj.png" alt="">
                                        </label>
            </div>
        </div>
        <div class="publish_body">
            <ul class="publish_title">
                <li style="width:20px"></li>
                <li style="width:108px">服务标题</li>
                <li style="width:108px">类别</li>
                <li style="width:100px">价格(元)</li>
                <li style="width:115px">区域</li>
                <li style="width:138px">发布时间</li>
                <li style="width:127px">工作时间/每天</li>
                <li style="width:100px">状态</li>
                <li>操作</li>
            </ul>
            <!-- 列表,可循环 -->
            <div class="none_list" v-if="servicelist.length == 0">
                <img src="../../../static/img/nosj.png" alt="">
            </div>
            <div class="havelist" v-if="servicelist.length !== 0">
                <ul class="publish_list" v-for="(item,index) in servicelist" :key="index">
                    <li style="width:20px">
                    </li>
                    <li style="width:108px;overflow:hidden" :title="item.title">{{item.title}}</li>
                    <li style="width:108px">{{item.servicetype.servicename}}</li>
                    <li style="width:100px">{{item.price == undefined? "面议":item.price}}</li>
                    <li style="width:115px">{{item.allArea}}</li>
                    <li style="width:138px">{{item.ct | datesplite}}</li>
                    <li style="width:127px">
                        {{item.servicetimebegin | dataformate}} - {{item.servicetimeend | dataformate}}
                    </li>
                    <li style="width:100px" v-if="item.s == 0">在售</li>
                    <li style="width:100px" v-if="item.s == 1">未通过</li>
                    <li style="width:100px" v-if="item.s == 2">审核中</li>
                    <li style="width:100px" v-if="item.s == 3">下架</li>
                    <li>
                        <a href="javascript:void(0)" @click="godetailclick(item,3)">详细信息</a></li>
                </ul>
                <div class="page_turn">
                    <div class="cd_fy" style="margin-top:5px;">
                        <span class="page_total">共{{listtotal}}条</span><span class="page_fy">{{page}}/{{totalpage}}页</span>
                        <a href="javascript:void(0);" class="cd_fyzjt" @click="reducepage()">
                            <img src="../../../static/img/zjt.png">
                        </a>
                        <a href="javascript:void(0);" class="cd_fyyjt" @click="pluspage()">
                            <img src="../../../static/img/yjt.png">
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
                servicelist: [], //用来储存列表的数组
                page: 1, //当前页码
                name: '', //搜索的关键字
                sort: 'ct', //默认排序方式
                order: 'Desc', //默认Desc, 其他asc
                listtotal: '', //总条数
                currentpage: 1, //当前页数
                searchpage: "",
            }
        },
        computed: {
            totalpage: {
                get() {
                    return Math.ceil(this.listtotal / 10)
                }
            }
        },
        watch: {
            page(val, oldval) {
                this.initpetlist();
            }
        },
        created() {
            this.initservicelist();
        },
        methods: {
            //初始化数据
            initservicelist() {
                this.$http({
                    url: '/chongdu/goods/otherList.do',
                    method: 'post',
                    params: {
                        type: 2,
                        page: this.page,
                        name: this.name,
                        sort: this.sort,
                        order: this.order,
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.listtotal = res.data.total;
                        this.servicelist = res.data.rows;
                    }
                })
            },
            //点击事件排序
            chooseSort() {
                this.page =1;
                if (this.order == "Desc") {
                    this.order = "asc";
                } else if (this.order == "asc") {
                    this.order = "Desc";
                }
                this.initservicelist();
            },
            //点击搜索
            choosesearch() {
                 this.page =1;
                this.initservicelist();
                this.name = "";
            },
            //详情信息
            godetailclick(item, currentId) {
                this.base.godetail(item, currentId)
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
                this.initservicelist();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../static/css/common.less';
    .publish_service {
        width: 100%;
        .time_search {
            widows: 100%;
            height: 50px;
            padding-left: 40px;
            box-sizing: border-box;
             display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
            .time_change {
                width: 100px;
                height: 26px;
                border: 1px solid @commonColor;
                margin-right: 30px;
                margin-top: 12px;
                border-radius: 5px;
                line-height: 26px;
                padding-left: 6px;
                box-sizing: border-box;
                cursor: pointer;
                img {
                    vertical-align: middle;
                }
            }
            .search_change {
                width: 160px;
                height: 26px;
                border: 1px solid #c1bfbf;
                margin-top: 12px;
                border-radius: 5px;
                input {
                    width: 140px;
                    height: 100%;
                    box-sizing: border-box;
                    border: 0 !important;
                    outline: none;
                    box-shadow: none !important;
                    padding-left: 5px;
                }
                label {
                    cursor: pointer;
                }
            }
        }
        .publish_body {
            width: 100%;
            .publish_title {
                width: 100%;
                height: 45px;
                background-color: @commonColor;
                 display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                padding-left: 27px;
                box-sizing: border-box;
                li {
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    height: 100%;
                    line-height: 45px;
                    &:nth-last-child(1) {
                        flex: 1;
                    }
                }
            }
            .none_list {
                width: 100%;
                text-align: center;
                height: 300px;
                img {
                    width: 167px;
                    height: 130px;
                    margin-top: 50px;
                }
            }
            .havelist {
                .publish_list {
                    width: 100%;
                    height: 80px;
                    padding-left: 27px;
                    box-sizing: border-box;
                     display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                    &:nth-of-type(odd) {
                        background-color: #efefef;
                    }
                    .check_box {
                        width: 20px;
                        height: 20px;
                        margin: 30px auto;
                        img {
                            width: 20px;
                            height: 20px;
                            display: block;
                            cursor: pointer;
                        }
                    }
                    li {
                        color: #333;
                        font-size: 14px;
                        text-align: center;
                        height: 100%;
                        line-height: 80px;
                        &:nth-last-child(1) {
                            flex: 1;
                        }
                        a {
                            width: 80px;
                            height: 20px;
                            display: inline-block;
                            border: 1px solid @commonColor;
                            border-radius: 5px;
                            text-align: center;
                            line-height: 20px;
                            color: @commonColor;
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


