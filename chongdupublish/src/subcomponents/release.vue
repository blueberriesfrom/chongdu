<template>
    <div class="release">
        <div class="release_pet">
            <div class="release_pet_title">
                <div class="title_content">
                    <h4>发布宠物</h4>
                    <div class="title_step">
                        <div class="step_span">
                            <span>1、发布宠物基本资料</span>
                        </div>
                        <em></em>
                        <div class="step_span">
                            <span>2、照片证件联系人信息</span>
                        </div>
                        <em></em>
                        <div class="step_span">
                            <span>3、发布宠物疫苗及驱虫</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="release_pet_form">
                <div class="pet_title">
                    <em>宠物标题</em>
                    <textarea maxlength="20" v-model.trim="title" v-check="{type:'textarea',val:title,long:20}"></textarea>
                    <span>{{title.length}}/20</span>
                </div>
                <div class="pet_nickname">
                    <em>宠物昵称</em>
                    <input type="text" maxlength="10" v-model.trim="name" v-check="{type:'textarea',val:name,long:10}">
                    <span>{{name.length}}/10</span>
                </div>
                <div class="pet_classfiy">
                    <em>宠物种类</em>
                      <el-select v-model="pettypeval" class="el_subtype" placeholder="请选择">
                            <el-option
                             v-for="(item,index) in pettype" :key="index"
                            :value="item.id"
                            :label="item.name">
                            </el-option>
                    </el-select>
                    <el-select v-model="secondeval" class="el_subtype" style="margin-left:10px" v-if="isshowsecond">
                            <el-option
                             v-for="(item,index) in secondpettype" :key="index"
                            :value="item.id"
                            :label="item.name">
                            </el-option>
                    </el-select>
                    <!-- <select v-model="pettypeval">
                                                        <option value="000">请选择</option>
                                                        <option :value="item.id" v-for="(item,index) in pettype" :key="index">{{item.name}}</option>
                                </select>
                    <select v-model="secondeval" style="margin-left:10px" v-if="isshowsecond">
                                    <option :value="item.id" v-for="(item,index) in secondpettype" :key="index">{{item.name}}</option>
                                </select> -->
                </div>
                <div class="pet_hair">
                    <em>毛色</em>
                    <input type="text" maxlength="10" v-model="color" v-check="{type:'textarea',val:color,long:10}">
                    <span>{{color.length}}/10</span>
                </div>
                <div class="pet-sex">
                    <em>性别</em>
                    <div class="sex_select">
                        <div class="sex_male" @click="choosesex()">
                            <img src="../../static/img/no_check.png" alt="" v-if="ischeck">
                            <img src="../../static/img/bind_yes.png" alt="" v-if="!ischeck">
                            <span :data-set-sex="ischeck">公</span>
                        </div>
                        <div class="sex_female" @click="choosesex()">
                            <img src="../../static/img/bind_yes.png" alt="" v-if="ischeck">
                            <img src="../../static/img/no_check.png" alt="" v-if="!ischeck">
                            <span :data-set-sex="!ischeck">母</span>
                        </div>
                    </div>
                </div>
                <div class="pet_birth">
                    <em>出生日期</em>
                    <div class="data_picker">
                        <el-date-picker v-model="birth" align="right" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="pet_price">
                    <em>价格</em>
                    <input type="text" maxlength="25" v-model="price" :class="isface?'input_price':''" @click="chooseMoney()" v-check="{type:'price',val:price}">
                    <span>元</span>
                    <i :class="isface?'is_face':''" @click="chooseisface()">面议</i>
                </div>
                <div class="pet_address">
                    <em>发布区域</em>
                    <div class="address_picker">
                        <el-select v-model="provincevalue" clearable placeholder="请选择">
                            <el-option v-for="item in provinceOptions" :key="item.value" :label="item.name" :value="item.code">
                            </el-option>
                        </el-select>
                        <i>省</i>
                        <el-select v-model="cityvalue" clearable placeholder="请选择">
                            <el-option v-for="item in cityOptions" :key="item.value" :label="item.name" :value="item.code">
                            </el-option>
                        </el-select>
                        <i>市</i>
                        <el-select v-model="citycode" clearable placeholder="请选择">
                            <el-option v-for="item in districtOptions" :key="item.value" :label="item.name" :value="item.code">
                            </el-option>
                        </el-select>
                        <i>区</i>
                    </div>
                </div>
                <div class="pet_detail">
                    <em>宠物描述</em>
                    <textarea maxlength="200" v-model="content" v-check="{type:'textarea',val:content,long:200}"></textarea>
                    <span>{{content.length}}/200</span>
                </div>
                <!-- <div class="pet_detail">
                        <em>地址</em>
                        <textarea maxlength="50" v-model="contactstreet" v-check="{type:'textarea',val:contactstreet,long:50}"></textarea>
                        <span>{{contactstreet.length}}/50</span>
                    </div> -->
                <div class="next_step">
                    <span class="fr" @click="nextclick()">下一步</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //重新计算的参数 
                ischeck: false, //选择公母
                isface: false, //是否面议
                pettype: [], //获取宠物的种类
                provinceOptions: [], //省的地址
                provincevalue: "", //省的初始化
                cityOptions: [], //市的地址
                cityvalue: '', //市的初始化
                districtOptions: [], //区的地址
                birth: '', //生日的初始化
                title: '', //宠物标题
                name: '', //宠物昵称 
                pettypeval: '', // 宠物的种类值,默认选择第一个  
                color: "", //毛色 
                sex: '1', //性别  
                birthday: '', //出生日期  
                ismianyi: 0, //1：面议，0：不面议
                price: null, //面议情况下,price为null, 
                citycode: '', //区的初始化   
                contactstreet: '', //地址
                lastcode: '', //最终传递的城市code
                //弹窗
                secondeval: '', //二级分类
                secondpettype: [], //二级分类列表
                isshowsecond: false,
                subtype: "", //物品种类
                content: '', //宠物描述
            }
        },
        created() {
            this.$http({
                url: "/chongdu/userauthent/checkIsAuthent.do",
                method: 'post',
            }).then(res => {
                if (res.data.code == 0) {
                    this.initpetType();
                    this.initaddress();
                } else if (res.data.code == 9 || res.data.code == 10 || res.data.code == 11) {
                    //未实名认证
                    this.$router.push({
                        path: '/personal/certification/info'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        },
        watch: {
            price(val) {},
            birth(val) {
                this.birthday = new Date(val).getFullYear() + '-' + (new Date(val).getMonth() + 1) + '-' + new Date(val).getDate();
            },
            //区的变化
            citycode(val) {},
            //市的变化
            cityvalue(val, oldval) {
                this.citycode = "";
                this.initdistrict();
            },
            //省的变化
            provincevalue(val) {
                this.cityvalue = "";
                this.citycode = "";
                this.initcity();
            },
            //宠物种类的变化
            pettypeval(val, oldval) {
                if (val == "000") {
                    this.isshowsecond = false;
                    this.subtype = val;
                } else {
                    this.isshowsecond = true;
                    //调用二级菜单的接口
                    this.getsecondtype()
                }
            },
            secondeval(val) {
                this.subtype = val;
            }
        },
        methods: {
            //获取二级种类的接口
            getsecondtype() {
                this.$http({
                    url: '/chongdu/petstype/list.do',
                    method: 'post',
                    params: {
                        pid: this.pettypeval
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.secondpettype = res.data.rows;
                        this.secondeval = this.secondpettype[0].id;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击下一步
            nextclick() {
                if (this.citycode !== "") {
                    this.lastcode = this.citycode
                } else {
                    if (this.cityvalue !== "") {
                        this.lastcode = this.cityvalue
                    } else {
                        if (this.provincevalue !== "") {
                            this.lastcode = this.provincevalue
                        } else {
                            this.lastcode = "";
                        }
                    }
                }
                //用来判定表单是否为空,只有再进行请求
                if (this.title !== "") {
                    if (this.name !== "") {
                        if (this.subtype !== "") {
                            if (this.color !== "") {
                                if (this.birthday !== "") {
                                    if (!(this.ismianyi == 0 && this.price == null)) {
                                        if (this.lastcode !== "") {
                                            if (this.content !== "") {
                                                this.$http({
                                                    url: 'chongdu/pet/add.do',
                                                    method: 'post',
                                                    params: {
                                                        title: this.title,
                                                        name: this.name,
                                                        subtype: this.subtype,
                                                        color: this.color,
                                                        sex: this.sex,
                                                        birthday: this.birthday,
                                                        ismianyi: this.ismianyi,
                                                        price: this.price,
                                                        citycode: this.lastcode,
                                                        content: this.content,
                                                    }
                                                }).then(res => {
                                                    console.log(res.data);
                                                    if (res.data.code == 0) {
                                                        let publishId = res.data.rows;
                                                        this.$message({
                                                            message: '发布成功',
                                                            type: 'success'
                                                        })
                                                        this.$router.push({
                                                            path: '/release/connect',
                                                            query: {
                                                                publishId: publishId
                                                            }
                                                        })
                                                    }
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                            } else {
                                                this.$message({
                                                    message: "你还没有宠物描述哦",
                                                    type: "warning",
                                                })
                                            }
                                        } else {
                                            this.$message({
                                                message: '请选择发布区域',
                                                type: "warning",
                                            })
                                        }
                                    } else {
                                        this.$message({
                                            message: '请输入价格',
                                            type: "warning",
                                        })
                                    }
                                } else {
                                    this.$message({
                                        message: '宠物出生日期',
                                        type: "warning",
                                    })
                                }
                            } else {
                                this.$message({
                                    message: '毛色不能为空',
                                    type: "warning",
                                })
                            }
                        } else {
                            this.$message({
                                message: '请选择宠物种类',
                                type: "warning",
                            })
                        }
                    } else {
                        this.$message({
                            message: '昵称不能为空',
                            type: "warning",
                        })
                    }
                } else {
                    this.$message({
                        message: '标题不能为空',
                        type: "warning",
                    })
                }
            },
            //监听选择的时间
            choosetime(event) {
                this.timemax = event;
                this.regtime = new Date(event).getFullYear() + '-' + (new Date(event).getMonth() + 1) + '-' + new Date(event).getDate() + ' ' + new Date(event).getHours() + ':' + new Date(event).getMinutes() + ':' + new Date(event).getSeconds();
            },
            //是否面议,ismianyi 1：面议，0：不面议
            chooseMoney() {
                this.isface = false;
                this.ismianyi = 0;
            },
            chooseisface() {
                this.isface = !this.isface;
                if (this.isface) {
                    this.ismianyi = 1;
                    this.price = null;
                }
            },
            //选择公母
            choosesex() {
                this.ischeck = !this.ischeck;
                $(".sex_select span").each((i, ele) => {
                    if ($(ele).attr("data-set-sex") == "true") {
                        if (i == 0) {
                            this.sex = 1
                        } else if (i == 1) {
                            this.sex = 0
                        }
                    }
                })
            },
            //获取区的地址
            initdistrict() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=' + this.cityvalue,
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.districtOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取市的地址
            initcity() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=' + this.provincevalue,
                    method: 'post',
                }).then(res => {
                    if (res.data.code == 0) {
                        this.cityOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取省市区的地址
            initaddress() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=',
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.provinceOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取宠物种类
            initpetType() {
                this.$http({
                    url: '/chongdu/petstype/list.do',
                    method: 'post'
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        this.pettype = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        },
    }
</script>
<style lang='less'>
    @import '../../static/css/common.less';
    .release {
        width: 1020px;
        background-color: #fff;
        overflow: hidden;
        .isrelease {
            width: 100%;
            padding: 120px 0;
            img {
                display: block;
                margin: 0 auto;
            }
            span {
                width: 120px;
                height: 35px;
                background-color: @commonColor;
                display: block;
                text-align: center;
                line-height: 35px;
                float: right;
                color: #fff;
                border-radius: 5px;
                margin-right: 50px;
                margin-top: 45px;
                cursor: pointer;
            }
        }
        .release_pet {
            width: 100%;
            border-top: 2px solid #39b3a7;
            .release_pet_title {
                width: 100%;
                height: 100px;
                .title_content {
                    width: 860px;
                    height: 100%;
                    margin: 0 auto;
                    border-bottom: 1px solid #b8b8b8;
                    h4 {
                        width: 100%;
                        height: 55px;
                        line-height: 55px;
                        text-align: center;
                        font-size: 24px;
                        font-weight: 700px;
                    }
                    .title_step {
                        display: -webkit-box;
                        /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                        display: -moz-box;
                        /* 老版本语法: Firefox (buggy) */
                        display: -ms-flexbox;
                        /* 混合版本语法: IE 10 */
                        display: -webkit-flex;
                        /* 新版本语法: Chrome 21+ */
                        display: flex;
                        width: 680px;
                        height: 45px;
                        margin: 0 auto;
                        .step_span {
                            width: 155px;
                            line-height: 45px;
                            height: 45px;
                            color: #b8b8b8;
                            text-align: center;
                            &:nth-of-type(1) {
                                span {
                                    color: @commonColor;
                                }
                                border-bottom: 2px solid #3ab2a7;
                            }
                        }
                        em {
                            width: 85px;
                            height: 1px;
                            background-color: #8d8d8d;
                            margin: 0 4px;
                            margin-top: 22px;
                        }
                    }
                }
            }
            .release_pet_form {
                width: 100%;
                padding-top: 25px;
                .pet_title,
                .pet_nickname,
                .pet_classfiy,
                .pet_hair,
                .pet_price,
                .pet_detail {
                    width: 100%;
                    margin-left: 35px;
                    margin-bottom: 32px;
                    em {
                        position: relative;
                        vertical-align: top;
                        width: 70px;
                        display: inline-block;
                        text-align: right;
                        font-size: 16px;
                    }
                    em:after {
                        position: absolute;
                        content: "*";
                        color: red;
                        left: 75px;
                        top: 3px;
                    }
                    textarea,
                    input,
                    select {
                        width: 336px;
                        height: 70px;
                        text-indent: 10px;
                        box-sizing: border-box;
                        margin-left: 100px;
                      

                    }
                    input {
                        height: 40px;
                        outline: none;
                        border: 1px solid #c1bfbf !important;
                        border-radius: 3px !important;
                        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                        font-size: 16px;
                    }
                    select {
                        width: 163px;
                        height: 40px;
                        box-sizing: border-box;
                        outline: none;
                        border: 1px solid #c1bfbf !important;
                        border-radius: 3px !important;
                        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                        font-size: 16px;
                    }
                    span {
                        position: relative;
                        bottom: 7px;
                        left: -50px;
                        font-size: 12px;
                    }
                     .el-select.el_subtype{
                           width:150px;
                           margin-left: 100px;
                           overflow: hidden;
                            .el-input.el-input--suffix{
                                height: 40px;
                                input{
                                    width:150px;
                                }
                                .el-input__suffix-inner{
                                    bottom: 37px;
                                    left:175px;
                                    padding-right: 0;
                                }
                                .el-input__inner{
                                    margin-left: 0;
                                }
                            }
                        }
                }
                .pet_nickname,
                .pet_classfiy,
                .pet_hair {
                    height: 40px;
                    top: 20px;
                    em {
                        line-height: 40px;
                    }
                    span {
                        bottom: -7px;
                    }
                }
                .pet-sex,
                .pet_birth {
                    height: 40px;
                    width: 100%;
                    margin-left: 35px;
                    margin-bottom: 35px;
                    em {
                        position: relative; // vertical-align: top;
                        width: 70px;
                        display: block;
                        float: left;
                        text-align: right;
                        line-height: 40px;
                        font-size: 16px;
                    }
                    em:after {
                        position: absolute;
                        content: "*";
                        color: red;
                        left: 75px;
                        top: 3px;
                    }
                    .sex_select {
                        width: 200px;
                        height: 100%;
                        float: left;
                        margin-left: 100px;
                        display: -webkit-box;
                        /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                        display: -moz-box;
                        /* 老版本语法: Firefox (buggy) */
                        display: -ms-flexbox;
                        /* 混合版本语法: IE 10 */
                        display: -webkit-flex;
                        /* 新版本语法: Chrome 21+ */
                        display: flex;
                        img {
                            width: 20px;
                            height: 20px;
                            position: relative;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        span {
                            position: relative;
                            top: 13%;
                            left: 5px;
                        }
                        .sex_male {
                            flex: 1;
                            height: 100%;
                        }
                        .sex_female {
                            flex: 1;
                            height: 100%;
                        }
                    }
                    .data_picker {
                        margin-left: 172px;
                        width: 220px;
                        height: 40px;
                        .el-input__inner {
                            border: 1px solid #c1bfbf !important;
                            border-radius: 3px !important;
                            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                            font-size: 16px;
                        }
                    }
                }
                .pet_price {
                    em {
                        line-height: 40px;
                    }
                    input {
                        width: 200px;
                        &.input_price {
                            background-color: #f2f2f2;
                        }
                    }
                    span {
                        top: 0px;
                        left: 0px;
                        font-size: 16px;
                    }
                    i {
                        position: absolute;
                        border-radius: 7px;
                        text-align: center;
                        line-height: 40px;
                        margin-left: 10px;
                        width: 100px;
                        height: 40px;
                        background-color: #f2f2f2;
                        font-size: 16px;
                        cursor: pointer;
                        &.is_face {
                            background-color: @commonColor;
                            color: #fff;
                        }
                    }
                }
                .pet_address {
                    width: 100%;
                    margin-left: 35px;
                    margin-bottom: 35px;
                    em {
                        position: relative;
                        vertical-align: top;
                        width: 70px;
                        display: inline-block;
                        text-align: right;
                        line-height: 40px;
                        font-size: 16px;
                    }
                    em:after {
                        position: absolute;
                        content: "*";
                        color: red;
                        left: 75px;
                        top: 3px;
                    }
                    .address_picker {
                        width: 640px;
                        height: 40px;
                        display: inline-block;
                        margin-left: 100px;
                        .el-select {
                            width: 150px;
                            .el-input--suffix {
                                .el-input__inner {
                                    padding-right: 0;
                                    border: 1px solid #c1bfbf;
                                    border-radius: 3px !important;
                                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                                }
                            }
                        }
                    }
                }
                .next_step {
                    width: 100%;
                    height: 99px;
                    span {
                        display: block;
                        margin-right: 47px;
                        margin-top: 30px;
                        width: 128px;
                        height: 35px;
                        background-color: @commonColor;
                        text-align: center;
                        line-height: 35px;
                        color: #fff;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>


