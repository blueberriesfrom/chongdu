<template>
    <div class="onlist">
        <div class="publish_list">
            <div class="push_top">
                <div class="cwxqlb" v-for="(item,index) in onlistTab" :key="index" :class="{'liebiao_xz':currentId == item.titleid}" @click="choosecurrent(item)">{{item.title}}</div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                onlistTab: [{
                        title: '在售宠物列表',
                        titleid: 1,
                    },
                    {
                        title: '宠物商品列表',
                        titleid: 2,
                    },
                    {
                        title: '宠物服务列表',
                        titleid: 3,
                    },
                ],
                currentId: 1,
            }
        },      
        created() {
            this.initcolor();
        },
        methods: {
            //点击切换样式
            choosecurrent(item) {
                this.currentId = item.titleid;
                switch (this.currentId) {
                    case 1:
                        this.$router.push({
                            path: '/onList/pet'
                        });
                        break;
                    case 2:
                        this.$router.push({
                            path: '/onList/pet_product'
                        });
                        break;
                    case 3:
                        this.$router.push({
                            path: '/onList/pet_service'
                        })
                        break;
                    default:
                        break;
                }
            },
            //初始化当前样式
            initcolor(){
                if(this.$route.path.indexOf("/onList/pet") !== -1 && this.$route.path.indexOf("/onList/pet_product")== -1 && this.$route.path.indexOf("/onList/pet_service") == -1){
                   this.currentId = 1;
                }else  if(this.$route.path.indexOf("/onList/pet_product") !== -1){
                    this.currentId = 2;
                }else  if(this.$route.path.indexOf("/onList/pet_service") !== -1){
                    this.currentId = 3;
                }

            },   
        },
    }
</script>
<style lang='less'>
    @import '../../../static/css/common.less';
    .onlist {
        width: 100%;
        background-color: white;
        .publish_list {
            border: 1px solid #F1F1F1;
            background: #fff;
            width: 100%;
            .push_top {
                font-size: 16px;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #2EC2B4;
                div {
                    text-align: center;
                    width: 180px;
                    float: left;
                    border-right: 1px solid #DFDFDF;
                    cursor: pointer;
                    &.liebiao_xz {
                        background: #2EC2B4;
                        color: #fff;
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
                        line-height: 80px;
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
                        img {
                            width: 18px;
                            height: 18px;
                            position: absolute;
                            left: -17px;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        em {
                            position: absolute;
                            ;
                            left: 0;
                            top: 50%;
                            width: 110px;
                            transform: translateY(-50%);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            padding: 0 8px;
                            box-sizing: border-box;
                        }
                        span {
                            position: relative;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                        }
                        &:nth-of-type(1) {
                            overflow: visible;
                        }
                    }
                }
            }
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
        }
    }
</style>


