<template>
  <div>
    <top msgtitle="新增地址" @backclick="backclick"></top>
    <div class="new-address">
      <div class="item">
        <span class="item-title">姓名</span>
        <input
          class="item-input"
          @blur.prevent="confirmInput()"
          type="text"
          placeholder="收货人姓名"
          v-model="name"
        />
      </div>
      <div class="item">
        <span class="item-title">电话</span>
        <input
          class="item-input"
          @blur.prevent="confirmInput()"
          type="number"
          placeholder="收货人电话"
          v-model="tel"
        />
      </div>
      <div class="item">
        <span class="item-title">地区</span>
        <input
          class="item-input"
          @click="iosselect"
          readonly
          :value="location"
          placeholder="选择省/市/县"
        />
      </div>
      <div class="item">
        <span class="item-title">详细地址</span>
        <input
          class="item-input"
          @blur.prevent="confirmInput()"
          type="text"
          v-model="address"
          placeholder="街道门牌/楼层房间等信息"
        />
      </div>
      <div class="address-save">
        <span class="save" @click="saveAddress">保存</span>
      </div>
    </div>
    <iosselect2 v-on:listen3="listenmore" v-on:listen4="listenselect" v-show="more"></iosselect2>
  </div>
</template>

<script>
import axios from "axios";
import iosselect2 from "@/components/Iosselect4";
import top from "../../../components/Top";
import { bus } from "../../../utils/eventBus.js";
import { Toast } from "vant";
import {
  InsertBuyUser
} from "@/api/orderListASP";

export default {
  data() {
    return {
      set: 18,
      more: false,
      location: "",
      name: "",
      tel: "",
      address: ""
    };
  },
  components: {
    top,
    iosselect2,
    [Toast.name]: Toast
  },
  methods: {
    backclick() {
      this.$emit("backclick",true);
    },
    iosselect() {
      this.more = true;
      this.$emit("listen3", this.more);
    },
    listenmore(data) {
      this.more = data;
    },
    listenselect(data) {
      this.location = data;
    },
    confirmInput() {
      if (event.target.value == "") {
        Toast({
          duration: 1000,
          message: "请填写" + event.target.placeholder
        });
        event.target.focus();
        return;
      }
    },
    saveAddress() {
      if (this.name == "" || this.tel == "" || this.address == "") {
        return;
      }
      //地址截取
      var reg = /.+?(省|市|自治区|自治州|县|区)/g;
      var addsressAry = this.location.match(reg);
      let data = {
        CUSTOMER_CODE: this.$store.getters.getCMId,
        POST_ADDRESS: this.address, //客户地址，具体地址
        BUYUSER: this.name, //收货人
        BUYUSER_PHONE: this.tel, //联系电话
        PROVINCE: addsressAry[0], //省
        CITY: addsressAry[1], //市
        COUNTRY: addsressAry[2], //县
        PROVINCE_ID: "", //省ID
        CITY_ID: "", //市ID
        COUNTRY_ID: "" //县ID
      };
      InsertBuyUser(data).then(data => {
          Toast({
            duration: 1000,
            message: "添加地址成功"
          });
          this.$emit("refreshAddress",true);
      });
    }
  }
};
</script>

<style scoped>
.new-address {
  padding: 60px 10px 10px 10px;
}

.item {
  height: 40px;
  padding: 5px;
  position: relative;
  border-bottom: 1px solid #ebedf0;
  font-size: 15px;
}

.item-title {
  position: absolute;
  height: 20px;
  top: 50%;
  margin-top: -10px;
  left: 10px;
  width: 75px;
}

.item-input {
  border: none;
  width: 200px;
  height: 20px;
  top: 50%;
  margin-top: -10px;
  position: absolute;
  right: 50px;
}

.address-save {
  text-align: center;
}

.save {
  display: inline-block;
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin: 20px;
  background: #ff2d41;
  color: white;
  font-size: 14px;
}
</style>
