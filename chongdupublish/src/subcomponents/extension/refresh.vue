<template>
    <div class="refurbish">
        <div class="refurbish_container">
            <el-tabs v-model="activeName2" type="card" @tab-click="clickTab">
                <el-tab-pane label="预约刷新" name="first">
                    <div class="refurbish_num">
                        <label for="">选择刷新次数</label>
                        <span class="re_num" v-for="(item,index) in settingtoptime" :key="index" :class="spanid == item.activeId?'activenum':''" @click="clickfirstrefulsh(item)">{{item.content}}</span>
                    </div>
                    <div class="refurbish_time" v-if="showrefushtime">
                        <label for="">选择刷新间隔</label>
                        <span class="re_time" v-for="(item,index) in refulshlish" :key="index" :class="spanactiveId == index+1?'activetime':''" @click="createrefushorder(item)">{{item.content}}</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="立即刷新" name="second">
                    <div class="refurbish_imd">
                        <p>该用户剩余刷新次数<span style="color:#2ec2b4;font-size:25px;margin: 0 8px">{{residueNum}}</span>次</p>
                        <p>本次需要消耗1次刷新次数,确认后立即刷新</p>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <orderMsg :isshowrefulsh="isrefulsh" :residue = "residueNum"/>
    </div>
</template>
<script>
    import orderMsg from "@/components/ordermsg"
    export default {
        data() {
            return {
                activeName2: 'first',
                isrefulsh: false,
                spanid: -1,
                settingtoptime: [], //置顶时间/刷新/会员规格
                showrefushtime: false, //刷新间隔时间是否显示
                residueNum: 0, //剩余刷新的次数
                refulishitem: '',
                spanactiveId: -1, //标记规格样式,
                refulshlish: [{
                    content: '1次/每2小时',
                    spanId: 1,
                    timestep: 2,
                }, {
                    content: '1次/每3小时',
                    spanId: 2,
                    timestep: 3,
                }, {
                    content: '1次/每4小时',
                    spanId: 3,
                    timestep: 4,
                }, {
                    content: '1次/每6小时',
                    spanId: 4,
                    timestep: 6,
                }],
                extansionList: {},
                showorder: false,
            }
        },
        created() {
            this.getorderinfo();
            this.getsettoplist();
        },
        methods: {
            //生成刷新订单
            createrefushorder(item) {
                this.extansionList.timestep = item.timestep;
                this.spanactiveId = item.spanId;
                this.isrefulishcontent = item.content;
                this.extansionList.orderinfo = this.refulishitem + "," + item.content;
                this.extansionList.num = 1;
                this.extansionList.type = 3;
                this.extansionList.timestep = item.timestep;
                this.$store.state.orderlist = this.extansionList;
                this.$store.commit('extansionList')
            },
            //增加刷新订单一级样式
            clickfirstrefulsh(item) {
                this.showrefushtime = true;
                this.extansionList.platformgoodsid = item.id;
                this.spanid = item.activeId;
                this.refulishitem = item.content.slice(2, 5);
                this.extansionList.ordername = "预约刷新";
                this.extansionList.orderinfo = this.refulishitem + this.isrefulishcontent;
                this.extansionList.refulishPrice = item.price;
                this.extansionList.realmoney = item.price;
                this.extansionList.residue = item.length;
                this.extansionList.price = item.price;
                //计算总金额
                this.extansionList.totalPrice = 1 * item.price + '元/' + 1 * item.price + '枚';
                 this.extansionList.type = 3;
                this.$store.state.orderlist = this.extansionList;
                this.$store.commit('extansionList')
            },
            //获取刷新列表的种类
            getsettoplist() {
                this.$http({
                    url: '/chongdu/platformgoods/getAllByType.do',
                    methods: 'post',
                    params: {
                        relatetype: this.$route.query.relatetype,
                        relateid: this.$route.query.relateid,
                        type: 3,
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
            //立即刷新的tab事件监听
            clickTab(targetName) {
                if (targetName.label == "立即刷新") {
                    this.isrefulsh = true;
                } else {
                    this.isrefulsh = false;
                }
            },
            //刷新列表,查看有多少剩余的刷新次数
            getorderinfo() {
                this.$http({
                    url: '/chongdu/platformgoods/getAllOrderServices.do',
                    params: {
                        relatetype: this.$route.query.relatetype,
                        relateid: this.$route.query.relateid
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        var listinfo = $(this.serviceList).each((i, ele) => {
                            $(this.serviceList)[i].relatelist = res.data.rows.filter(o => {
                                if (o.platformtype == ele.typeid) {
                                    return o
                                }
                            })
                        })
                        this.serviceList = [...listinfo];
                        if (res.data.rows.length !== 0) {
                            this.residueNum = res.data.rows.filter(o => {
                                if (o.platformtype == 3) {
                                    return o
                                }
                            })[0].residue;
                        }
                    }
                }).catch(err => {
                    console.log(err);
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
    .refurbish {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        .refurbish_container {
            width: 100%;
            height: 100%;
            .el-tabs--card {
                .el-tabs__header {
                    border-bottom: 1px solid @commonColor;
                    margin: 0;
                    .el-tabs__nav {
                        border: 1px solid @commonColor;
                        height: 40px;
                        box-sizing: border-box;
                        .el-tabs__item.is-active {
                            background-color: @commonColor;
                            color: #fff;
                            font-size: 16px;
                            border-bottom-color: @commonColor;
                            box-sizing: border-box;
                        }
                    }
                }
                .el-tabs__content {
                    border: 1px solid @commonColor;
                    border-top: 0;
                    background-color: #f6f6f6;
                    .refurbish_num,
                    .refurbish_time {
                        width: 100%;
                        height: 95px;
                        line-height: 95px;
                        padding: 0 30px;
                        box-sizing: border-box;
                        label {
                            font-size: 18px;
                            margin-right: 35px;
                        }
                        .re_time,
                        .re_num {
                            display: inline-block;
                            padding: 3px 10px;
                            height: 50px;
                            border: 1px solid #d9d9d9;
                            line-height: 50px;
                            text-align: center;
                            background-color: #fff;
                            border-radius: 7px;
                            font-size: 16px;
                            cursor: pointer;
                            margin-right: 20px;
                            &.activenum {
                                border: 2px solid @commonColor;
                            }
                            &.activetime {
                                border: 2px solid @commonColor;
                            }
                        }
                    }
                    .refurbish_imd {
                        width: 100%;
                        height: 160px;
                        line-height: 95px;
                        padding: 0 30px;
                        box-sizing: border-box;
                        p {
                            height: 80px;
                            font-size: 18px;
                            letter-spacing: 1px;
                            line-height: 100px;
                            &:nth-of-type(2) {
                                line-height: 50px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


