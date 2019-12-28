<template>
  <div class="files">
    <div class="files-word">
      <h4>{{ msg[this.file] }}</h4>
      <p>{{ msg2[this.file] }}</p>
    </div>
    <div class="exam" v-show="!isShow">
      <div id="record" @click="showIt"></div>
      <span @click="showIt">评审记录</span>
    </div>
    <reviews-show
      v-on:set="setChange"
      v-show="isShow"
      :show="isShow"
      :message="messages"
      :customerInfo="customerInfo"
    ></reviews-show>
  </div>
</template>

<script>
import Review from "@/components/review";
export default {
  props: ["file", "statusNum"],
  data() {
    return {
      msg: ["基本信息", "业务信息", "物流信息", "银行账号", "上传资质文件"],
      msg2: [],
      isShow: false,
      messages: [],
      customerInfo: " ",
      once: 0
    };
  },
  methods: {
    showIt: function() {
      this.isShow = true;
    },
    setChange: function(data) {
      this.isShow = data;
    },
    getdata1() {
      let url = "/infoState/getCustomerInfoCardState.do";
      let data = {
        cid: this.CID,
        year: this.$store.state.year
      };
      this.$http.post(url, data).then(res => {
        if (res.data.memo != null) {
          var alldata = res.data;
          this.customerInfo = alldata.customerInfo;
          if (
            this.customerInfo == "业务员审核中" ||
            this.customerInfo == "资料卡通过" ||
            this.customerInfo == "订单部审核中"
          ) {
            this.once = 2;
            this.$emit("twice", this.once);
          } else {
            this.once = 1;
            this.$emit("twice", this.once);
          }
          this.messages = alldata.memo.reverse();
        } else {
          this.once = 1;
          this.$emit("twice", this.once);
          console.log("出错了");
        }
      });
    },
    getdata2() {
      let url = "/customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.CID
      };
      this.$http.post(url, data).then(res => {
        if (res.data.code == 0 && res.data.data != null) {
          var alldata = res.data.data;
          var cusName = alldata.cname;
          for (let i = 0; i < 4; i++) {
            this.msg2.push(cusName);
          }
          this.msg2.push(" ");
        } else if (res.data.code === 1 || res.data.data == null) {
          console.log("不存在");
        }
      });
    }
  },
  components: {
    "reviews-show": Review
  },
  computed: {
    CID() {
      if (this.$store.state.info.data.type != "ECWEB") {
        return this.$store.state.CCID;
      } else {
        return this.$store.state.info.data.loginName;
      }
    }
  },
  mounted() {
    this.getdata1();
    this.getdata2();
  },
  activated() {
    this.getdata1();
    this.getdata2();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.files {
  width: 100%;
  height: 70px;
  background: #efefef;
  padding-top: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.files-word {
  width: 188px;
  margin-left: 24px;
  text-align: left;
}
.files-word h4 {
  color: #000000;
  font-size: 20px;
  font-family: PingFang HK;
}
.files-word p {
  color: #7d7d7d;
  font-size: 13px;
  font-family: PingFang HK;
}
.exam {
  display: flex;
  align-items: center;
  color: #89cb81;
  font-size: 15px;
  align-self: flex-end;
  margin-bottom: 15px;
  margin-right: 13px;
}
.exam span {
  text-align: center;
  text-decoration: underline;
  margin-left: 6px;
}
.examShow {
  z-index: 99;
  width: 143px;
  height: 237px;
  background: white;
  position: absolute;
  right: 11px;
  top: 115px;
  border-radius: 7px;
  border: 1px solid #d9d9d9;
}
#record {
  width: 12px;
  height: 12px;
  background: url("../assets/triangle_down_fill.png");
  background-size: 100% 100%;
}
</style>