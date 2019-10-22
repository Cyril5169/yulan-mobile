<template>
  <div class="bank-details">
    <top :top="set"></top>
    <!--<span class="bank-state">{{state}}</span>-->
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
          <span class="left">编号</span>
          <span class="right">{{bankDetails.id}}</span>
        </div>
        <div>
          <span class="left">建立人</span>
          <span class="right">{{bankDetails.erpCreator}}</span>
        </div>
        <div>
          <span class="left">建立时间</span>
          <span class="right">{{bankDetails.createTs}}</span>
        </div>
      </div>
      <div class="msg">
        <div>
          <span class="left">受托人</span>
          <span class="right">广东玉兰集团股份有限公司</span>
        </div>
        <div>
          <span class="left">名称</span>
          <span class="right">{{bankDetails.cname}}</span>
        </div>
        <div>
          <span class="left">联系人</span>
          <span class="right">{{bankDetails.customerAgent}}</span>
        </div>
        <div>
          <span class="left">电话</span>
          <span class="right">{{bankDetails.officeTel}}</span>
        </div>
      </div>
      <div class="fkpz">
        <div class="fkpz-title">委托人来图定制要求</div>
        <div class="pic-item" v-for="(items,index) in bankDetails.abdrImage" :key="index">
          <img
            :src="'http://14.29.223.114:10250/upload' + items.imagePath"
            alt
            class="bank-img"
            @click="checkPic(items.imagePath)"
          />
          <div class="pic-item-gg">规格：{{items.specifications}}</div>
          <div>定制要求：{{items.memo}}</div>
        </div>
      </div>
      <!--查看图片-->
      <van-popup v-model="showPic">
        <img ref="bigpic" :src="bigPicUrl" alt class="bank-img-big" />
      </van-popup>
      <div class="msg statement">
        <div>委托人来图版权保证声明</div>
        <p>
          本人确认对其提供给受托人用于产品定制的图片拥有著作权或使用权，已保证其来源合法。受托人仅
          按照本人提供的图片进行相应定制提供给本人，无义务对本人提供的图片进行实质审查。 本人因该图片的
          著作权或使用权问题与第三方发生纠纷，受托人将不承担任何的法律责任，由此造成的损失由本人全部承担。
        </p>
        <p style="text-align: left;">受托人签名（盖章）：<span v-if="bankDetails.state != '不同意'">{{bankDetails.customerAgent}}</span></p>
        <p style="text-align: left;">确认时间：<span v-if="bankDetails.state != '不同意'">{{bankDetails.reassureTs}}</span></p>
      </div>
    </div>
    <div class="edit-bank" v-show="bankDetails.state === '客户确认中'">
      <span class="edit-bank-xg" @click="toAgree('同意')">同意</span>
      <span class="edit-bank-dl" @click="toAgree('不同意')">不同意</span>
    </div>
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
      set: 83,
      // state: this.$route.params.state,
      bankDetails: this.$route.params.data,
      // imgSrc: 'http://14.29.223.114:10250/upload' + this.$route.params.data.imgUrl,
      showPic: false,
      bigPicUrl: ""
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
    //查看大图
    checkPic(url) {
      this.bigPicUrl = "http://14.29.223.114:10250/upload" + url;
      this.showPic = true;
    },
    //  删除凭证
    toAgree(state) {
      let url =
        this.capitalUrl +
        "/AirbrushDesignerAssure/updateAirbrushDesignerAssure.do";
      // let url = this.capitalUrl + '/PaymentBill/updatePayBillState.do?' + "id=" +this.bankDetails.id + '&state=' + state
      let data = {
        id: this.bankDetails.id, //流水号
        state: state //不同意/同意/客户确认中
      };
      axios.post(url, data).then(res => {
        if (res.data.msg === "SUCCESS") {
          Toast({
            message: "已" + state + "该委托书",
            duration: 2000
          });
          this.$router.push({
            name: "wtphlists"
          });
        }
      });
    }
  },
  created() {
    console.log(this.bankDetails);
    
    // this.initDetails()
  }
};
</script>

<style scoped>
.bank-details {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #ededed;
  overflow-y: scroll;
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
  margin: 60px 0;
}
.msg {
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  background: white;
}
.statement {
  font-size: 14px;
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
  margin-bottom: 10px;
  border-radius: 5px;
  /*padding: 0 10px 10px;*/
  background: white;
}
.fkpz .fkpz-title {
  text-align: center;
  padding: 8px;
  color: white;
  margin-bottom: 5px;
  background: #a0cb8dd4;
}
.pic-item {
  overflow: auto;
}
.pic-item-gg {
  margin: 15px 0;
}
.pic-item div {
  text-align: left;
  font-size: 14px;
}
.bank-img {
  float: left;
  width: 100px;
  height: 100px;
  margin: 10px 20px;
  /*padding: 20px;*/
  /*border: 1px solid #969799;*/
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
  width: 65px;
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
