<template>
    <div class="nav">
            <div class="container">
                <a href="#"> <img src="../../static/img/1366_dog.png"> </a>
                <ul>
                    <!-- 顶部导航组件 -->
                    <topTab></topTab>
                </ul>
                <div class="customer fl">
                    <p>客服小张:&nbsp;&nbsp;000-00000000</p>
                    <p>专属客服:&nbsp;&nbsp;138888888888</p>
                </div>
            </div>
        </div> 
</template>
<script>
 import topTab from '@/components/topTab'
export default {
    components:{
         topTab
    }
}
</script>
<style lang="less">
 @import '../../static/css/common.less';
  .nav {
            height: 60px;
            background: url('../../static/img/background.png') no-repeat center;
        background-size: 100% 60px;
            line-height: 64px;
            display: block;
            .container {
                height: 60px;
                width: 1200px;
                margin: 0 auto;
                a {
                    float: left;
                    height: 50px;

                    img {
                        border-radius: 15px;
                    }
                }
                ul {
                    li {
                        float: left;
                        margin-left: 70px;
                        a {
                            color: #fff;
                            font-size: 16px;
                            display: block;
                            width:100%;
                            &:hover {
                                opacity: 0.6;
                            }
                        }
                    }
                }
                .customer {
                    height: 60px;
                    background-color: red;
                    float: right;
                    padding-right: 35px;
                    background: url(../../static/img/kf1.png) no-repeat 15px 14px; 
                    // display: flex;
                    // flex-direction: column;
                    p {
                        height: 20px;
                        line-height: 30px;
                        font-size: 12px;
                        color: #fff;
                        padding-left: 33px;
                        &:nth-of-type(1) {
                            line-height: 40px;
                        }
                        &:nth-of-type(2) {
                            line-height: 40px;
                        }
                    }
                }
            }
        }
</style>


