<template>
    <div class="preference">
        <div class="service_time_container">
            <p>
                <label for="">预算:&nbsp;每天最高消费</label>
                <input type="number" v-model.trim='maxmoney' min="1">
                <span>元</span>
            </p>
            <p v-if='isshowdaliyuse'>
                <label for="">出价:&nbsp;每次点击最高花费</label>
                <input type="number" v-model='maxclick' min="1">
                <span>元</span>
            </p>
        </div>
        <orderMsg/>
    </div>
</template>
<script>
    import orderMsg from "@/components/ordermsg"
    export default {
        data() {
            return {
                isshowdaliyuse: false, //是否显示每次最高消费
                maxclick: "", //每天点击最高花费
                maxmoney: "", //每天最高消费
                extansionList: {}
            }
        },
        watch: {
            maxmoney(val, oldval) {
                if (val !== "") {
                    if (val > 1 || val == 1) {
                        this.isshowdaliyuse = true;
                        this.maxmoney = val;
                        this.extansionList.ordername = "优选";
                        this.extansionList.realmoney = this.maxmoney;
                        this.extansionList.orderinfo = val + '元';
                        this.extansionList.type = 2;
                        this.extansionList.num = val;
                        this.extansionList.price = val + '元/' + val + '元';
                        this.extansionList.totalPrice = val + '元/' + val + '元';
                    } else {
                        this.$msgbox({
                            message: "金额不能小于1",
                        })
                    }
                } else {
                    this.isshowdaliyuse = false;
                    this.$store.state.orderlist = {};
                    this.$store.commit('extansionList')
                }
            },
            maxclick(val, oldval) {
                if (val !== "") {
                    //有值
                    if (val > 1 || val == 1) {
                        if (parseInt(val) > parseInt(this.maxmoney)) {
                            this.$msgbox({
                                message: "金额不能超过最高值",
                            }).then(() => {
                                this.maxclick = this.maxmoney;
                            })
                        } else {
                            this.extansionList.oneprice = this.maxclick;
                            this.extansionList.residue = parseInt(this.maxmoney / val);
                            this.$store.state.orderlist = this.extansionList;
                            this.$store.commit('extansionList')
                        }
                    } else {
                        this.$msgbox({
                            message: "金额不能小于1",
                        })
                    }
                }else{
                     this.$store.state.orderlist = {};
                    this.$store.commit('extansionList')
                }
            }
        },
        components: {
            orderMsg
        }
    }
</script>
<style lang="less" scoped>
    .preference {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        .service_time_container {
            width: 100%;
            background-color: #eeeeee;
            line-height: 156px;
            p {
                width: 100%;
                height: 78px;
                padding-bottom: 20px;
                label {
                    display: inline-block;
                    width: 250px;
                    padding-left: 30px;
                }
                input {
                    width: 100px;
                    height: 36px;
                    margin-right: 5px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    font-size: 18px;
                }
                &:nth-of-type(1) {
                    line-height: 100px;
                }
                &:nth-of-type(2) {
                    line-height: 60px;
                    padding-bottom: 0;
                }
            }
        }
    }
</style>


