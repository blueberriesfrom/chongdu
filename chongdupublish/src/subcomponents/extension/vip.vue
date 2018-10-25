<template>
    <div class="vip">
        <div class="service_member_container">
            <span>选择会员时间</span>
            <div class="VIP_time">
                <p>
                    <em v-for="(item,index) in settingtoptime" :key="index" :class="vipId == index+1?'vipactive':''" @click="chooseVip(item)">{{item.content}}</em>
                </p>
                <p>
                    <i>每月会员在线贴20条,刷新次数20次,宠币200个</i>
                    <i>每月会员在线贴20条,刷新次数20次,宠币200个</i>
                </p>
            </div>
        </div>
        <orderMsg/>
    </div>
</template>
<script>
    import orderMsg from "@/components/ordermsg"
    export default {
        data() {
            return {
                settingtoptime: [], //置顶时间/刷新/会员规格
                vipId: -1,
                extansionList: {},
            }
        },
        created() {
            this.getsettoplist();
        },
        methods: {
            //生成订单
            //选择会员,生成订单
            chooseVip(item) {
                this.vipId = item.activeId;
                this.extansionList.platformgoodsid = item.id;
                this.extansionList.ordername = "会员时间";
                this.extansionList.orderinfo = item.content;
                this.extansionList.num = 1 + '次';
                this.extansionList.price = item.price + '元/' + item.price + '宠币';
                this.extansionList.realmoney = item.price;
                this.extansionList.totalPrice = 1 * item.price + '元/' + 1 * item.price + '枚';
                 this.extansionList.type = 4;
                 this.extansionList.residue = item.length;
                this.$store.state.orderlist = this.extansionList;
                this.$store.commit('extansionList');
            },
            //获取类型
            getsettoplist() {
                this.$http({
                    url: '/chongdu/platformgoods/getAllByType.do',
                    methods: 'post',
                    params: {
                        relatetype: this.$route.query.relatetype,
                        relateid: this.$route.query.relateid,
                        type: 4,
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        $(res.data.rows).each((i, ele) => {
                            ele.activeId = i + 1;
                        })
                        this.settingtoptime = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        components: {
            orderMsg
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../static/css/common.less';
    .vip {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        .service_member_container {
            width: 100%;
            height: 100%;
            background-color: #eeeeee;
            line-height: 156px;
            display: -webkit-box;
            /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
            display: -moz-box;
            /* 老版本语法: Firefox (buggy) */
            display: -ms-flexbox;
            /* 混合版本语法: IE 10 */
            display: -webkit-flex;
            /* 新版本语法: Chrome 21+ */
            display: flex;
            span {
                padding-left: 40px;
                line-height: 156px;
                font-size: 16px;
                height: 100%;
                width: 150px;
                display: block;
            }
            .VIP_time {
                width: 600px;
                height: 100%;
                display: -webkit-box;
                /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;
                /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;
                /* 混合版本语法: IE 10 */
                display: -webkit-flex;
                /* 新版本语法: Chrome 21+ */
                display: flex;
                p {
                    height: 100%;
                    width: 150px;
                    box-sizing: border-box;
                    padding-top: 20px;
                    em,
                    i {
                        display: block;
                        width: 120px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        border-radius: 7px;
                        border: 1px solid #d9d9d9;
                        margin-bottom: 20px;
                    }
                    em {
                        background-color: #fff;
                        cursor: pointer;
                        &.vipactive {
                            border: 2px solid @commonColor;
                        }
                    }
                    i {
                        width: 400px;
                        border: 0;
                        text-align: left;
                    }
                }
            }
        }
    }
</style>


