<template>
    <div class="offline">
        <img src="../../static/img/offload.png" alt="" class="offline_img"> 
        <span @click="goback()">
            <img class="re_load" src="../../static/img/re_road.png">
            <em>重新加载</em>
        </span>
    </div>
</template>
<script>
export default {
    methods:{
        goback(){
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../static/css/common.less';
.offline{
    width:100%;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    .offline_img{
        margin:200px auto;
        display: block;     
    }
    span{
        position: absolute;
        right:80px;
        bottom: 80px;
        cursor: pointer;
        font-size: 30px;
        color:"";
        font-family: 'Courier New', Courier, monospace;
        .re_load{
            width:30px;
            height: 30px;
            float: left;
            margin-right: 5px;
            margin-top: 3px;
        }
        em{
            float: left;
            color: @commonColor;
        }
    }
}
</style>


