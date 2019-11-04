<template>
  <div class="search-order">
    <div class="searchtop">
      <van-search
        class="search-input"
        v-model="inputValue"
        background="linear-gradient(to right, #BEDD81, #87CA81)"
        placeholder="输入墙纸型号"
        show-action
        @search="onSearchWall"
        @focus="showSearch = true"
      >
        <div slot="action" @click="onSearchWall(inputValue)" style="color: white">搜索</div>
        <van-icon slot="right-icon" name="scan" @click="onScanClick()" size="30px" style="color: white"></van-icon>
      </van-search>
      <div class="img" @click="back"></div>
    </div>
    <!--历史搜索-->
    <div v-show="showSearch" class="search-page">
      <div class="recent-search-title">最近搜索:</div>
      <div style="text-align:left">
        <span
          class="currItem"
          v-for="(hisSearch,index) in historySearch"
          :key="index"
          @click="onSearchWall(hisSearch)"
        >{{hisSearch}}</span>
      </div>
      <div v-if="historySearch" class="clear-search" @click="clearHistory">
        <span>清空历史搜索</span>
      </div>
    </div>
    <!--搜索结果-->
    <div class="search-result" v-show="!showSearch">
      <div class="single-wall" v-show="wallMegs.itemNo" @click="wallDetails">
        <div class="wall-title">墙纸、配套类</div>
        <table>
          <tr>
            <th>型号：</th>
            <td>{{wallMegs.itemNo}}</td>
          </tr>
          <tr>
            <th>样本型号：</th>
            <td>{{wallMegs.oldItemNo}}</td>
          </tr>
          <tr>
            <th>版本：</th>
            <td>{{wallMegs.itemVersion}}</td>
          </tr>
          <tr>
            <th>名称：</th>
            <td>{{wallMegs.note}}</td>
          </tr>
          <tr>
            <th>品牌：</th>
            <td>{{wallMegs.productBrand}}</td>
            <td class="show-kucun">
              <span @click.stop="checkKucun">查看库存</span>
            </td>
          </tr>
        </table>
      </div>
      <!--<div v-show="!wallMegs.itemNo">-->
      <!--暂无查询结果-->
      <!--</div>-->
    </div>
    <navBottom v-show="hidshow"></navBottom>
    <!--查看库存-->
    <van-action-sheet class="kucun-popup" v-model="showKucun" title="库存查询结果">
      <div class="kucun-result">
        <table width="100%">
          <tr>
            <th width="20%">库房</th>
            <th width="50%">批号</th>
            <th width="20%">库存</th>
          </tr>
          <tr v-for="(kcMsg,index) in kcMsgs" :key="index">
            <td class="kucun-item">{{kcMsg.stockNo}}</td>
            <td class="kucun-item">{{kcMsg.batchNo}}</td>
            <td class="kucun-item">{{kcMsg.qty}}</td>
          </tr>
        </table>
      </div>
    </van-action-sheet>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />

    <van-popup v-if="showScan" v-model="showScan" class="scan-popup">
      <scan @scansuccess="onScanSuccess" @scanclose="closeScan()" ref="scan"></scan>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import { Search, ActionSheet, Toast, Loading, Icon, Dialog, Popup } from "vant";
import "../assetsorder/actionsheet.css";
import navBottom from "../../components/navBottom";
import scan from "../componentorder/Scan";

export default {
  name: "",
  data() {
    return {
      url: "http://106.13.32.172:8080/yulan-order",
      //搜索框输入值
      inputValue: "",
      //显示库存
      showKucun: false,
      //库存信息
      kcMsgs: [],
      showSearch: true, //是否显示历史搜索结果
      historySearch: null, //历史搜索内容
      //是否有查询结果
      resY: false,
      resN: false,
      //墙纸详情信息
      wallMegs: {},
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      loading: false,
      showScan: false,
    };
  },
  components: {
    top,
    scan,
    [Search.name]: Search,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Dialog.Component.name]: Dialog.Component,
    navBottom
  },
  methods: {
    back() {
      this.$router.push({
        path: "/shopstore"
      });
    },
    closeScan:function(){
      this.showScan = false;
    },
    //查看墙纸库存
    checkKucun() {
      this.loading = true;
      let wallKcURL = this.orderBaseUrl + "/item/getStockShow.do";
      let data = {
        itemNo: this.wallMegs.itemNo //产品型号，不能是旧的产品型号
      };
      axios.post(wallKcURL, data).then(data => {
        this.loading = false;
        if (data.data.data == "没有查询到数据") {
          this.showKucun = false;
          Toast({
            duration: 2000,
            message: "暂无库存信息"
          });
        } else {
          this.showKucun = true;
        }
        this.kcMsgs = data.data.data;
        //这里面axios的this不指向vue,所以在使用axios是最好使用es6箭头函数
      });
    },
    //墙纸详情
    wallDetails() {
      // let xh = this.wallMegs.itemNo
      this.$router.push({
        name: "walldetails",
        params: {
          //墙纸类型,获取墙纸信息
          papertype: this.wallMegs.oldItemNo,
          from: "searchwall"
        }
      });
      this.inputValue = "";
      this.resY = false;
      this.resN = false;
    },
    //扫一扫
    onScanClick() {
      this.showScan = true;
      console.log(this.$refs.scan)
      if (this.$refs.scan) {
        //this.$refs.scan.startRecognize();
        startRecognize();
      }
    },
    onScanSuccess(result) {
      this.inputValue = result;
      this.showScan = false;
    },
    //墙纸查询
    onSearchWall(inputValue) {
      if (inputValue == '') return;
      this.wallMegs = {};
      this.loading = true;
      this.inputValue = inputValue;
      let wallUrl = this.orderBaseUrl + "/item/getWallpaperInfo.do";
      let data = {
        paperType: inputValue.toUpperCase(),
        cid: this.CID
      };
      axios.post(wallUrl, data).then(data => {
        if (data.data.code == 0) {
          this.resY = true;
          this.resN = false;
          this.loading = false;
          this.wallMegs = data.data.data;
          this.wallMegs.note = this.wallMegs.itemType.note;
        } else {
          this.loading = false;
          this.resY = false;
          this.resN = true;
          Toast({
            duration: 2000,
            message: "暂无查询结果"
          });
        }
      });
      this.showSearch = false;
      this.setHistoryItems(this.inputValue);
    },
    setHistoryItems(keyword) {
      keyword = keyword.trim();
      if (!keyword) return;
      let { historyItems } = localStorage;
      if (historyItems === undefined) {
        localStorage.historyItems = keyword;
      } else {
        const onlyItem = historyItems.split("|").filter(e => e != keyword);
        if (onlyItem.length > 0)
          historyItems = keyword + "|" + onlyItem.join("|");
        localStorage.historyItems = historyItems;
      }
      this.historySearch = localStorage.historyItems.split("|");
    },
    //清空历史搜索
    clearHistory() {
      localStorage.removeItem("historyItems");
      this.historySearch = localStorage.historyItems;
    }
  },
  computed: {
    filteredProduct() {
      return this.products.filter(product => {
        return product.type.match(this.inputValue);
      });
    },
    //获取用户cid
    CID() {
      return this.$store.state.info.data.loginName;
    }
  },
  created() {
    var me = this;
    if (localStorage.historyItems == undefined) {
      this.historySearch = "";
    } else {
      this.historySearch = localStorage.historyItems.split("|");
    }
    window.addEventListener("scansuccess", function (event) {
      me.inputValue = event.result;
    });
  },
  mounted() {
    window.vTop = this;
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  destroyed() {
    if (window.vTop == this)
      window.vTop = null;
  },
  watch: {
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    }
  }
};
</script>

<style scoped>
.search-order {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0px;
  background-color: #f8f8f8;
  overflow: scroll;
}
.search-input {
  top: 0;
  width: 100%;
  z-index: 99;
}
.img {
  display: inline-block;
  width: 20px;
  height: 20px;
  z-index: 999;
  position: absolute;
  left: 17px;
  top: 16px;
  background-image: url(../../assets/arrow.png);
  background-repeat: no-repeat;
  background-size: contain;
}
.searchtop {
  height: 50px;
  background: linear-gradient(to right, #bedd81, #87ca81);
}
.search-page ul {
  text-align: left;
  margin: 0 15px;
}
.recent-search li {
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid rgb(250, 255, 248);
}
.single-wall {
  font-size: 15px;
  margin: 20px 20px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(19, 19, 19, 0.2),
    0 6px 20px 0 rgba(12, 12, 12, 0.19);
}

.single-wall th,
.single-wall td {
  text-align: left;
}

.wall-title {
  /*text-align: left;*/
  margin-bottom: 5px;
  padding: 10px;
  border-bottom: 1px solid #ebedf0;
  font-size: 16px;
  padding: 10px;
  background: #a0cb8d;
  color: white;
}

.show-kucun {
  width: 120px;
  text-align: right !important;
}

.show-kucun span {
  display: inline-block;
  width: 80px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 15px;
  color: white;
  background: #a0cb8d;
  font-size: 13px;
}

.kucun-result table {
  font-size: 15px;
  /*padding: 20px;*/
  margin: 10px 0 70px 0;
  border-collapse: collapse;
  border: none;
}

.kucun-result table th,
.kucun-result table td {
  border: solid #000 1px;
}
.kucun-item {
  padding: 10px 0;
}
.recent-search-title {
  text-align: left;
  margin: 10px 15px;
  font-size: 15px;
}
.currItem {
  display: inline-block;
  padding: 5px 15px;
  background: rgba(229, 229, 229, 0.8);
  border-radius: 15px;
  margin: 10px;
  font-size: 13px;
  /* float: left; */
}
.clear-search {
  width: 150px;
  height: 50px;
  line-height: 50px;
  margin: 50px auto;
  border-radius: 30px;
  border: 1px solid #a0cb8d;
  clear: both;
}
.scan-popup {
  width: 100%;
  height: 100%;
  background: #fff;
}
#scanid {
  background: #0f0;
  height: 480px;
  width: 360px;
}
</style>
