<template>
  <div class="littlecard" @click="toAgreement">
    <div class="wrap">
      <div class="code">{{cardMsg.CID}}</div>
      <div class="name">{{cardMsg.CNAME}}</div>
      <div class="protocol-name">
        <span class="area1">{{cardMsg.MARKETNAME}} [{{cardMsg.MARKETMANAGERNAME}}]</span>
        <span class="area2">{{ cardMsg.SUBMARKETNAME }} [{{ cardMsg.SUBMARKETMANAGERNAME}}]</span>
      </div>
      <div class="status" ref="status">{{cardMsg.STATE}}</div>
      <div class="more"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cardMsg"],
  mounted() {
    // console.log(this.cardMsg)
    if (this.cardMsg.status == "已通过") {
      this.$refs.status.classList.add("getGreen");
    } else if (this.cardMsg.status == "客户查看确认中") {
      this.$refs.status.classList.add("getRed");
    }
    let status = this.$refs.status;
    switch (status.innerHTML) {
      case "ONCREATE":
        status.innerHTML = "初始";
        status.style.color = "#7D7D7D";
        break;
      case "CSA_CHECK":
        status.innerHTML = "销售副总批准中";
        status.style.color = "#F15656";
        break;
      case "CUSTOMERAFFIRM":
        status.innerHTML = "客户确认中";
        status.style.color = "#F15656";
        break;
      case "DEP_MARKET_CHECK":
        status.innerHTML = "市场部审核中";
        status.style.color = "#F15656";
        break;
      case "BIILDEPCHECKING":
        status.innerHTML = "订单部审核中";
        status.style.color = "#F15656";
        break;
      case "APPROVED":
        status.innerHTML = "已通过";
        status.style.color = "#89CB81";
        break;
      case "ASM_CHECKING":
        status.innerHTML = "销售中心经理审核中";
        status.style.color = "#F15656";
        break;
      case "SALEMANFILLING":
        status.innerHTML = "业务员填写中";
        status.style.color = "#F15656";
        break;
      case "SALEMANMODIFYING":
        status.innerHTML = "修改中";
        status.style.color = "#F15656";
        break;
    }
  },
  methods: {
    toAgreement() {
      this.$store.commit("getCCID", this.cardMsg.CID);
      this.$store.commit("setReviewed", true);
      this.$router.push({
        path: "/agreement"
      });
    }
  }
};
</script>

<style scoped>
.wrap {
  display: inline-block;
  width: 354px;
  height: 77px;
  text-align: left;
  border-radius: 7px;
  background: #ffffff;
  margin-top: 10px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16);
  position: relative;
  box-sizing: border-box;
  font-size: 0;
}
/* .wrap div{

    } */
.area1 {
  font-size: 8px;
  color: #7d7d7d;
}
.area2 {
  font-size: 8px;
  color: #7d7d7d;
}
.code {
  margin-left: 17px;
  height: 77px;
  position: absolute;
  margin-right: 6px;
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  /* height: 100%; */
  /* line-height: 77px; */
}
.protocol-name {
  /* width: 107px; */
  position: absolute;
  /* right:35px; */
  height: 77px;
  max-width: 100px;
  /* margin-left: 10px; */
  text-align: center;
  /* margin-right: 20px; */
  /* margin-top: -20px; */
  right: 85px;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  /* flex-wrap: wrap; */
}
.protocol-name span {
  height: 15px;
  font-size: 10px;
  /* line-height: 15px;
        height: 15px; */
}
.name {
  display: inline-flex;
  align-items: center;
  position: absolute;
  left: 70px;
  height: 77px;
  min-width: 90px;
  max-width: 98px;
  margin-left: 8px;
  font-size: 13px;
  /* vertical-align: middle; */
  text-align: center;
  /* line-height: 77px; */
}
.status {
  display: inline-block;
  position: absolute;
  right: 15px;
  top: 28px;
  width: 55px;
  font-size: 12px;
  /* vertical-align: middle; */
  text-align: center;
}
.wrap .more {
  position: absolute;
  background-image: url(http://14.29.221.109:10250/upload/assets/right1.png);
  width: 12px;
  height: 12px;
  top: 33px;
  right: 2px;
  background-size: cover;
}
.getGreen {
  color: #89cb81;
}
.getRed {
  color: #f15656;
}
</style>