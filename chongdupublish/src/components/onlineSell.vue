<template>
    <!-- 首页在售列表 -->
    <div class="online_sell">
        <div class="online_sell_title">
            <h4>在售列表</h4>
        </div>
          <!--宠物,不分情况-->
        <div class="online_sell_list" v-for="(item,index) in onselllist" :key="index" v-if="item.petcode !==undefined">
            <div class="pet_img">
                <img :src="itemimg.path" alt="" v-if="indeximg == 0" v-for="(itemimg,indeximg) in item.imageList" :key="indeximg">
            </div>
            <div class="pet_msg">
                <div class="pet_msg_top">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                {{item.name}}
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <div class="pet-status-detail" @click="godetail(item)">
                                          详细信息
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="pet_msg_bottom">
                    <el-col :span="8">
                        <div class="grid-content bg-purple price">
                            <em>¥</em>
                            <span v-if="item.price !== null">{{item.price}}</span>
                            <span v-if="item.price == null">面议</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <em>浏览量:</em>
                            <span v-if="item.browser!==null">{{item.browser}}</span>
                            <span v-if="item.browser==null">0</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <em>发布时间:</em>
                            <span>{{item.ct | datesplite}}</span>
                        </div>
                    </el-col>
                </div>
            </div>
        </div>
        <!-- 其他,type分1,商品,2,服务 -->
        <div class="online_sell_list" v-for="(item,index) in onselllist" :key="index" v-if="item.petcode ==undefined">
            <div class="pet_img">
                <img :src="itemimg.path" alt="" v-if="indeximg == 0" v-for="(itemimg,indeximg) in item.imageList" :key="indeximg">
            </div>
            <div class="pet_msg">
                <div class="pet_msg_top">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                {{item.pdtname}}
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light">
                                <div class="pet-status-detail" @click="godetail(item)">
                                    详细信息
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="pet_msg_bottom">
                    <el-col :span="8">
                        <div class="grid-content bg-purple price">
                            <em>¥</em>
                           <span v-if="item.price !== null">{{item.price}}</span>
                            <span v-if="item.price == null">面议</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <em>浏览量:</em>
                            <span v-if="item.browser!==null">{{item.browser}}</span>
                            <span v-if="item.browser==null">0</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <em>发布时间:</em>
                            <span>{{item.ct | datesplite}}</span>
                        </div>
                    </el-col>
                </div>
            </div>
        </div>
      
    </div>
</template>
<script>
    export default {
        data() {
            return {
                currentId:"",   //传到详情页用的参数0,是宠物,1,2,是其他物品
            }
        },
        computed: {
            onselllist() {
                get: {
                    return this.$props.onsell
                }
            }
        },
        methods:{
            //去详情页
            godetail(item){
                item.petcode !== undefined?this.currentId = 1:item.type == 1?this.currentId = 2:this.currentId = 3; 
                this.$router.push({
                    path:'/petdetail',
                    query:{
                        currentid:this.currentId,
                        id:item.id
                    }
                })         
            },
        },
        props: ["onsell"]
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .online_sell {
        width: 100%;
        background-color: #fff;
        .online_sell_title {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid @commonColor;
            position: relative;
            h4 {
                width: 100px;
                height: 100%;
                font-size: 18px;
                line-height: 60px;
                padding-left: 22px;
                font-weight: 900;
            }
            .getmore {
                width: 35px;
                height: 24px;
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 24px;
                border: 1px solid @commonColor;
                font-size: 12px;
                line-height: 24px;
                text-align: center;
            }
        }
        .online_sell_list {
            border-bottom: 1px solid #e9e9e9;
            width: 100%;
            height: 136px;
              display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
            .pet_img {
                width: 200px;
                height: 100%;
                position: relative;
                img {
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .pet_msg {
                flex: 1;
                height: 100%;
                display: flex;
                display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                flex-direction: column;
                .pet_msg_top {
                    height: 50px;
                    .el-row {
                        height: 100%;
                        .el-col-12 {
                            height: 100%;
                            line-height: 80px;
                            font-size: 16px;
                            .pet-status-detail {
                                width: 100px;
                                margin-top: 30px;
                                height: 30px;
                                float: right;
                                margin-right: 140px;
                                border: 1px solid @commonColor;
                                line-height: 30px;
                                text-align: center;
                                border-radius: 7px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .pet_msg_bottom {
                    flex: 1;
                    width: 100%;
                    .el-col-8 {
                        height: 100%;
                        font-size: 16px;
                        line-height: 100px;
                        color: #979797;
                        .price {
                            color: #F94040;
                        }
                    }
                }
            }
        }
    }
</style>


