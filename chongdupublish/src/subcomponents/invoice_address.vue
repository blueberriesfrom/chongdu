<template>
    <div class="invoice_address">
        <form>
            <div class="title">
                <h4>发票地址</h4>
            </div>
            <div class="invoice_head">
                <p>
                    <label> 发票抬头</label>
                    <input type="text" maxlength="25" v-check="{type:'text',val:invoicetitle,long:25}" v-model="invoicetitle">
                </p>
                <p>
                    <label>纳税人识别号</label>
                    <input type="text" maxlength="20" v-check="{type:'text',val:invoicenumber,long:20}" v-model="invoicenumber">
                </p>
                <p>
                    <label>开票类型</label>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option value="1" label="增值税普通发票"></el-option>
                        <el-option value="2" label="增值税专用发票"></el-option>
                    </el-select>
                </p>
                <p>
                    <label>开票价格</label>
                    <span>{{$route.query.price}}元</span>
                </p>
                <p>
                    <label>开票性质</label>
                    <em>
                               <i class="check" @click="chooseinvoicetype(0)">
                                   <img src="../../static/img/inputxz.png" v-if="showinvoicetype">
                                 <img src="../../static/img/no_check.png" v-if="!showinvoicetype">
                               </i>
                               <span>纸质</span>
                           </em>
                    <em>
                               <i class="check" @click="chooseinvoicetype(1)">
                                   <img src="../../static/img/inputxz.png" v-if="!showinvoicetype">
                                   <img src="../../static/img/no_check.png" v-if="showinvoicetype">
                               </i>
                               <span>电子</span>
                           </em>
                    <em class="text_em">(电子发票与纸质发票同等效用)</em>
                </p>
            </div>
            <div class="invoice_address">
                <div class="address_title">
                    <h4>发票地址</h4>
                    <span>(地址最多添加6个)</span>
                </div>
                <div class="address_list">
                    <div class="address_icon" v-for="(item,index) in addresslist" :key="index">
                        <p>
                            <em>姓名:</em>
                            <span>{{item.name}}</span>
                        </p>
                        <p>
                            <em>联系电话:</em>
                            <span>{{item.phonenumber}}</span>
                        </p>
                        <p class="address_text">
                            <em>联系地址:</em>
                            <span>{{item.street}}</span>
                        </p>
                        <i v-if="item.isdefault !== 1" @click="setdefault(item)">【默认地址】</i>
                        <img src="../../static/img/lvgou.png" alt="" v-if="item.isdefault == 1">
                    </div>
                    <div class="add_address" @click="dialogVisible = true" v-if="isshowaddbutton">
                        <img src="../../static/img/djh.png" alt="">
                        <h2>新增地址</h2>
                    </div>
                </div>
                <div class="button">
                    <span @click="addinvoice()">去开票</span>
                </div>
            </div>
        </form>
        <el-dialog title="新增地址" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false">
            <form>
                <div class="connect_content">
                    <p>
                        <label>联系人姓名</label>
                        <input type="text" placeholder="请输入姓名" v-model="name">
                    </p>
                    <p>
                        <label>联系人电话</label>
                        <input type="text" placeholder="请输入电话" v-check="{type:'tel',val:phonenumber}" v-model="phonenumber">
                    </p>
                    <p>
                        <label>联系人地址</label>
                        <el-select v-model="provincevalue" clearable placeholder="请选择">
                            <el-option v-for="item in provinceOptions" :key="item.value" :label="item.name" :value="item.code">
                            </el-option>
                        </el-select>
                        <i>省</i>
                        <el-select v-model="cityvalue" clearable placeholder="请选择">
                            <el-option v-for="item in cityOptions" :key="item.value" :label="item.name" :value="item.code">
                            </el-option>
                        </el-select>
                        <i>市</i>
                        <el-select v-model="citycode" clearable placeholder="请选择">
                            <el-option v-for="item in districtOptions" :key="item.value" :label="item.name" :value="item.code">
                            </el-option>
                        </el-select>
                        <i>区</i>
                    </p>
                    <p>
                        <label> 街道</label>
                        <input type="text" placeholder="请输入地址" v-model="street">
                    </p>
                    <!-- <p>
                            <label>设为默认</label>
                            <el-switch
                                v-model="isdefaultboolean"
                                active-color="#2EC2B4"
                                inactive-color="#f2f2f2"
                                @change="isdefaultbutton()">
                            </el-switch>
                        </p> -->
                </div>
            </form>
            <span slot="footer" class="dialog-footer">
                        <el-button type="primary" style="background-color:#2ec2b4" @click="isaddaddress== true&&toadd()">新增</el-button>
                    </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                provinceOptions: [], //省的地址
                provincevalue: "", //省的初始化
                cityOptions: [], //市的地址
                cityvalue: '', //市的初始化
                districtOptions: [], //区的地址
                citycode: '', //区的初始化 
                value: "1", //选择开票的方式
                dialogVisible: false, //是否显示弹框
                isaddaddress: true, //是否增加地址
                invoicetitle: '', //发票抬头
                invoicenumber: '', //发票识别号
                invoicetype: 0, //发票性质,0,纸质,1电子
                showinvoicetype: true, //发票性质的样式切换
                addresslist: [], //地址的集合
                name: '', //联系人姓名
                phonenumber: "", //手机号码
                area: '', //联系地址
                street: "", //街道详细地址
                isshowaddbutton: true, //是否显示增加地址的按钮,超过6的时候就不显示
                isdefault: 0, //是否为默认,0是非默认,1是默认
                // isdefaultboolean:false,
                addressid:'', //默认地址的id
            }
        },
        watch: {
            value(val) {
                console.log(val)
            },
            //区的变化
            citycode(val) {},
            //市的变化
            cityvalue(val, oldval) {
                this.citycode = "";
                this.initdistrict();
            },
            //省的变化
            provincevalue(val) {
                this.cityvalue = "";
                this.citycode = "";
                this.initcity();
            },
        },
        created() {
            this.initaddress();
            this.initinvoice();
            this.chooseinvoicetype(0);
            // this.isdefaultbutton();
        },
        methods: {
            //点击设为默认地址
            setdefault(item) {
                console.log(item);
                this.$http({
                    url: "/chongdu/address/edit.do",
                    method: 'post',
                    params: {
                        isdefault: 1,
                        id: item.id
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                        this.initinvoice();
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //点击选择开票性质
            chooseinvoicetype(item) {
                if (item == 0) {
                    this.showinvoicetype = true;
                    this.invoicetype == 0;
                } else if (item == 1) {
                    this.showinvoicetype = false;
                    this.invoicetype == 1;
                }
            },
            //点击取开票
            addinvoice() {
                if (this.addresslist.length == 0) {
                    this.$msgbox({
                        title: '提示',
                        type: 'warning',
                        message: '您还没有添加地址',
                        showCancelButton: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        beforeClose: (action, instance, done) => {
                            if (action == 'cancel') {
                                done()
                            } else if (action == 'confirm') {
                                this.dialogVisible = true;
                                done()
                            }
                        }
                    })
                } else {
                    // console.log('head'+'-------'+this.invoicetitle);
                    // console.log('usernum'+'-------'+this.invoicenumber);
                    // console.log('type'+'-------'+this.value);
                    // console.log('money'+'-------'+this.$route.query.price);
                    // console.log('nature'+'-------'+this.invoicetype);
                    // console.log('ids'+'-------'+this.$route.query.ids);          
                    let formdata = new FormData();
                    formdata.append("head", this.invoicetitle);
                    formdata.append("usernum", this.invoicenumber);
                    formdata.append("type", this.value);
                    formdata.append("money", this.$route.query.price);
                    formdata.append("nature", this.invoicetype);
                    formdata.append("orderid", this.$route.query.ids);
                    formdata.append("addressid", this.addressid);//地址
                    // formdata.append("orderid", this.$route.query.orderid);
                    this.$http({
                        url: "/chongdu/orderinvoice/add.do",
                        method: 'post',
                        data: formdata,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            })
                            // this.$router.push({
                            //     path: "/invoicing/list"
                            // })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            //点击添加地址
            toadd() {
                if (this.citycode !== "") {
                    this.area = this.citycode
                } else {
                    if (this.cityvalue !== "") {
                        this.area = this.cityvalue
                    } else {
                        if (this.provincevalue !== "") {
                            this.area = this.provincevalue
                        } else {
                            this.area = "";
                        }
                    }
                }
                let formdate = new FormData();
                formdate.append('name', this.name);
                formdate.append('phonenumber', this.phonenumber);
                formdate.append('area', this.area);
                formdate.append('street', this.street);
                formdate.append('isdefault', this.isdefault);
                this.$http({
                    url: '/chongdu/address/add.do',
                    data: formdate,
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res.data)
                    if (res.data.code == 0) {
                        this.$message({
                            message: '新增地址成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.initinvoice();
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //初始化是否默认
            // isdefaultbutton(){
            //     if(this.isdefaultboolean == false){
            //         this.isdefault = 0;
            //     }else if(this.isdefaultboolean == true){
            //         this.isdefault = 1;
            //     }
            //     console.log( this.isdefault)
            // },     
            //初始化数据,看看有无地址或者默认地址
            initinvoice() {
                this.$http({
                    url: '/chongdu/address/list.do',
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.addresslist = res.data.rows;                       
                        this.addressid =  this.addresslist.filter(o=>{
                                return o.isdefault == 1
                        })[0].id;
                         console.log( this.addressid )
                        if (this.addresslist.length >= 6) {
                            this.isshowaddbutton = false
                        }
                        $(this.addresslist).each((i, ele) => {
                            ele.index = i;
                            if (ele.isdefault == 1) {
                                let defaultlist = this.addresslist.splice(ele.index, 1)[0];
                                this.addresslist.unshift(defaultlist); 
                            }
                          
                        })
                         
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取区的地址
            initdistrict() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=' + this.cityvalue,
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.districtOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //获取市的地址
            initcity() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=' + this.provincevalue,
                    method: 'post',
                }).then(res => {
                    if (res.data.code == 0) {
                        this.cityOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //获取省市区的地址
            initaddress() {
                this.$http({
                    url: '/chongdu/city/list.do?pid=',
                    method: 'post'
                }).then(res => {
                    if (res.data.code == 0) {
                        this.provinceOptions = res.data.rows;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    @import "../../static/css/common.less";
    .el-button--primary {
        background-color: @commonColor !important;
    }
    .invoice_address {
        width: 100%;
        background-color: #fff;
        .title {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid @commonColor;
            h4 {
                width: 130px;
                height: 100%;
                display: block;
                background-color: @commonColor;
                color: #fff;
                font-size: 18px;
            }
        }
        .invoice_head {
            width: 100%;
            height: 380px;
            border-bottom: 1px solid @commonColor;
            padding-top: 25px;
            box-sizing: border-box;
            p {
                margin-bottom: 30px;
                label {
                    display: inline-block;
                    width: 167px;
                    text-align: right;
                    margin-right: 50px;
                }
                input,
                .el-select,
                span,
                em {
                    width: 300px;
                    height: 40px;
                    display: inline-block;
                    font-size: 16px;
                    line-height: 40px;
                    position: relative;
                    span {
                        display: inline-block;
                        width: 60px;
                        height: 40px;
                        line-height: 40px;
                    }
                    i {
                        display: block;
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);
                        img {
                            width: 20px;
                            height: 20px;
                            display: block;
                        }
                    }
                    span {
                        margin-left: 30px;
                    }
                }
                em {
                    width: 80px;
                }
                input {
                    padding-left: 5px;
                    font-size: 16px;
                    box-sizing: border-box;
                }
                .text_em {
                    width: 300px;
                }
            }
        }
        .invoice_address {
            width: 100%;
            padding: 0 26px;
            box-sizing: border-box;
            .address_title {
                width: 100%;
                height: 45px;
                border-bottom: 2px solid #d6d6d6;
                h4 {
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 45px;
                    width: 200px;
                    display: block;
                    float: left;
                }
                span {
                    font-size: 12px;
                    display: block;
                    float: right;
                    line-height: 45px;
                }
            }
            .address_list {
                width: 100%;
                padding-top: 20px;
                overflow: hidden;
                .address_icon {
                    width: 290px;
                    height: 130px;
                    background-color: #f2f2f2;
                    float: left;
                    margin-right: 43px;
                    margin-bottom: 20px;
                    position: relative;
                    padding-top: 10px;
                    padding-left: 20px;
                    padding-right: 10px;
                    box-sizing: border-box;
                    overflow: hidden;
                    p {
                        margin: 0;
                        padding-top: 4px;
                        font-size: 12px;
                        span {
                            margin: 0;
                            line-height: 20px;
                            display: inline;
                        }
                    }
                    .address_text {
                        width: 100%;
                        height: 40px;
                    }
                    i {
                        color: #a1a1a1;
                        font-size: 10px;
                        position: relative;
                        left: -7px;
                        bottom: -4px;
                        cursor: pointer;
                    }
                    img {
                        width: 40px;
                        height: 40px;
                        display: block;
                        position: absolute;
                        right: 0;
                        bottom: 0;
                    }
                    &:nth-of-type(3n) {
                        margin-right: 0;
                    }
                }
                .add_address {
                    width: 290px;
                    height: 130px;
                    background-color: #f2f2f2;
                    float: left;
                    margin-bottom: 20px;
                    position: relative;
                    padding-top: 10px;
                    padding-left: 20px;
                    padding-right: 10px;
                    box-sizing: border-box;
                    overflow: hidden;
                    position: relative;
                    cursor: pointer;
                    img {
                        position: absolute;
                        display: block;
                        left: 38px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    h2 {
                        font-size: 28px;
                        font-weight: 500;
                        position: absolute;
                        right: 55px;
                        height: 100%;
                        line-height: 111px;
                    }
                }
            }
            .button {
                width: 100%;
                height: 100px;
                line-height: 80px;
                span {
                    display: block;
                    width: 160px;
                    height: 40px;
                    font-size: 16px;
                    background-color: @commonColor;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                    border-radius: 7px;
                    float: right;
                    margin-right: 40px;
                    margin-top: 20px;
                    cursor: pointer;
                    &:hover {
                        opacity: 0.6;
                    }
                }
            }
        }
        .el-dialog__wrapper {
            .el-dialog {
                .el-dialog__body {
                    .connect_content {
                        width: 100%;
                        border-top: 2px solid #c9c9c9;
                        padding-top: 20px;
                        p {
                            margin-bottom: 40px;
                            height: 40px;
                            label {
                                display: inline-block;
                                width: 130px;
                                height: 100%;
                                line-height: 40px;
                                text-align: right;
                                font-size: 18px;
                                margin-right: 30px;
                            }
                            input {
                                width: 300px;
                                height: 40px;
                                padding-left: 5px;
                                box-sizing: border-box;
                                font-size: 16px;
                            }
                            .el-select {
                                width: 100px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


