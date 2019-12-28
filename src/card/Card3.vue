<template>
  <div class="card3">
    <div class="content">
      <div class="content-all">
        <div class="topBox">
          <p>
            联系人：
            <input type="text" v-model="person" readonly="true" name="person" />
          </p>
        </div>
        <div class="box" id="phone">
          <p>
            电话：
            <input type="text" v-model="tel" readonly="true" name="personphone" />
          </p>
        </div>
        <div class="box" id="phone1">
          <p>
            物流手机：
            <input type="text" v-model="phone" readonly="true" name="logisticsphone" />
          </p>
        </div>
        <div class="box" id="fax">
          <p>
            传真：
            <input type="text" v-model="faxwl" @keyup="input1" name="fax" />
          </p>
        </div>
        <div class="box" id="readdress">
          <p>
            收货地址：
            <input type="text" v-model="address" readonly="true" name="address" />
          </p>
        </div>
        <div class="box" id="fax">
          <p>
            邮编：
            <input type="text" v-model="zipwl" @keyup="input2" name="mail" />
          </p>
        </div>
      </div>
      <div class="tips">
        <span>
          *灰色底框内容只供客户核对，不允许修改。
          <br />如要修改请联系主管业务经理
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: " ",
      tel: " ",
      phone: " ",
      faxwl: " ",
      address: " ",
      zipwl: " "
    };
  },
  computed: {
    CID() {
      if (this.$store.state.info.data.type != "ECWEB") {
        return this.$store.state.CCID;
      } else {
        return this.$store.state.info.data.loginName;
      }
    },
    companyId() {
      return this.$store.getters.getCMId;
    }
  },
  methods: {
    getdata() {
      let url = "/customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.companyId
      };
      this.$http.post(url, data).then(res => {
        if (res.data.code == 0 && res.data.data != null) {
          var alldata = res.data.data;
          this.person = alldata.wlAgentName;
          this.tel = alldata.xOfficeTel1.split(" ")[0];
          this.phone = alldata.xHandset;
          this.faxwl = alldata.faxWl;
          this.address = alldata.xDeliveryAdress;
          this.zipwl = alldata.zipCodeWl;
        } else if (res.data.code === 1 || res.data.data == null) {
          console.log("出错了!");
        }
      });
    },
    input1() {
      this.$emit("put8", this.faxwl);
    },
    input2() {
      this.$emit("put9", this.zipwl);
    }
  },
  mounted() {
    this.getdata();
  }
  //  activated(){
  //    this.getdata()
  //  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.content {
  box-sizing: border-box;
  height: 455px;
  width: 100%;
  background: white;
  overflow: hidden;
}
.content-all {
  width: 318px;
  height: 318px;
  margin: 60px 19.1px 5px 37.9px;
}
.content-all p {
  font-size: 15px;
  color: #000000;
  font-weight: bold;
}
.topBox {
  width: 100%;
  height: 20px;
  text-align: left;
}
.topBox input {
  height: 23px;
  width: 200px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
  font-weight: normal;
}
.topBox p {
  margin-left: 15px;
}
.box {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 18px;
}
.box input {
  height: 19px;
  width: 198px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
  font-weight: normal;
}
#phone p {
  margin-left: 30px;
}
#fax p {
  margin-left: 30px;
}
#fax input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 25px;
}
#qq p {
  margin-left: 43px;
}
#qq input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#e-mail p {
  margin-left: 18px;
}
#e-mail input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#phone input {
  height: 23px;
  width: 200px;
}
#phone1 input {
  height: 23px;
  width: 200px;
}
#readdress input {
  height: 23px;
  width: 200px;
}
.tips {
  text-align: center;
  margin-left: 58px;
  width: 265px;
  height: 32px;
  font-size: 10px;
  line-height: 15px;
  color: #b5b5b5;
}
</style>