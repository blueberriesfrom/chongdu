<template>
    <div class="addmsg">
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
        <div class="addmsg_body">
            <!-- 疫苗 -->
            <div class="vaccine">
                <div class="vaccine_title">
                    <p>疫苗信息</p>
                </div>
                <div class="vaccine_form">
                    <ul class="form_title">
                        <li style="width:117px">疫苗品牌</li>
                        <li style="width:142px">疫苗时间</li>
                        <li style="width:125px">疫苗地址</li>
                        <li style="width:207px">疫苗说明<em>(最多20个字)</em></li>
                        <li style="width:255px">疫苗照片</li>
                        <li>
                            <span @click="showvaccine()">
                                                                <em>+</em>
                                                                添加疫苗信息
                                            </span>
                        </li>
                    </ul>
                    <div class="form_none" v-if="isvaccine == true">
                        <img src="../../static/img/nosj.png" alt="">
                    </div>
                    <div class="form_body" v-if="isvaccine == false">
                        <ul class="form_list" v-for="(item,index) in vaccinelist" :key="index">
                            <li style="width:117px">{{item.insecttype.name}}</li>
                            <li style="width:142px">{{item.regtime}}</li>
                            <li style="width:125px">{{item.street}}</li>
                            <li style="width:207px">{{item.content}}</li>
                            <li style="width:255px">
                                <img :src="itemson.path" v-for="(itemson,indexson) in item.imageList" :key="indexson">
                            </li>
                            <li>
                                <p @click="dellist(item)">删除</p>
                                <p @click="editlist(item)">修改</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 驱虫 -->
            <div class="insect">
                <div class="vaccine_title">
                    <p>驱虫信息</p>
                </div>
                <div class="vaccine_form">
                    <ul class="form_title">
                        <li style="width:117px">驱虫品牌</li>
                        <li style="width:142px">驱虫时间</li>
                        <li style="width:125px">驱虫地址</li>
                        <li style="width:207px">驱虫说明<em>(最多20个字)</em></li>
                        <li style="width:255px">驱虫照片</li>
                        <li>
                            <span @click="showinsect()">
                                                                <em>+</em>
                                                                添加驱虫信息
                                                            </span>
                        </li>
                    </ul>
                    <div class="form_none" v-if="isinsect == true">
                        <img src="../../static/img/nosj.png" alt="">
                    </div>
                    <div class="form_body" v-if="isinsect == false">
                        <ul class="form_list" v-for="(item,index) in insectlist" :key="index">
                            <li style="width:117px">{{item.insecttype.name}}</li>
                            <li style="width:142px">{{item.regtime}}</li>
                            <li style="width:125px">{{item.street}}</li>
                            <li style="width:207px">{{item.content}}</li>
                            <li style="width:255px">
                                <img :src="itemson.path" v-for="(itemson,indexson) in item.imageList" :key="indexson">
                            </li>
                            <li>
                                <p @click="dellist(item)">删除</p>
                                <p @click="editlist(item)">修改</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false" :title="formtitle">
            <form>
                <div class="form">
                    <div class="form_list">
                        <label for="">打针顺序</label>
                        <select v-model="inject">
                                                        <option value="">-请选择--</option>
                                                        <option value="1">第一针</option>
                                                        <option value="2">第二针</option>
                                                        <option value="3">第三针</option>
                                                </select>
                    </div>
                    <div class="form_list">
                        <label for="">{{formname}}</label>
                        <select v-model="nameid">
                                                        <option value="">-请选择--</option>
                                                        <option :value="item.id" v-for="(item,index) in brands" :key="index">{{item.name}}</option>
                                         </select>
                    </div>
                    <div class="form_list">
                        <label for="">{{formtime}}</label>
                        <el-date-picker v-model="insecttime" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="form_list">
                        <label for="">{{formaddress}}</label>
                        <input type="text" v-model="address">
                    </div>
                    <div class="form_list">
                        <label for="">{{formcontent}}</label>
                        <textarea v-model="content"></textarea>
                    </div>
                    <div class="form_list">
                        <label for="">{{formImg}}</label>
                        <div class="form_img">
                            <span v-for="(item,index) in imgUrl" :key="index">
                                                        <img :src="item" alt="">
                                                        <em @click="delpetImg(index)"></em>
                                        </span>
                            <div class="add_button" v-if="(ids.length-newidsafter.length+imgFile.length)< 3">
                                <em>
                                                <img src="../../static/img/djh.png" alt="">
                                            </em>
                                <input type="file" @change="addpetImg($event)">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <span slot="footer" class="dialog-footer">
                                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                                    <el-button type="primary" @click="submitform()">确 定</el-button>
                                    </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                isvaccine: false, //是否有疫苗信息
                isinsect: false, //是否有驱虫信息
                //弹窗label标题
                formtitle: '', //标题
                formname: '', //名称
                formtime: '', //时间
                formaddress: '', //地址
                formcontent: "", //说明
                formImg: '', //照片
                //表单的option
                brands: [], //疫苗,驱虫品牌
                //图片
                imgUrl: [], //图片路径
                imgFile: [], //图片file文件
                //表单内容绑定
                inject: '', //打针顺序
                nameid: '', //名称
                insecttime: "", //时间
                address: '', //地址
                content: '', //说明
                petid: this.$route.query.petId, //前一页生成的petid
                type: "", //类型
                //回显数据
                vaccinelist: [], //疫苗信息列表
                insectlist: [], //驱虫信息列表
                isedit: false, //是否编辑
                ids: [], //回显图片的ids
                newids: [], //删除图片id的集合
                newidsafter: [], //删除图片id的去重后的集合
                editid: '', //修改疫苗id
            }
        },
        created() {
            this.initvaccine();
            this.initinsect();
        },
        methods: {
            //点击修改
            editlist(item) {
                this.imgFile = [];
                this.editid = item.id;
                this.isedit = true;
                if (item.type == 1) {
                    this.showinsect();
                    this.type = 1;
                } else if (item.type == 2) {
                    this.showvaccine();
                    this.type = 2;
                }
                this.inject = item.indexnum; //打针顺序
                this.nameid = item.insecttype.id; //疫苗名陈
                this.insecttime = item.ct; //时间
                this.address = item.street; //地址
                this.content = item.content; //说明
                this.imgUrl = item.imageList.map((ele, i) => {
                    return ele.path
                }); //图片
                this.ids = item.imageList.map((ele, i) => {
                    return ele.id
                }); //图片
            },
            //点击删除列表
            dellist(item) {
                this.$http({
                    url: '/chongdu/insect/delete.do?ids=' + item.id,
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        if (item.type == 2) {
                            this.initvaccine();
                        } else if (item.type == 1) {
                            this.initinsect();
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击提交表单
            submitform() {
                if (this.isedit == false) {
                    var insecttime = new Date(this.insecttime);
                    var years = insecttime.getFullYear();
                    var month = insecttime.getMonth() + 1;
                    var day = insecttime.getDate();
                    var hours = insecttime.getHours() < 10 ? "0" + insecttime.getHours() : insecttime.getHours();
                    var minutes = insecttime.getMinutes() < 10 ? "0" + insecttime.getMinutes() : insecttime.getMinutes();
                    var seconds = insecttime.getSeconds() < 10 ? "0" + insecttime.getSeconds() : insecttime.getSeconds();
                    insecttime = years + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
                    var fomdata = new FormData();
                    fomdata.append('type', this.type);
                    fomdata.append('regtime', insecttime);
                    fomdata.append('indexnum', this.inject);
                    fomdata.append('brand', this.nameid);
                    fomdata.append('petid', this.petid);
                    fomdata.append('street', this.address);
                    fomdata.append('content', this.content);
                    this.imgFile.forEach((ele, i) => {
                        fomdata.append('file', ele);
                    })
                    if (this.nameid !== "") {
                        this.$http({
                            url: '/chongdu/insect/add.do',
                            method: 'post',
                            data: fomdata,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(res => {
                            if (res.data.code == 0) {
                                this.dialogVisible = false;
                                if (this.type == 1) {
                                    this.initinsect();
                                } else if (this.type == 2) {
                                    this.initvaccine();
                                }
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        this.$message({
                            message: "请输入疫苗品牌",
                            type: 'warning'
                        })
                    }
                } else if (this.isedit == true) {
                    var insecttime = new Date(this.insecttime);
                    var years = insecttime.getFullYear();
                    var month = insecttime.getMonth() + 1;
                    var day = insecttime.getDate();
                    var hours = insecttime.getHours() < 10 ? "0" + insecttime.getHours() : insecttime.getHours();
                    var minutes = insecttime.getMinutes() < 10 ? "0" + insecttime.getMinutes() : insecttime.getMinutes();
                    var seconds = insecttime.getSeconds() < 10 ? "0" + insecttime.getSeconds() : insecttime.getSeconds();
                    insecttime = years + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
                    var fomdata = new FormData();
                    fomdata.append('type', this.type);
                    fomdata.append('regtime', insecttime);
                    fomdata.append('indexnum', this.inject);
                    fomdata.append('brand', this.nameid);
                    fomdata.append('petid', this.petid);
                    fomdata.append('street', this.address);
                    fomdata.append('content', this.content);
                    fomdata.append('id', this.editid);
                    fomdata.append('ids', this.newids.join(","));
                    this.imgFile.forEach((ele, i) => {
                        fomdata.append('file', ele);
                    })
                    if (this.nameid !== "") {
                        this.$http({
                            url: '/chongdu/insect/edit.do',
                            method: 'post',
                            data: fomdata,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(res => {
                            if (res.data.code == 0) {
                                this.newidsafter=[];
                                this.ids.length = 0;
                                this.newids.length = 0;
                                this.imgFile.length = 0;
                                this.dialogVisible = false;
                                if (this.type == 1) {
                                    this.initinsect();
                                } else if (this.type == 2) {
                                    this.initvaccine();
                                }
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        this.$message({
                            message: "请输入疫苗品牌",
                            type: 'warning'
                        })
                    }
                }
            },
            //点击疫苗信息           
            showvaccine() {
                this.dialogVisible = true;
                this.type = 2;
                this.formtitle = "添加疫苗信息";
                this.formname = "疫苗名称";
                this.formtime = "疫苗时间";
                this.formaddress = "疫苗地址";
                this.formcontent = "疫苗说明";
                this.formImg = "疫苗照片";
                this.initvac(); //获取疫苗品牌
                this.inject = "";
                this.nameid = "";
                this.insecttime = "";
                this.address = "";
                this.content = "";
                this.imgUrl = [];
            },
            //点击驱虫信息
            showinsect() {
                this.dialogVisible = true;
                this.type = 1;
                this.formtitle = "添加驱虫信息";
                this.formname = "驱虫名称";
                this.formtime = "驱虫时间";
                this.formaddress = "驱虫地址";
                this.formcontent = "驱虫说明";
                this.formImg = "驱虫照片";
                this.initins(); //获取驱虫品牌
                this.inject = "";
                this.nameid = "";
                this.insecttime = "";
                this.address = "";
                this.content = "";
                this.imgUrl = [];
            },
            //初始化疫苗信息
            initvaccine() {
                this.$http({
                    url: '/chongdu/insect/list.do',
                    method: 'post',
                    params: {
                        type: 2,
                        petid: this.petid,
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        if (res.data.rows.length == 0) {
                            this.isvaccine = true;
                        } else {
                            this.isvaccine = false;
                            this.vaccinelist = res.data.rows;
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //初始化驱虫信息
            initinsect() {
                this.$http({
                    url: '/chongdu/insect/list.do',
                    method: 'post',
                    params: {
                        type: 1,
                        petid: this.petid,
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        if (res.data.rows.length == 0) {
                            this.isinsect = true;
                        } else {
                            this.isinsect = false;
                            this.insectlist = res.data.rows;
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取疫苗品牌
            initvac() {
                this.$http({
                    url: '/chongdu/insecttypeyimiao/list.do',
                    method: 'post'
                }).then(res => {
                    this.brands = res.data.rows;
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取驱虫品牌
            initins() {
                this.$http({
                    url: '/chongdu/insecttypequchong/list.do',
                    method: 'post'
                }).then(res => {
                    this.brands = res.data.rows;
                }).catch(err => {
                    console.log(err)
                })
            },
            //删除照片
            delpetImg(index) {
                this.$delete(this.imgUrl, index);
                this.$delete(this.imgFile, index);
                if (this.ids[index] !== undefined) {
                    //需要过滤相同的图片
                        this.newids.push(this.ids[index]);
                         this.newids.forEach((ele,i)=>{
                             if(this.newidsafter.indexOf(ele) == -1){
                                 this.newidsafter.push(ele)
                             }
                         })

                }
              
                //已分割删除的字符串 console.log( this.newids.join(","))
            },
            //添加图片
            addpetImg(event) {
                let isHave = false; //是否存在已经添加的图片
                if (this.imgFile.length < 4) {
                    this.imgFile.forEach((ele, i) => {
                        if (event.target.files[0].name == ele.name) {
                            isHave = true;
                        }
                    })
                } else {
                    return false;
                    this.$message({
                        message: '最多添加三张图片',
                        type: 'warning'
                    })
                }
                if (isHave) {
                    return;
                } else {
                    // (ids.length-newids.length+imgFile.length)
                    if (this.ids.length - this.newidsafter.length + this.imgFile.length < 4) {
                        this.imgFile.push(event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onload = (e) => {
                            this.imgUrl.push(e.target.result);
                        }
                    } else {
                        return false;
                    }
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    @import '../../static/css/common.less';
    .addmsg {
        width: 100%;
        background-color: #fff;
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
                        }
                        &:nth-of-type(2) {
                            span {
                                color: @commonColor;
                            }
                        }
                        &:nth-of-type(3) {
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
                        &:nth-of-type(1) {
                            background-color: @commonColor;
                        }
                        &:nth-of-type(2) {
                            background-color: @commonColor;
                        }
                    }
                }
            }
        }
        .addmsg_body {
            width: 100%;
            .vaccine,
            .insect {
                width: 100%;
                .vaccine_title {
                    width: 100%;
                    height: 85px;
                    padding-left: 15px;
                    box-sizing: border-box;
                    p {
                        width: 200px;
                        float: left;
                        height: 25px;
                        border-left: 13px solid @commonColor;
                        font-size: 28px;
                        font-weight: 500;
                        padding-left: 30px;
                        line-height: 25px;
                        margin-top: 35px;
                    }
                }
                .vaccine_form {
                    width: 100%;
                    .form_title,
                    .form_list {
                        width: 100%;
                        height: 55px;
                        padding-left: 30px;
                        box-sizing: border-box; // background: url("./static/img/background.png") no-repeat center;
                        background-color: @commonColor;
                        display: -webkit-box;
                        /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                        display: -moz-box;
                        /* 老版本语法: Firefox (buggy) */
                        display: -ms-flexbox;
                        /* 混合版本语法: IE 10 */
                        display: -webkit-flex;
                        /* 新版本语法: Chrome 21+ */
                        display: flex;
                        li {
                            text-align: center;
                            height: 55px;
                            line-height: 55px;
                            color: #fff;
                            &:nth-last-child(1) {
                                flex: 1;
                            }
                            span {
                                display: inline-block;
                                width: 102px;
                                height: 25px;
                                border-radius: 5px;
                                text-align: center;
                                line-height: 25px;
                                border: 1px solid #fff;
                                font-size: 12px;
                                cursor: pointer;
                                em {
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                    .form_list {
                        height: 110px;
                        background: none;
                        li {
                            color: #333;
                            line-height: 110px;
                            position: relative;
                            text-align: center;
                            img {
                                width: 70px;
                                height: 70px;
                                margin-top: 20px;
                                margin-right: 5px;
                                margin-left: 5px;
                            }
                            p {
                                width: 78px;
                                height: 25px;
                                border-radius: 5px;
                                background-color: @commonColor;
                                line-height: 25px;
                                text-align: center;
                                color: #fff;
                                cursor: pointer;
                                position: absolute;
                                left: 50%;
                                transform: translateX(-50%);
                                top: 40%;
                                &:nth-of-type(2) {
                                    top: 110%;
                                }
                                &:hover {
                                    opacity: 0.6;
                                }
                            }
                        }
                        &:nth-of-type(odd) {
                            background-color: #f2f2f2;
                        }
                        &:nth-of-type(even) {
                            background-color: #fff;
                        }
                    }
                    .form_none {
                        width: 100%;
                        height: 200px;
                        position: relative;
                        padding-bottom: 20px;
                        img {
                            position: absolute;
                            top: 40px;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }
            }
        }
        .el-dialog__wrapper {
            .el-dialog {
                .el-dialog__header {
                    position: relative;
                }
                form {
                    width: 100%;
                    .form {
                        width: 100%;
                        .form_list {
                            margin-bottom: 20px;
                            label {
                                width: 110px;
                                display: inline-block;
                                text-align: right;
                                margin-right: 30px;
                            }
                            input,
                            select,
                            textarea {
                                width: 266px;
                                height: 40px;
                            }
                            textarea {
                                height: 60px;
                                vertical-align: middle;
                            }
                            .el-date-editor.el-input,
                            .el-date-editor.el-input__inner {
                                width: 266px;
                            }
                            .form_img {
                                width: 300px;
                                display: inline-block;
                                vertical-align: top;
                                span {
                                    margin-right: 10px;
                                    display: inline-block;
                                    position: relative;
                                    img {
                                        width: 60px;
                                        height: 60px;
                                    }
                                    em {
                                        width: 10px;
                                        height: 10px;
                                        display: block;
                                        position: absolute;
                                        right: -5px;
                                        top: -5px;
                                        background: url("../../static/img/new_x.png") no-repeat center;
                                        background-size: 10px 10px;
                                        cursor: pointer;
                                    }
                                }
                                .add_button {
                                    width: 60px;
                                    height: 60px;
                                    display: inline-block;
                                    color: rgb(240, 240, 240);
                                    border: 1px solid #c1bfbf;
                                    position: relative;
                                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
                                    ;
                                    em {
                                        width: 60px;
                                        height: 60px;
                                        display: block;
                                        position: absolute;
                                        z-index: 30;
                                        img {
                                            width: 60%;
                                            height: 60%;
                                            position: absolute;
                                            left: 50%;
                                            top: 50%;
                                            transform: translate(-50%, -50%);
                                        }
                                    }
                                    input {
                                        z-index: 31;
                                        position: absolute;
                                        width: 60px;
                                        height: 60px;
                                        overflow: hidden;
                                        cursor: pointer;
                                        opacity: 0;
                                    }
                                }
                            }
                        }
                    }
                }
                .el-dialog__footer {
                    .dialog-footer {
                        margin-right: 200px;
                        .el-button--default:hover {
                            background-color: rgba(46, 194, 180, 0.3);
                            span {
                                color: @commonColor;
                            }
                        }
                        .el-button--primary {
                            background-color: @commonColor;
                        }
                    }
                }
            }
        }
    }
</style>


