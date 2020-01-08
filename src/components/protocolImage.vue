<template>
  <div class="protocolImg">
    <top :top="set"></top>
    <canvas width="360px" height="492px" ref="picture" class="proImage"></canvas>
    <div class="proImage" v-if="imgLoading">
      <span>正在生成授权书，请稍后...</span>
    </div>
    <!-- <div class="save2" v-if="showButtom && !imgLoading">
      <button ref="submit" @click="saveImage">保存图片</button>
    </div> -->
  </div>
</template>

<script>
import { GetCardByCustomer, GetYlContractByCustomer } from "@/api/card";
import top from "./Top";

export default {
  data() {
    return {
      set: 10,
      name: "",
      imgLoading: false,
      showButtom: false
    };
  },
  methods: {
    getTime(time1) {
      let year = "" + time1.getFullYear();
      let month = "" + (time1.getMonth() + 1);
      month = month < 10 ? "0" + month : month;
      let day = "" + time1.getDate();
      day = day < 10 ? "0" + day : day;
      return year + "." + month + "." + day;
    },
    saveImage() {
      var picture = this.$refs.picture;
      var image = picture.toDataURL("image/jpeg");//跨域问题
      var image = image.replace("image/jpeg", "image/octet-stream");
      window.location.href = image;
    }
  },
  mounted() {
    let th = this;
    var companyId = this.$store.state.info.data.companyId;
    var time = "",
      area1 = "",
      area2 = "",
      area3 = "",
      businesslicenseNO = "",
      name = this.$store.state.info.data.realName,
      cyear = this.$store.state.year;
    this.$http
      .post("/infoState/getYLcontractentryState.do", {
        cid: companyId,
        cyear: cyear
      })
      .then(function(res) {
        if (res.data.yLcontractInfo == "协议书通过") {
          // th.$http
          //   .post("/customerInfo/getAuthorization.do", {
          //     cid: companyId,
          //     cyear: cyear
          //   })
          GetCardByCustomer({
            cid: companyId,
            year: cyear
          }).then(function(res2) {
            area1 = res2.data[0].districtText;
            area2 = res2.data[0].areaDistrict2Text;
            area3 = res2.data[0].areaDistrict3Text;
            businesslicenseNO = res2.data[0].file2BusinesslicenseNo;
            if (area3 == null) {
              area3 = " ";
            }
            if (area2 == null) {
              area2 = " ";
            }
            // th.$http
            //   .post("/YLcontractentry/getYLcontract.do", {
            //     ccid: companyId
            //   })
            GetYlContractByCustomer({
              cid: companyId,
              year: cyear
            }).then(function(res3) {
              if (res3.data.contract.startDate && res3.data.contract.endDate) {
                time =
                  th.getTime(new Date(res3.data.contract.startDate)) +
                  " - " +
                  th.getTime(new Date(res3.data.contract.endDate));
              } else {
                console.log("获取时间失败");
              }

              th.imgLoading = true;
              th.showButtom = true;
              var picture = th.$refs.picture,
                ctx = picture.getContext("2d"),
                img = new Image();

              img.onload = function() {
                ctx.scale(360 / img.width, 492 / img.height);
                ctx.drawImage(img, 0, 0);
                ctx.font = "bold 64px 宋体";
                ctx.style = "black";
                let namex = ((500 - name.length * 19) / 2 + 150) * 3.25;
                ctx.fillText(name, namex, 1535);
                let buNox =
                  ((350 - businesslicenseNO.length * 19) / 2 + 270) * 3.25;
                ctx.fillText(businesslicenseNO, buNox, 1635);
                ctx.fillText(area1 + area2 + area3, 650, 1985);
                ctx.fillText(time, 775, 2105);
                th.imgLoading = false;
              };
              //img.src = "http://14.29.221.109:10250/upload/assets/proimage.jpg";
              img.src =
                "http://14.29.221.109:10250/upload/images/newcertificate.jpg";
            });
          });
        } else {
          alert("协议书暂未通过，请耐心等候");
        }
      });
  },
  components: {
    top
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.protocolImg {
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
  box-sizing: border-box;
  position: relative;
}
.proImage {
  position: absolute;
  z-index: 100;
  left: 50%;
  margin-left: -180px;
  top: 65px;
  background-size: contain;
  width: 360px;
  height: 492px;
}
.save {
  z-index: 99;
  position: absolute;
  width: 67px;
  height: 86px;
  background: #ffffff;
  opacity: 0.7;
  top: 95px;
  left: 14px;
  border-radius: 7px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.saveImg {
  width: 34px;
  height: 34px;
  background: url("../assets/save.png");
  background-size: 100% 100%;
  margin: 17px 16px 5px 17px;
}
.save p {
  font-size: 10px;
  color: #7d7d7d;
}
.save2 {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.save2 button {
  box-sizing: border-box;
  width: 360px;
  height: 43px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  margin: 13px auto 11px 1px;
}
</style>