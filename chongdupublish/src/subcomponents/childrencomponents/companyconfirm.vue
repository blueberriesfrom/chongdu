<template>
    <div class="company">
        <ul>
            <li class="first_label">
                <label>企业全称</label>
                <p>{{companyInfo.name}}</p>
            </li>
            <li>
                <label>企业字号</label>
                <p>{{companyInfo.zihao}}</p>
            </li>
            <li>
                <label>认证状态</label>
                <p v-if="companyInfo.s == 0">
                    <img src="../../../static/img/have_certify.png" alt="">
                    <span>企业已认证</span>
                </p>
                <p v-if="companyInfo.s == 1">
                    <img src="../../../static/img/no_certify.png" alt="">
                    <span>认证失败</span>
                </p>
                <p v-if="companyInfo.s == 2">
                    <img src="../../../static/img/no_certify.png" alt="">
                    <span>认证中</span>
                </p>
            </li>
            <li>
                <label>法人姓名</label>
                <p>{{companyInfo.legalname}}</p>
            </li>
            <li>
                <label>企业地址</label>
                <p>{{companyInfo.companyaddress}}</p>
            </li>
            <li>
                <label>统一社会信用代码</label>
                <p>{{companyInfo.socialcode}}</p>
            </li>
            <li class="last_li">
                <label>营业执照</label>
                <p>
                    <img :src="BLImg" style="width:30px;height:auto">
                    <span>营业执照已上传</span>
                </p>
            </li>
            <li class="last_li">
                <label>开户许可证</label>
                <p>
                    <img :src="CAImg" style="width:30px;height:auto">
                    <span>营业执照已上传</span>
                </p>
            </li>
            <div class="passstatus">
                <!-- 未通过 -->
                <img src="../../../static/img/fail_passing_icon.png" v-if="companyInfo.s == 1">
                <!-- 审核中 -->
                <img src="../../../static/img/passing_icon.png" v-if="companyInfo.s == 2">
                <!-- 审核通过 -->
                <img src="../../../static/img/pass_icon.png" v-if="companyInfo.s == 0">
            </div>
        </ul>
        <div class="button_company">
            <!-- <router-link :to="{path:'/again/certification',query:{'tolink':this.tolink,'type':certifyObject.examinetype,'id':certifyObject.id}}" v-if="certifyObject.s == 0 || certifyObject.s == 1">重新认证</router-link>  -->
            <span v-if="companyInfo.s == 0 || companyInfo.s == 1" @click="canclick&&choosereconfirm()">重新认证</span>
        </div>
    </div>
</template>
<script>
    export default {
        inject: ['reload'], //注入依赖
        data() {
            return {
                canclick: true,
                tolink: 'edit'
            }
        },
        methods: {
            //点击重新认证
            choosereconfirm() {
                if (this.companyInfo.s == 1) {
                    //跳转到重新认证
                    this.$router.push({
                        path: "/again/certification",
                        query: {
                            tolink:'edit',
                            id:this.companyInfo.id
                        }
                    });
                    this.reload();
                    // this.$http({
                    //     url:'/chongdu/companyauthen/delete.do?ids='+this.companyInfo.id,
                    //     method:'post'
                    // }).then(res=>{
                    //     if(res.data.code == 0){
                    //         this.canclick = false;                      
                    //         this.$router.push({
                    //             path:"/again/certification",
                    //             query:{
                    //                 'tolink':this.tolink,
                    //                 'id':this.companyInfo.id
                    //             }
                    //         });
                    //          this.reload();
                    //     }
                    // }).catch(err=>{
                    //     console.log(err)
                    // })
                } else if (this.companyInfo.s == 0) {
                    this.$router.push({
                        path: "/again/certification",
                        query: {
                            'tolink': this.tolink,
                            'id': this.companyInfo.id
                        }
                    })
                    this.reload();
                }
            }
        },
        computed: {
            companyInfo() {
                return this.$props.certifyInfo
            },
            BLImg() {
                if (this.companyInfo.imageList !== undefined) {
                    return this.companyInfo.imageList.filter(o => {
                        return o.customtype == 1
                    })[0].path
                }
            },
            CAImg() {
                if (this.companyInfo.imageList !== undefined) {
                    return this.companyInfo.imageList.filter(o => {
                        return o.customtype == 2
                    })[0].path
                }
            }
        },
        props: ['certifyInfo']
    }
</script>
<style lang="less" scoped>
     @import '../../../static/css/common.less';
     .company {
         width: 100%;
         padding: 45px 0 120px;
         ul {
             width: 600px;
             margin-left: 150px;
             background-color: #f3f3f3;
             border: 1px solid #d0d0d0;
             position: relative;
             li {
                 width: 100%;
                 height: 52px;
                 display: -webkit-box;
                 /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                 display: -moz-box;
                 /* 老版本语法: Firefox (buggy) */
                 display: -ms-flexbox;
                 /* 混合版本语法: IE 10 */
                 display: -webkit-flex;
                 /* 新版本语法: Chrome 21+ */
                 display: flex;
                 label {
                     display: block;
                     width: 133px;
                     background-color: #c9eae7;
                     height: 100%;
                     box-sizing: border-box;
                     border-bottom: 1px solid #d0d0d0;
                     font-size: 16px;
                     color: #6d6d6d;
                     text-align: center;
                     line-height: 52px;
                     overflow: hidden;
                 }
                 .first_label {
                     position: relative;
                     overflow: hidden;
                     &:after {
                         display: block;
                         content: "";
                         position: absolute;
                         background: url("../../../static/img/trangle.png") no-repeat center;
                         width: 35px;
                         height: 35px;
                         left: 0;
                         top: 0;
                     }
                 }
                 p {
                     display: block;
                     flex: 1;
                     height: 100%;
                     overflow: hidden;
                     border-bottom: 1px solid #d0d0d0;
                     padding-left: 26px;
                     box-sizing: border-box;
                     line-height: 52px;
                     position: relative;
                     img {
                         display: block;
                         float: left;
                         position: relative;
                         left: 0;
                         top: 50%;
                         transform: translateY(-50%);
                     }
                     span {
                         display: block;
                         float: left;
                         font-size: 12px;
                         margin-left: 12px;
                     }
                 }
             }
             .last_li {
                 label,
                 p {
                     border-bottom: 0;
                 }
             }
             .passstatus {
                 position: absolute;
                 right: 0;
                 top: 50%;
                 transform: translate(50%, -50%);
                 border-radius: 100%;
             }
         }
         .button_company {
             width: 100%;
             overflow: hidden;
             span {
                 display: block;
                 display: block;
                 float: right;
                 width: 120px;
                 height: 35px;
                 border-radius: 5px;
                 background-color: @commonColor;
                 text-align: center;
                 color: #fff;
                 line-height: 35px;
                 font-size: 16px;
                 margin-right: 75px;
                 margin-top: 40px;
                 cursor: pointer;
             }
         }
     }
</style>


