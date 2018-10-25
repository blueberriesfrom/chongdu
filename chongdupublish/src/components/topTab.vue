<template>
    <div class="toptab">
        <ul>
            <li>
                <router-link to="/home">
                    首页
                </router-link>
            </li>
             <!-- <li>
                <router-link to="/credit">
                    积分
                </router-link>
            </li> -->
            <li>
                <router-link to="/release">
                    发布宠物
                </router-link>
            </li>
            <li>
                <router-link to="/myInfo">
                    我的信息
                </router-link>
            </li>
             <li>
                <router-link to="/message">
                    通知消息
                </router-link>
            </li>
             <li>
                <router-link to="/change/password">
                    修改密码
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'topnav'
    }
</script>
<style lang="less">
    .toptab {
        li {
            margin-bottom: 15px;
            float: left;
            margin-left: 15px;
        }
    }
</style>

