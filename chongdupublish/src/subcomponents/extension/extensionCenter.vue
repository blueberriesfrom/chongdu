<template>
    <div class="extansion_center">
        <Header></Header>
        <Nav></Nav>
        <div class="extansion_body">
            <div class="container">
                 <div class="extansion_title">
                    <h2>推广中心</h2>
                </div>
                <extensionLink/>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/components/Header"
import Nav from "@/components/Nav"
import extensionLink from "@/components/extensionlLink"
import Footer from '@/components/footer'
export default {
     components: {
            Header,
            Nav,
            Footer,extensionLink
        }
}
</script>
<style lang="less" scoped>
.extansion_center{
    width:100%;
    .extansion_body{
        width: 100%;
        background-color: #F1F1F1;
        padding-top: 15px;
        .container{
             background-color: #fff;
            overflow: hidden;
            min-height: 800px;
            .extansion_title {
                    width: 100%;
                    padding: 0 45px;
                    box-sizing: border-box;
                    h2 {
                        width: 100%;
                        height: 60px;
                        text-align: center;
                        line-height: 60px;
                        font-size: 26px;
                        border-bottom: 2px solid #d9d9d9;
                    }
                }
        }
    }
}
</style>


