<template>
  <div class="bank-details">
    <top :top="set"></top>
    <span class="bank-state">{{state}}</span>
    <div class="bank-details-msg">
      <div class="msg">
        <div>
          <span class="left">建立时间</span>
          <span class="right">{{bankDetails.createTs}}</span>
        </div>
        <div>
          <span class="left">提交日期</span>
          <span class="right">{{bankDetails.submitTs}}</span>
        </div>
        <template v-if="bankDetails.state === '退回'">
          <div>
            <span class="left">退回时间</span>
            <span class="right">{{bankDetails.sendbackTs}}</span>
          </div>
          <div>
            <span class="left">退回原因</span>
            <span class="right">{{bankDetails.sendbackReason}}</span>
          </div>
        </template>
        <template v-else>
          <div>
            <span class="left">处理人</span>
            <span class="right">{{bankDetails.erpProcessOp}}</span>
          </div>
          <div>
            <span class="left">处理时间</span>
            <span v-if="bankDetails.erpProcessOp" class="right">{{bankDetails.erpProcessTs}}</span>
          </div>
        </template>
      </div>
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
        <div>
          <span class="left">汇入银行</span>
          <span class="right">{{bankDetails.yulanBank}}</span>
        </div>
        <div>
          <span class="left">付款公司(人)</span>
          <span class="right">{{bankDetails.payerName}}</span>
        </div>
        <div>
          <span class="left">付款银行账号</span>
          <span class="right">{{bankDetails.payerAccount}}</span>
        </div>
        <div>
          <span class="left">付款金额</span>
          <span class="right">{{bankDetails.payAmount}}</span>
        </div>
        <div>
          <span class="left">付款日期</span>
          <span class="right">{{bankDetails.payDate}}</span>
        </div>
        <div>
          <span class="left">备注</span>
          <span class="right">{{bankDetails.memo}}</span>
        </div>
      </div>
      <div class="fkpz">
        <div>付款凭证</div>
        <img :src="imgSrc" alt class="bank-img" @click="showPic = true" />
      </div>
    </div>
    <div class="edit-bank" v-show="state === '退回'">
      <!--<span class="edit-bank-xg" @click="toEditBank">修改凭证</span>-->
      <span class="edit-bank-dl" @click="toDelBank">作废凭证</span>
    </div>
    <!--查看图片-->
    <van-popup v-model="showPic">
      <img :src="imgSrc" alt class="bank-img-big" />
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
  Button
} from "vant";
export default {
  name: "",
  components: {
    top,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      set: 81,
      state: this.$route.params.state,
      bankDetails: this.$route.params.data,
      imgSrc:
        "http://14.29.223.114:10250/upload" + this.$route.params.data.imgUrl,
      showPic: false
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
        // console.log(this.imgSrc)
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
            state: "CANCELED" //状态SUBMITED（已提交）,PROCESED（已处理）,SENDBACK（退回）,CANCELED（作废）
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
    }
  },
  created() {}
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
  top:50px;
  bottom: 0;
  width:100%;
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
  height: 30px;
  line-height: 30px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.fkpz {
  /*margin-bottom: 10px;*/
  border-radius: 5px;
  /*padding: 0 10px 10px;*/
  background: white;
}
.fkpz div {
  text-align: center;
  padding: 8px;
  color: white;
  margin-bottom: 5px;
  background: #a0cb8dd4;
}
.bank-img {
  width: 100px;
  height: 100px;
  padding: 20px;
  border: 1px solid #969799;
}
.bank-img-big {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.edit-bank {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: fixed;
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
</style>
