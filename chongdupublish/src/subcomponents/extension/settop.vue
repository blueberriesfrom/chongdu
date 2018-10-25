<template>
    <div class="settop">
        <div class="service_time">
            <div class="service_time_container">
                <label>选择置顶时间</label>
                <span v-for="(item,index) in settingtoptime" :key="index" @click="createdsettoporder(item)" :class="spanid == item.activeId?'active':''">{{item.content}}</span>
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
                spanid: -1, //点击置顶增加样式
                extansionList:{},
            }
        },
        created() {
            this.getsettoplist();
        },
        methods: {
            //获取种类
            getsettoplist() {
                this.$http({
                    url: '/chongdu/platformgoods/getAllByType.do',
                    methods: 'post',
                    params: {
                        relatetype: this.$route.query.relatetype,
                        relateid: this.$route.query.relateid,
                        type: 1,
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
            //生成置顶订单
            createdsettoporder(item) {
                this.extansionList.platformgoodsid = item.id;
                this.isshownone = false;
                this.spanid = item.activeId;
                this.extansionList.ordername = "立即置顶";
                this.extansionList.orderinfo = item.content;
                this.extansionList.num = 1;
                this.extansionList.price = item.price;
                this.extansionList.realmoney = item.price;
                this.extansionList.residue = item.length;
                //计算总金额
                this.extansionList.totalPrice = 1 * item.price + '元/' + 1 * item.price + '枚';
                this.extansionList.type = 1;
                this.$store.state.orderlist = this.extansionList;
                this.$store.commit('extansionList')
            },
        },
        components: {
            orderMsg
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../static/css/common.less';
    .settop {
        width: 100%;
        .service_time {
            width: 100%;
            height: 156px;
            padding: 0 10px;
            box-sizing: border-box;
            .service_time_container {
                width: 100%;
                height: 100%;
                background-color: #eeeeee;
                line-height: 156px;
                label {
                    font-size: 18px;
                    padding-left: 30px;
                }
                span {
                    display: inline-block;
                    min-width: 105px;
                    border-radius: 7px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    background-color: #fff;
                    margin-left: 20px;
                    padding: 0 5px;
                    &:hover {
                        cursor: pointer;
                    }
                    &.active {
                        border: 2px solid @commonColor;
                    }
                }
            }
        }
    }
</style>


