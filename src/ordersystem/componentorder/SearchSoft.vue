<template>
  <div class="search-order">
    <div class="soft-nav">
      <ul>
        <li>
          <router-link to="/searchsoft/mliao" exact>面料</router-link>
        </li>
        <li>
          <router-link to="/searchsoft/hbian" exact>花边</router-link>
        </li>
        <li>
          <router-link to="/searchsoft/guadai" exact>挂袋/配件包</router-link>
        </li>
        <li>
          <router-link to="/searchsoft/bzhen" exact>抱枕</router-link>
        </li>
        <li>
          <router-link to="/searchsoft/ghua" exact>挂画</router-link>
        </li>
        <li>
          <router-link to="/searchsoft/taoci" exact>成品帘</router-link>
        </li>
        <li>
          <router-link to="/searchsoft/qita" exact>其他</router-link>
        </li>
      </ul>
    </div>
    <div class="searchtop">
      <van-search
        class="search-top"
        v-model="searchvalue"
        :placeholder="softType"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <div class="img" @click="back"></div>
    </div>
    <div class="all-mliao">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        :loading-text="loadingText"
        @load="onLoad"
      >
        <div
          class="single-wall"
          v-for="(mliao,index) in mliaos"
          @click="mliaoDetails(index)"
          :key="index"
        >
          <div class="wall-title">{{mliao.note}}</div>
          <table>
            <tr>
              <th>型号：</th>
              <td>{{mliao.itemNo}}</td>
            </tr>
            <tr>
              <th>名称：</th>
              <td>{{mliao.note}}</td>
            </tr>
            <tr>
              <th>风格：</th>
              <td>{{mliao.fixType}}</td>
            </tr>
            <tr>
              <th>尺寸：</th>
              <td>{{mliao.fixGrade}}mm</td>
              <!--<td class="show-kucun"><span @click.stop="checkKucun">查看库存</span></td>-->
            </tr>
            <!--后台在显示列表的时候这个字段值为null，但是在商品详情页面这个字段有值-->
            <!--<tr>-->
            <!--<th>品牌：</th>-->
            <!--<td>{{mliao.productBrand}}</td>-->
            <!--<td class="show-kucun"><span @click.stop="checkKucun">查看库存</span></td>-->
            <!--</tr>-->
          </table>
          <span class="show-kucun" @click.stop="checkKucun(index)">查看库存</span>
          <iframe :src="storeUrl(mliao.itemNo)" style="display: none" frameborder="0"></iframe>
        </div>
      </van-list>
      <div v-if="showTop" @click="backToTop" class="scrollTopCls">
        <img style="width:50px;height:50px;" src="../../assets/backTop.png" />>
      </div>
    </div>

    <!--查看库存-->
    <van-action-sheet class="kucun-popup" v-model="showKucun" title="库存查询结果">
      <div class="kucun-result">
        <table width="100%">
          <tr v-for="(kucun,index) in singleKuCun" :key="index">
            <!--<td>库存总数</td>-->
            <td>{{kucun}}</td>
          </tr>
        </table>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import axios from "axios";
import { Search, Toast, ActionSheet, List } from "vant";
import "../assetsorder/actionsheet.css";
import navBottom from "../../components/navBottom";

export default {
  name: "",
  data() {
    return {
      inputValue: "",
      //底部导航栏样式切换
      myRoute: "customer",
      // route:"/searchsoft/mliao"
      softType: "请输入花边型号",
      itemType: "XHB",
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      loading: false,
      finished: false,
      finishedText: "加载完毕",
      loadingText: "加载中...",
      //搜索框输入值
      searchvalue: "",
      //显示库存
      showKucun: false,
      //当前页数
      currentPage: 0,
      //所有面料list
      mliaos: [],
      //总条数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 10,
      //总页数
      totalPage: 0,
      storeMsg: [], //储存当前页面的库存信息。所有的
      singleKuCun: [], //单个库存信息
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      showTop: false,
      scrollTop: 0,
      scrollTarget: null
    };
  },
  components: {
    navBottom,
    [Search.name]: Search,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
    [List.name]: List
  },
  methods: {
    backToTop(e) {
      //返回顶部
      var me = this;
      e.preventDefault();
      var distance = this.scrollTop;
      var dParams = 30;
      var time = 1;
      me.interval = setInterval(function() {
        dParams += 30 * time;
        time++;
        distance = distance > 0 ? distance : 0;
        me.scrollTarget.scrollTop = distance - dParams;
        if (me.scrollTop < 10) {
          clearInterval(me.interval);
        }
      }, 10);
    },
    //查看库存
    checkKucun(index) {
      this.singleKuCun = [];
      if (this.storeMsg.length) {
        this.showKucun = true;
        if (this.storeMsg[index].indexOf("，") != -1) {
          this.singleKuCun = this.storeMsg[index].split("，");
        } else {
          this.singleKuCun.push(this.storeMsg[index]);
        }
      } else {
        Toast({
          duration: 2000,
          message: "暂无查询结果"
        });
      }
    },
    storeUrl(itemNo) {
      return `http://www.luxlano.com/ddkc/ecqueryItemStock.asp?IID=${itemNo}`;
    },
    onLoad() {
      setTimeout(() => {
        let url = this.orderBaseUrl + "/item/getSoftInfoSingle.do";
        this.currentPage = this.currentPage + 1;
        let data = {
          itemType: this.itemType,
          cid: this.$store.getters.getCId,
          itemNo: this.searchvalue.toUpperCase(), //模糊查询内容
          limit: 10, //一页限制条数
          page: this.currentPage //第几页
        };
        if (this.mliaos.length > 0) {
          this.loadingText =
            "加载中，共" +
            this.mliaos[0].total +
            "项，已加载" +
            this.mliaos.length +
            "项";
        }
        axios.post(url, data).then(data => {
          if (data.data.code == 1) {
            this.mliaos = [];
            this.totalPage = 1;
            Toast({
              duration: 2000,
              message: "暂无查询结果"
            });
            this.finished = true;
          } else {
            data.data.data.forEach(item => {
              this.mliaos.push(item);
            });
            //总页数
            if (this.mliaos.length) {
              this.totalPage = parseInt(this.mliaos[0].total / 10) + 1;
              // 数据全部加载完成
              if (this.currentPage >= this.totalPage) {
                this.finished = true;
                this.finishedText = "加载完毕，总记录数" + this.mliaos[0].total;
              } else {
                this.finished = false;
              }
            }
            // 加载状态结束
            this.loading = false;

            for (let i = 0; i < this.mliaos.length; i++) {
              if ((this.mliaos[i].fixType = "01")) {
                this.mliaos[i].fixType = "定宽";
              } else if ((this.mliaos[i].fixType = "02")) {
                this.mliaos[i].fixType = "定高";
              }
            }
          }
        });
      }, 500);
    },
    //搜索
    onSearch() {
      this.mliaos = [];
      this.finished = false;
      this.currentPage = 0;
      this.finishedText = "暂无查询结果";
      this.loadingText = "加载中";
      this.onLoad();
    },
    //详情
    mliaoDetails(index) {
      this.$router.push({
        name: "softdetails",
        params: {
          itemType: this.itemType,
          itemNo: this.mliaos[index].itemNo, //模糊查询的内容
          from: window.location.href.split("#/")[1]
        }
      });
    },
    back() {
      this.$router.push({
        path: "/shopstore"
      });
    }
  },
  mounted() {
    window.test1 = this;
    window.vTop = this;
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
    const self = this;
    window.addEventListener(
      "message",
      function(e) {
        self.storeMsg.push(e.data);
      },
      false
    );
    //监控滚动条
    window.addEventListener(
      "scroll",
      function(e) {
        self.scrollTop = e.target.scrollTop;
        self.scrollTarget = e.target;
        if (e.target.scrollTop > 100) {
          self.showTop = true;
        } else {
          self.showTop = false;
        }
      },
      true
    );
  },
  destroyed() {
    if (window.vTop == this) window.vTop = null;
  },
  watch: {
    $route(val, oldVal) {
      if (val.path == "/searchsoft/mliao") {
        this.softType = "请输入面料型号";
        this.itemType = "ML";
      }
      if (val.path == "/searchsoft/bzhen") {
        this.softType = "请输入抱枕型号";
        this.itemType = "BZ";
      }
      if (val.path == "/searchsoft/ghua") {
        this.softType = "请输入挂画型号";
        this.itemType = "GH";
      }
      if (val.path == "/searchsoft/guadai") {
        this.softType = "请输入挂袋型号";
        this.itemType = "PJB";
      }
      if (val.path == "/searchsoft/hbian") {
        this.softType = "请输入花边型号";
        this.itemType = "XHB";
      }
      if (val.path == "/searchsoft/qita") {
        this.softType = "请输入其他软装型号";
        this.itemType = "other";
      }
      if (val.path == "/searchsoft/taoci") {
        this.softType = "请输入陶瓷型号";
        this.itemType = "TC";
      }
      this.searchvalue = "";

      this.onSearch();
    },
    showHeight: function() {
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
.search-page ul,
.recent-search-title {
  text-align: left;
  margin: 0 15px;
}
.recent-search li {
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid rgb(250, 255, 248);
}
.soft-nav {
  width: 100%;
  background: linear-gradient(to right, rgb(190, 221, 129), rgb(135, 202, 129));
  margin: 0px 0px 5px 0px;
  position: fixed;
  z-index: 999;
  top: 0;
  -moz-box-shadow: 0px 1px 0 #e7e7e7;
  -webkit-box-shadow: 0px 1px 0 #e7e7e7;
  box-shadow: 0px 1px 0 #e7e7e7;
}
.soft-nav ul {
  display: flex;
  justify-content: space-around;
}
.soft-nav li {
  display: inline-block;
  margin: 10px 0px;
  font-size: 13px;
  height: 15px;
  line-height: 18px;
}
.soft-nav li a {
  color: white;
}
.soft-nav li a.router-link-active {
  padding: 3px 10px;
  background-color: white;
  color: #8cbb44;
  font-size: 15px;
  font-weight: bold;
  border-radius: 5px;
}

.searchtop {
  height: 40px;
}

.search-top {
  position: fixed;
  top: 35px;
  border-bottom: 1px solid #f0f2ef;
  z-index: 99;
}
.all-mliao {
  position: fixed;
  overflow-y: scroll;
  top: 75px;
  bottom: 0;
  left: 0;
  width: 100%;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
}

.single-wall {
  position: relative;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  padding: 20px 10px;
  box-shadow: 0 4px 8px 0 rgba(19, 19, 19, 0.2),
    0 6px 20px 0 rgba(12, 12, 12, 0.19);
}

.single-wall th,
.single-wall td {
  text-align: left;
}
.wall-title {
  text-align: left;
  margin-bottom: 5px;
  padding: 0 0 5px 3px;
  border-bottom: 1px solid #ebedf0;
  font-size: 16px;
}

.show-kucun {
  position: absolute;
  right: 10px;
  bottom: 17px;
  border-radius: 15px;
  color: white;
  background: #a0cb8d;
  padding: 5px 10px;
  font-size: 13px;
}

.kucun-result table {
  font-size: 15px;
  padding: 20px;
  margin-bottom: 50px;
}

.kucun-result table tr {
  height: 30px;
}
.kucun-result table tr:nth-child(odd) {
  background: rgba(160, 203, 141, 0.64);
  color: white;
}
.kucun-result table tr:nth-child(even) {
  background: #f1f1f1;
  color: #696969;
}
.img {
  display: inline-block;
  width: 20px;
  height: 20px;
  z-index: 33;
  position: fixed;
  left: 17px;
  top: 52px;
  background-image: url(../assetsorder/back2.png);
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 99;
}
.scrollTopCls {
  position: fixed;
  right: 10px;
  bottom: 20px;
}
</style>
