<template>
    <div class="address">
        <div class="title">
            <h4>地址管理</h4>
        </div>
        <div class="address_content">
            <div class="address_innner">
                <div class="innner_title">
                    <span></span>
                    <h3>添加地址信息</h3>
                </div>
                <!-- 显示添加的表单或者列表 -->
                <div class="list_form">
                    <div class="address_list_content" v-if="addresslist.length !== 0">
                        <!-- 显示添加后的列表 -->
                        <div class="address_list_box" v-for="(item,index) in addresslist" :key="index">
                            <div class="address_list" :class="editindex == index?'activeedit':''">
                                <div class="address_name">
                                    <span>{{item.name}}</span>
                                    <img src="../../static/img/squery.png" v-if="item.isdefault == 1">
                                    <i v-if="item.isdefault == 1">默</i>
                                </div>
                                <div class="address_phone">
                                    <span>{{item.phonenumber}}</span>
                                </div>
                                <div class="address_street">
                                    {{item.allArea+item.street}}
                                </div>
                                <div class="address_operate">
                                    <em @click="clickdefault(item)">设为默认地址</em>
                                    <em @click="clickedit(item,index)" class="edit">编辑</em>
                                    <em @click="deleteitem(item)">删除</em>
                                </div>
                            </div>
                            <div class="edit_form">
                                <!-- 用来存放编辑的表单 -->
                            </div>
                        </div>
                    </div>
                    <div class="add_address_form">
                        <div class="address_form">
                            <!-- 添加地址的表单 -->
                            <form @submit.prevent="editindex == -1?(isadd&&addform()):(isedit&&editform())">
                                <div class="close" @click="closeclick()">
                                    <img src="../../static/img/new_x.png" alt="">
                                </div>
                                <p>
                                    <label>联系人姓名</label>
                                    <input type="text" placeholder="联系人姓名" v-model="name">
                                </p>
                                <p>
                                    <label>联系人电话</label>
                                    <input type="text" placeholder="联系人电话" v-model="phonenumber">
                                </p>
                                <p>
                                    <label>所在区域</label>
                                    <span class="address_picker">
                                        <el-select v-model="provincevalue" clearable placeholder="请选择" style="width:131px">
                                            <el-option v-for="item in provinceOptions" :key="item.value" :label="item.name" :value="item.code">
                                            </el-option>
                                        </el-select>
                                        <i>省</i>
                                        <el-select v-model="cityvalue" clearable placeholder="请选择" style="width:131px">
                                                                                <el-option v-for="item in cityOptions" :key="item.value" :label="item.name" :value="item.code">
                                                                                </el-option>
                                                                            </el-select>
                                                                            <i>市</i>
                                                                            <el-select v-model="citycode" clearable placeholder="请选择" style="width:131px">
                                                                                <el-option v-for="item in districtOptions" :key="item.value" :label="item.name" :value="item.code">
                                                                                </el-option>
                                                                            </el-select>
                                                                            <i>区</i>
                                                                        </span>
                                </p>
                                <p>
                                    <label>详细地址</label>
                                    <input type="text" placeholder="详细地址" v-model="street">
                                </p>
                                <p>
                                    <label>默认</label>
                                    <el-switch v-model="isdefault" active-color="#2ec2b4" inactive-color="#bfbfbf" active-value="1" inactive-value="0">
                                    </el-switch>
                                </p>
                                <button type="submit">{{editindex == -1? '添加':'编辑'}}</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="add_button" v-if="showaddbutton && addresslist.length<6">
                    <div class="click_add" @click="clickaddaddress()">
                        <img src="../../static/img/add.png" alt="">
                        <span>新增地址</span>
                    </div>
                    <p>{{addresslist.length==0?`最多添加6条地址`:`还可添加`+(6-addresslist.length)+`条`}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                provinceOptions: [], //省的地址
                provincevalue: "", //省的初始化
                cityOptions: [], //市的地址
                cityvalue: '', //市的初始化
                districtOptions: [], //区的地址
                citycode: '', //区的初始化,area等于
                maxaddlength: '最多添加6条地址', //显示几条地址内容的变化
                showaddbutton: true, //点击新增地址时,按钮不显示的标记
                addresslist: [], //添加的回显的地址
                name: '', //联系人姓名
                phonenumber: '', //联系人电话
                area: "", //区域
                street: "", //详细地址
                isdefault: 0, //是否为默认,0是非默认,1是默认
                editindex: -1, //当前点击编辑时样式的改变
                editItem: {}, //编辑的当前对象
                isedit: true, //能否点击编辑
                isadd: true, //能否点击增加
                defaultIndex: -1, //默认的索引
            }
        },
        created() {
            this.initaddress();
            this.initaddrss();
        },
        methods: {
            //点击删除地址
            deleteitem(item) {
                this.showaddbutton = true;
                $(".address_form").css({
                    "height": "0",
                    "border": "0",
                    "margin-bottom": "0",
                });
                this.$msgbox({
                    title: "提示",
                    message: '确定删除该地址',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnClickModal: false,
                    showCancelButton: true,
                    beforeClose: (action, instance, done) => {
                        if (action == "cancel" || action == "close") {
                            done();
                        } else if (action == "confirm") {
                            this.$http({
                                url: "/chongdu/address/delete.do",
                                method: 'post',
                                params: {
                                    ids: item.id
                                }
                            }).then(res => {
                                if (res.data.code == 0) {
                                    done();
                                    $(".add_address_form").html($(".address_form"));
                                    this.initaddrss();
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    })
                                } else {
                                    this.$message({
                                        message: '删除失败',
                                        type: 'warning',
                                    })
                                    done();
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    }
                })
            },
            //点击设为默认地址
            clickdefault(item) {
                this.showaddbutton = true;
                $(".address_form").css({
                    "height": "0",
                    "border": "0",
                    "margin-bottom": "0",
                });
                this.$http({
                    url: "/chongdu/address/edit.do",
                    method: 'post',
                    params: {
                        isdefault: 1,
                        id: item.id
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        $(".add_address_form").html($(".address_form"));
                        this.initaddrss();
                        this.$message({
                            message: "设置成功",
                            type: 'success'
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击编辑提交表单更改地址
            editform() {
                if (this.citycode !== "") {
                    this.area = this.citycode
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
                //空不能输入
                if (this.name !== "") {
                    if (this.phonenumber !== "") {
                        if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phonenumber)) {
                            if (this.area !== "") {
                                if (this.street !== "") {
                                    let formdate = new FormData();
                                    formdate.append('name', this.name);
                                    formdate.append('phonenumber', this.phonenumber);
                                    formdate.append('area', this.area);
                                    formdate.append('street', this.street);
                                    formdate.append('isdefault', this.isdefault);
                                    formdate.append('id', this.editItem.id);
                                    this.$http({
                                        url: '/chongdu/address/edit.do',
                                        data: formdate,
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    }).then(res => {
                                        if (res.data.code == 0) {
                                            // $(".edit_form:eq("+this.editindex+")").remove();
                                            this.isedit = false;
                                            this.editindex = -1;
                                            $(".add_address_form").html($(".address_form"));
                                            this.initaddrss();
                                            this.$message({
                                                message: '修改成功',
                                                type: 'success'
                                            })
                                            $(".address_form").css({
                                                "height": "0",
                                                "border": "0",
                                                "margin-bottom": "0",
                                            });
                                        }
                                    })
                                } else {
                                    this.$message({
                                        message: "请输入详细地址",
                                        type: "warning"
                                    })
                                }
                            } else {
                                this.$message({
                                    message: "请选择地址",
                                    type: "warning"
                                })
                            }
                        } else {
                            this.$message({
                                message: "手机号码格式错误",
                                type: "warning"
                            })
                        }
                    } else {
                        this.$message({
                            message: "手机号码不能为空",
                            type: "warning"
                        })
                    }
                } else {
                    this.$message({
                        message: "姓名不能为空",
                        type: "warning"
                    })
                }
            },
            //点击地址列表中编辑
            clickedit(item, index) {
                this.isedit = true;
                this.editindex = index;
                this.editItem = item;
                this.name = item.name;
                this.phonenumber = item.phonenumber;
                $(".edit_form:eq(" + index + ")").html($(".address_form"))
                $(".address_form").css({
                    "height": "440px",
                    "border": "1px dashed #2ec2b4",
                    "margin-bottom": "27px",
                });
            },
            //添加地址的表单
            addform() {
                if (this.citycode !== "") {
                    this.area = this.citycode
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
                //空不能输入
                if (this.name !== "") {
                    if (this.phonenumber !== "") {
                        if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.phonenumber)) {
                            if (this.area !== "") {
                                if (this.street !== "") {
                                    let formdate = new FormData();
                                    formdate.append('name', this.name);
                                    formdate.append('phonenumber', this.phonenumber);
                                    formdate.append('area', this.area);
                                    formdate.append('street', this.street);
                                    formdate.append('isdefault', this.isdefault);
                                    this.$http({
                                        url: '/chongdu/address/add.do',
                                        data: formdate,
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    }).then(res => {
                                        if (res.data.code == 0) {
                                            this.isadd = false;
                                            this.showaddbutton = true;
                                            $(".address_form").css({
                                                "height": "0",
                                                "border": "0"
                                            });
                                            this.initaddrss();
                                        }
                                    })
                                } else {
                                    this.$message({
                                        message: "请输入详细地址",
                                        type: "warning"
                                    })
                                }
                            } else {
                                this.$message({
                                    message: "请选择地址",
                                    type: "warning"
                                })
                            }
                        } else {
                            this.$message({
                                message: "手机号码格式错误",
                                type: "warning"
                            })
                        }
                    } else {
                        this.$message({
                            message: "手机号码不能为空",
                            type: "warning"
                        })
                    }
                } else {
                    this.$message({
                        message: "姓名不能为空",
                        type: "warning"
                    })
                }
            },
            //点击增加地址的按钮,显示出form表单
            clickaddaddress() {
                this.showaddbutton = false;
                this.editindex = -1;
                this.isadd = true;
                $(".address_form").css({
                    "height": "440px",
                    "border": "1px dashed #2ec2b4",
                });
            },
            //点击关闭表单
            closeclick() {
                this.showaddbutton = true;
                this.editindex = -1;
                $(".add_address_form").html($(".address_form"));
                $(".address_form").css({
                    "height": "0",
                    "border": "0",
                    "margin-bottom": "0",
                });
            },
            //先查看有没有地址
            initaddrss() {
                this.$http({
                    url: '/chongdu/address/list.do',
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        $(res.data.rows).each((i, ele) => {
                            ele.index = i;
                            if (ele.isdefault == 1) {
                                let defaultlist = res.data.rows.splice(ele.index, 1)[0];
                                res.data.rows.unshift(defaultlist);
                            }
                        })
                        this.addresslist = res.data.rows;
                        //让默认地址默认显示在第一行
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
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        watch: {
            //区的变化
            citycode(val) {},
            //市的变化
            cityvalue(val, oldval) {
                this.initdistrict()
            },
            //省的变化
            provincevalue(val) {
                this.initcity();
            },
        }
    }
</script>
<style scoped lang="less">
    @import '../../static/css/common.less';
    .el-button.el-button--default.el-button--small.el-button--primary {
        background-color: red !important;
    }
    .address {
        width: 100%;
        background-color: #fff;
        padding-bottom: 60px;
        .title {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid @commonColor;
            h4 {
                display: block;
                width: 130px;
                height: 100%;
                text-align: center;
                line-height: 50px;
                background-color: @commonColor;
                color: #fff;
                font-size: 16px;
            }
        }
        .address_content {
            width: 100%;
            min-height: 800px;
            padding: 0 21px;
            box-sizing: border-box;
            .address_innner {
                width: 100%;
                overflow: hidden;
                .innner_title {
                    width: 100%;
                    height: 82px;
                    span {
                        float: left;
                        width: 15px;
                        height: 26px;
                        margin-right: 22px;
                        background-color: @commonColor;
                        margin-top: 26px;
                    }
                    h3 {
                        display: block;
                        float: left;
                        font-size: 16px;
                        margin-top: 30px;
                    }
                }
                .add_button {
                    width: 100%;
                    padding-left: 34px;
                    box-sizing: border-box;
                    height: 45px;
                    margin-bottom: 87px;
                    .click_add {
                        width: 150px;
                        height: 45px;
                        border: 1px dashed @commonColor;
                        box-sizing: border-box;
                        background-color: #eefdfb;
                        border-radius: 5px;
                        margin-right: 17px;
                        float: left;
                        cursor: pointer;
                        img {
                            position: relative;
                            left: 33px;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        span {
                            font-size: 16px;
                            color: #29766e;
                            position: relative;
                            right: -40px;
                            top: 25%;
                        }
                    }
                    p {
                        float: left;
                        width: 150px;
                        height: 100%;
                        line-height: 45px;
                        font-size: 14px;
                    }
                }
                .list_form {
                    width: 100%;
                    .address_list_content {
                        width: 100%;
                        margin-bottom: 27px;
                        .address_list_box {
                            width: 100%;
                            .address_list {
                                margin-bottom: 27px;
                                width: 100%;
                                height: 45px;
                                background-color: #f7f7f7;
                                display: -moz-box;
                                /* 老版本语法: Firefox (buggy) */
                                display: -ms-flexbox;
                                /* 混合版本语法: IE 10 */
                                display: -webkit-flex;
                                /* 新版本语法: Chrome 21+ */
                                display: flex;
                                &.activeedit {
                                    background-color: #f6f6f6;
                                    margin-bottom: 0;
                                    .address_name {
                                        background-color: #f0f0f0;
                                    }
                                    .address_operate {
                                        display: block;
                                        .edit {
                                            color: #f7ad2c;
                                        }
                                    }
                                }
                                .address_name {
                                    width: 152px;
                                    height: 100%;
                                    background-color: #dff9f6;
                                    font-size: 16px;
                                    text-align: center;
                                    line-height: 45px;
                                    position: relative;
                                    padding: 0 10px;
                                    box-sizing: border-box;
                                    overflow: hidden;
                                    img {
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        z-index: 1999;
                                    }
                                    i {
                                        position: absolute;
                                        left: 3px;
                                        top: -13px;
                                        z-index: 2000;
                                        font-size: 12px;
                                        color: #fff;
                                    }
                                }
                                .address_phone {
                                    width: 150px;
                                    height: 100%;
                                    line-height: 45px;
                                    text-align: center;
                                    overflow: hidden;
                                }
                                .address_street {
                                    max-width: 435px;
                                    height: 100%;
                                    line-height: 45px;
                                    overflow: hidden;
                                }
                                .address_operate {
                                    flex: 1;
                                    height: 100%;
                                    line-height: 45px;
                                    text-align: right;
                                    display: none;
                                    em {
                                        color: #babbbb;
                                        font-size: 16px;
                                        margin-right: 12px;
                                        cursor: pointer;
                                    }
                                }
                                &:hover {
                                    background-color: #effdfb;
                                    .address_operate {
                                        display: block;
                                    }
                                }
                            }
                            .edit_form {
                                width: 100%;
                            }
                        }
                    }
                    .add_address_form {
                        width: 100%;
                    }
                    .address_form {
                        width: 100%;
                        overflow: hidden;
                        height: 0;
                        box-sizing: border-box;
                        border-radius: 3px;
                        padding-left: 39px;
                        box-sizing: border-box;
                        transition: height 0.1s linear;
                        /* Firefox 4 */
                        -moz-transition: height 0.1s linear;
                        /* Safari and Chrome */
                        -webkit-transition: height 0.1s linear;
                        /* Opera */
                        -o-transition: height 0.1s linear;
                        form {
                            padding-top: 32px;
                            box-sizing: border-box;
                            position: relative;
                            width: 100%;
                            height: 100%;
                            position: relative;
                            .close {
                                width: 16px;
                                height: 16px;
                                position: absolute;
                                right: 5px;
                                top: 5px;
                                cursor: pointer;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            button {
                                width: 135px;
                                height: 40px;
                                outline: none;
                                border: 0;
                                background-color: @commonColor;
                                border-radius: 5px;
                                color: #fff;
                                font-size: 16px;
                                letter-spacing: 5px;
                                cursor: pointer;
                                position: absolute;
                                right: 21px;
                                bottom: 21px;
                            }
                            p {
                                margin-bottom: 22px;
                                label {
                                    width: 120px;
                                    display: inline-block;
                                    text-align: right;
                                    margin-right: 45px;
                                    position: relative;
                                    &:before {
                                        content: '*';
                                        color: red;
                                        position: absolute;
                                        right: -10px;
                                        top: 0;
                                    }
                                }
                                input {
                                    width: 262px;
                                    height: 45px;
                                    padding-left: 15px;
                                    box-sizing: border-box;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>


