<template>
  <div class="littlecard" ref="littlecard" @click="getCID">
    <div class="wrap" @click="slide">
      <div class="code">{{ card.CID }}</div>
      <div class="name">{{ card.CNAME }}</div>
      <div id="pass" ref="pass">待修改</div>
      <div class="more"></div>
    </div>
    <div class="slidemsg" ref="slide">
      <div class="msgbox">
        <table>
          <tr>
            <td class="t1 td-border td-top">资质文件</td>
            <td class="t2 td-border td-content-top">
              <div class="type" ref="file_1">身份证</div>
              <div class="type" ref="file_2">营业执照</div>
              <div class="type" ref="file_3">组织机构</div>
              <div class="type" ref="file_4">纳税资格</div>
            </td>
          </tr>
          <tr>
            <td class="t1 td-border">
              联系人<br />
              /电话
            </td>
            <td class="t2 td-border td-content">
              <span>{{ card.TX_AGENT_NAME }}</span>
              <span>/[{{ card.X_HANDSET_2 }}]</span>
            </td>
          </tr>
          <tr>
            <td class="t1 td-bottom">区域/经理</td>
            <td class="t2 td-bottom td-content">
              <span>{{ card.SUBMARKETNAME }}</span>
              <span>/{{ card.MARKETMANAGERNAME }}</span>
            </td>
          </tr>
        </table>
        <keep-alive
          ><router-link to="/cardquery"
            ><div class="button button-more" @click="sendCID">
              查看详情
            </div></router-link
          ></keep-alive
        >
        <div class="button-revise" @click="revise">修改协议书</div>
        <div class="msgbottom"></div>
      </div>
    </div>
    <div class="foldwrap" v-show="show"></div>
    <div class="foldbox" v-show="show">
      <div class="box-top">
        <div class="warnimg"></div>
        <div class="warnmsg">
          <p>是否确定客户资料卡信息</p>
          <p>完整且无误？</p>
          <p>点击确定将创建对应客户</p>
          <p>协议书。</p>
        </div>
      </div>
      <div class="box-bottom">
        <div class="sure">确定</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import cardquery from "./CardQuery";

export default {
  props: ["card", "index", "cardshow"],
  data() {
    return {
      slideflag: false,
      show: false,
      revised: false,
    };
  },
  watch: {
    cardshow(val) {
      if (this.card.FILE_1_IDCARD == 1) {
        this.$refs.file_1.classList.add("type-choose");
      }
      if (this.card.FILE_2_BUSINESSLICENSE == 1) {
        this.$refs.file_2.classList.add("type-choose");
      }
      if (this.FILE_3_ORGCODE == 1) {
        this.$refs.file_3.classList.add("type-choose");
      }
      if (this.card.FILE_4_GTQC == 1) {
        this.$refs.file_4.classList.add("type-choose");
      }
    },
  },
  mounted() {
    if (this.card.FILE_1_IDCARD == 1) {
      console.log(1);
      this.$refs.file_1.classList.add("type-choose");
    }
    if (this.card.FILE_2_BUSINESSLICENSE == 1) {
      this.$refs.file_2.classList.add("type-choose");
    }
    if (this.FILE_3_ORGCODE == 1) {
      this.$refs.file_3.classList.add("type-choose");
    }
    if (this.card.FILE_4_GTQC == 1) {
      this.$refs.file_4.classList.add("type-choose");
    }
  },
  methods: {
    sendCID() {
      console.log(1);
      this.$store.commit("getCCID", this.card.customerId);
    },
    getCID() {
      console.log("this.CID get success " + this.card.customerId);
      this.$emit("sendCID", this.card.customerId);
    },
    slide() {
      var slide = this.$refs.slide;
      // var littlecard = this.$refs.littlecard;
      slide.style.height = this.slideflag ? "0px" : "79vw";
      slide.style.marginBottom = this.slideflag ? "0px" : "-30px";
      // littlecard.style.height = this.slideflag?'67px':'340px';
      this.slideflag = !this.slideflag;
    },
    sure() {},
    cancel() {
      this.show = false;
    },
    revise() {
      this.show = true;
      this.$router.push({
        path: "/crAgreement",
        query: {
          revised: this.card.YLCSTATE,
          ylcstate: this.card.YLCSTATE,
        },
      });
    },
  },
  components: {
    cardquery,
  },
};
</script>

<style scoped>
.wrap {
  display: inline-block;
  width: 330px;
  height: 60px;
  border-radius: 7px;
  background: #ffffff;
  margin-top: 7px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16);
  position: relative;
  z-index: 5;
}
.wrap div {
  display: inline-block;
  font-size: 13px;
  height: 100%;
  line-height: 60px;
}
.code {
  position: absolute;
  left: 35px;
  vertical-align: top;
}
.name {
  position: absolute;
  right: 80px;
  width: 150px;
  overflow: hidden;
}
#pass {
  width: 40px;
  text-align: center;
  position: absolute;
  right: 33px;
  vertical-align: top;
  color: #f15656;
}
.grey {
  color: #7d7d7d;
}
.red {
  color: #f15656;
}
.green {
  color: #89cb81;
}
.wrap .more {
  position: absolute;
  background-image: url(../assets/right1.png);
  width: 12px;
  height: 12px;
  top: 23px;
  right: 12px;
  background-size: cover;
}
.slidemsg {
  overflow: hidden;
  height: 0;
  position: relative;
  top: -30px;
  margin-bottom: 0;
  transition: height 0.5s, margin-bottom 0.5s;
}
.msgbox {
  height: 266px;
  width: 100%;
  display: inline-block;
  width: 353px;
  background: -webkit-linear-gradient(to left, #ededed, #ffffff, #ffffff);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 7px;
  position: relative;
  font-size: 13px;
  font-family: "PingFang-Regular", sans-serif;
}
table {
  border-collapse: collapse;
}
.t1 {
  height: 74px;
  width: 105.5px;
  border-right: 1px solid #d6d6d6;
  border-collapse: collapse;
}
.t2 {
  width: 247.5px;
  height: 75px;
  /* padding: 10px;
        box-sizing: content-box; */
}
.t2 span {
  color: #7d7d7d;
  font-size: 13px;
}
.td-content-top {
  padding: 10px;
  box-sizing: border-box;
  padding-top: 40px;
}
.td-content {
  padding-left: 30px;
  padding-right: 20px;
  box-sizing: border-box;
}
.type {
  width: 75px;
  height: 21px;
  line-height: 21px;
  border-radius: 11px;
  display: inline-block;
  border: 1px solid #7d7d7d;
  margin-top: 5px;
  margin-right: 10px;
  color: #7d7d7d;
}
.t2 .type-choose {
  background: #89cb81;
  border: 1px solid #89cb81;
  color: #fff;
}
.td-top {
  padding-top: 30px;
  height: 104px;
  box-sizing: border-box;
}
.td-border {
  border-bottom: 1px solid #d6d6d6;
}
table .td-bottom {
  height: 65px;
}
.button {
  width: 151.6px;
  height: 46px;
  font-size: 15px;
  position: absolute;
  background: black;
  border-radius: 23px;
  line-height: 46px;
  color: #fff;
}
.button-more {
  left: 21px;
  bottom: -23px;
  background-color: #3b3b3b;
}
.button-revise {
  width: 151.6px;
  height: 46px;
  font-size: 15px;
  position: absolute;
  border-radius: 23px;
  line-height: 46px;
  color: #fff;
  left: 180px;
  bottom: -23px;
  background: #f15656;
}
.button-build {
  left: 180px;
  bottom: -23px;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
}
.msgbottom {
  width: 100%;
  height: 10px;
}
.foldwrap {
  width: 100%;
  height: 1000px;
  position: fixed;
  top: 0;
  background: rgba(54, 54, 54, 0.4);
  z-index: 30;
}
.foldbox {
  width: 286px;
  height: 268px;
  background: #ffffff;
  position: fixed;
  top: 199px;
  z-index: 40;
  border-radius: 10px;
  left: 45px;
}
.box-top {
  height: 220px;
  width: 100%;
}
.warnimg {
  background-image: url("../assets/warn.png");
  width: 65px;
  height: 65px;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  top: 28px;
  display: inline-block;
}
.warnmsg {
  position: relative;
  top: 35px;
  padding-left: 40px;
  padding-right: 40px;
}
.warnmsg p {
  margin: 0;
  line-height: 22px;
  font-family: "PingFang-Regular", sans-serif;
  font-size: 15px;
  color: #7d7d7d;
}
.box-bottom {
  height: 48px;
  width: 100%;
  font-size: 0;
}
.sure,
.cancel {
  width: 50%;
  height: 100%;
  line-height: 48px;
  display: inline-block;
  font-size: 18px;
  background: #f2f2f2;
  color: #7d7d7d;
}
.sure {
  border-radius: 0 0 0 10px;
  background: #363636;
  color: rgba(255, 255, 255, 1);
}
.cancel {
  border-radius: 0 0 10px 0;
}
</style>
