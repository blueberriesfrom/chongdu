<template>
    <div class="extensionlink">
        <div class="service_content">
            <h2>服务内容</h2>
            <div class="service_list">
                <div class="flex-item" v-for="(item,index) in serviceList" :key="index" :class="item.typeid == extactive?'extactive':''" @click="chooseservice(item)">
                    <router-link :to="{path:item.link,query:{
                            relatetype:relatetype,
                            relateid:relateid,
                            linktype:linktype
                        }}">
                        <h3>{{item.title}}</h3>
                        <p>
                            <img :src="item.imgPath" alt="">
                        </p>
                        <div class="zdtb_say">
                            <div>
                                <p>{{item.infoone}}</p>
                                <p>{{item.infotwo}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- 四种服务,四种订单对象 -->
            <div class="extension_router">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName2: 'first',
                serviceList: [{
                        title: '置顶',
                        titleinfo: 'settop',
                        imgPath: '../../../static/img/settop.png',
                        infoone: '为您提供置顶服务',
                        infotwo: '让您的发布出现在最前排',
                        link: '/extension_center/settop',
                        typeid: 1,
                    }, {
                        title: '优选',
                        titleinfo: 'preference',
                        imgPath: '../../../static/img/youxuan.png',
                        infoone: '为您提供优选服务',
                        infotwo: '让您的发布出现在最前排',
                        link: '/extension_center/preference',
                        typeid: 2,
                    },
                    {
                        title: '刷新',
                        titleinfo: 'refresh',
                        imgPath: '../../../static/img/refulsh.png',
                        infoone: '为您提供刷新服务',
                        infotwo: '让您的发布出现在最前排',
                        link: '/extension_center/refresh',
                        typeid: 3,
                    }, {
                        title: '会员',
                        titleinfo: 'vip',
                        imgPath: '../../../static/img/VIP.png',
                        infoone: '为您提供会员服务',
                        infotwo: '让您的发布出现在最前排',
                        link: '/extension_center/vip',
                        typeid: 4,
                    }
                ],
                extactive: 1,
            }
        },
        computed: {
            relatetype() {
                return this.$route.query.relatetype
            },
            relateid() {
                return this.$route.query.relateid
            },
            linktype() {
                return this.$route.query.targetlink
            }
        },
        created() {
            this.initallservice();
            this.initrouterlink();
        },
        methods: {
            //优化路劲对应的显示方式,刷新时显示当前路劲
            initrouterlink(){
                if(this.$route.path.indexOf("extension_center/settop") !== -1){
                    this.extactive = 1;
                }else if(this.$route.path.indexOf("extension_center/preference") !== -1){
                    this.extactive = 2;
                }else if(this.$route.path.indexOf("extension_center/refresh") !== -1){
                    this.extactive = 3;
                }else if(this.$route.path.indexOf("extension_center/vip") !== -1){
                    this.extactive = 4;
                }
            },
            //显示已经生成的订单显示在四种类型的服务中
            initallservice() {
                //显示当前模块的逻辑
                if (this.linktype == "settop") {
                    this.extactive = 1;
                    this.serviceList = this.serviceList.filter(o => {
                        return o.titleinfo == "settop";                        
                    })
                } else if (this.linktype == "preference") {
                    this.extactive = 2;
                    this.serviceList = this.serviceList.filter(o => {
                        return o.titleinfo == "preference";
                        
                    })
                } else if (this.linktype == "refresh") {
                     this.extactive = 3;
                    this.serviceList = this.serviceList.filter(o => {
                        return o.titleinfo == "refresh";                       
                    })
                }
            },
            //点击切换样式
            chooseservice(item) {
                this.extactive = item.typeid;
                this.$store.state.orderlist = {};  //每次切换时清空订单表
            }
            // http://192.168.101.25:8081/#/extension_center/settop?relateid=32&relatetype=2&targetlink=refresh
            //http://192.168.101.25:8081/#/extension_center/refresh?relatetype=2&relateid=32&linktype=refresh
        }
    }
</script>
<style lang="less" scoped>
    @import '../../static/css/common.less';
    .service_content {
        width: 100%;
        h2 {
            width: 100%;
            margin-left: 10px;
            padding-left: 25px;
            height: 27px;
            line-height: 27px;
            border-left: 15px solid @commonColor;
            font-size: 24px;
            margin-top: 15px;
            margin-bottom: 45px;
        }
        .service_list {
            width: 100%;
            height: 225px;
            display: -webkit-box;
            /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
            display: -moz-box;
            /* 老版本语法: Firefox (buggy) */
            display: -ms-flexbox;
            /* 混合版本语法: IE 10 */
            display: -webkit-flex;
            /* 新版本语法: Chrome 21+ */
            display: flex;
            padding-bottom: 55px;
            .flex-item {
                width: 225px;
                height: 225px;
                margin: 0 60px;
                position: relative;
                box-sizing: border-box;
                background-color: #eeeeee;
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                    h3 {
                        width: 100%;
                        height: 60px;
                        line-height: 60px;
                        display: block;
                        text-align: center;
                        font-size: 24px;
                        font-weight: 500;
                        margin-bottom: 10px;
                    }
                    p {
                        text-align: center;
                        img {
                            width: 68px;
                            height: 68px;
                        }
                    }
                    .zdtb_say {
                        width: 100%;
                        height: 50px;
                        box-sizing: border-box;
                        position: absolute;
                        bottom: 8px;
                        left: 10px;
                        p {
                            text-align: left;
                            font-size: 16px;
                            line-height: 23px;
                        }
                    }
                }
                &:nth-of-type(2),
                &:nth-of-type(3),
                &:nth-of-type(4) {
                    margin-left: 0;
                }
                &.extactive {
                    border: 2px solid @commonColor;
                    background-color: #fff;
                }
            }
        }
    }
</style>



