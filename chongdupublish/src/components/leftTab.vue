<template>
    <div class="lefttab">
        <dl class="menu_fb" v-for="(items,indexfather) in leftfatherItem" :key="indexfather">
            <dt>{{items.fatherItem}}</dt>
            <dd v-for="(item,index) in items.sonlist" :key="index" @click="changecolor(item)" :class="currentId == item.typeid?'active':''">
                <router-link :to="item.link">
                    {{item.sonlistItem}}
                </router-link>
            </dd>
        </dl>
    </div>
</template>
<script>
    export default {
        name: 'leftnav',
        data() {
            return {
                leftfatherItem: [{
                    fatherItem: "发布",
                    sonlist: [{
                        sonlistItem: '在售列表',
                        typeid: 0,
                        link: "/onList"
                    }, {
                        sonlistItem: '发布列表',
                        typeid: 1,
                        link: "/postMessage"
                    }, {
                        sonlistItem: '发布宠物',
                        typeid: 2,
                        link: "/release"
                    }, {
                        sonlistItem: '发布宠物商品',
                        typeid: 3,
                        link: "/release/around"
                    }, {
                        sonlistItem: '发布宠物服务',
                        typeid: 4,
                        link: "/release/service"
                    }]
                }, 
                {
                    fatherItem: "订单",
                    sonlist: [{
                        sonlistItem: '已购订单',
                        typeid: 5,
                        link: "/purchase/order"
                    }]
                }, {
                    fatherItem: "预约",
                    sonlist: [
                        // {
                        //     sonlistItem: '预约管理',
                        //     typeid: 6,
                        //     link: "/booking/management"
                        // },
                        {
                            sonlistItem: '预约设置',
                            typeid: 7,
                            link: "/booking/setting"
                        }
                    ]
                }, {
                    fatherItem: "账户管理",
                    sonlist: [
                        // {
                        //     sonlistItem: '账户报表',
                        //     typeid: 8,
                        //     link: "/account/statement"
                        // },
                        {
                            sonlistItem: '账户流水',
                            typeid: 9,
                            link: "/account/flow"
                        },
                        // {
                        //     sonlistItem: '积分信息',
                        //     typeid: 10,
                        //     link: "/credit"
                        // }, {
                        //     sonlistItem: '积分兑换',
                        //     typeid: 11,
                        //     link: "/credit/exchange"
                        // }
                    ]
                }, {
                    fatherItem: "发票管理",
                    sonlist: [
                        {
                            sonlistItem: '发票索取',
                            typeid: 12,
                            link: "/invoicing"
                        },
                        {
                            sonlistItem: '发票列表',
                            typeid: 13,
                            link: "/invoicing/list"
                        }
                    ]
                },{
                    fatherItem: "我的认证",
                    sonlist:[{
                         sonlistItem: '实名认证',
                        typeid: 14,
                        link: "/personal/certification"
                    },
                    {
                         sonlistItem: '企业认证',
                          typeid: 15,
                           link: "/again/certification"
                    },{
                         sonlistItem: '变更认证',
                          typeid: 16,
                           link: "/change/certification"
                    }]
                },
                 {
                    fatherItem: "我的资料",
                    sonlist: [{
                            sonlistItem: '我的信息',
                            typeid: 17,
                            link: "/myInfo"
                        },
                        {
                            sonlistItem: '通知消息',
                            typeid: 18,
                            link: "/message"
                        },{
                            sonlistItem: '地址管理',
                            typeid: 19,
                            link: "/address/management"
                        }
                    ]
                }
                ],
                currentId: '',
            }
        },
        created() {
            this.$nextTick(()=>{
                   this.initleftcolor();
            })         
        },
        methods: {
            initleftcolor() {
                if (this.$route.path.indexOf("onList") !== -1) {
                    this.currentId = 0;
                } else if (this.$route.path.indexOf("postMessage") !== -1) {
                    this.currentId = 1;
                } else if (this.$route.path.indexOf("release") !== -1 && this.$route.path.indexOf("release/around") == -1 && this.$route.path.indexOf("/release/service") == -1) {
                    this.currentId = 2;
                } else if (this.$route.path.indexOf("release/around") !== -1) {
                    this.currentId = 3;
                } else if (this.$route.path.indexOf("release/service") !== -1) {
                    this.currentId = 4;
                } else if (this.$route.path.indexOf("purchase/order") !== -1) {
                    this.currentId = 5;
                } else if (this.$route.path.indexOf("booking/management") !== -1) {
                    this.currentId = 6;
                } else if (this.$route.path.indexOf("booking/setting") !== -1) {
                    this.currentId = 7;
                } else if (this.$route.path.indexOf("account/statement") !== -1) {
                    this.currentId = 8;
                } else if (this.$route.path.indexOf("/account/flow") !== -1) {
                    this.currentId = 9;
                } else if (this.$route.path.indexOf("credit") !== -1 && this.$route.path.indexOf("credit/exchange") == -1) {
                    this.currentId = 10;
                } else if (this.$route.path.indexOf("credit/exchange") !== -1) {
                    this.currentId = 11;
                } else if (this.$route.path.indexOf("invoicing") !== -1 && this.$route.path.indexOf("/invoicing/list") == -1) {
                    this.currentId = 12;
                } else if (this.$route.path.indexOf("/invoicing/list") !== -1) {
                    this.currentId = 13;
                }else if(this.$route.path.indexOf("/personal/certification") !== -1){
                    this.currentId = 14;
                }else if (this.$route.path.indexOf("/again/certification") !== -1) {
                    this.currentId = 15;
                } else if (this.$route.path.indexOf("change/certification") !== -1) {
                    this.currentId = 16;
                }  else if (this.$route.path.indexOf("myInfo") !== -1) {
                    this.currentId = 17;
                }   else if (this.$route.path.indexOf("message") !== -1) {
                    this.currentId = 18;
                }  else if (this.$route.path.indexOf("/address/management") !== -1) {
                    this.currentId = 19;
                }              
            },
            changecolor(item) {
                this.currentId = item.typeid;
            }
        }
    }
</script>
<style lang='less'>
    .lefttab {
        box-sizing: border-box;
        width: 100%;
        background: #505050; // height: 1040px;
        padding-bottom: 80px;
        dl {
            //margin-bottom: 15px;
            dt {
                padding-top: 10px;
                padding-bottom: 10px;
                padding-left: 15px;
                font-size: 14px;
                color: #fff;
                background: #3AB2A7;
            }
            dd {
                font-size: 12px;
                /*margin-top:5px;*/
                text-align: center;
                height: 36px;
                line-height: 36px;
                a {
                    color: #a0a0a0;
                    &:hover {
                        color: white;
                    }
                }
                &:hover {
                    background: #414040;
                    /*border-top:2px solid #808080;
                        		border-bottom:2px solid #808080;
                        	*/
                }
                &.active {
                    background: #414040;
                }
            }
        }
    }
</style>

