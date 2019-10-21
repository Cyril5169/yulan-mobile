<template>
  <div>
    <top :top="set"></top>
    <div class="new-address">
      <div class="item">
        <span class="item-title">姓名</span>
        <input class="item-input" @blur.prevent="confirmInput()" type="text" placeholder="收货人姓名" v-model="name">
      </div>
      <div class="item">
        <span class="item-title">电话</span>
        <input class="item-input" @blur.prevent="confirmInput()" type="number" placeholder="收货人电话" v-model="tel">
      </div>
      <div class="item">
        <span class="item-title">地区</span>
        <input class="item-input" @click="iosselect" readonly :value="location" ref="bank"
               placeholder="选择省/市/县">
      </div>
      <div class="item">
        <span class="item-title">详细地址</span>
        <input class="item-input" @blur.prevent="confirmInput()" type="text" v-model="address" placeholder="街道门牌/楼层房间等信息">
      </div>
      <div class="address-save">
        <span class="save" @click="saveAddress">保存</span>
      </div>
    </div>
    <iosselect2 v-on:listen3="listenmore" v-on:listen4="listenselect" v-show="more"></iosselect2>
  </div>
</template>

<script>
  import axios from 'axios'
  import iosselect2 from '@/components/Iosselect4'
  import top from '../../../components/Top'
  import {bus} from '../../../utils/eventBus.js';
  import {Toast} from 'vant'

  export default {
    data() {
      return {
        set: 18,
        more: false,
        location: "",
        name:"",
        tel:"",
        address:""
      }
    },
    components: {
      top,
      iosselect2,
      [Toast.name]:Toast
    },
    methods: {
      iosselect() {
        this.more = true;
        console.log('more :' + this.more);
        this.$emit("listen3", this.more);
      },
      listenmore(data) {
        this.more = data;
      },
      listenselect(data) {
        this.location = data;
        console.log(this.location)
      },
      confirmInput(){
        // console.log(event.target)
        if (event.target.value == "") {
          Toast({
            duration:1000,
            message:"请填写" + event.target.placeholder
          })
          event.target.focus()
          return
        }
      },
      saveAddress() {
        if (this.name == "" || this.tel == "" || this.address == "") {
          return
        }
        //地址截取
        var reg = /.+?(省|市|自治区|自治州|县|区)/g;
        console.log(this.location.match(reg))
        var addsressAry = this.location.match(reg)
        let url = this.orderBaseUrl + "/postAddress/addPostAddress.do"
        let data = {
          // "cid":"C01613", //客户ID
          "cid":this.$store.getters.getCId,
          "postAddress":this.address, //客户地址，具体地址
          "wlContacts":this.name , //收货人
          "wlTel": this.tel, //联系电话
          "province": addsressAry[0], //省
          "city": addsressAry[1], //市
          "country": addsressAry[2], //县
          "provinceID": "",//省ID
          "cityID": "",//市ID
          "countryID": null //县ID
        }
        axios.post(url,data).then(
          data => {
            // console.log(data)
            if (data.data.code == 0) {
              Toast({
                duration: 1000,
                message: '添加地址成功'
              })
              this.$router.push({
                path:"/addresslist"
              })
            }
          }
        )
      }
    }
  }
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
