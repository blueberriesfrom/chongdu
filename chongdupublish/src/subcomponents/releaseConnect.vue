<template>
    <div class="release_connect">
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
        <div class="release_body">
            <form>
                <!-- 宠物描述 -->
                <!-- <div class="pet_decri">
                            <h4 class="pet_decri_title">
                                <span>宠物描述</span>
                                <i>*</i>
                            </h4>
                            <div class="pet_decri_text">
                                <textarea maxlength="200" v-model="content" v-check="{type:'textarea',val:content,long:200}"></textarea>
                                <em>{{content.length}}/200</em>
                            </div>
                        </div> -->
                <!-- 宠物照片 -->
                <div class="pet_photo">
                    <h4 class="pet_photo_title">
                        <span>宠物广告图片</span>
                        <i>*</i>
                        <em>支持IPG、TPEG、bmp、gif,大小不超过5M</em>
                    </h4>
                    <div class="pet_photo_list">
                        <div class="add_img_list">
                            <div class="add_img_list_detail" v-for="(item,index) in petImgSrc" :key="index">
                                <img :src="item">
                                <em @click="delpetImg(index)"></em>
                            </div>
                            <div class="add_img" v-if="this.petImg.length < 6">
                                <input type="file" @change="addpetImg($event)">
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 宠物详情 -->
                <div class="pet_photo">
                    <h4 class="pet_photo_title">
                        <span>宠物详情图片</span>
                        <i>*</i>
                        <em>支持IPG、TPEG、bmp、gif,大小不超过5M</em>
                    </h4>
                    <div class="pet_photo_list">
                        <div class="add_img_list">
                            <div class="add_img_list_detail" v-for="(item,index) in petfileUrl" :key="index">
                                <img :src="item">
                                <em @click="delpetdetailImg(index)"></em>
                            </div>
                            <div class="add_img" v-if="this.petfile.length < 6">
                                <input type="file" @change="addpetdetailImg($event)">
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 宠物证件 -->
                <div class="pet_photo">
                    <h4 class="pet_photo_title">
                        <span>宠物证件</span>
                        <!-- <i>*</i> -->
                        <em>支持IPG、TPEG、bmp、gif,大小不超过5M</em>
                    </h4>
                    <div class="pet_photo_list">
                        <div class="add_img_list">
                            <div class="add_img_list_detail" v-for="(item,index) in petdocImgSrc" :key="index">
                                <img :src="item">
                                <em @click="delpetdocImg(index)"></em>
                            </div>
                            <div class="add_file" v-if="this.petdocImg.length < 1">
                                <em>
                                     上传
                                    <input type="file" value="上传" @change="addpetdocImg($event)">
                                    </em>
                                <span>(添加证件有助于更快认证)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 联系人信息 -->
                <div class="connect-msg">
                    <Connect/>
                </div>
                <div class="publish">
                    <!-- <span class="publish_button" @click="againclick == true&&clickpublish()">发布</span> -->
                    <span class="publish_button" @click="$store.state.addpublishId == $route.query.publishId? $message({
                            message:'已经发布',type:'warning'
                        }) :clickpublish()">发布</span>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import Connect from "@/components/connect"
    export default {
        data() {
            return {
                petImgSrc: [], //宠物照片的Url
                petImg: [], //存放的添加宠物照片 topAddFile              
                petdocImgSrc: [], //宠物证件的照片Url  
                petdocImg: [], //存放的添加宠物证件照片 healthFile
                petfileUrl: [], //宠物详情的Url
                petfile: [], //宠物详情的file对象数组
                againclick: true,
            }
        },
        computed: {
            addressid() {
                return this.$store.state.publishid
            }
        },
        methods: {
            //点击发布
            clickpublish() {
                if (this.petImg.length !== 0) {
                    if (this.petfile.length !== 0) {
                        if (this.addressid !== "") {
                            let formdate = new FormData();
                            formdate.append("id", this.$route.query.publishId);
                            // formdate.append("content", this.content);
                            formdate.append("contactname", this.contactname);
                            formdate.append("contactphone", this.contactphone);
                            formdate.append("addressid", this.addressid); //联系Id
                            this.petImg.forEach((ele, i) => {
                                formdate.append("topAddFile", ele)
                            })
                            this.petfile.forEach((ele, i) => {
                                formdate.append("petfile", ele)
                            })
                            this.petdocImg.forEach((ele, i) => {
                                formdate.append("healthFile", ele)
                            })
                            this.$http({
                                url: '/chongdu/pet/otherAdd.do',
                                method: "post",
                                data: formdate,
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res => {
                                console.log(res.data)
                                if (res.data.code == 0) {
                                    this.againclick = false;
                                    this.$store.state.addpublishId = this.$route.query.publishId;
                                    console.log(this.$store.state.addpublishId)
                                    this.$message({
                                        message: '发布成功,请添加疫苗信息',
                                        type: 'success'
                                    })
                                    this.$router.push({
                                        path: "/release/add/message",
                                        query: {
                                            petId: this.$route.query.publishId
                                        }
                                    })
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        } else {
                            this.$message({
                                message: '请选择联系人信息',
                                type: "warning"
                            })
                        }
                    } else {
                        this.$message({
                            message: '请选择宠物详情图片',
                            type: "warning"
                        })
                    }
                } else {
                    this.$message({
                        message: '请选择宠物广告图片',
                        type: "warning"
                    })
                }
            },
            //删除宠物详情的照片
            delpetdetailImg(index) {
                this.$delete(this.petfileUrl, index);
                this.$delete(this.petfile, index);
            },
            //添加宠物详情照片
            addpetdetailImg(event) {
                if (this.petfile.length < 7) {
                    let isHave = false; //是否存在已经添加的图片
                    this.petfile.forEach((ele, i) => {
                        if (event.target.files[0].name == ele.name) {
                            isHave = true;
                        }
                    })
                    if (isHave) {
                        return;
                    } else {
                        this.petfile.push(event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onload = (e) => {
                            this.petfileUrl.push(e.target.result);
                        }
                    }
                }
            },
            //删除添加宠物的照片
            delpetImg(index) {
                this.$delete(this.petImgSrc, index);
                this.$delete(this.petImg, index);
            },
            //添加宠物广告照片
            addpetImg(event) {
                if (this.petImg.length < 7) {
                    let isHave = false; //是否存在已经添加的图片
                    this.petImg.forEach((ele, i) => {
                        if (event.target.files[0].name == ele.name) {
                            isHave = true;
                        }
                    })
                    if (isHave) {
                        return;
                    } else {
                        this.petImg.push(event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onload = (e) => {
                            this.petImgSrc.push(e.target.result);
                        }
                    }
                }
            },
            //删除添加宠物证件的照片
            delpetdocImg(index) {
                this.$delete(this.petdocImgSrc, index);
                this.$delete(this.petdocImg, index);
            },
            //添加宠物证件照片
            addpetdocImg(event) {
                if (this.petdocImg.length < 2) {
                    let isHave = false; //是否存在已经添加的图片
                    this.petdocImg.forEach((ele, i) => {
                        console.log(ele)
                        if (event.target.files[0].name == ele.name) {
                            isHave = true;
                        }
                    })
                    if (isHave) {
                        return;
                    } else {
                        this.petdocImg.push(event.target.files[0]);
                        let reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);
                        reader.onload = (e) => {
                            this.petdocImgSrc.push(e.target.result);
                        }
                    }
                }
            },
        },
        components: {
            Connect
        }
    }
</script>
<style lang="less" scoped>
    @import '../../static/css/common.less';
    .release_connect {
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
                    width: 680px;
                    height: 45px;
                    margin: 0 auto;
                    display: -webkit-box;
                    /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                    display: -moz-box;
                    /* 老版本语法: Firefox (buggy) */
                    display: -ms-flexbox;
                    /* 混合版本语法: IE 10 */
                    display: -webkit-flex;
                    /* 新版本语法: Chrome 21+ */
                    display: flex;
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
                    }
                }
            }
        }
        .release_body {
            .pet_decri,
            .pet_photo {
                width: 100%;
                padding-left: 35px;
                box-sizing: border-box;
                .pet_decri_title,
                .pet_photo_title {
                    height: 60px;
                    width: 100%;
                    font-size: 16px;
                    line-height: 80px;
                    span {
                        margin-left: 20px;
                    }
                    i {
                        color: red;
                    }
                    em {
                        color: #8D8D8D;
                        font-size: 12px;
                        margin-left: 20px;
                    }
                }
                .pet_decri_text {
                    width: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                    height: 160px;
                    position: relative;
                    textarea {
                        width: 100%;
                        height: 100%;
                    }
                    em {
                        position: absolute;
                        right: 35px;
                        bottom: 20px;
                    }
                }
                .pet_photo_list {
                    width: 100%;
                    padding-left: 20px;
                    box-sizing: border-box;
                    margin-top: 20px;
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
                                right: 0;
                                opacity: 0;
                                cursor: pointer;
                            }
                        }
                        .add_file {
                            width: 350px;
                            height: 100px;
                            position: relative;
                            float: left;
                            em {
                                display: block;
                                border-radius: 3px;
                                border: 1px solid #c1bfbf;
                                width: 150px;
                                height: 30px;
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                                text-align: center;
                                line-height: 30px;
                                cursor: pointer;
                            }
                            input {
                                width: 30px;
                                height: 150px;
                                transform: rotate(90deg) !important;
                                -ms-transform: rotate(90deg) !important;
                                /* IE 9 */
                                -moz-transform: rotate(90deg) !important;
                                /* Firefox */
                                -webkit-transform: rotate(90deg) !important;
                                /* Safari 和 Chrome */
                                -o-transform: rotate(90deg) !important;
                                /* Opera */
                                text-align: center;
                                border-radius: 3px;
                                position: absolute;
                                top: -61px;
                                left: 60px;
                                opacity: 0;
                                cursor: pointer;
                            }
                            span {
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                                right: 10px;
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
                height: 80px;
                .publish_button {
                    display: block;
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


