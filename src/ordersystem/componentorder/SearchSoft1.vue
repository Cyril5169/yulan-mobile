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
    <div>
      <span>搜索结果</span>
    </div>
    <router-view :isShow="hidshow"></router-view>
    <!--<navBottom :tab-stage="myRoute" v-show="hidshow"></navBottom>-->
  </div>
</template>

<script>
import axios from "axios";
import { Search } from "vant";
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
      softType: "输入面料相关查询信息",
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true //显示或者隐藏footer
    };
  },
  components: {
    navBottom,
    [Search.name]: Search
  },
  methods: {
    onSearchWall() {
      this.showSearch = false;
    },
    back() {
      this.$router.push({
        path: "/shopstore"
      });
    }
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  watch: {
    $route(val, oldVal) {
      if (val.path == "/searchsoft/mliao") {
        this.softType = "输入面料相关查询信息";
      }
      if (val.path == "/searchsoft/bzhen") {
        this.softType = "输入抱枕相关查询信息";
      }
      if (val.path == "/searchsoft/ghua") {
        this.softType = "输入挂画相关查询信息";
      }
      if (val.path == "/searchsoft/guadai") {
        this.softType = "输入挂袋相关查询信息";
      }
      if (val.path == "/searchsoft/hbian") {
        this.softType = "输入花边相关查询信息";
      }
      if (val.path == "/searchsoft/qita") {
        this.softType = "输入其他相关查询信息";
      }
      if (val.path == "/searchsoft/taoci") {
        this.softType = "输入陶瓷相关查询信息";
      }
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
</style>
