<template>
    <!-- 翻页部分 -->
    <div class="page_turn">
        <div class='nodata' v-if="isshowNonelist">
            <img src='../../static/img/nosj.png'>
        </div>
        <div class="cd_fy" style="margin-top:5px;" v-if="!isshowNonelist">
            <span class="page_total">共{{pageNum}}条</span><span class="page_fy">1/{{totalpage}}页</span>
            <a href="javascript:void(0);" class="cd_fyzjt"><img src="../../static/img/zjt.png"></a>
            <a href="javascript:void(0);" class="cd_fyyjt" v-addclick><img src="../../static/img/yjt.png"></a>
            <span class="fy_tz">跳转到
                <input type="text" ><a href="javascript:void(0);" class='page_tz'>Go</a>
            </span>
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
            totalpage:{
                get(){
                    return Math.ceil(this.$store.state.pageNum/10)
                }
            },
            isshowNonelist: {
                get() {
                    return this.$store.state.isshowNonelist
                }
            },
            pageNum: {
                get() {
                    return this.$store.state.pageNum
                }
            },
            AllList: {
                get() {
                    return this.$store.state.onlinelist
                },
                set() {}
            } //宠物周边在售别彪,宠物服务在售列表数据,
        },
    
        watch: {
            pageNum(newval, oldval) {}
        },
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .nodata {
        text-align: center;
        padding-top: 100px;
        padding-bottom: 200px;
        background: #fff;
        height: 445px;
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
</style>


