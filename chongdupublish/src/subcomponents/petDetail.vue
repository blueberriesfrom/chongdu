<template>
    <!-- 宠物详情 -->
    <div class="petdetail">
        <div class="petdetail_title">
            <h4 v-if="cuttentId == 1">宠物信息</h4>
            <h4 v-if="cuttentId == 2">商品信息</h4>
            <h4 v-if="cuttentId == 3">服务信息</h4>
        </div>
        <!-- 宠物在售详情 -->
        <div class="detail_body" v-if="cuttentId == 1">
            <div class="petdetail_body" v-for="(item,index) in petdetail" :key="index">
                <!-- 宠物基本信息 -->
                <div class="petdetail_base">
                    <h4>宠物基本信息</h4>
                    <div class="base_container">
                        <p>
                            <label for="">宠物标题</label>
                            <span>{{item.title}}</span>
                        </p>
                        <p>
                            <label for="">宠物名称</label>
                            <span>{{item.name}}</span>
                        </p>
                        <p>
                            <label for="">宠物种类</label>
                            <span v-text="item.pettype.name"></span>
                        </p>
                        <p>
                            <label for="">宠物性别</label>
                            <span v-if="item.sex == 0">母</span>
                            <span v-if="item.sex == 1">公</span>
                        </p>
                        <p>
                            <label for="">宠物毛色</label>
                            <span>{{item.color}}</span>
                        </p>
                        <p>
                            <label for="">出生日期</label>
                            <span>{{item.birthday | datesplite}}</span>
                        </p>
                        <p>
                            <label for="">宠物价格</label>
                            <span>{{item.price == null ? "面议":item.price}}</span>
                        </p>
                        <p>
                            <label for="">所在区域地址</label>
                            <span>{{item.petCity}}</span>
                        </p>
                         <div class="pet_photo" v-if="petad.length >0">
                            <label for="">宠物广告照片</label>
                            <div class="pet_photo_list">
                                <em v-for="(iteming,index1) in item.imageList" :key="index1">
                                                  <img :src="iteming.path" v-if="iteming.customtype == 3">
                                            </em>
                            </div>
                        </div>
                        <div class="pet_photo" v-if="petdetailImg.length >0">
                            <label for="">宠物详情照片</label>
                            <div class="pet_photo_list">
                                <em v-for="(iteming,index1) in item.imageList" :key="index1">
                                                  <img :src="iteming.path" v-if="iteming.customtype == 1">
                                            </em>
                            </div>
                        </div>
                        <div class="pet_paper" v-if="petpassport.length > 0">
                            <label for="">宠物证件</label>
                            <div class="pet_photo_list">
                                <em v-for="(iteming,index1) in item.imageList" :key="index1">
                                                  <img :src="iteming.path" v-if="iteming.customtype == 2">
                                </em>
                            </div>
                        </div>
                        <div class="pet_decri">
                            <label for="">宠物描述</label>
                            <div class="pet_decri_detail">
                                <em>{{item.content}}</em>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 宠物疫苗信息 -->
                <div class="petdetail_vac">
                    <h4>宠物疫苗信息</h4>
                    <div class="petdetail_vac_body">
                        <div class="petdetail_vac_container">
                            <div class="petdetail_vac_title">
                                <el-col :span="4">疫苗品牌</el-col>
                                <el-col :span="4">疫苗时间</el-col>
                                <el-col :span="8">疫苗地址</el-col>
                                <el-col :span="8">疫苗照片</el-col>
                            </div>
                            <div class="nosj" v-if="item.vaccineList == undefined">
                                <img src="../../static/img/nosj.png" alt="" >
                            </div>
                            <div class="petdetail_vac_list" v-if="item.vaccineList !== undefined">
                                <el-row v-for="(vaccine,indexvac) in item.vaccineList" :key="indexvac" >
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            {{vaccine.insecttype.name}}
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            {{vaccine.regtime | datesplite}}
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <!-- 这里的高度需要计算最大高度 -->
                                        <div class="grid-content bg-purple">
                                            <span>{{vaccine.street}}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">
                                            <em v-for="(incimg,indeximg) in vaccine.imageList" :key="indeximg">
                                                            <img :src="incimg.path" alt="">
                                                        </em>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 宠物驱虫信息 -->
                <div class="petdetail_insect">
                    <h4>宠物驱虫信息</h4>
                    <div class="petdetail_vac_body">
                        <div class="petdetail_vac_container">
                            <div class="petdetail_vac_title">
                                <el-col :span="4">疫苗品牌</el-col>
                                <el-col :span="4">疫苗时间</el-col>
                                <el-col :span="8">疫苗地址</el-col>
                                <el-col :span="8">疫苗照片</el-col>
                            </div>
                              <div class="nosj" v-if="item.insectList == undefined">
                                <img src="../../static/img/nosj.png" alt="" >
                            </div>
                            <div class="petdetail_vac_list" v-if="item.insectList !== undefined">
                                <el-row v-for="(insect,indexins) in item.insectList" :key="indexins" >
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            {{insect.insecttype.name}}</div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="grid-content bg-purple">
                                            {{insect.regtime | datesplite}}
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <!-- 这里的高度需要计算最大高度 -->
                                        <div class="grid-content bg-purple">
                                            <span>{{insect.street}}</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="grid-content bg-purple">
                                            <em v-for="(insimg,indexins) in insect.imageList" :key="indexins">
                                                     <img :src="insimg.path" alt="">
                                                </em>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 物品在售详情 -->
        <div class="detail_body" v-if="cuttentId == 2">
            <div class="petdetail_body">
                <!-- 宠物基本信息 -->
                <div class="petdetail_base">
                    <h4>商品基本信息</h4>
                    <div class="base_container">
                        <p>
                            <label for="">商品标题</label>
                            <span>{{petdetail.title}}</span>
                        </p>
                        <p>
                            <label for="">商品名称</label>
                            <span>{{petdetail.pdtname}}</span>
                        </p>
                        <p>
                            <label for="">商品重量</label>
                            <span v-text="petdetail.weight"></span>
                        </p>
                        <p>
                            <label for="">商品价格</label>
                            <span>{{petdetail.price}}</span>
                        </p>
                        <p>
                            <label for="">商品库存</label>
                            <span>
                                        {{petdetail.stock}}
                                    </span>
                        </p>
                        <p>
                            <label for="">商品类型</label>
                            <span>{{petdetail.goodstype.name}}</span>
                        </p>
                        <p>
                            <label for="">所在区域地址</label>
                            <span>{{petdetail.allArea}}</span>
                        </p>
                        <div class="pet_photo">
                            <label for="">商品照片</label>
                            <div class="pet_photo_list">
                                <em v-for="(item,index) in petdetail.imageList" :key="index">
                                                  <img :src="item.path">
                                            </em>
                            </div>
                        </div>
                        <div class="pet_decri">
                            <label for="">商品描述</label>
                            <div class="pet_decri_detail">
                                <em>{{petdetail.content}}</em>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 服务在售详情 -->
        <div class="detail_body" v-if="cuttentId == 3">
            <div class="petdetail_body">
                <!-- 宠物基本信息 -->
                <div class="petdetail_base">
                    <h4>服务基本信息</h4>
                    <div class="base_container">
                        <p>
                            <label for="">服务标题</label>
                            <span>{{petdetail.title}}</span>
                        </p>
                        <p>
                            <label for="">商品名称</label>
                            <span>{{petdetail.pdtname}}</span>
                        </p>
                         <p>
                            <label for="">服务类型</label>
                            <span>{{petdetail.servicetype.servicename}}</span>
                        </p>
                       <p>
                            <label for="">服务价格</label>
                            <span>{{petdetail.price}}元</span>
                        </p>
                       <p>
                            <label for="">营业时间</label>
                            <span> {{petdetail.servicetimebegin | dataformate}} - {{petdetail.servicetimeend | dataformate}}</span>
                        </p>
                         <p>
                            <label for="">所在区域地址</label>
                            <span>{{petdetail.allArea}}</span>
                        </p>
                        <div class="pet_photo">
                            <label for="">服务照片</label>
                            <div class="pet_photo_list">
                                <em v-for="(item,index) in petdetail.imageList" :key="index">
                                                  <img :src="item.path">
                                </em>
                            </div>
                        </div>
                        <div class="pet_decri">
                            <label for="">服务描述</label>
                            <div class="pet_decri_detail">
                                <em>{{petdetail.content}}</em>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                petdetail: {}, //宠物详情
                cuttentId: this.$route.query.currentid,
                petpassport:[],//宠物证件照2
                petad:[],//宠物广告3
                petdetailImg:[],//宠物详情照片1
            }
        },
        created() {
            this.getparams()
        },
        methods: {
            getparams() {
                //console.log(this.$route.query.currentid);
                if (this.$route.query.currentid == 1) {
                    this.$http({
                        url: '/chongdu/pet/listAll.do',
                        params: {
                            id: this.$route.query.id
                        }
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            if (res.data.rows !== 0) {
                                 this.petdetail = res.data.rows;
                                this.petdetailImg = res.data.rows[0].imageList.filter(o=>{
                                    return o.customtype == 1;
                                });
                                this.petpassport = res.data.rows[0].imageList.filter(o=>{
                                    return o.customtype == 2;
                                });
                                this.petad = res.data.rows[0].imageList.filter(o=>{
                                    return o.customtype == 3;
                                });
                            } 
                            // else {
                            //     // $(res.data.rows[0].insectList).each((i, ele) => {
                            //     //     if (ele.imageList.length > 2) {
                            //     //         ele.imageList = ele.imageList.splice(0, 2);
                            //     //     }
                            //     // })
                            //     this.petdetail = res.data.rows;
                            // }
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else if (this.$route.query.currentid == 2 || this.$route.query.currentid == 3) {
                    this.$http({
                        url: '/chongdu/goods/goodsInfo.do',
                        method: 'post',
                        params: {
                            id: this.$route.query.id
                        }
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.petdetail = res.data.item;
                            console.log(this.petdetail)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        }
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .petdetail {
        width: 100%;
        color: #333;
        background-color: #fff;
        padding-bottom: 120px;
        .petdetail_title {
            width: 100%;
            height: 60px;
            background-color: @commonColor;
            line-height: 60px;
            padding-left: 30px;
            box-sizing: border-box;
            h4 {
                font-weight: 700;
                color: #fff;
                font-size: 16px;
            }
        }
        .petdetail_body {
            width: 100%;
            .petdetail_base {
                width: 100%;
                h4 {
                    height: 20px;
                    margin: 30px 0 0 5px;
                    padding-left: 15px;
                    border-left: 10px solid @commonColor;
                    font-size: 16px;
                }
                .base_container {
                    width: 100%;
                    padding-left: 120px;
                    padding-bottom: 40px;
                    box-sizing: border-box;
                   overflow: hidden;
                    p,
                    .pet_photo,
                    .pet_paper,
                    .pet_decri {
                        margin-top: 20px;
                        line-height: 40px;
                        height: 40px;
                        overflow: hidden;
                        label {
                            display: block;
                            float: left;
                            width: 100px;
                            text-align: right;
                            margin-right: 50px;
                        }
                        span {
                            display: block;
                            max-width: 320px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 16px;
                        }
                        img {
                            width: 80px;
                            height: 80px;
                            margin-right: 15px;
                        }
                        .pet_decri_detail {
                            width: 480px;
                            display: block;
                            overflow: hidden;
                            margin-right: 14px;
                            line-height: 25px;
                            margin-top: 8px;
                            em {
                                line-height: 12px;
                                 font-size: 16px;
                            }
                        }
                    }
                    .pet_photo,
                    .pet_paper,
                    .pet_decri {
                        height: auto;
                        .pet_photo_list {
                            width: 570px;
                            overflow: hidden;
                            margin-right: 14px;
                        }
                    }
                }
            }
            .petdetail_vac,
            .petdetail_insect {
                width: 100%;
                h4 {
                    height: 20px;
                    margin: 30px 0 0 5px;
                    padding-left: 15px;
                    border-left: 10px solid @commonColor;
                    font-size: 16px;
                }
                .petdetail_vac_body {
                    width: 100%;
                    padding: 30px 30px 30px;
                    box-sizing: border-box;
                    .petdetail_vac_container {
                        width: 100%;
                        border: 1px solid @commonColor;
                        .petdetail_vac_title {
                            width: 100%;
                            height: 45px;
                            background-color: @commonColor;
                            color: #fff;
                            .el-col-4,
                            .el-col-8 {
                                height: 100%;
                                line-height: 45px;
                                text-align: center;
                                font-size: 16px;
                            }
                        }
                        .nosj{
                            width:100%;
                            height: 300px;
                            overflow: hidden;
                            img{
                                display: block;
                                margin: 80px auto;
                            }

                        }
                        .petdetail_vac_list {
                            width: 100%; // min-height: 45px;
                            color: #333;
                            .el-row {
                                width: 100%;
                                height: 100%;
                                .el-col-4,
                                .el-col-8 {
                                    text-align: center; //  padding: 20px 0;
                                    height: 100%;
                                    .bg-purple {
                                       height: 80px;
                                        padding: 0 15px;
                                        box-sizing: border-box;
                                        position: relative;
                                        line-height: 80px;
                                        span {
                                            position: absolute;
                                            left: 50%;
                                            top: 50%;
                                            transform: translate(-50%, -50%);
                                        }
                                        img {
                                            width: 60px;
                                            height: 60px;
                                            margin: 10px 15px;
                                        }
                                    }
                                }
                            }
                            &:nth-of-type(even) {
                                background-color: #efefef;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


