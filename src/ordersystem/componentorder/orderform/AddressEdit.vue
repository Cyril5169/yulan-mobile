<template>
  <div>
    <top msgtitle="修改地址" @backclick="backclick"></top>
    <div class="new-address">
      <div class="item">
        <span class="item-title">姓名</span>
        <input class="item-input" type="text" placeholder="收货人姓名" v-model="initAddress.name" />
      </div>
      <div class="item">
        <span class="item-title">电话</span>
        <input class="item-input" type="text" placeholder="收货人电话" v-model="initAddress.tel" />
      </div>
      <div class="item">
        <span class="item-title">地区</span>
        <input
          class="item-input"
          @click="iosselect"
          readonly
          v-model="location"
          ref="bank"
          placeholder="选择省/市/县"
        />
      </div>
      <div class="item">
        <span class="item-title">详细地址</span>
        <input
          class="item-input"
          type="text"
          v-model="initAddress.postAddress"
          placeholder="街道门牌/楼层房间等信息"
        />
      </div>
      <div class="address-save">
        <span class="save" @click="saveAddress">保存</span>
        <span class="delete" @click="deleteAddress">删除</span>
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
import { Toast, Dialog } from "vant";

export default {
  data() {
    return {
      set: 18,
      more: false,
      location: this.initAddress.province,
      name: "",
      tel: "",
      address: ""
      //获取初始化地址（对象）
      //initAddress: this.$route.params.address
    };
  },
  props: ["initAddress"],
  components: {
    top,
    iosselect2,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  methods: {
    backclick() {
      this.$emit("backclick");
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
    saveAddress() {
      //地址截取
      var reg = /.+?(省|市|自治区|自治州|县|区)/g;
      var addsressAry = this.location.match(reg);
      let url = this.orderBaseUrl + "/postAddress/updatePostAddress.do";
      let data = {
        cid: this.$store.getters.getCId,
        addressId: this.initAddress.addressId,
        postAddress: this.initAddress.postAddress, //客户地址，省市县+具体地址
        wlContacts: this.initAddress.name, //收货人
        wlTel: this.initAddress.tel, //联系电话
        province: addsressAry[0], //省
        city: addsressAry[1], //市
        country: addsressAry[2], //县
        provinceID: this.initAddress.provinceID, //省ID
        cityID: this.initAddress.cityID, //市ID
        countryID: this.initAddress.countryID //县ID
      };
      axios.post(url, data).then(data => {
        if (data.data.code == 0) {
          Toast({
            duration: 1000,
            message: "修改地址成功"
          });
          this.$emit("refreshAddress");
        }
      });
    },
    //删除地址
    deleteAddress() {
      Dialog.confirm({
        message: "是否确认删除地址"
      })
        .then(() => {
          let deleteURL =
            this.orderBaseUrl + "/postAddress/deletePostAddress.do";
          let data = {
            cid: this.$store.getters.getCId,
            addressId: this.initAddress.id
          };
          axios.post(deleteURL, data).then(res => {
            if (res.data.code == 0) {
              Toast({
                duration: 1000,
                message: "删除地址成功"
              });
              this.$emit("refreshAddress");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  created() {}
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
  padding: 32px 16px;
}

.save {
  display: inline-block;
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 15px;
  background: #ff2d41;
  color: white;
  font-size: 14px;
}
.delete {
  display: inline-block;
  width: 300px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 15px;
  background: #fff;
  color: #323233;
  border: 1px solid #ebedf0;
  font-size: 14px;
}
</style>
