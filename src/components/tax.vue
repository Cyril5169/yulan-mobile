<template>
  <div class="tax">
    <top :top="set"></top>
    <div class="nothing"></div>
    <div class="content">
      <div class="content-all">
        <p id="topp">增值税发票开票信息</p>
        <div class="topBox">
          <p>
            地址
            <input type="text" v-model="address" name="address" />
          </p>
        </div>
        <div class="box">
          <p>
            电话
            <input type="text" v-model="phone" name="phone" />
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
      </div>
    </div>
    <div class="save" @click="sentData">
      <button ref="save">保存当前页面信息</button>
    </div>
  </div>
</template>

<script>
import top from "./Top";
export default {
  data() {
    return {
      set: 4,
      address: " ",
      phone: " ",
      bank: " ",
      banknumber: " ",
      doSub: 2,
      kkp: 0
    };
  },
  components: {
    top
  },
  computed: {
    CID() {
      return this.$store.state.info.data.loginName;
    },
    companyId() {
      return this.$store.getters.getCMId;
    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    isNull() {
      var s = document.getElementsByTagName("input");
      for (let i = 0; i < s.length; i++) {
        if (s[i].value == "") {
          this.doSub = 0;
          break;
        } else {
          this.doSub = 1;
        }
      }
    },
    getdata() {
      let url = "customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.companyId
      };
      this.$http.post(url, data).then(res => {
        if (res.data.code == 0 && res.data.data != null) {
          var alldata = res.data.data;
          this.contractyear = alldata.contractyear;
          this.address = alldata.invAddress;
          this.phone = alldata.invTelephone;
          this.bank = alldata.invBankname;
          this.banknumber = alldata.invBanmaccount;
          if (
            alldata.vatInvoiceFlag == "Y" ||
            (this.address != null &&
              this.phone != null &&
              this.bank != null &&
              this.banknumber != null)
          ) {
            this.$refs.save.style.background = "#c2c2c2";
            this.$refs.save.disabled = true;
            const s = document.getElementsByTagName("input");
            for (let i = 0; i < s.length; i++) {
              s[i].disabled = true;
            }
          }
          let url = "/infoState/getCustomerInfoCardState.do";
          let data = {
            cid: this.companyId,
            year: alldata.contractyear
          };
          this.$http.post(url, data).then(res2 => {
            if (res2.data.memo != null) {
              var alldata2 = res.data;
              this.customerInfo = alldata2.customerInfo;
            }
          });
        } else if (res.data.code === 1 || res.data.data == null) {
          console.log("哦豁，完蛋!");
        }
      });
    },
    sentData() {
      this.isNull();
      if (this.doSub == 1) {
        this.$http
          .post("/customerInfo/updateCustomerInfo.do", {
            cid: this.companyId,
            contractyear: this.contractyear,
            invAddress: this.address,
            invTelephone: this.phone,
            invBankname: this.bank,
            invBanmaccount: this.banknumber,
            vatInvoiceFlag: "Y"
          })
          .then(res => {
            this.$router.push({
              path: "/success4"
            });
          });
      }
      if (this.doSub == 0) {
        alert("信息填写不完整");
      }
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
  margin: 26px 22px 23px 22px;
  height: 478px;
  width: 331px;
  background: white;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.content-all {
  width: 318px;
  height: 308px;
  margin: 37px 19.1px 81.6px 37.9px;
}
#topp {
  font-size: 18px;
  color: #000000;
  margin-bottom: 30px;
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
  margin-top: 18px;
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
  margin-left: 55px;
  padding: 0 8px;
}
.bank {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 18px;
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
</style>