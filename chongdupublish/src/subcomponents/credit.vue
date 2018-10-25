<template>
    <div class="credit">
        <!-- 积分.积分信息 -->
        <div class="jfxx_fr">
            <div class="jfxx_top">积分信息
                <span class="jfxx_zjf">总积分：
                        <span style="color:#F93939;">8888</span>分
                </span>
            </div>
            <div class="jfxx_cx">
                <div class="jdxx_hq xxk_tap">积分获取</div>
                <div class="jdxx_zc">积分支出</div>
                <!-- 排序搜索 -->
                <div class="fr">
                    <span class="jdxx_bg">
                            <i></i>
                            <input type="text" class="jdxx_search" placeholder="订单编号或时间">
                        </span>
                    <a href="#" class="jdxx_sjpx">按时间排序</a>
                    <a href="#" class="jdxx_mcpx">按名称排序</a>
                </div>
            </div>
            <table class="jfxx_box" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <td class="jfxx_xh">序号</td>
                        <td class="jfxx_fbbh">发布编号</td>
                        <td class="jfxx_fbmc">发布名称</td>
                        <td class="jfxx_fbsj">发布时间</td>
                        <td class="jfxx_shjf">所获的积分</td>
                        <td class="jfxx_syjf">剩余积分</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="jfxx_xh"><input type="checkbox">1</td>
                        <td class="jfxx_fbbh">123456789123456777</td>
                        <td class="jfxx_fbmc">XXXXXXXXXXXXXX</td>
                        <td class="jfxx_fbsj">2018.04.04</td>
                        <td class="jfxx_shjf"><span style="color:#FF4343;">88</span>分</td>
                        <td class="jfxx_syjf">8888分</td>
                    </tr>
                    <tr>
                        <td class="jfxx_xh"><input type="checkbox">1</td>
                        <td class="jfxx_fbbh">123456789123456777</td>
                        <td class="jfxx_fbmc">XXXXXXXXXXXXXX</td>
                        <td class="jfxx_fbsj">2018.04.04</td>
                        <td class="jfxx_shjf"><span style="color:#FF4343;">88</span>分</td>
                        <td class="jfxx_syjf">8888分</td>
                    </tr>
                </tbody>
            </table>
            <div class="jfxx_del">
                <input type="checkbox">
                <a href="#">删除</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="less">
    .credit {
        width: 100%;
        color: #333;
        .jfxx_fr {
            background: #fff;
            border: 1px solid #f1f1f1;
            .jfxx_top {
                border-bottom: 2px solid #B2B2B2;
                height: 60px;
                line-height: 60px;
                padding-left: 25px;
                font-weight: bold;
                font-size: 16px;
                .jfxx_zjf {
                    margin-left: 740px;
                }
            }
            .jfxx_cx {
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #2EC2B4;
                overflow: hidden;
                .jdxx_hq,
                .jdxx_zc {
                    float: left;
                    width: 160px;
                    text-align: center;
                    border-right: 2px solid #EAEAEA;
                    font-size: 16px;
                    &.xxk_tap {
                        background: #2EC2B4;
                        color: #fff;
                    }
                }
                .fr {
                    .jdxx_bg {
                        position: relative;
                        margin-right: 10px;
                        i {
                            width: 12px;
                            height: 12px;
                            background: url(../../static/img/fdj.png) no-repeat;
                            position: absolute;
                            left: 120px;
                            top: 5px;
                            &:hover {
                                cursor: pointer;
                            }
                        }
                        .jdxx_search {
                            border-radius: 7px;
                            width: 140px;
                            height: 20px;
                            border: 1px solid #C4C4C4;
                            font-size: 10px;
                            outline: none;
                            box-sizing: border-box;
                            padding-right: 23px;
                            padding-left: 10px;
                            &:focus {
                                border: 1px solid #3DA9DD;
                            }
                        }
                    }
                    .jdxx_sjpx,
                    .jdxx_mcpx {
                        background: #2EC2B4;
                        color: #fff;
                        font-size: 10px;
                        padding: 3px 10px;
                        border-radius: 7px;
                        margin-right: 10px;
                        &:hover {
                            opacity: 0.6;
                        }
                    }
                }
            }
            .jfxx_box {
                td {
                    height: 65px;
                    text-align: center;
                    border-bottom: 2px solid #EAEAEA;
                    font-size: 14px;
                    line-height: 65px;
                }
                .jfxx_xh {
                    width: 110px;
                    position: relative;
                }
                .jfxx_xh input {
                    position: absolute;
                    left: 15px;
                    top: 25px;
                }
                .jfxx_fbbh {
                    width: 160px;
                }
                .jfxx_fbmc {
                    width: 246px;
                }
                .jfxx_fbsj {
                    width: 110px;
                }
                .jfxx_shjf {
                    width: 230px;
                }
                .jfxx_syjf {
                    width: 162px;
                }
            }
            .jfxx_del{
                     padding-top:35px;
                    padding-left:15px;
                    padding-bottom:25px;
                     a{
                        font-size:14px;
                        margin-left:12px;
                    }
            }
        }
    }
</style>


