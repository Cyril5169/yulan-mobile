<template>
  <div class="bank-details">
    <top :top="set"></top>
    <span class="bank-state">{{state}}</span>
    <div class="bank-details-msg">
      <div class="msg">
        <p style="text-align: left;">To：{{bankDetails.CNAME}}</p>
        <p style="text-align: left;">我公司现收到以下拟申请退货产品，经调查、检验核实，做如下处理</p>
      </div>
      <div class="msg-tb">
        <!--<div class="fkpz-title">相关产品信息</div>-->
        <div class="product-item" v-for="(items,index) in bankDetails.rtcbItems" :key="index">
          <div>
            <span class="left">产品/项目</span>
            <span class="right">{{items.PRODUCTION_VERSION}}</span>
          </div>
          <div>
            <span class="left">型号</span>
            <span class="right">{{items.ITEM_NO}}</span>
          </div>
          <div>
            <span class="left">数量</span>
            <span class="right">{{items.QTY}}{{items.UNIT}}</span>
          </div>
          <div>
            <span class="left">金额</span>
            <span class="right">{{items.TOTALMONEY}}</span>
          </div>
          <div>
            <span class="left">质量问题</span>
            <span class="right">{{items.NOTES}}</span>
          </div>
          <div>
            <span class="left">处理意见</span>
            <span class="right">{{items.PROCESS}}</span>
          </div>
        </div>
        <!--<div class="product-item" v-for="items in bankDetails.rtcbItems">-->
        <!--<div><span class="left">产品/项目</span><span class="right">{{items.productionVersion}}</span></div>-->
        <!--<div><span class="left">型号</span><span class="right">{{items.itemNo}}</span></div>-->
        <!--<div><span class="left">数量</span><span class="right">{{items.qty}}{{items.unit}}</span></div>-->
        <!--<div><span class="left">金额</span><span class="right">{{items.totalmoney}}</span></div>-->
        <!--<div><span class="left">质量问题</span><span class="right">{{items.notes}}</span></div>-->
        <!--<div><span class="left">处理意见</span><span class="right">{{items.process}}</span></div>-->
        <!--</div>-->
      </div>
      <div class="msg">
        <div>
          <span class="left">总金额（小写）</span>
          <span class="right">{{totleAcount}}元</span>
        </div>
        <div>
          <span class="left">总金额（大写）</span>
          <span class="right">{{digitUppercase(totleAcount)}}</span>
        </div>
      </div>
      <div class="msg statement">
        <span>注意</span>
        <p style="text-align: left;">1、若您未在我公司发出的《客户确认书》之日起15日内确认、提出异议的，则视为放弃赔偿权利</p>
        <p style="text-align: left;">2、玉兰公司支付的退货金额，仅限于本确认书的金额，不承担其他费用；</p>
        <p style="text-align: left;">3、请您仔细阅读本确认书相关信息，一旦确认，视为同意我公司的处理方案</p>
        <p style="text-align: left;">公司名称：广东玉兰集团股份有限公司</p>
        <p style="text-align: left;">地址：东莞市莞城莞龙路段狮龙路莞城科技园内</p>
        <p style="text-align: left;">电话：0769-23321708</p>
        <p style="text-align: left;">邮箱：yulan315@yulangroup.cn</p>
        <p style="text-align: left;">广东玉兰集团股份有限公司市场部 {{bankDetails.CREATE_TS | datatrans}}</p>
        <p style="text-align: left;">经销商：{{bankDetails.CNAME}} {{bankDetails.REASSURE_TS | datatrans}}</p>
      </div>
    </div>
    <div class="edit-bank" v-show="bankDetails.STATE === 'CUSTOMERAFFIRM'">
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
import {GetCompensationById} from "@/api/paymentASP";

export default {
  name: "",
  components: {
    top,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      set: 85,
      state: this.$route.params.state,
      id: this.$route.params.id,
      bankDetails: {},
      totleAcount: "",
      showPic: false,
      bigPicUrl: ""
    };
  },
  filters:{
     datatrans(value) {
      //时间戳转化大法
      if (value == null || value == "9999/12/31 00:00:00") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "年" + MM + "月" + d + "日"; /* + h + ':' + m + ':' + s; */
    },
  },
  methods: {
    initDetails() {
      // let url =
      //   this.capitalUrl +
      //   "/returnCompensationBill/getReturnCompensationBillByID.do\t";
      // axios
      //   .get(url, {
      //     params: {
      //       id: this.$route.params.id //流水号
      //     }
      //   })
        GetCompensationById({id: this.$route.params.id}).then(res => {
          this.bankDetails = res.data[0];
          this.bankDetails.rtcbItems.forEach(item => {
            this.totleAcount += item.TOTALMONEY;
          });
        });
    },
    toAgree(val) {
      var flag = val == "同意" ? "APPROVED" : "CANCELED";
      let url =
        this.capitalUrl +
        "/returnCompensationBill/updateReturnCompensationBillState.do";
      axios
        .get(url, {
          params: {
            id: this.$route.params.id,
            state: flag
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            Toast.success("反馈成功");
            this.$router.push({
              path: "/tuihuolists"
            });
          } else {
            Toast.success("反馈失败");
          }
        });
    },
    //  人名币小写金额转换为大写
    digitUppercase(n) {
      let fraction = ["角", "分"];
      let digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
      let unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
      let head = n < 0 ? "欠" : "";
      n = Math.abs(n);
      let s = "";
      for (let i = 0; i < fraction.length; i++) {
        s += (
          digit[
            Math.floor(
              (Math.floor(n * 1000 * 10 * Math.pow(10, i)) % (10 * 1000)) / 1000
            )
          ] + fraction[i]
        ).replace(/零./, "");
      }
      s = s || "整";
      n = Math.floor(n);
      for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = "";
        for (let j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
      }
      return (
        head +
        s
          .replace(/(零.)*零元/, "元")
          .replace(/(零.)+/g, "零")
          .replace(/^整$/, "零元整")
      );
    }
  },
  created() {
    this.initDetails();
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
.product-item {
  border-bottom: 1px solid #a0cb8d;
  overflow: auto;
}
.msg {
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  background: white;
}
.msg p {
  height: 20px;
}
.msg-tb {
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 10px;
  background: white;
}
.product-item div {
  height: 30px;
  line-height: 30px;
}
.statement {
  font-size: 14px;
  padding: 20px;
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
