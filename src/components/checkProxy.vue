<template>
  <div class="tax">
    <div class="bigPic" v-show="bigPic1">
      <img :src="headerImage1" alt />
    </div>
    <div class="bigPic" v-show="bigPic2">
      <img :src="headerImage2" alt />
    </div>
    <div class="bigPic" v-show="bigPic3">
      <img :src="headerImage3" alt />
    </div>
    <div class="shadow" v-show="bigPic1"></div>
    <div class="shadow" v-show="bigPic2"></div>
    <div class="shadow" v-show="bigPic3"></div>
    <div class="bottom" v-show="bigPic1">
      <div class="save1" @click="outPic1">
        <button>确定</button>
      </div>
    </div>
    <div class="bottom" v-show="bigPic2">
      <div class="save1" @click="outPic2">
        <button>确定</button>
      </div>
    </div>
    <div class="bottom" v-show="bigPic3">
      <div class="save1" @click="outPic3">
        <button>确定</button>
      </div>
    </div>
    <top :top="set"></top>
    <div class="nothing"></div>
    <div class="content">
      <div class="content-all">
        <p id="topp">受托人银行信息</p>
        <div class="topBox">
          <p>
            姓名
            <input type="text" v-model="person" name="person" />
          </p>
        </div>
        <div class="box">
          <p>
            身份证号
            <input type="text" v-model="CIDnumber" name="CIDnumber" />
          </p>
        </div>
        <div class="bank">
          <p>
            开户银行
            <input type="text" v-model="bank" name="bank" />
          </p>
        </div>
        <div class="bank">
          <p>
            银行账户
            <input type="text" v-model="banknumber" name="banknumber" />
          </p>
        </div>
        <div class="box" id="bankaddress">
          <p>
            银行所在地
            <input name v-model="selected" id="form_select" value ref="bank" />
          </p>
        </div>
      </div>
      <div class="send">
        <div class="linefirst">
          <div class="IDfirst" id="CIDtop">
            <p>身份证头像面</p>
            <div class="show">
              <div class="picture" @click="showBig1">
                <img :src="headerImage1" alt />
                <input
                  type="file"
                  id="upload1"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                />
                <label for="upload1" v-show="isShow1"></label>
              </div>
              <div class="pic" v-show="isShow1">
                <div class="add"></div>
                <p>尚未上传</p>
              </div>
            </div>
          </div>
          <div class="IDfirst" id="CIDback">
            <p>身份证国徽面</p>
            <div class="show">
              <div class="picture" @click="showBig2">
                <img :src="headerImage2" alt />
                <input
                  type="file"
                  id="upload2"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                />
                <label for="upload2" v-show="isShow2"></label>
              </div>
              <div class="pic" v-show="isShow2">
                <div class="add"></div>
                <p>尚未上传</p>
              </div>
            </div>
          </div>
        </div>
        <div class="linesecond">
          <div class="IDfirst">
            <p id="secondp">营业执照</p>
            <div class="show">
              <div class="picture" @click="showBig3">
                <img :src="headerImage3" alt />
                <input
                  type="file"
                  id="upload3"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                />
                <label for="upload3" v-show="isShow3"></label>
              </div>
              <div class="pic" v-show="isShow3">
                <div class="add"></div>
                <p>尚未上传</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <iosselect v-on:listen3="listenmore" v-on:listen4="listenselect" v-show="more"></iosselect>
  </div>
</template>

<script>
var remoteImageURL = "http://14.29.221.4:10250/upload";
import Exif from "exif-js";
import top from "./Top";
import iosselect from "@/components/Iosselect4";
export default {
  data() {
    return {
      more: false,
      bigPic1: false,
      bigPic2: false,
      bigPic3: false,
      set: 5,
      headerImage1: "",
      headerImage2: "",
      headerImage3: "",
      FileImage1: " ",
      FileImage2: " ",
      FileImage3: " ",
      picValue1: "",
      picValue2: "",
      picValue3: "",
      isShow1: true,
      isShow2: true,
      isShow3: true,
      image1: "",
      image2: "",
      image3: "",
      person: " ",
      CIDnumber: " ",
      bank: " ",
      banknumber: "",
      selected: ""
    };
  },
  components: {
    top,
    iosselect
  },
  // created(){

  // },
  computed: {
    CID() {
      if (this.$store.state.info.data.type != "ECWEB") {
        return this.$store.state.CCID;
      } else {
        return this.$store.state.info.data.loginName;
      }
    }
  },
  methods: {
    // iosselect(){
    //   // console.log(1)
    //   this.more = true;
    // },
    listenmore(data) {
      this.more = data;
    },
    listenselect(data) {
      this.selected = data;
      this.$refs.bank.value = this.selected;
      console.log(this.selected);
    },
    showBig1() {
      if (this.headerImage1 == null || this.headerImage1 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic1 = true;
      }
    },
    showBig2() {
      if (this.headerImage2 == null || this.headerImage2 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic2 = true;
      }
    },
    showBig3() {
      if (this.headerImage3 == null || this.headerImage3 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic3 = true;
      }
    },
    outPic1() {
      this.bigPic1 = false;
    },
    outPic2() {
      this.bigPic2 = false;
    },
    outPic3() {
      this.bigPic3 = false;
    },
    getData() {
      let url = "/customerInfo/getYLcontract.do";
      let data = {
        ccid: this.CID,
        ccyear: this.$store.state.year
      };
      this.$http.post(url, data).then(res => {
        console.log(res);
        if (res.data.code == 0 && res.data.data != null) {
          this.doSend = "Y";
          this.person = res.data.data.name;
          this.CIDnumber = res.data.data.idcardNo;
          this.bank = res.data.data.accountBank;
          this.banknumber = res.data.data.accout;
          this.selected = res.data.data.accountLocation;
          this.FileImage1 = remoteImageURL + res.data.data.idcardIamge1;
          this.FileImage2 = remoteImageURL + res.data.data.idcardIamge2;
          this.FileImage3 = remoteImageURL + res.data.data.authfileIamge;
          if (res.data.data.idcardIamge1 != null) {
            this.isShow1 = false;
            this.headerImage1 = this.FileImage1;
          } else {
            this.isShow1 = true;
          }
          if (res.data.data.idcardIamge2 != null) {
            this.isShow2 = false;
            this.headerImage2 = this.FileImage2;
          } else {
            this.isShow2 = true;
          }
          if (res.data.data.authfileIamge != null) {
            this.isShow3 = false;
            this.headerImage3 = this.FileImage3;
          } else {
            this.isShow3 = true;
          }
        } else if (res.data.code == 1 || res.data.data == null) {
          console.log("不存在");
          this.doSend = "N";
        }
      });
    }
  },
  mounted() {
    this.getData();
    var s = document.getElementsByTagName("input");
    for (let i = 0; i < s.length; i++) {
      s[i].disabled = true;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.tax {
  background: #efefef;
  height: 100vh;
}
.nothing {
  height: 50px;
  width: 100%;
}
.content {
  margin: 56px 22px 23px 22px;
  height: 478px;
  width: 331px;
  background: white;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.content-all {
  width: 318px;
  height: 208px;
}
#topp {
  font-size: 18px;
  color: #000000;
  margin-bottom: 20px;
  margin: 21px 160px 15px 25px;
}
.content-all p {
  font-size: 15px;
  color: #000000;
  text-align: left;
}
.topBox {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-left: 40px;
}
.topBox input {
  height: 19px;
  width: 158px;
  background: #ffffff;
  font-size: 13px;
  color: #7d7d7d;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  margin-left: 55px;
  padding: 0 8px;
}
.box {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 15px;
  margin-left: 40px;
}
.box input {
  height: 19px;
  width: 158px;
  background: #ffffff;
  font-size: 13px;
  color: #7d7d7d;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  margin-left: 25px;
  padding: 0 8px;
}
.bank {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 15px;
  margin-left: 40px;
}
.bank input {
  height: 19px;
  width: 158px;
  background: #ffffff;
  font-size: 13px;
  color: #7d7d7d;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  margin-left: 25px;
  padding: 0 8px;
}
#form_select {
  /* 清除默认边框 */
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  padding-left: 11px;
  padding-right: 11px;
  width: 155px;
  height: 19px;
  font-size: 13px;
  margin-left: 2px;
  color: #7d7d7d;
  /* 清除默认的箭头样式 */
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /* 右侧添加小箭头的背景图 */
  background-image: url(../assets/select_arrow.png);
  background: 160px center no-repeat;
  background-size: 6px 6px;
}
.save button {
  box-sizing: border-box;
  width: 349px;
  height: 52px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
}
.send {
  margin-left: 20px;
}
.account {
  font-size: 15px;
  color: #000000;
}
.linefirst {
  display: flex;
  justify-content: space-between;
}
.IDfirst > p {
  text-align: left;
  color: #000000;
  font-size: 13px;
  margin-left: 41px;
  margin-top: 18px;
  margin-bottom: 7px;
}
.show {
  width: 140px;
  height: 70px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  background: #b1b1b1;
}
.show input {
  display: none;
}
input[type="file"] + label {
  display: block;
  width: 100%;
  height: 100%;
}
.show p {
  font-size: 10px;
  color: #ffffff;
  margin-bottom: 14px;
  text-align: center;
}
.picture {
  /* width: 100%;
  height: 100%; */
  overflow: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.picture img {
  width: 140px;
  height: 70px;
}
.bigPic {
  width: 90%;
  height: 70%;
  right: 0;
  left: 20px;
  bottom: 105px;
  position: absolute;
  background-size: 100% 100%;
  z-index: 100;
}
.bigPic img {
  width: 80%;
  height: 80%;
}
.shadow {
  position: absolute;
  z-index: 50;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  left: 0;
  right: 0;
  background-color: #3b3b3b;
  top: 0px;
}
.bottom {
  width: 100%;
  position: absolute;
  z-index: 100;
  top: 575px;
  left: 0;
  right: 0;
}
.save1 button {
  box-sizing: border-box;
  width: 163px;
  height: 33px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: #4b4b4b;
  margin: 7px auto 11px 15px;
}
.save2 button {
  box-sizing: border-box;
  width: 163px;
  height: 33px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  float: left;
  margin: 13px auto 11px 20px;
}
.save2 input {
  display: none;
}
.save2 label {
  margin-top: 6px;
}
#CID {
  font-size: 10px;
  margin-top: 3px;
  margin-left: 50px;
  margin-bottom: 2px;
}
.CIDnumber {
  display: block;
  width: 134px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
}
.IDnumber {
  display: block;
  width: 136px;
  border-radius: 5px;
  border: none;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
}
.linesecond {
  display: flex;
  justify-content: space-between;
  /* margin-top: 3px; */
}
#first {
  margin-left: 53px;
}
#CIDtop {
  margin-right: 20px;
}
#CIDback {
  margin-right: 25px;
}
#secondp {
  margin-left: 45px;
}
.pic {
  position: absolute;
  top: 15px;
  left: 40px;
  right: 40px;
  pointer-events: none;
}
.add {
  background: url("../assets/add.png");
  background-size: 100% 100%;
  width: 28px;
  height: 28px;
  margin: 0 auto;
}
</style>