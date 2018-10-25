<template>
    <div class="credit_exchange">
        <!-- 积分兑换 -->
        <div class="integral_dh">
            <div class="integral_bt">积分兑换</div>
            <ul class="integral_gg">
                <li>
                    <div class="integral_ggl">广告</div>
                    <div class="integral_dhxx">
                        <a href="#">兑换</a> 1000分/30天
                    </div>
                </li>
                <li style="margin-left:2px;">
                    <div class="integral_ggl">广告</div>
                    <div class="integral_dhxx">
                        <a href="#">兑换</a>1000分/30天
                    </div>
                </li>
                <li style="margin-left:2px;">
                    <div class="integral_ggl">广告</div>
                    <div class="integral_dhxx">
                        <a href="#">兑换</a>1000分/30天
                    </div>
                </li>
            </ul>
        </div>
        <div class="integral_ydh">
            <div class="integral_ydhtop">
                已兑换积分信息<span class="integral_kc">总扣除积分:888分</span>
            </div>
            <table class="integral_box" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <td class="integral_dhfw">已兑换服务</td>
                        <td class="integral_fwnr">已兑换服务内容</td>
                        <td class="integral_sysj">剩余时间</td>
                        <td class="integral_sxjf">所需积分</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="integral_dhfw"><input type="checkbox">立即置顶</td>
                        <td class="integral_fwnr">将你所要发布的商品放置所以商品的顶部</td>
                        <td class="integral_sysj">剩余28天</td>
                        <td class="integral_sxjf">28天</td>
                    </tr>
                    <tr>
                        <td class="integral_dhfw"><input type="checkbox">立即置顶</td>
                        <td class="integral_fwnr">将你所要发布的商品放置所以商品的顶部</td>
                        <td class="integral_sysj">剩余28天</td>
                        <td class="integral_sxjf">28天</td>
                    </tr>
                </tbody>
            </table>
            <div class="integral_del"><input type="checkbox"><a href="#">删除</a></div>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
<style lang='less'>
    .credit_exchange {
        width: 100%;
        color: #333;
        .integral_dh {
            border: 1px solid #f1f1f1;
            background: #fff;
            .integral_bt {
                height: 60px;
                line-height: 60px;
                padding-left: 25px;
                font-weight: bold;
                border-bottom: 1px solid #2EC2B4;
                font-size: 16px;
            }
            .integral_gg {
                overflow: hidden;
                width: 100%;
                 display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                li {
                    float: left;
                    flex: 1;
                    .integral_ggl {
                        width: 100%;
                        height: 210px;
                        background: #EAEAEA;
                        text-align: center;
                        line-height: 210px;
                        color: #ADADAD;
                        font-size: 36px;
                        border-bottom: 3px solid #B2B2B2;
                    }
                    .integral_dhxx {
                        text-align: center;
                        height: 65px;
                        line-height: 65px;
                        border-left: 2px solid #EAEAEA;
                        margin-left: -2px;
                        font-size: 10px;
                        a {
                            padding: 1px 7px;
                            background: #2EC2B4;
                            color: #fff;
                            border-radius: 7px;
                        }
                    }
                }
            }
        }
        .integral_ydh {
            background: #fff;
            border: 1px solid #f1f1f1;
            margin-top: 10px;
            .integral_ydhtop {
                height: 60px;
                line-height: 60px;
                padding-left: 25px;
                font-weight: bold;
                border-bottom: 1px solid #2EC2B4;
                font-size: 16px;
                .integral_kc {
                    margin-left: 660px;
                }
            }
            .integral_box {
                font-size: 14px;
                td {
                    text-align: center;
                    height: 55px;
                    line-height: 55px;
                    border-bottom: 1px solid #EAEAEA;
                }
                .integral_dhfw {
                    width: 240px;
                    position: relative;
                    input {
                        position: absolute;
                        left: 42px;
                        top: 20px;
                    }
                }
                .integral_fwnr {
                    width: 390px;
                }
                .integral_sysj {
                    width: 220px;
                }
                .integral_sxjf {
                    width: 168px;
                }
            }
            .integral_del {
                padding-top: 40px;
                padding-left: 42px;
                padding-bottom: 20px;
                a {
                    font-size: 14px;
                    margin-left: 38px;
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }
        }
    }
</style>


