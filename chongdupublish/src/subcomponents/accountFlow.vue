<template>
    <div class="accountflow">
        <div class="zhls_fr">
            <div class="zhls_top">
                <div class="zhls_srmx" v-for="(item,index) in bannerList" :key="index" @click='changebanner(item)' :class="bannerId == item.typeid? 'xxk_tap':''" v-if='item.typeid == 2'>{{item.title}}</div>
                <div class="fr">
                    <span class="jdxx_bg">
                                <i></i>
                                <input type="text" class="jdxx_search" placeholder="订单编号或时间">
                            </span>
                    <a href="#" class="jdxx_sjpx">按时间排序</a>
                    <a href="#" class="jdxx_mcpx">按类别排序</a></div>
            </div>
            <div class="srbox_tap">
                <div class="srbox_tap_title">
                    <el-col :span="4" v-for="(item,index) in titleList" :key="index">
                        {{item}}
                    </el-col>
                </div>
                <div class="nodata" v-if="orderlist.length == 0">
                    <img src="../../static/img/nosj.png" alt="">
                </div>
                <div class="srbox_tap_list" v-for="(item,index) in orderlist" :key="index"  v-if="orderlist.length !== 0">
                    <el-col :span="4">{{item.ct | datesplite}}</el-col>
                    <el-col :span="4">{{item.ordersn}}</el-col>
                    <el-col :span="4">{{item.context}}</el-col>
                    <el-col :span="4" v-if="item.order.platformtype == 1 && item.order !== undefined">置顶</el-col>
                    <el-col :span="4" v-if="item.order.platformtype == 2 && item.order !== undefined">优选</el-col>
                    <el-col :span="4" v-if="item.order.platformtype == 3 && item.order !== undefined">刷新</el-col>
                    <el-col :span="4" v-if="item.order.platformtype == 4 && item.order !== undefined">会员</el-col>
                    <el-col :span="4" v-if="item.order.platformtype == 5 && item.order !== undefined">头条广告</el-col>
                    <el-col :span="4"> <!--{{item.userName}}--></el-col> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                titleList: [
                    "时间", "订单编号", "商品名称", "商品类别", "买家名称", "实际收入(元)"
                ],
                bannerList:[
                    {
                        title:'收入明细',
                        typeid:1,
                    },
                    {
                        title:'支出明细',
                        typeid:2,
                    }
                ],
                bannerId:2,   //用来标记1收入明细,2支出明细是否选中,默认收入明细
                orderlist:[],   //用来显示订单列表的数据
                page:1,
            }
        },
        created(){
            this.changebanner();
        },
        methods:{
            //点击切换收入明细,转出明细,增加样式
            changebanner(){
                //this.bannerId = item.typeid;//后期切换样式
                //暂时没有收入明细,先隐藏,后期直接去掉
                if(this.bannerId == 2){
                    //支出明细
                    this.$http({
                        url:'/chongdu/orderserial/list.do',
                        method:'post',
                        params:{
                              page:this.page,
                              type:2,
                        }                     
                    }).then(res=>{
                        if(res.data.code == 0){
                            this.orderlist = res.data.rows;
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            }

        }
    }
</script>
<style lang="less">
    .accountflow {
        width: 100%;
        color: #333;
        .zhls_fr {
            background: #fff;
            border: 1px solid #f1f1f1;
            .zhls_top {
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #2EC2B4;
                overflow: hidden;
                .zhls_srmx,
                .zhls_zcmx {
                    width: 160px;
                    float: left;
                    text-align: center;
                    border-right: 1px solid #EAEAEA;
                    font-size: 16px;
                    cursor: pointer;
                    &.xxk_tap {
                        background: #2EC2B4;
                        color: #fff;
                    }
                }
                .fr {
                    .jdxx_bg {
                        position: relative;
                        margin-right: 10px;
                        i {
                            width: 12px;
                            height: 12px;
                            background: url(../../static/img/fdj.png) no-repeat;
                            position: absolute;
                            left: 120px;
                            top: 5px;
                            &:hover {
                                cursor: pointer;
                            }
                        }
                        .jdxx_search {
                            border-radius: 7px;
                            width: 140px;
                            height: 20px;
                            border: 1px solid #C4C4C4;
                            font-size: 10px;
                            outline: none;
                            box-sizing: border-box;
                            padding-right: 23px;
                            padding-left: 10px;
                            &:focus {
                                border: 1px solid #3DA9DD;
                            }
                        }
                    }
                    .jdxx_sjpx,
                    .jdxx_mcpx {
                        background: #2EC2B4;
                        color: #fff;
                        font-size: 10px;
                        padding: 3px 10px;
                        border-radius: 7px;
                        margin-right: 10px;
                        &:hover {
                            opacity: 0.6;
                        }
                    }
                }
            }
            .srbox_tap {
                width: 100%;
                .nodata{
                    width:100%;
                    height: 400px;
                    img{
                        display: block;
                        margin: 100px auto 0;
                    }
                }
                .srbox_tap_title,.srbox_tap_list{
                    width: 100%;
                    height: 60px;
                    border-bottom: 2px solid #B2B2B2;
                    background-color: #eaeaea;
                    .el-col-4{
                        height:60px;
                        line-height: 60px;
                        text-align: center;
                    }
                }
                .srbox_tap_list{
                     border-bottom: 1px solid #eaeaea;
                      background-color: #fff;
                }
            }
        }
    }
</style>


