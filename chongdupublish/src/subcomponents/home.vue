<template>
    <div class="home">
        <div class="have_code">
            <div class="home_top">
                <div class="fl_personal" v-if="Object.keys(companyAuthent).length == 0 || (Object.keys(companyAuthent).length !== 0 && companyAuthent.s !== 0)">
                    <div class="fl_img">
                        <img :src="userInfo.icon" alt="">
                    </div>
                    <div class="fl_context">
                        <p>
                            <label>用户名:</label>
                            <span>{{userInfo.username}}</span>
                        </p>
                        <p>
                            <label>认证状态 :</label>
                            <span>
                                                        <!-- 未认证 -->
                                                          <img src="../../static/img/sfwrz.png" v-if="Object.keys(userAuthent).length == 0">
                                                          <em  v-if="Object.keys(userAuthent).length == 0">未认证</em>
                                                        <!-- 认证中 -->
                                                            <img src="../../static/img/sfwrz.png" v-if="userAuthent !== '' && userAuthent.s == 2">
                                                             <em v-if="userAuthent !== '' && userAuthent.s == 2">审核中</em>
                                                        <!-- 未通过认证 -->
                                                              <img src="../../static/img/sfwrz.png" v-if="userAuthent !== '' && userAuthent.s == 1">
                                                             <em v-if="userAuthent !== '' && userAuthent.s == 1">认证失败</em>
                                                             <!-- 认证通过 -->
                                                              <img src="../../static/img/dfyrz.png" v-if="userAuthent !== '' && userAuthent.s == 0">
                                                             <em v-if="userAuthent !== '' && userAuthent.s == 0">已认证</em>
                                                    </span>
                            <router-link to="/personal/certification" class="no_certify" v-if="Object.keys(userAuthent).length == 0">
                                去认证
                            </router-link>
                            <router-link :to="{path:'/personal/certification',query:{opera:'edit',id:userAuthent.id}}" class="no_certify" v-if="userAuthent.s == 1">
                                重新认证
                            </router-link>
                        </p>
                        <p>
                            <label>所在区域:</label>
                            <span>{{Object.keys(userAuthent).length == 0?"暂无":userAuthent.citycode}}</span>
                        </p>
                    </div>
                </div>
                <div class="fl_company" v-if="Object.keys(companyAuthent).length !== 0 && companyAuthent.s == 0">
                    <div class="fl_img">
                        <img src="../../static/img/default.png" alt="">
                    </div>
                    <div class="fl_context">
                        <p>
                            <label>企业名称:</label>
                            <span>{{companyAuthent.name}}</span>
                        </p>
                        <p>
                            <label>认证状态:</label>
                            <span>
                                                            <img src="../../static/img/dfyrz.png" alt="">
                                                            
                                                            <em>企业认证已通过</em>
                              </span>
                            <router-link to="/again/certification" class="no_certify">
                                重新认证
                            </router-link>
                        </p>
                        <p>
                            <label>所在区域 :</label>
                            <span>{{companyAuthent.companyaddress}}</span>
                        </p>
                    </div>
                </div>
                <div class="fr">
                    <ul>
                        <li>
                            <em style="color:#48c8bb">{{sumBrowser}}</em>
                            <span>访问量</span>
                        </li>
                        <li>
                            <em style="color:#e3ce7c">{{sumCount}}</em>
                            <span>发布量</span>
                        </li>
                        <li>
                            <em style="color:#ef6d60">{{appointmentCount}}</em>
                            <span>预约量</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="AD">
                <div class="AD_content">
                </div>
            </div>
            <div class="sell_list">
                <div class="online_sell_title" v-if="onselllist.length == 0">
                    <h4>在售列表</h4>
                    <div class="no_data">
                        <img src="../../static/img/nosj.png" alt="">
                    </div>
                </div>
                <onlineSell :onsell="onselllist" v-if="onselllist.length !== 0"></onlineSell>
            </div>
        </div>
    </div>
</template>
<script>
    import onlineSell from "@/components/onlineSell";
import { request } from 'https';
    export default {
        data() {
            return {
                userInfo: {}, //用户信息
                userAuthent: {}, //实名认证
                companyAuthent: {}, //企业认证回显              
                onselllist: [], //在售列表
                sumBrowser: '',
                sumCount: "",
                appointmentCount: '',
            }
        },
        created() {
          this.initlogin()
           // this.initInfo();
         
        },
        mounted(){
              
        },
        methods: {
            //判定是否有cookie,有cookie就登录,.没有cookie就直接显示数据
            initlogin() {
               if(this.$route.path.indexOf("token=")){  
                    //  this.$store.state.token  
                    if(this.$route.query.token !== undefined){
                        this.$store.state.token = this.$route.query.token;
                        localStorage.setItem("token",this.$route.query.token);
                    }           
                   
                //     this.$router.push({
                //        path:'/home'
                //    })
               }
               this.initInfo();
            },
            //初始化数据
            initInfo() {
                this.$http({
                    url: '/chongdu/user/getUnionList.do',
                    method: 'post',
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        this.sumBrowser = res.data.rows.sumBrowser;
                        this.sumCount = res.data.rows.sumCount;
                        this.appointmentCount = res.data.rows.appointmentCount;
                        if (res.data.rows.userInfo) {
                            this.userInfo = res.data.rows.userInfo;
                        }
                        if (res.data.rows.userAuthent !== "") {
                            this.userAuthent = res.data.rows.userAuthent;
                        }
                        if (res.data.rows.Companyauthent) {
                            this.companyAuthent = res.data.rows.Companyauthent;
                        }
                        this.onselllist = res.data.rows.orderList;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
        },
        components: {
            onlineSell
        }
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .home {
        width: 1020px;
        background-color: #fff;
        overflow: hidden;
        .imging {
            display: block;
            margin: 225px auto;
        }
        .have_code {
            .home_top {
                width: 100%;
                display: -moz-box;
                /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;
                /* 混合版本语法: IE 10 */
                display: -webkit-flex;
                /* 新版本语法: Chrome 21+ */
                display: flex;
                height: 171px;
                .fl_personal,
                .fl_company {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    display: -moz-box;
                    /* 老版本语法: Firefox (buggy) */
                    display: -ms-flexbox;
                    /* 混合版本语法: IE 10 */
                    display: -webkit-flex;
                    /* 新版本语法: Chrome 21+ */
                    display: flex;
                    .fl_img {
                        width: 170px;
                        height: 100%;
                        position: relative;
                        img {
                            width: 79px;
                            height: 79px;
                            position: absolute;
                            left: 42px;
                            top: 50%;
                            transform: translateY(-50%);
                            border-radius: 20%;
                        }
                    }
                    .fl_context {
                        flex: 1;
                        height: 100%;
                        overflow: hidden;
                        padding-top: 26px;
                        box-sizing: border-box;
                        p {
                            margin-bottom: 22px;
                            font-size: 16px;
                            img {
                                width: 34px;
                                height: auto;
                                vertical-align: middle;
                                margin-right: 3px;
                                margin-left: 3px;
                            }
                            em {
                                color: #858585;
                            }
                            .no_certify {
                                display: inline-block;
                                padding: 2px 5px;
                                border-radius: 5px;
                                border: 1px solid @commonColor;
                                color: @commonColor;
                                font-size: 12px;
                                margin-left: 50px;
                                cursor: pointer;
                            }
                        }
                    }
                    &:before {
                        content: "个";
                        position: absolute;
                        left: -2px;
                        top: -2px;
                        width: 52px;
                        height: 52px;
                        background: url("../../static/img/squery.png") no-repeat center;
                        background-size: 52px 52px;
                        color: #fff;
                        box-sizing: border-box;
                        padding: 7px;
                    }
                }
                .fl_company {
                    &:before {
                        content: '企'
                    }
                }
                .fr {
                    width: 390px;
                    height: 100%;
                    background: -webkit-gradient(linear, 0 0, 100% 0, from(#fff), to(#eafcfa));
                    ul {
                        width: 100%;
                        height: 100%;
                        display: -moz-box;
                        /* 老版本语法: Firefox (buggy) */
                        display: -ms-flexbox;
                        /* 混合版本语法: IE 10 */
                        display: -webkit-flex;
                        /* 新版本语法: Chrome 21+ */
                        display: flex;
                        li {
                            flex: 1;
                            height: 100%;
                            em,
                            span {
                                display: block;
                                width: 100%;
                                text-align: center;
                            }
                            em {
                                font-size: 54px;
                                font-weight: 700;
                                font-family: Times;
                                height: 110px;
                                line-height: 120px;
                            }
                            span {
                                font-size: 16px;
                                font-weight: 700;
                                color: #6d6d6d
                            }
                        }
                    }
                }
            }
            .AD {
                width: 100%;
                background-color: #eaeaea;
                overflow: hidden;
                .AD_content {
                    width: 100%;
                    height: 108px;
                    margin: 20px 0;
                    background-color: rgba(58, 178, 167, 0.7);
                }
            }
            .sell_list {
                width: 100%;
                margin-top: 10px;
                .online_sell_title {
                    width: 100%;
                    border-bottom: 1px solid @commonColor;
                    position: relative;
                    h4 {
                        width: 100px;
                        height: 60px;
                        font-size: 18px;
                        line-height: 60px;
                        padding-left: 22px;
                        font-weight: 900;
                    }
                    .no_data {
                        width: 100%;
                        margin: 50px 0 70px;
                        img {
                            display: block;
                            margin: 0 auto;
                        }
                    }
                }
            }
        }
    }
</style>


