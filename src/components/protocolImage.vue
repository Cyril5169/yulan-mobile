<template>
  <div class="protocolImg">
    <top :top="set"></top>
    <!-- <div class="proImage">

    </div>
    <div class="save">
      <div class="saveImg"></div>
      <p>保存图片</p>
    </div>-->
    <canvas width="360px" height="492px" ref="picture" class="proImage"></canvas>
  </div>
</template>

<script>
import top from "./Top";
export default {
  data() {
    return {
      set: 10,
      name: ""
    };
  },
  methods: {
    getTime(time1) {
      let year = "" + time1.getFullYear();
      let month = "" + (time1.getMonth() + 1);
      let day = "" + time1.getDate();
      return year + "." + month + "." + day;
    }
  },
  mounted() {
    let th = this;
    var loginname = this.$store.state.info.data.loginName;
    var time = "",
      area1 = "",
      area2 = "",
      area3 = "",
      name = this.$store.state.info.data.realName,
      cyear = this.$store.state.year;

    // console.log(this.$store.state.info.data);
    this.$http
      .post("/infoState/getYLcontractentryState.do", {
        cid: loginname,
        cyear: cyear
      })
      .then(function(res) {
        // console.log(res.data.yLcontractInfo);
        if (res.data.yLcontractInfo == "协议书通过") {
          th.$http
            .post("/customerInfo/getAuthorization.do", {
              cid: loginname,
              cyear: cyear
            })
            .then(function(res) {
              console.log(res.data);
              console.log(loginname);
              area1 = res.data.districtText;
              area2 = res.data.areaDistrict2Text;
              area3 = res.data.areaDistrict3Text;
              if (area3 == null) {
                area3 = " ";
              }
              if (area2 == null) {
                area2 = " ";
              }
              th.$http
                .post("/YLcontractentry/getYLcontract.do", {
                  ccid: loginname
                })
                .then(function(res) {
                  console.log(res);
                  // th.time = res.data.startDate + '-'+ res.data.endDate
                  if (res.data.data.startDate && res.data.data.endDate) {
                    time =
                      th.getTime(new Date(res.data.data.startDate)) +
                      " - " +
                      th.getTime(new Date(res.data.data.endDate));
                    console.log(time);
                  }else{
                    console.log('获取时间失败')
                  }
                  var picture = th.$refs.picture,
                    ctx = picture.getContext("2d"),
                    img = new Image();

                  img.onload = function() {
                    ctx.scale(360 / img.width, 492 / img.height);
                    ctx.drawImage(img, 0, 0);
                    // ctx.font = '64px';
                    ctx.font = "16px Arial";
                    ctx.style = "black";
                    ctx.fillText(name, 85, 385);
                    ctx.fillText(area1 + "  " + area2 + "  " + area3, 160, 445);
                    console.log(time);

                    ctx.fillText(time, 195, 474);
                  };
                  img.src =
                    "http://14.29.221.109:10250/upload/assets/proimage.jpg";
                });
            });
        } else {
          alert("协议书暂未通过，请耐心等候");
        }
      });

    // this.$http.post('/customerInfo/createYLcontract.do',{
    //   "ccyear": 2019,
    //     "ccid": "C0000",
    //     "name": "咕咕咕",
    //     "accountBank": "邮政储蓄银行",
    //     "account": null,
    //     "accountLocation": "吉林省-白城市-洮南市",
    //     "idcardNo": "220881198207061142"
    // }).then(res => {
    //   console.log(res);
    // })
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
  top: 88px;
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
</style>
