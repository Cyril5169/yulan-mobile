<template>
  <div class="bank-details">
    <top :top="set"></top>
    <span class="bank-state">{{state}}</span>
    <div class="bank-details-msg">
      <!--<div class="msg">-->
      <!--<div><span class="left">建立时间</span><span class="right">{{bankDetails.createTs}}</span></div>-->
      <!--<div><span class="left">提交日期</span><span class="right">{{bankDetails.submitTs}}</span></div>-->
      <!--<template v-if="bankDetails.state === '退回'">-->
      <!--<div><span class="left">退回时间</span><span class="right">{{bankDetails.sendbackTs}}</span></div>-->
      <!--<div><span class="left">退回原因</span><span class="right">{{bankDetails.sendbackReason}}</span></div>-->
      <!--</template>-->
      <!--<template v-else>-->
      <!--<div><span class="left">处理人</span><span class="right">{{bankDetails.erpProcessOp}}</span></div>-->
      <!--<div><span class="left">处理时间</span><span class="right">{{bankDetails.erpProcessTs}}</span></div>-->
      <!--</template>-->
      <!--</div>-->
      <div class="msg">
        <div>
          <span class="left">流水号</span>
          <span class="right">{{bankDetails.id}}</span>
        </div>
        <div>
          <span class="left">客户代码</span>
          <span class="right">{{bankDetails.cid}}</span>
        </div>
        <div>
          <span class="left">客户名称</span>
          <span class="right">{{bankDetails.cname}}</span>
        </div>
      </div>
      <div class="msg">
        <div @click="showBank = true">
          <span class="left">汇入银行</span>
          <img class="right more-slet" src="../../assetsorder/more.png" alt />
          <input
            readonly="readonly"
            placeholder="选择汇入玉兰账号所属银行"
            class="right bank-input"
            v-model="bankDetails.yulanBank"
          />
        </div>
        <div>
          <span class="left">付款公司(人)</span>
          <img
            @click="showHkHistory = true"
            class="right more-slet"
            src="../../assetsorder/more.png"
            alt
          />
          <input placeholder="请填写付款公司(人)" class="right bank-input" v-model="bankDetails.payerName" />
        </div>
        <div>
          <span class="left">付款银行账号</span>
          <!-- <img class="right more-slet" src="../../assetsorder/more.png" alt /> -->
          <input
            placeholder="请填写付款银行账号"
            class="right bank-input"
            v-model="bankDetails.payerAccount"
            @input="oninput2"
          />
        </div>
        <div>
          <span class="left">付款金额</span>
          <!-- <img class="right more-slet" src="../../assetsorder/more.png" alt /> -->
          <input
            placeholder="请填写付款金额"
            class="right bank-input"
            v-model.number="bankDetails.payAmount"
            type="number"
            @input="oninput"
          />
        </div>
        <div @click="showselTime = true">
          <span class="left">付款日期</span>
          <img class="right more-slet" src="../../assetsorder/more.png" alt />
          <input
            readonly="readonly"
            placeholder="请选择日期"
            class="right bank-input"
            v-model="bankDetails.payDate"
          />
        </div>
        <div>
          <span class="left">备注</span>
          <!-- <img class="right more-slet" src="../../assetsorder/more.png" alt /> -->
          <input class="right bank-input" placeholder="填写备注" v-model="bankDetails.memo" />
        </div>
      </div>
      <div class="fkpz">
        <div class="fkpz-title">上传付款凭证</div>
        <!--<img :src="imgSrc" alt="" class="bank-img" @click="showPic = true">-->
        <van-uploader
          :after-read="onRead"
          :before-read="beforeRead"
          accept="image/*"
          preview-size="110"
          :max-count="1"
          :max-size="2*1024*1024"
        >
          <img
            v-if="bankDetails.imgUrl"
            class="bank-img head-img"
            :src="imgSrc"
            ref="goodsImg"
            style="width: 110px;height: 110px;"
          />
          <div v-else class="upload-pic">+</div>
        </van-uploader>
      </div>
    </div>
    <div class="edit-bank">
      <span class="edit-bank-xg" @click="toEditBank">确认提交</span>
      <!--<span class="edit-bank-dl" @click="toDelBank">作废凭证</span>-->
    </div>
    <!--汇入银行-->
    <van-popup v-model="showBank" position="bottom">
      <van-picker
        show-toolbar
        :title="'汇入银行'"
        :columns="bank"
        @cancel="showBank = false"
        @confirm="onConfirmBank"
      />
    </van-popup>

    <!--汇款公司和银行账号-->
    <van-popup v-model="showHkHistory" class="showHkHistory">
      <input
        class="fill-conpony"
        placeholder="填写付款公司(人)"
        type="text"
        v-model="bankDetails.payerName"
      />
      <img class="enter-icon" src="../../assetsorder/enter.png" alt @click="showHkHistory=false" />
      <van-radio-group v-model="componyBank">
        <van-cell-group>
          <template v-for="(item,index) in hKHistory">
            <van-cell :title="item" clickable @click="onConfirmHkHistory(item,index)" :key="index">
              <van-radio slot="right-icon" :name="item" checked-color="#89cb81" />
            </van-cell>
          </template>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!--查看图片-->
    <van-popup v-model="showPic">
      <img :src="imgSrc" alt class="bank-img-big" />
    </van-popup>
    <!--选择时间-->
    <van-popup v-model="showselTime" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :title="'选择时间'"
        @confirm="confirmTime"
      />
    </van-popup>
  </div>
</template>

<script>
import top from "../../../components/Top";
import axios from "axios";
import {
  Popup,
  Dialog,
  Toast,
  Collapse,
  CollapseItem,
  DatetimePicker,
  Uploader,
  Button,
  RadioGroup,
  Radio,
  Cell,
  CellGroup
} from "vant";
export default {
  name: "",
  components: {
    top,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [DatetimePicker.name]: DatetimePicker,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data() {
    return {
      set: 81,
      state: this.$route.params.state,
      bankDetails: this.$route.params.data,
      // imgSrc: 'http://14.29.223.114:10250/upload' + this.$route.params.data.imgUrl,
      imgSrc:
        "http://14.29.223.114:10250/upload" + this.$route.params.data.imgUrl,
      // imgSrcRecord: this.$route.params.data.imgUrl,
      showPic: false,
      showBank: false,
      bank: ["中国工商银行8881", "中国工商银行9761", "中信银行"],
      hKHistory: [],
      hKHistoryRecord: [],
      componyBank: "",
      showHkHistory: false,
      showselTime: false,
      currentDate: new Date()
      // picList:[{ url: 'https://img.yzcdn.cn/vant/cat.jpeg' }]
    };
  },
  methods: {
    initDetails() {
      let url = this.capitalUrl + "/PaymentBill/getPayBillContent.do";
      let data = {
        id: this.$route.params.id //流水号
      };
      axios.post(url, data).then(res => {
        // this.bankDetails = res.data.data
        // this.imgSrc = 'http://14.29.223.114:10250/upload' + this.bankDetails.imgUrl
      });
    },
    //  日期转换为时间戳

    // //  创建凭证
    toEditBank() {
      if (
        !(
          this.bankDetails.yulanBank &&
          this.bankDetails.payerName &&
          this.bankDetails.payerAccount &&
          this.bankDetails.payDate &&
          this.bankDetails.payAmount
        )
      ) {
        Toast({
          message: "请完善信息",
          duration: 2000
        });
        return;
      }
      if (!this.bankDetails.imgUrl) {
        Toast({
          message: "请上传付款凭证",
          duration: 2000
        });
        return;
      }
      let url;
      if (this.bankDetails.id === "提交后自动生成") {
        this.bankDetails.id = "";
        url = this.capitalUrl + "/PaymentBill/insertPaymentBill.do";
      } else {
        url = this.capitalUrl + "/PaymentBill/updatePayBill.do";
      }
      let data = {
        id: this.bankDetails.id, //流水号
        cid: this.bankDetails.cid,
        cname: this.bankDetails.cname,
        yulanBank: this.bankDetails.yulanBank,
        payerName: this.bankDetails.payerName,
        payAmount: this.bankDetails.payAmount,
        imgFileName: this.bankDetails.imgFileName,
        memo: this.bankDetails.memo,
        payDate: new Date(this.bankDetails.payDate).getTime(), //精确到天的时间戳//汇款时间,
        payerAccount: this.bankDetails.payerAccount,
        imgUrl: this.bankDetails.imgUrl
      };
      axios.post(url, data).then(res => {
        if (res.data.code == 0) {
          Toast({
            message: "提交成功",
            duration: 1000
          });
        }
      });
      this.$router.push({
        name: "bank"
      });
    },
    //  删除凭证
    toDelBank() {
      Dialog.confirm({
        // title: '是否确定作废该汇款凭证',
        message: "是否确定作废该汇款凭证"
      })
        .then(() => {
          // on confirm
          let url = this.capitalUrl + "/PaymentBill/updatePayBillState.do";
          let data = {
            id: this.bankDetails.id, //流水号
            state: "SENDBACK" //状态SUBMITED（已提交）,PROCESED（已处理）,SENDBACK（退回）,CANCELED（作废）
          };
          axios.post(url, data).then(res => {
            if (res.data.msg === "SUCCESS") {
              Toast({
                message: "已作废改凭证",
                duration: 2000
              });
              this.$router.push({
                name: "bank"
              });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //  选择汇入银行
    onConfirmBank(value) {
      this.bankDetails.yulanBank = value;
      this.showBank = false;
    },
    // 选择公司汇款人和历史账号
    onConfirmHkHistory(item, index) {
      this.componyBank = item;
      this.bankDetails.payerName = this.hKHistoryRecord[index].PAYER_NAME;
      this.bankDetails.payerAccount = this.hKHistoryRecord[index].PAYER_ACCOUNT;
      this.showHkHistory = false;
    },
    //  获取汇款账号历史
    getHkHistory() {
      let url = this.capitalUrl + "/PaymentBill/getPayNameAndAccount.do";
      let data = {
        companyId: this.$store.getters.getCMId //公司账号id
      };
      axios.post(url, data).then(res => {
        this.hKHistoryRecord = res.data.data;
        res.data.data.forEach(item => {
          this.hKHistory.push(item.PAYER_NAME + "：" + item.PAYER_ACCOUNT);
        });
      });
    },
    confirmTime(value) {
      let current_date = value.getDate();
      let current_month = value.getMonth() + 1;
      let current_year = value.getFullYear();
      this.bankDetails.payDate =
        current_year + "-" + current_month + "-" + current_date;

      this.showselTime = false;
    },
    beforeRead(file) {
      if (file.size > 2 * 1024 * 1024) {
        Toast("上传图片大小不能大于2M");
        return false;
      }
      return true;
    },
    onRead(file) {
      let content = file.file;
      let data = new FormData();
      data.append("file", content);

      let url = this.capitalUrl + "/upload/uploadPaymentBillImg.do";
      axios.post(url, data).then(res => {
        this.bankDetails.imgUrl = res.data.sqlpath;
        this.bankDetails.imgFileName = res.data.fileName;
      });
      //将原图片显示为选择的图片
      this.imgSrc = file.content;
    },
    //输入限制
    oninput(e) {
      var that = this;
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      that.bankDetails.payAmount = e.target.value;
    },
    oninput2(e) {
      e.target.value = e.target.value.match(/^\d*/g)[0] || null;
      this.bankDetails.payerAccount = e.target.value;
    }
  },
  created() {
    // this.initDetails()
    this.getHkHistory();
  }
};
</script>

<style scoped>
.bank-details {
  width: 100%;
  height: 100%;
}
.bank-state {
  position: fixed;
  top: 13px;
  right: 20px;
  color: #e94d28;
  z-index: 999;
  font-weight: bold;
}
.bank-details-msg {
  position: fixed;
  top: 50px;
  bottom: 50px;
  width: 100%;
  background: #ededed;
  overflow-y: scroll;
}
.bank-details-msg .msg {
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  background: white;
}
.bank-details-msg .msg div {
  height: 38px;
  line-height: 38px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.bank-input {
  border: none;
  height: 35px;
  line-height: 35px;
  text-align: right;
}
.more-slet {
  width: 25px;
  height: 25px;
  margin: 5px 0 0 10px;
  /*vertical-align: middle;*/
}
.fkpz {
  /*margin-bottom: 10px;*/
  border-radius: 5px;
  padding-bottom: 10px;
  background: white;
}
.fkpz-title {
  text-align: center;
  padding: 8px;
  color: white;
  margin-bottom: 5px;
  background: #a0cb8dd4;
}
.bank-img {
  width: 100px;
  height: 100px;
  /*padding: 15px;*/
  border: 1px solid #969799;
}
.upload-pic {
  width: 110px;
  height: 110px;
  line-height: 110px;
  border: 1px dashed #404040c2;
  font-size: 50px;
}
.bank-img-big {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.edit-bank {
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  bottom: 0;
  background: white;
  border-top: 1px solid #00000052;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.edit-bank span {
  padding: 8px 13px;
  border-radius: 18px;
  margin: 0 10px;
  height: 20px;
  line-height: 20px;
}
.edit-bank-xg {
  background: #89cb81;
  color: white;
}
.edit-bank-dl {
  background: #fd5538;
  color: white;
}
.showHkHistory {
  width: 300px;
  padding: 15px 10px;
  border-radius: 5px;
  /*position: relative;*/
}
.fill-conpony {
  border: none;
  border-bottom: 1px solid #8c8a8a;
  width: 250px;
  padding: 10px;
  font-size: 15px;
  /*background: url("../../assetsorder/enter.png") 235px no-repeat;*/
  /*background-size: 30px;*/
}
.enter-icon {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 20px;
  right: 25px;
}
</style>
