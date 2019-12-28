<template>
  <div class="card2">
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
            <input type="text" v-model="tel" readonly="true" name="phone" />
          </p>
        </div>
        <div class="box" id="phone">
          <p>
            手机：
            <input type="text" v-model="phone" readonly="true" name="cellphone" />
          </p>
        </div>
        <div class="box" id="fax">
          <p>
            传真：
            <input type="text" v-model="fax" @keyup="input1" name="fax" />
          </p>
        </div>
        <div class="box" id="qq">
          <p>
            qq：
            <input type="text" v-model="qq" @keyup="input2" name="QQ" />
          </p>
        </div>
        <div class="box" id="e-mail">
          <p>
            e-mail：
            <input type="text" v-model="email" @keyup="input3" name="E-mail" />
          </p>
        </div>
        <div class="box" id="address">
          <p>
            通讯地址：
            <input type="text" v-model="address" readonly="true" name="address" />
          </p>
        </div>
        <div class="box" id="fax">
          <p>
            邮编：
            <input type="text" v-model="zip" @keyup="input4" name="mail" />
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
      person: "李三",
      phone: " ",
      tel: " ",
      fax: " ",
      qq: " ",
      email: " ",
      address: " ",
      zip: " "
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
          this.person = alldata.txAgentName;
          this.phone = alldata.xHandset2;
          var tell = alldata.xOfficeTel;
          this.tel = tell.split(" ")[0];
          this.fax = alldata.xFax;
          this.qq = alldata.qq;
          this.email = alldata.xEmail;
          this.address = alldata.xPostAddress;
          this.zip = alldata.xZipCode;
        } else if (res.data.code === 1 || res.data.data == null) {
          console.log("出错了!");
        }
      });
    },
    input1() {
      this.$emit("put4", this.fax);
    },
    input2() {
      this.$emit("put5", this.qq);
    },
    input3() {
      this.$emit("put6", this.email);
    },
    input4() {
      this.$emit("put7", this.zip);
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.content {
  height: 455px;
  width: 100%;
  background: white;
  overflow: hidden;
}
.content-all {
  width: 318px;
  height: 346px;
  margin: 37px 19.1px 1px 37.9px;
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
  height: 25px;
}
#e-mail p {
  margin-left: 18px;
}
#e-mail input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 25px;
}
#phone input {
  height: 23px;
  width: 200px;
}
#address input {
  height: 23px;
  width: 200px;
}
.tips {
  /* margin-bottom: 5px; */
  margin-left: 58px;
  width: 265px;
  height: 32px;
  font-size: 10px;
  line-height: 15px;
  color: #b5b5b5;
}
</style>