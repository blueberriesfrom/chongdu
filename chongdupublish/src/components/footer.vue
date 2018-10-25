<template>
    <div class="admin_footer">
        <div class="container">
            <div class="foot_hr">
                <div class="foot_bg"></div>
            </div>
            <p class="foot_info"><span>版本信息:Bate</span><span class="foot_website">公司网站:www.chongdu.com</span></p>
        </div>
    </div>
</template>
<script>
    export default {
    }
</script>
<style lang='less'>
    .admin_footer {
        background: #F1F1F1;
        padding-top: 50px;
        padding-bottom: 50px;
        .foot_hr {
            border: 1px solid #A9A9A9;
            position: relative;
            .foot_bg {
                background: url(../../static/img/foot_dog.png);
                width: 91px;
                height: 57px;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-top: -28px;
                margin-left: -45px;
            }
        }
        .foot_info {
            text-align: center;
            margin-top: 35px;
            font-size: 14px;
            color: #9A9A9A;
        }
        .foot_website {
            margin-left: 10px;
        }
    }
</style>


