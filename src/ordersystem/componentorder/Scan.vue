<template>
  <div class="main">
    <div class="scan-top" ref="top">
        <div class="top-left">
          <van-icon
            @click="closeScan()"
            class="top-icon"
            name="arrow-left"
            color=""
            size="25px"
          />
        </div>
        <div class="top-photo">
          <van-icon
            @click="scanPicture()"
            class="top-icon"
            name="photo-o"
            color=""
            size="25px"
          />
        </div>
      </div>
    <div id="bcid"></div>
  </div>
</template>

<script>
import axios from "axios";
import {
  Popup,
  Dialog,
  Toast,
  ActionSheet,
  Icon
} from "vant";

export default {
  name: "",
  components: {
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Icon.name]: Icon,
    [ActionSheet.name]: ActionSheet
  },
  data() {
    return {
      scan: null,
    };
  },
  methods: {
    startRecognize() {
      var th = this;
      this.scan = new plus.barcode.Barcode('bcid', [plus.barcode.EAN13], {
        frameColor: '#00FF00',
        scanbarColor: "#00FF00",
      });
      this.scan.onmarked = function (type, result) {
        console.log(type);
        console.log(result);
        th.$emit('scansuccess', result);//自定义事件，提供外部使用
      };
      this.scan.onerror = function (error) {
        Dialog.alert({
          message: error
        });
      };
      this.scan.start({
        vibrate: false, //是否震动
      });
    },
    closeScan() {
      this.$emit('scanclose');//自定义事件，提供外部使用
    },
    scanPicture() {  //可以直接识别二维码图片
      var me = this;
      plus.gallery.pick(function (path) {
        plus.barcode.scan(path, me.scan.onmarked, function (error) {
          plus.nativeUI.alert("无法识别此图片");
        });
      }, function (err) {
        console.log("Failed: " + err.message);
      });
    }
  },
  mounted() {
    console.log("mounted");
    this.startRecognize();
  },
  destroyed() {
    console.log("destroyed");
    if (this.scan) {
      this.scan.close();
    }
  }
};
</script>

<style scoped>
.main {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  background: #000;

}
.scan-top {
  width: 100%;
  height: 50px;
  top: 0;
  left:0;
  background-color:white;
}
#bcid {
  width: 100%;
  position:absolute;
  top: 50px;
  bottom: 0;
}
.top-left {
  float: left;
  height: 100%;
  width: 50px;
  line-height: 50px;
  vertical-align: middle;
}
.top-icon {
  height: 100%;
  width: 100%;
  line-height: 50px;
  vertical-align: middle;
  opacity: 1;
}
.top-left :active {
  background: darkgrey;
}
.top-photo :active {
  background: darkgrey;
}
.top-photo {
  float: right;
  height: 100%;
  width: 50px;
  line-height: 50px;
  vertical-align: middle;
}
</style>
