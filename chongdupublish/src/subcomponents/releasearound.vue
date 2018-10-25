<template>
    <!-- 发布宠物周边 -->
    <div class="release_around">
        <div class="release_content">
            <div class="release_pet">
                <div class="release_pet_title">
                    <h4>发布宠物商品</h4>
                </div>
                <div class="release_pet_form">
                    <div class="pet_title">
                        <em>商品标题</em>
                        <textarea maxlength="25" v-model.trim="title" v-check="{type:'textarea',val:title,long:25}"></textarea>
                        <span>{{title.length}}/25</span>
                    </div>
                    <div class="pet_nickname">
                        <em>商品名称</em>
                        <input type="text" maxlength="10" v-model.trim="pdtname" v-check="{type:'text',val:pdtname,long:10}">
                        <span>{{pdtname.length}}/10</span>
                    </div>
                    <div class="pet_price">
                        <em>商品重量</em>
                        <input type="text" v-model.trim="weight" v-check="{type:'price',val:weight}">
                        <span>g/个</span>
                    </div>
                    <div class="pet_price">
                        <em>商品价格</em>
                        <input type="text" v-model.trim="price" v-check="{type:'price',val:price}">
                        <span>元</span>
                    </div>
                    <div class="pet_price">
                        <em>商品库存</em>
                        <input type="text" v-model.trim="stock" v-check="{type:'price',val:stock}">
                    </div>
                    <div class="pet_classfiy">
                        <em>商品类型</em>
                        <el-select v-model="firsttype" placeholder="请选择" class="el_subtype">
                            <el-option
                             v-for="(item,index) in goodsOption" :key="index"
                            :value="item.id"
                            :label="item.name">
                            <!-- {{item.servicename}} -->
                            </el-option>
                        </el-select>
                         <el-select v-model="secondtype" v-if="isshowsecond" style="margin-left:10px" class="el_subtype">
                            <el-option
                             v-for="(item,index) in secondtypelist" :key="index"
                            :value="item.id"
                            :label="item.name">
                            <!-- {{item.servicename}} -->
                            </el-option>
                        </el-select>
                        <!-- <select v-model="firsttype">
                                                        <option value="000">请选择</option>
                                                        <option :value="item.id" v-for="(item,index) in goodsOption" :key="index">{{item.name}}</option>
                                            </select>
                        <select v-model="secondtype" v-if="isshowsecond" style="margin-left:10px">
                                                        <option :value="item.id" v-for="(item,index) in secondtypelist" :key="index">{{item.name}}</option>
                                            </select> -->
                    </div>
                    <!-- 商品广告图片 -->
                    <div class="pet_photo">
                        <h4 class="pet_photo_title">
                            <em>商品广告照片</em>
                            <i class="publish_img">支持IPG、TPEG、bmp、gif,大小不超过5M</i>
                        </h4>
                        <div class="pet_photo_list">
                            <div class="add_img_list">
                                <div class="add_img_list_detail" v-for="(item,index) in imgadSrc" :key="index">
                                    <img :src="item" alt="">
                                    <em @click="del_adimg(index)"></em>
                                </div>
                                <div class="add_img" v-if="this.topAddFile.length < 6">
                                    <input type="file" id="add_img_file" @change="addpetadImg($event)">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 商品详情照片 -->
                    <div class="pet_photo">
                        <h4 class="pet_photo_title">
                            <em>商品详情照片</em>
                            <i class="publish_img">支持IPG、TPEG、bmp、gif,大小不超过5M</i>
                        </h4>
                        <div class="pet_photo_list">
                            <div class="add_img_list">
                                <div class="add_img_list_detail" v-for="(item,index) in imgSrc" :key="index">
                                    <img :src="item" alt="">
                                    <em @click="del_img(index)"></em>
                                </div>
                                <div class="add_img" v-if="this.MultipartFile.length < 6">
                                    <input type="file" id="add_img_file" @change="addpetImg($event)">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
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
                            <el-select v-model="districtvalue" clearable placeholder="请选择">
                                <el-option v-for="item in districtOptions" :key="item.value" :label="item.name" :value="item.code">
                                </el-option>
                            </el-select>
                            <i>区</i>
                        </div>
                    </div>
                    <!-- <div class="pet_detail">
                                        <em>详细地址</em>
                                        <textarea maxlength="30" v-model.trim="street" v-check="{type:'textarea',val:street,long:30}"></textarea>
                                        <span style="left:-45px">{{street.length}}/30</span>
                                    </div> -->
                    <div class="pet_decri">
                        <em>商品描述</em>
                        <textarea maxlength="200" v-model.trim="content" v-check="{type:'textarea',val:content,long:200}"></textarea>
                        <span style="left:-45px">{{content.length}}/200</span>
                    </div>
                </div>
            </div>
            <!-- 联系人信息 -->
            <div class="connect-msg">
                <Connect/>
            </div>
            <div class="publish">
                <input type="submit" class="publish_button" value="发布" @click="flag && publishform($event)">
            </div>
        </div>
    </div>
</template>
<script>
    import Connect from "@/components/connect"
    export default {
        data() {
            return {
                imgadSrc: [], //读取照片广告的Url
                topAddFile: [], //存放的添加的商品广告照片
                imgSrc: [], //读取照片的Url
                MultipartFile: [], //存放的添加的商品照片
                provinceOptions: [], //省的地址
                provincevalue: "", //省的初始化
                cityOptions: [], //市的地址
                cityvalue: '', //市的初始化
                districtOptions: [], //区的地址
                districtvalue: '', //区的初始化,area等于
                goodsOption: [], //商品种类
                title: '', //商品标题
                pdtname: '', //商品名称
                weight: '', //商品重量
                price: '', //商品价格
                stock: '', //商品库存
                subtype: '', //商品类型
                street: "", //详细地址
                content: '', //商品描述
                flag: true, //是否可以点击
                firsttype: '', //一级分类
                secondtype: '', //二级分类
                secondtypelist: [], //二级分类列表
                isshowsecond: false, //是否显示二级
                area: "",
            }
        },
        computed: {
            addressid() {
                return this.$store.state.publishid
            }
        },
        watch: {
            //商品类型
            firsttype(val, oldval) {
                if (val == "000") {
                    this.isshowsecond = false;
                    this.subtype = val;
                } else {
                    this.isshowsecond = true;
                    //调用二级菜单的接口
                    this.getsecondtype();
                }
            },
            secondtype(val) {
                this.subtype = val;
            },
            //区的变化
            districtvalue(val) {},
            //市的变化
            cityvalue(val, oldval) {
                this.initdistrict()
            },
            //省的变化
            provincevalue(val) {
                this.initcity();
            },
        },
        created() {
            this.$http({
                url: "/chongdu/userauthent/checkIsAuthent.do",
                method: 'post',
            }).then(res => {
                if (res.data.code == 0) {
                    this.initgoodsType();
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
        methods: {
            //点击发布
            publishform(event) {
                event.preventDefault();
                console.log(this.topAddFile)
                if (this.districtvalue !== "") {
                    this.area = this.districtvalue
                } else {
                    if (this.cityvalue !== "") {
                        this.area = this.cityvalue
                    } else {
                        if (this.provincevalue !== "") {
                            this.area = this.provincevalue
                        } else {
                            this.area = "";
                        }
                    }
                }
                if (this.title !== "") {
                    if (this.pdtname !== "") {
                        if (this.weight !== "") {
                            if (this.price !== "") {
                                if (this.stock !== "") {
                                    if (this.subtype !== "") {
                                        if (this.topAddFile.length !== 0) {
                                            if (this.MultipartFile.length !== 0) {
                                                if (this.area !== "") {
                                                    if (this.content !== "") {
                                                        if (this.addressid !== "") {
                                                            let formDate = new FormData();
                                                            formDate.append("type", 1); //联系人电话
                                                            formDate.append("title", this.title); //商品标题
                                                            formDate.append("pdtname", this.pdtname); //商品名称
                                                            formDate.append("weight", this.weight); //商品重量
                                                            formDate.append("price", this.price); //商品价格
                                                            formDate.append("stock", this.stock); //商品库存
                                                            formDate.append("subtype", this.subtype); //商品类型
                                                            //循环创建
                                                            this.topAddFile.forEach((ele, i) => { //商品照片
                                                                formDate.append("topAddFile", ele);
                                                            })
                                                            this.MultipartFile.forEach((ele, i) => { //商品照片
                                                                formDate.append("file", ele);
                                                            })
                                                            formDate.append("area", this.area); //商品区域
                                                            formDate.append("content", this.content); //商品描述
                                                            formDate.append("addressid", this.addressid); //联系Id
                                                            let config = {
                                                                headers: {
                                                                    'Content-Type': 'multipart/form-data'
                                                                }
                                                            }
                                                            this.$http.post("/chongdu/goods/add.do", formDate, config).then(res => {
                                                                console.log(res.data)
                                                                if (res.data.code == 0) {
                                                                    this.flag = false;
                                                                    this.$message({
                                                                        message: '发布成功',
                                                                        type: 'success'
                                                                    })
                                                                    this.$router.push({
                                                                        path: '/postMessage/publish_goods_list'
                                                                    })
                                                                }
                                                            }).catch(err => {
                                                                console.log(err);
                                                            })
                                                        } else {
                                                            this.$message({
                                                                message: '请选择联系人信息',
                                                                type: 'warning'
                                                            })
                                                        }
                                                    } else {
                                                        this.$message({
                                                            message: '您还没有对商品进行描述哦',
                                                            type: 'warning'
                                                        })
                                                    }
                                                } else {
                                                    this.$message({
                                                        message: '请选择发布区域',
                                                        type: 'warning'
                                                    })
                                                }
                                            } else {
                                                this.$message({
                                                    message: '请上传商品详情照片',
                                                    type: 'warning'
                                                })
                                            }
                                        } else {
                                            this.$message({
                                                message: '请上传商品广告照片',
                                                type: 'warning'
                                            })
                                        }
                                    } else {
                                        this.$message({
                                            message: '请选择商品类型',
                                            type: 'warning'
                                        })
                                    }
                                } else {
                                    this.$message({
                                        message: '请输入库存量',
                                        type: 'warning'
                                    })
                                }
                            } else {
                                this.$message({
                                    message: '请输入价格',
                                    type: 'warning'
                                })
                            }
                        } else {
                            this.$message({
                                message: '请输入商品重量',
                                type: 'warning'
                            })
                        }
                    } else {
                        this.$message({
                            message: '商品名称不能为空',
                            type: 'warning'
                        })
                    }
                } else {
                    this.$message({
                        message: '标题不能为空',
                        type: 'warning'
                    })
                }
            },
            //删除广告图片
            del_adimg(index) {
                this.$delete(this.imgadSrc, index);
                this.$delete(this.topAddFile, index);
            },
            //添加广告照片
            addpetadImg(event) {
                let isHave = false; //是否存在已经添加的图片
                if (this.topAddFile.length < 7) {
                    $(this.topAddFile).each((i, ele) => {
                        if (event.target.files[0].name == ele.name) {
                            isHave = true;
                        }
                    })
                    if (!isHave) {
                        this.topAddFile.push(event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onload = (e) => {
                            this.imgadSrc.push(e.target.result);
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                    this.$message({
                        message: '最多加入六张图片',
                        type: 'warning'
                    })
                }
            },
            //删除添加的照片
            del_img(index) {
                this.$delete(this.imgSrc, index);
                this.$delete(this.MultipartFile, index);
            },
            //添加照片
            addpetImg(event) {
                let isHave = false; //是否存在已经添加的图片
                if (this.MultipartFile.length < 7) {
                    $(this.MultipartFile).each((i, ele) => {
                        if (event.target.files[0].name == ele.name) {
                            isHave = true;
                        }
                    })
                    if (!isHave) {
                        this.MultipartFile.push(event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onload = (e) => {
                            this.imgSrc.push(e.target.result);
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                    this.$message({
                        message: '最多加入六张图片',
                        type: 'warning'
                    })
                }
            },
            //获取二级种类的接口
            getsecondtype() {
                this.$http({
                    url: '/chongdu/goodstype/list.do',
                    method: 'post',
                    params: {
                        pid: this.firsttype
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.secondtypelist = res.data.rows;
                        this.secondtype = this.secondtypelist[0].id;
                    }
                }).catch(err => {
                    console.log(err)
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
            //获取省的地址
            initaddress() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=',
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.provinceOptions = res.data.rows;
                    }
                    // console.log(res.data)
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取服务类型
            initgoodsType() {
                this.$http({
                    url: '/chongdu/goodstype/list.do',
                    method: 'post'
                }).then(res => {
                    this.goodsOption = res.data.rows;
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        components: {
            Connect
        }
    }
</script>
<style lang='less'>
    @import '../../static/css/common.less';
    .release_around {
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
        }
        .release_content {
            width: 100%;
            .release_pet {
                width: 100%;
                .release_pet_title {
                    width: 100%;
                    height: 60px;
                    border-bottom: 1px solid @commonColor;
                    h4 {
                        width: 180px;
                        height: 100%;
                        background-color: @commonColor;
                        text-align: center;
                        line-height: 60px;
                        cursor: pointer;
                        color: #fff;
                        font-size: 16px;
                    }
                }
                .release_pet_form {
                    width: 100%;
                    padding-top: 25px;
                    .pet_title,
                    .pet_nickname,
                    .pet_classfiy,
                    .pet_price,
                    .pet_detail,
                    .pet_decri,
                    {
                        width: 100%;
                        margin-left: 35px;
                        margin-bottom: 32px;
                        em {
                            position: relative;
                            vertical-align: top;
                            width: 90px;
                            display: inline-block;
                            text-align: right;
                        }
                        em:after {
                            position: absolute;
                            content: "*";
                            color: red;
                            left: 95px;
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
                            left: -60px;
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
                                    left:183px;
                                    padding-right: 0;
                                }
                                .el-input__inner{
                                    margin-left: 0;
                                }
                            }
                        }
                    }
                    .pet_nickname,
                    .pet_classfiy {
                        height: 40px;
                        top: 20px;
                        em {
                            line-height: 40px;
                        }
                        span {
                            bottom: -7px;
                        }
                    }
                    .pet_price {
                        em {
                            line-height: 40px;
                        }
                        input {
                            width: 200px;
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
                        }
                    }
                    .pet_address {
                        width: 100%;
                        margin-left: 35px;
                        margin-bottom: 32px;
                        em {
                            position: relative;
                            vertical-align: top;
                            width: 90px;
                            display: inline-block;
                            text-align: right;
                            line-height: 40px;
                        }
                        em:after {
                            position: absolute;
                            content: "*";
                            color: red;
                            left: 95px;
                            top: 3px;
                        }
                        .address_picker {
                            width: 650px;
                            height: 40px;
                            display: inline-block;
                            margin-left: 100px;
                            .el-select {
                                width: 160px;
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
                    .pet_photo {
                        width: 100%;
                        margin-bottom: 35px;
                        .pet_photo_title {
                            width: 100%;
                            height: 40px;
                            margin-left: 35px;
                            em {
                                position: relative;
                                vertical-align: top;
                                width: 90px;
                                display: inline-block;
                                text-align: right;
                            }
                            em:after {
                                position: absolute;
                                content: "*";
                                color: red;
                                left: 95px;
                                top: 3px;
                            }
                            i {
                                color: #8D8D8D;
                                font-size: 12px;
                                margin-left: 100px;
                            }
                        }
                        .pet_photo_list {
                            width: 100%;
                            padding-left: 228px;
                            box-sizing: border-box;
                            margin-bottom: 20px;
                            display: -webkit-box;
                            /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                            display: -moz-box;
                            /* 老版本语法: Firefox (buggy) */
                            display: -ms-flexbox;
                            /* 混合版本语法: IE 10 */
                            display: -webkit-flex;
                            /* 新版本语法: Chrome 21+ */
                            display: flex;
                            .add_img_list {
                                width: 100%;
                                float: left;
                                .add_img_list_detail {
                                    width: 100px;
                                    height: 100px;
                                    margin-right: 20px;
                                    position: relative;
                                    float: left;
                                    margin-bottom: 20px;
                                    img {
                                        width: 100px;
                                        height: 100px;
                                    }
                                    em {
                                        width: 20px;
                                        height: 20px;
                                        position: absolute;
                                        top: -10px;
                                        right: -10px;
                                        display: block;
                                        background: url(../../static/img/delimg.png) no-repeat center;
                                        border-radius: 10px;
                                    }
                                }
                                .add_img {
                                    width: 100px;
                                    height: 100px;
                                    border: 3px dashed black;
                                    text-align: center;
                                    line-height: 85px;
                                    box-sizing: border-box;
                                    float: left;
                                    position: relative;
                                    overflow: hidden;
                                    span {
                                        font-size: 100px;
                                    }
                                    input {
                                        width: 100px;
                                        height: 100px;
                                        position: absolute;
                                        right: 20px;
                                        opacity: 0;
                                        cursor: pointer;
                                    }
                                }
                            }
                            .add_file {
                                width: 350px;
                                height: 100px;
                                position: relative;
                                input {
                                    border: 1px solid #c1bfbf;
                                    width: 150px;
                                    height: 30px;
                                    text-align: center;
                                    border-radius: 3px;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                                span {
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    right: 0;
                                }
                            }
                        }
                    }
                }
            }
            .connect-msg {
                padding-left: 35px;
            }
            .publish {
                width: 100%;
                padding-right: 30px;
                box-sizing: border-box;
                .publish_button {
                    display: block;
                    border: 0;
                    width: 110px;
                    height: 32px;
                    border-radius: 7px;
                    background-color: @commonColor;
                    float: right;
                    margin-bottom: 35px;
                    color: #fff;
                    text-align: center;
                    line-height: 32px;
                    font-size: 18px;
                    cursor: pointer;
                }
            }
        }
    }
</style>





