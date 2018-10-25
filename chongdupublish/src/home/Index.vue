<template>
    <div class="index">
        <Header></Header>
        <Nav></Nav>
        <div class="main">
            <div class="container">
                <div class="aside">
                    <leftTab></leftTab>
                </div>
                <div class="content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Header from "@/components/Header"
    import Nav from "@/components/Nav"
    import leftTab from '@/components/leftTab'
    import Footer from '@/components/footer'
    export default {
        name: 'Index',
        data() {
            return {
                activeName2: "second"
            }
        },
        components: {
            leftTab,
            Header,
            Nav,
            Footer
        }
    }
</script>
<style lang='less'>
    @import '../../static/css/common.less';
    .index {
        width: 100%;
        padding-bottom: 50px;
        background-color: @backgroundcolor;
        .main {
            width: 100%;
            .container {
                width: 1200px;
                margin:5px auto;
                display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                position: relative;
                top: 10px;
                .aside {
                    width: 142px;
                    overflow: hidden;
                    margin-right: 20px;
                }
                .content {
                    flex: 1;
                    min-height: 900px;
                }
            }
        }
       
    }
</style>


