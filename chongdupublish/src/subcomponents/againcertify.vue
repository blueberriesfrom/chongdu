<template>
    <div class="againcerify">
        <div class="againcerify_title">
            <h4>企业认证</h4>
        </div>
        <div class="againcerify_body" v-if="(peronalstatus == 0 && checkstaus == 12) || toLink == 'edit'">
            <form>
                <p>
                    <label>企业名称</label>
                    <input placeholder="请输入内容" name="name" v-model='name' />
                </p>
                <p>
                    <label>企业字号</label>
                    <input placeholder="请输入内容" name="zihao" v-model='zihao' />
                </p>
                <p>
                    <label>统一社会信用代码</label>
                    <input placeholder="请输入内容" name="socialcode" v-model='socialcode' />
                </p>
                <p>
                    <label>营业执照上传</label>
                    <span>
                                            <em>重新上传</em>
                                            <input placeholder="请输入内容" type="file" class="input_file" name="BusinessLicense" @change="BusinessLicensechange($event)" id='BL'/>
                                    </span>
                </p>
                <p class="BL_p">
                    <!-- 营业执照上传显示图片 -->
                    <img src="" alt="" class="BL_img">
                    <em></em>
                </p>
                <p>
                    <label>开户许可证上传</label>
                    <span>
                                            <em>重新上传</em>
                                            <input placeholder="请输入内容" type="file" class="input_file" name="LicencePboto"
                                            id='LP' @change="LicencePbotochange($event)"/>                           
                                        </span>
                </p>
                <p class="LP_p">
                    <!-- 营业执照上传显示图片 -->
                    <img src="" alt="" class="LP_img">
                    <em></em>
                </p>
                <p>
                    <label>门头照/LOGO上传</label>
                    <span>
                                            <em>重新上传</em>
                                            <input placeholder="请输入内容" type="file" class="input_file" name="Companylogo"
                                            id='LOGO' @change="logochange($event)"/>                           
                                        </span>
                </p>
                <p class="LOGO_p">
                    <!-- 营业执照上传显示图片 -->
                    <img src="" alt="" class="LOGO_img">
                    <em></em>
                </p>
                <p>
                    <label>法人姓名</label>
                    <input placeholder="请输入内容" name="legalname" v-model="legalname" />
                </p>
                <p>
                    <label>法人电话</label>
                    <input placeholder="请输入内容" name="legalphone" v-model="legalphone" />
                </p>
                <p>
                    <label>法人身份证号</label>
                    <input placeholder="请输入内容" name="legalnumber" v-model="legalnumber" />
                </p>
                <p>
                    <label>法人身份证上传</label>
                    <span>
                                                                    <em>上传正面</em>
                                                                    <input placeholder="请输入内容"  type="file" class="input_file" name="IdentityCardFront" @change="IdentityCardFrontchange($event)" id="F_IC"/>
                                                                                           
                                                         </span>
                </p>
                <p class="F_IC_p">
                    <img src="../../static/img/gou2.png" class="F_IC_img">
                </p>
                <p>
                    <label></label>
                    <span>
                                                                    <em>上传反面</em>
                                                                    <input placeholder="请输入内容" type="file" class="input_file" name="IdentityCardReverse" @change="IdentityCardReversechange($event)" id="R_IC"/>
                                                                        </span>
                </p>
                <p class="R_IC_p">
                    <img src="../../static/img/gou2.png" class="R_IC_img">
                </p>
                <p>
                    <label>法人手持身份证照片</label>
                    <span>
                                                                    <em>重新上传</em>
                                                                    <input placeholder="请输入内容" type="file" class="input_file" name="HandPhone"
                                                                                             @change="HandPhonechange($event)"
                                                                                             id="HP"/>
                                                                    </span>
                </p>
                <p class="HP_p">
                    <img src="../../static/img/gou2.png" class="HP_img">
                </p>
                <p>
                    <label>企业地址</label>
                    <input placeholder="请输入内容" name="companyaddress" v-model="companyaddress" />
                </p>
                <div class="upload_all">
                    <input type="submit" class="upload_button" @click="cansubmit&&changeSubmit($event)" :value="toLink=='edit'?'重新认证':'提交'" />
                </div>
            </form>
        </div>
        <div class="defferent" v-if="peronalstatus !== 0 && toLink !== 'edit'">
            <!-- 未进行实名认证,9 -->
            <div class="no_person" v-if="peronalstatus == 9">
                <p>请先进行实名认证</p>
                <p class="go">
                    <router-link to="/personal/certification/info">GO</router-link>
                </p>
            </div>
            <div class="no_person" v-if="peronalstatus == 10">
                <p>
                    实名认证正在审核中,请耐心等待审核结果
                </p>
                <p class="go">
                    <router-link to="/personal/certification/info">去查看</router-link>
                </p>
            </div>
            <div class="no_person" v-if="peronalstatus == 11">
                <p>
                    实名认证失败,请重新认证
                </p>
                <p class="go">
                    <router-link to="/personal/certification/info">去查看</router-link>
                </p>
            </div>
        </div>
        <companyConfirm v-if="(checkstaus == 13 || checkstaus == 14  || checkstaus == 0) && toLink !== 'edit' " :certifyInfo="companylist" />
    </div>
</template>
<script>
    import companyConfirm from "@/subcomponents/childrencomponents/companyconfirm.vue"
    export default {
        inject: ['reload'], //注入依赖
        data() {
            return {
                toLink: this.$route.query.tolink, //获取前一页的参数
                // type: 0, //个人认证还是企业认证,1,是企业认证,2,个个体户
                name: '', //企业认证
                zihao: '', //企业字号
                socialcode: '', //统一社会信用代码
                BusinessLicense: '', //营业执照
                LicencePboto: '', //开户许可证上传
                Companylogo: "", //企业门头照或者logo
                legalname: '', //法人姓名
                legalphone: '', //法人电话
                legalnumber: '', //法人身份证
                IdentityCardFront: '', //法人身份证正面
                IdentityCardReverse: '', //法人反面身份证
                HandPhone: '', //手持身份证上传
                companyaddress: '', //企业地址   
                cansubmit: true, //可以点击提交
                peronalstatus: "", //是否进行实名认证,//9,未认证
                checkstaus: '', //是否有无进行企业认证
                companylist: {}, //企业回显的内容
            }
        },
        computed: {},
        created() {
            this.ispersonal();
        },
        methods: {
            //获取营业执照
            BusinessLicensechange(event) {
                this.BusinessLicense = event.target.files[0];
                let size = event.target.files[0].size;
                if (size < 1024) {
                    return parseInt(String.valueOf(size));
                } else {
                    size = parseInt(size / 1024);
                }
                //显示营业执照图片
                this.base.readupload(document.querySelector("#BL"), function(file, e) {
                    $(".BL_img").attr("src", e.target.result); //后期加样式
                    $(".BL_p").css({
                        height: '80px',
                        marginBottom: '35px'
                    })
                });
            },
            //获取开户许可证
            LicencePbotochange(event) {
                this.LicencePboto = event.target.files[0];
                let size = event.target.files[0].size;
                if (size < 1024) {
                    return parseInt(String.valueOf(size));
                } else {
                    size = parseInt(size / 1024);
                }
                this.base.readupload(document.querySelector("#LP"), function(file, e) {
                    $(".LP_img").attr("src", e.target.result); //后期加样式
                    $(".LP_p").css({
                        height: '80px',
                        marginBottom: '35px'
                    })
                });
            },
            //企业LOGO或者门头照
            logochange(event) {
                this.Companylogo = event.target.files[0];
                let size = event.target.files[0].size;
                if (size < 1024) {
                    return parseInt(String.valueOf(size));
                } else {
                    size = parseInt(size / 1024);
                }
                this.base.readupload(document.querySelector("#LOGO"), function(file, e) {
                    $(".LOGO_img").attr("src", e.target.result); //后期加样式
                    $(".LOGO_p").css({
                        height: '80px',
                        marginBottom: '35px'
                    })
                });
            },
            //上传正面身份证
            IdentityCardFrontchange(event) {
                this.IdentityCardFront = event.target.files[0];
                let size = event.target.files[0].size;
                if (size < 1024) {
                    return parseInt(String.valueOf(size));
                } else {
                    size = parseInt(size / 1024);
                }
                this.base.readupload(document.querySelector("#F_IC"), function(file, e) {
                    $(".F_IC_img").attr("src", e.target.result); //后期加样式
                    $(".F_IC_p").css({
                        height: '80px',
                        marginBottom: '35px'
                    })
                });
            },
            //上传反面许可证
            IdentityCardReversechange(event) {
                this.IdentityCardReverse = event.target.files[0];
                let size = event.target.files[0].size;
                if (size < 1024) {
                    return parseInt(String.valueOf(size));
                } else {
                    size = parseInt(size / 1024);
                }
                this.base.readupload(document.querySelector("#R_IC"), function(file, e) {
                    $(".R_IC_img").attr("src", e.target.result); //后期加样式
                    $(".R_IC_p").css({
                        height: '80px',
                        marginBottom: '35px'
                    })
                });
            },
            //手持身份证
            HandPhonechange(event) {
                this.HandPhone = event.target.files[0];
                let size = event.target.files[0].size;
                if (size < 1024) {
                    return parseInt(String.valueOf(size));
                } else {
                    size = parseInt(size / 1024);
                }
                this.base.readupload(document.querySelector("#HP"), function(file, e) {
                    $(".HP_img").attr("src", e.target.result); //后期加样式
                    $(".HP_p").css({
                        height: '80px',
                        marginBottom: '35px'
                    })
                });
            },
            //提交时根据前一页的参数来判断调用的接口
            changeSubmit(event) {
                event.preventDefault();
                let formData = new FormData();
                formData.append('name', this.name);
                formData.append('zihao', this.zihao);
                formData.append('socialcode', this.socialcode);
                formData.append('BusinessLicense', this.BusinessLicense);
                formData.append('LicencePboto', this.LicencePboto);
                formData.append('Companylogo', this.Companylogo);
                formData.append('legalname', this.legalname);
                formData.append('legalphone', this.legalphone);
                formData.append('legalnumber', this.legalnumber);
                formData.append('IdentityCardFront', this.IdentityCardFront);
                formData.append('IdentityCardReverse', this.IdentityCardReverse);
                formData.append('HandPhone', this.HandPhone);
                formData.append('companyaddress', this.companyaddress);
                formData.append('type', 1);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                if (this.toLink == undefined) {
                    this.$http.post('/chongdu/companyauthen/add.do', formData, config).then(res => {
                        if (res.data.code == 0) {
                            this.cansubmit = false;
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.reload();
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else if (this.toLink == 'edit') {
                    formData.append('id', this.$route.query.id);
                    this.$http({
                        url: "/chongdu/companyauthen/edit.do",
                        method: 'post',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            this.$router.push({
                                path: "/again/certification",
                            });
                            this.reload();
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            //  //第一步先查看是否有实名认证,认证通过才能进行实名认证
            ispersonal() {
                //未认证,审核中,审核失败
                this.$http({
                    url: '/chongdu/userauthent/checkIsAuthent.do',
                    method: 'post',
                }).then(res => {
                    this.peronalstatus = res.data.code;
                    if (res.data.code == 0) {
                        this.initstatus();
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //查看是否企业认证的状态
            initstatus() {
                this.$http({
                    url: '/chongdu/companyauthen/checkCompanyAuthent.do',
                    method: 'post'
                }).then(res => {
                    this.checkstaus = res.data.code;
                    if (res.data.code !== 12) {
                        this.companylist = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        components: {
            companyConfirm
        }
    }
</script>
<style lang='less'>
    @import '../../static/css/common.less';
    .againcerify {
        width: 100%;
        background-color: #fff;
        .againcerify_title {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid @commonColor;
            h4 {
                width: 170px;
                height: 60px;
                text-align: center;
                line-height: 60px;
                background-color: @commonColor;
                color: #fff;
                font-size: 16px;
            }
        }
        .againcerify_body {
            padding-top: 35px;
            p {
                height: 45px;
                margin-bottom: 35px;
                label {
                    display: inline-block;
                    width: 300px;
                    text-align: right;
                    margin-right: 80px;
                }
                input {
                    width: 320px;
                    height: 40px;
                    padding-left: 15px;
                    box-sizing: border-box;
                    font-size: 16px;
                }
                span {
                    display: inline-block;
                    width: 200px;
                    height: 40px;
                    border: 1px solid #c1bfbf !important;
                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                    border-radius: 3px;
                    text-align: center;
                    vertical-align: middle;
                    line-height: 40px;
                    position: relative;
                    overflow: hidden;
                    .input_file {
                        width: 40px;
                        height: 200px;
                        transform: rotate(90deg);
                        -ms-transform: rotate(90deg);
                        /* IE 9 */
                        -moz-transform: rotate(90deg);
                        /* Firefox */
                        -webkit-transform: rotate(90deg);
                        /* Safari 和 Chrome */
                        -o-transform: rotate(90deg);
                        /* Opera */
                        position: absolute;
                        top: -80px;
                        right: 80px;
                        font-size: 100px;
                        opacity: 0;
                        cursor: pointer;
                    }
                }
                img {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    left: 40%;
                }
                &.BL_p,
                &.LP_p,
                &.F_IC_p,
                &.R_IC_p,
                &.HP_p,
                &.LOGO_p {
                    height: 0;
                    margin: 0;
                    overflow: hidden;
                }
            }
            .upload_all {
                width: 100%;
                height: 80px;
                .upload_button {
                    width: 115px;
                    height: 35px;
                    background-color: @commonColor;
                    color: #fff;
                    float: right;
                    margin-right: 100px;
                    border: 0;
                    cursor: pointer;
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }
        }
    }
</style>


