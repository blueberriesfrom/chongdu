<template>
    <div class="post_msg">
        <!-- 发布信息 -->
        <div class="publish_list">
            <div class="push_top">
                <div class="cwxqlb" v-for="(item,index) in postTitle" :key="index" @click="changeType(item)" :class="typeId == item.typeid?'liebiao_xz':''">
                          {{item.title}}            
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                postTitle: [
                    {
                    title: "发布宠物列表",
                    typeid: 1
                }, 
                {
                    title: "发布宠物商品列表",
                    typeid: 2
                },{
                    title: "发布宠物服务列表",
                    typeid: 3
                }],
                 typeId:1,
            }
        },
        created() {
            this.initClass();
        },
        methods: {
            initClass(){
                 if(this.$route.path.search("publish_pets_list") !== -1){
                    this.typeId =1
                }else if(this.$route.path.search("publish_goods_list") !== -1){
                     this.typeId =2
                }else if(this.$route.path.search("publish_service_list") !== -1){
                     this.typeId =3
                }
            },
            changeType(item){
                this.typeId = item.typeid;
                 //this.typeId为1,访问宠物列表,2获取商品周边列表3,获取宠物服务列表
                 if(this.typeId == 1){
                    this.$router.push({
                        path:'/postMessage/publish_pets_list',
                    })
                 }else if(this.typeId == 2){
                      this.$router.push({
                        path:'/postMessage/publish_goods_list',
                    })
                 }else if(this.typeId == 3){
                      this.$router.push({
                        path:'/postMessage/publish_service_list',
                    })
                 }
            }
        },
    }
</script>
<style lang='less'>
    .post_msg {
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
            .push_search {
                height: 50px;
                line-height: 45px;
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
                tr {
                    text-align: center;
                }
                thead,
                tbody {
                    tr {
                        td {
                            font-size: 14px;
                            height: 45px;
                            background: #2EC2B4;
                            border-bottom: 1px solid #B2B2B2;
                            color: #fff;
                            line-height: 45px;
                        }
                        .cwfb_choice {
                            width: 28px;
                            text-align: right;
                            position: relative;
                            img {
                                width: 18px;
                                height: 18px;
                                position: absolute;
                                top: 50%;
                                left: 8px;
                                transform: translateY(-50%);
                                z-index: 1999;
                            }
                            input {
                                position: absolute;
                                z-index: 2000;
                                top: 50%;
                                left: 8px;
                                transform: translateY(-50%);
                                width: 18px;
                                height: 18px;
                                visibility: hidden;
                            }
                        }
                        .cwfb_mc {
                            width: 110px;
                            text-align: center;
                            position: relative;
                        }
                        .cwfb_lb {
                            width: 60px;
                            text-align: center;
                        }
                        .cwfb_price {
                            width: 110px;
                            text-align: center;
                        }
                        .cwfb_qy {
                            width: 180px;
                            text-align: center;
                        }
                        .cwfb_fbsj {
                            width: 100px;
                            text-align: center;
                        }
                        .cwfb_fwsj {
                            width: 140px;
                        }
                        .cwfb_zt {
                            width: 80px;
                        }
                        .cwfb_info {
                            width: 200px;
                            position: relative;
                            box-sizing: border-box;
                            .cwfb_info_oper {
                                width: 180px;
                                height: 50px;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                transform: translate(-50%, -50%);
                                a {
                                    width: 80px;
                                    box-sizing: border-box;
                                    display: block;
                                    margin: 0 auto;
                                    height: 20px;
                                    line-height: 20px;
                                    text-align: center;
                                    border: 1px solid #2EC2B4;
                                    border-radius: 5px;
                                    font-size: 10px;
                                    color: #2EC2B4;
                                    &:nth-of-type(1) {
                                        margin-bottom: 10px;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(even) {
                        background: #EFEFEF;
                    }
                }
                tbody {
                    tr {
                        height: 80px;
                        line-height: 80px;
                        td {
                            font-size: 14px;
                            height: 80px;
                            line-height: 80px;
                            background-color: #fff;
                            color: #333;
                        }
                    }
                }
            }
            .nodata {
                text-align: center;
                padding-top: 100px;
                padding-bottom: 200px;
                background: #fff;
            }
            .cd_fy {
                text-align: right;
                background: #fff;
                padding-top: 15px;
                padding-bottom: 15px;
                font-size: 14px;
                position: relative;
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





