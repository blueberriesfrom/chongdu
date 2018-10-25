<template>
    <div class="header">
        <div class="container">
            <ul>
                <!-- <li> <router-link to="/myInfo" class="">lyc</router-link> </li> -->
                <li>
                    <router-link to="/home">我的首页</router-link>
                </li>
                <li>
                    <router-link to="/">手机宠都</router-link>
                </li>
                <li>
                    <router-link to="/">帮助中心</router-link>
                </li>
                <li>
                    <a href="javascript:void(0);" @click="turnback()">退出</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            turnback() {
                this.$http({
                    url: "/chongdu/user/logout.do",
                    method: 'post'
                }).then(res => {
                    localStorage.clear();
                    if (res.data.code == 0) {
                        this.$router.push({
                            path: '/'
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .header {
        background-color: @backgroundcolor;
        height: 32px;
        display: block;
        .container {
            height: 32px;
            width: 1200px;
            margin: 0 auto;
            ul {
                float: right;
                li {
                    height: 32px;
                    text-align: center;
                    color: #333333;
                    font-size: 14px;
                    float: left;
                    line-height: 32px;
                    a:hover {
                        opacity: 0.6;
                    }
                }
                li:after {
                    content: "|";
                    padding-left: 15px;
                    padding-right: 15px;
                }
            }
        }
    }
</style>


