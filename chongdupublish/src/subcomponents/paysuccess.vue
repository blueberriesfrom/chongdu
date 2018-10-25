<template>
    <div class="pay_success">
        <Header></Header>
        <Nav></Nav>
        <div class="container">
            <div class="main">
                <div class="success_title">
                    <img src="../../static/img/yhtl.png" alt="">
                </div>
                <div class="success_body">
                    <img src="../../static/img/success_big.png" alt="">
                    <p>恭喜你成功支付订单</p>
                </div>
                <div class="link">
                    <div class="link_cox">
                        <router-link to="/home">返回到首页</router-link>
                        <router-link to="/onList/pet">查看在售列表</router-link>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Header from "@/components/Header"
    import Nav from "@/components/Nav"
    import Footer from '@/components/footer'
    export default {
        data() {
            return {}
        },
        components: {
            Header,
            Nav,
            Footer
        }
    }
</script>
<style lang='less'>
    @import '../../static/css/common.less';
    .pay_success {
        width: 100%;
        background-color: #f1f1f1;
        .container {
            .main {
                width: 100%;
                height: 700px;
                margin-top: 25px;
                background-color: #fff; // padding: 0 50px;
                box-sizing: border-box; // position: relative;
                .success_title {
                    width: 100%;
                    height: 100px;
                    border-bottom: 2px solid #d1d1d1;
                    img {
                        width: 185px;
                        height: 80px;
                        position: relative;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                    }
                }
                .success_body {
                    width: 990px;
                    margin: 0 auto;
                    height: 410px;
                    background-color: #f1f1f1;
                    margin-top: 25px;
                    position: relative;
                    img {
                        width: 122px;
                        height: 122px;
                        position: absolute;
                        top: 80px;
                        left: 110px;
                    }
                    p {
                        font-size: 38px;
                        color: @commonColor;
                        position: absolute;
                        top: 110px;
                        left: 280px;
                    }
                }
                .link {
                    width: 990px;
                    margin: 0 auto;
                    height: 80px;
                    background-color: #f1f1f1;
                    .link_cox {
                        width: 240px;
                        height: 60px;
                        float: right;
                        margin-right: 20px;
                        a {
                            color: @commonColor;
                            font-size: 18px;
                            display: inline-block;
                            padding-bottom: 2px;
                            margin-right: 15px;
                            border-bottom: 1px solid @commonColor;
                        }
                    }
                }
            }
        }
    }
</style>


