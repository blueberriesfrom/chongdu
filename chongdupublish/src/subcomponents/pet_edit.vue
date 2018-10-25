<template>
    <div class="pet_edit">
        <div class="issue">
            <div class="issue_top">
                <div class="tap_fb xxk_tap">编辑宠物</div>
                <!-- <div class="tap_yfb">发布已经认证的宠物</div> -->
            </div>
            <form enctype="multipart/form-data" id="fbcw_form">
                <div class="issue_main">
                    <div class="issue_bt">
                        宠物标题
                        <textarea name="title" maxlength="25"></textarea>
                        <span>0/25</span>
                    </div>
                    <div class="issue_cwmc">
                        宠物昵称
                        <input name="name" type="text" maxlength="10">
                        <span>0/10</span>
                    </div>
                    <div class="issue_cwzl">
                        宠物种类
                        <input type="text" disabled>
                    </div>
                    <div class="issue_cwcolor">
                        毛色
                        <input type="text" disabled>
                    </div>
                    <div class="issue_cwxb">
                        性别
                        <input type="text" disabled>
                    </div>
                    <div class="issue_cwcsrq">
                        出生日期
                        <input type="text" disabled>
                    </div>
                    <div class="issue_price">
                        价格
                        <input type="text" name="price" maxlength="10" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">&nbsp;元
                        <a href="javascript:void(0);" class="issue_my" maxlength="10">面&nbsp;&nbsp;议</a>
                        <div></div>
                    </div>
                    <div class="issue_lxrjd">
                        地址<textarea name="contactstreet" disabled></textarea>
                    </div>
                    <!-- 疫苗信息 -->
                    <!-- 疫苗信息 -->
                    <div class="vaccine_info">
                        <div class="vaccine_info_title">
                            <h4>疫苗信息</h4>
                        </div>
                        <div class="vaccine_list">
                            <div class="vaccine_list_title">
                                <el-col :span="3">
                                    疫苗品牌
                                </el-col>
                                <el-col :span="4">
                                    疫苗时间
                                </el-col>
                                <el-col :span="5">
                                    疫苗地址
                                </el-col>
                                <el-col :span="5">
                                    疫苗说明
                                </el-col>
                                <el-col :span="4">
                                    疫苗照片
                                </el-col>
                            </div>
                            <div class="vaccine_list_detail">
                                <el-col :span="3">
                                    疫苗品牌
                                </el-col>
                                <el-col :span="4">
                                    疫苗时间
                                </el-col>
                                <el-col :span="5">
                                    疫苗地址
                                </el-col>
                                <el-col :span="5">
                                    疫苗说明
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">
                                        <img src="../../static/img/dog_td.png" alt="">
                                    </div>
                                </el-col>
                                <el-col :span="3">
                                    <div class="grid-content bg-purple-light">
                                        <span class="del">删除</span>
                                        <span class="change">修改</span>
                                    </div>
                                </el-col>
                            </div>
                        </div>
                    </div>
                    <!-- 驱虫信息 -->
                    <!-- 驱虫信息 -->
                    <div class="insect_info">
                        <div class="insect_title">
                            <h4>驱虫信息</h4>
                            <div class="add_insect_info" @click="idshowModel($event)">
                                <span>✚&nbsp;添加驱虫信息</span>
                            </div>
                        </div>
                        <div class="insect_list">
                            <div class="insect_list_title">
                                <el-col :span="3">
                                    驱虫品牌
                                </el-col>
                                <el-col :span="4">
                                    驱虫时间
                                </el-col>
                                <el-col :span="5">
                                    驱虫地址
                                </el-col>
                                <el-col :span="5">
                                    驱虫说明
                                </el-col>
                                <el-col :span="4">
                                    驱虫照片
                                </el-col>
                            </div>
                            <div class="insect_list_detail">
                                <el-col :span="3">
                                    疫苗品牌
                                </el-col>
                                <el-col :span="4">
                                    疫苗时间
                                </el-col>
                                <el-col :span="5">
                                    疫苗地址
                                </el-col>
                                <el-col :span="5">
                                    疫苗说明
                                </el-col>
                                <el-col :span="4">
                                    <div class="grid-content bg-purple-light">
                                        <img src="../../static/img/dog_td.png" alt="">
                                    </div>
                                </el-col>
                                <el-col :span="3">
                                    <div class="grid-content bg-purple-light">
                                        <span class="del">删除</span>
                                        <span class="change">修改</span>
                                    </div>
                                </el-col>
                            </div>
                        </div>
                    </div>
                    <div></div>
                    <div class="issue_cwms">
                        宠物描述
                        <textarea name="content" maxlength="200"></textarea>
                        <span>0/200</span>
                    </div>
                    <!-- 宠物照片 -->
                    <div class="pet_photo">
                        <h4 class="pet_photo_title">
                            <span>宠物描述</span>
                            <i>*</i>
                            <em>支持IPG、TPEG、bmp、gif,大小不超过5M</em>
                        </h4>
                        <div class="pet_photo_list">
                            <div class="add_img_list">
                                <div class="add_img_list_detail">
                                    <img src="../../static/img/dog_td.png" alt="">
                                    <em></em>
                                </div>
                                <div class="add_img_list_detail">
                                    <img src="../../static/img/dog_td.png" alt="">
                                    <em></em>
                                </div>
                                <div class="add_img_list_detail">
                                    <img src="../../static/img/dog_td.png" alt="">
                                    <em></em>
                                </div>
                            </div>
                            <div class="add_img">
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                    <!-- 宠物证件 -->
                    <div class="pet_photo">
                        <h4 class="pet_photo_title">
                            <span>宠物证件</span>
                            <i>*</i>
                            <em>支持IPG、TPEG、bmp、gif,大小不超过5M</em>
                        </h4>
                        <div class="pet_photo_list">
                            <div class="add_img_list">
                                <div class="add_img_list_detail">
                                    <img src="../../static/img/dog_td.png" alt="">
                                    <em></em>
                                </div>
                                <div class="add_img_list_detail">
                                    <img src="../../static/img/dog_td.png" alt="">
                                    <em></em>
                                </div>
                                <div class="add_img_list_detail">
                                    <img src="../../static/img/dog_td.png" alt="">
                                    <em></em>
                                </div>
                            </div>
                            <div class="add_file">
                                <input type="text" value="上传">
                                <span>(添加证件有助于更快认证)</span>
                            </div>
                        </div>
                    </div>
                    <!-- 联系人信息 -->
                     <!-- 联系人信息 -->
                    <div class="connect-msg">
                        <div class="connect_title">
                            <h4>驱虫信息</h4>
                        </div>
                        <div class="connect_name">
                            <em>联系人姓名</em>
                            <input type="text">
                        </div>
                        <div class="connect_tel">
                            <em>联系人电话</em>
                            <input type="text">
                        </div>
                    </div>
                    <div class="issue_fbbtn">
                        <button type='button' id="save1">保存</button>
                        <button type='button' id="save2">保存并发布</button>
                        <button type="button" id="qx3">取消</button>
                    </div>
                </div>
                <input type="hidden" name="ismianyi" value="0">
                <input type="hidden" name="ids">
            </form>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="less">
    @import '../../static/css/common.less';
    .pet_edit {
        width: 100%;
        color: #333;
        background-color: #fff;
        .issue {
            background: #fff;
            border: 1px solid #f1f1f1;
            .issue_top {
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #2EC2B4;
                div {
                    float: left;
                    width: 180px;
                    text-align: center;
                    border-right: 1px solid #EEEEEE;
                    cursor: pointer;
                    font-size: 18px;
                }
                .tap_fb.xxk_tap {
                    background: #2EC2B4;
                    color: #fff;
                }
            }
            #fbcw_form {
                .issue_main {
                    padding-top: 25px;
                    div {
                        margin-bottom: 35px;
                    }
                    input {
                        border: 1px solid #D5D5D5;
                        height: 34px;
                        border: 1px solid #c0bebe;
                    }
                    .issue_bt {
                        margin-left: 45px;
                        position: relative;
                        height: 70px;
                        textarea {
                            width: 336px;
                            height: 60px;
                            position: absolute;
                            left: 124px;
                            top: 0px;
                            resize: none;
                            border: 1px solid #D5D5D5;
                            text-indent: 10px;
                        }
                        span {
                            position: absolute;
                            top: 48px;
                            left: 430px;
                            font-size: 12px;
                        }
                    }
                    .issue_cwmc,
                    .issue_cwzl,
                    .issue_cwcolor,
                    .issue_cwxb,
                    .issue_cwcsrq {
                        margin-left: 45px;
                        position: relative;
                        input {
                            width: 340px;
                            margin-left: 60px;
                            text-indent: 10px;
                        }
                        span {
                            font-size: 12px;
                            position: absolute;
                            left: 430px;
                            bottom: 10px;
                        }
                    }
                    .issue_lxrjd {
                        margin-left: 78px;
                        position: relative;
                        height: 70px;
                        span {
                            position: absolute;
                            left: 394px;
                            bottom: 10px;
                            font-size: 12px;
                        }
                        textarea {
                            width: 336px;
                            height: 60px;
                            position: absolute;
                            left: 90px;
                            top: 0px;
                            resize: none;
                            border: 1px solid #D5D5D5;
                            text-indent: 10px;
                        }
                        input {
                            width: 340px;
                            margin-left: 60px;
                            text-indent: 10px;
                        }
                    }
                    .issue_cwcolor,
                    .issue_cwxb {
                        margin-left: 78px;
                    }
                    .issue_cwcsrq {
                        margin-left: 45px;
                    }
                    .issue_price {
                        margin-left: 78px;
                        position: relative;
                        div {
                            width: 200px;
                            height: 37px;
                            position: absolute;
                            left: 93px;
                            top: 0px;
                            display: none;
                        }
                        input {
                            margin-left: 60px;
                            width: 200px;
                            text-indent: 10px;
                        }
                        .issue_my {
                            border: 1px solid #c0bebe;
                            background: #F2F2F2;
                            padding: 7px 32px;
                            margin-left: 7px;
                        }
                    }
                    .issue_cwms {
                        margin-left: 20px;
                        position: relative;
                        height: 180px;
                        textarea {
                            width: 960px;
                            height: 155px;
                            resize: none;
                            background: #fff;
                            border: 1px solid #BABABA;
                            top: 30px;
                            left: 5px;
                            position: absolute;
                            text-indent: 10px;
                        }
                        span {
                            position: absolute;
                            bottom: 0px;
                            right: 55px;
                        }
                    }
                    .issue_cwpic {
                        margin-left: 20px;
                        position: relative;
                        .issue_bz {
                            font-size: 12px;
                            margin-left: 20px;
                            color: #8D8D8D;
                        }
                    }
                    .upload_btn {
                        border: 1px solid #D0D0D0;
                        font-size: 12px;
                        padding: 6px 60px;
                        margin-left: 100px;
                        position: relative;
                        input {
                            height: 30px;
                            position: absolute;
                            left: -65px;
                            cursor: pointer;
                            top: 0px;
                            opacity: 0;
                            width: 235px;
                        }
                    }
                    .issue_fbbtn {
                        text-align: right;
                        button {
                            padding: 7px 35px;
                            background: @commonColor;
                            color: #fff;
                            border-radius: 7px;
                            font-size: 16px;
                            margin-right: 30px;
                            border: none;
                            cursor: pointer;
                            outline: none;
                            &:hover {
                                opacity: 0.6;
                            }
                        }
                    }
                     .connect-msg {
            .connect_title {
                width: 100%;
                height: 40px;
                border-bottom: 2px solid @commonColor;
                background-color: #DEDEDE;
                margin-bottom: 35px;
                h4 {
                    width: 100px;
                    line-height: 40px;
                    font-size: 18px;
                    padding-left: 20px;
                }
            }
            .connect_name,
            .connect_tel {
                width: 100%;
                margin-left: 35px;
                margin-bottom: 35px;
                height: 40px;
                top: 20px;
                em {
                    position: relative;
                    vertical-align: top;
                    width: 70px;
                    display: inline-block;
                    text-align: right;
                    line-height: 40px;
                }
                em:after {
                    position: absolute;
                    content: "*";
                    color: red;
                    left: 75px;
                    top: 3px;
                }
                input {
                    height: 40px;
                    outline: none;
                    border: 1px solid #c1bfbf !important;
                    border-radius: 3px !important;
                    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075) !important;
                    font-size: 16px;
                    margin-left: 100px;
                }
            }
        }
                    .vaccine_info,
                    .insect_info {
                        width: 100%;
                        .vaccine_info_title,
                        .insect_title {
                            width: 100%;
                            height: 40px;
                            border-bottom: 2px solid @commonColor;
                            background-color: #DEDEDE;
                            position: relative;
                            h4 {
                                width: 100px;
                                line-height: 40px;
                                font-size: 18px;
                                padding-left: 20px;
                            }
                            .add_vaccine_info,
                            .add_insect_info {
                                width: 100px;
                                height: 22px;
                                font-size: 12px;
                                cursor: pointer;
                                color: #fff;
                                background-color: @commonColor;
                                position: absolute;
                                right: 10px;
                                top: 50%;
                                transform: translateY(-50%);
                                line-height: 22px;
                                text-align: center;
                                border-radius: 3px;
                            }
                        }
                        .vaccine_list,
                        .insect_list {
                            width: 100%;
                            .vaccine_list_title,
                            .insect_list_title {
                                width: 100%;
                                height: 50px;
                                border-bottom: 1px solid #dedede;
                                .el-col-3,
                                .el-col-5,
                                .el-col-6,
                                .el-col-4 {
                                    height: 50px;
                                    text-align: center;
                                    line-height: 50px;
                                    font-size: 16px;
                                }
                            }
                            .vaccine_list_detail,
                            .insect_list_detail {
                                width: 100%;
                                border-bottom: 1px solid #dedede;
                                height: 120px;
                                .el-col-3,
                                .el-col-5,
                                .el-col-6,
                                .el-col-4 {
                                    height: 120px;
                                    text-align: center;
                                    line-height: 120px;
                                    font-size: 16px;
                                    overflow: hidden;
                                    .grid-content,
                                    .bg-purple-light {
                                        width: 100%;
                                        height: 100%;
                                        position: relative;
                                        text-align: left;
                                        img {
                                            width: 100px;
                                            height: 100px;
                                            position: absolute;
                                            top: 50%;
                                            left: 50%;
                                            transform: translate(-50%, -50%);
                                        }
                                        span {
                                            position: relative;
                                            background-color: @commonColor;
                                            border-radius: 11px;
                                            color: #fff;
                                            padding: 3px 6px;
                                            cursor: pointer;
                                            &:nth-of-type(1) {
                                                margin-right: 5px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .pet_decri,
                    .pet_photo {
                        width: 100%;
                        .pet_decri_title,
                        .pet_photo_title {
                            height: 60px;
                            width: 100%;
                            font-size: 18px;
                            line-height: 80px;
                            span {
                                margin-left: 20px;
                            }
                            i {
                                color: red;
                            }
                            em {
                                color: #8D8D8D;
                                font-size: 12px;
                                margin-left: 20px;
                            }
                        }
                        .pet_decri_text {
                            width: 100%;
                            padding: 20px;
                            box-sizing: border-box;
                            height: 160px;
                            position: relative;
                            textarea {
                                width: 100%;
                                height: 100%;
                            }
                            em {
                                position: absolute;
                                right: 35px;
                                bottom: 20px;
                            }
                        }
                        .pet_photo_list {
                            width: 100%;
                            padding-left: 20px;
                            box-sizing: border-box;
                            margin-top: 20px;
                            margin-bottom: 20px;
                            display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                            .add_img_list {
                                height: 100px;
                                 display: -webkit-box;  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
                display: -moz-box;     /* 老版本语法: Firefox (buggy) */
                display: -ms-flexbox;  /* 混合版本语法: IE 10 */
                display: -webkit-flex; /* 新版本语法: Chrome 21+ */
                display: flex; 
                                .add_img_list_detail {
                                    width: 100px;
                                    height: 100px;
                                    margin-right: 20px;
                                    position: relative;
                                    img {
                                        width: 100px;
                                        height: 100px;
                                    }
                                    em {
                                        width: 20px;
                                        height: 20px;
                                        position: absolute;
                                        top: -10px;
                                        right: -10px;
                                        display: block;
                                        background: url(../../static/img/delimg.png) no-repeat center;
                                        border-radius: 10px;
                                    }
                                }
                            }
                            .add_img {
                                width: 100px;
                                height: 100px;
                                border: 3px dashed black;
                                text-align: center;
                                line-height: 85px;
                                box-sizing: border-box;
                                margin-left: 20px;
                                span {
                                    font-size: 100px;
                                }
                            }
                            .add_file {
                                width: 350px;
                                height: 100px;
                                position: relative;
                                input {
                                    border: 1px solid #c1bfbf;
                                    width: 150px;
                                    height: 30px;
                                    text-align: center;
                                    border-radius: 3px;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                                span {
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    right: 0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>


