<template>
  <div id="app">
    <keep-alive>
      <!--使用keep-alive会将页面缓存-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--遮罩层-->
    <div v-if="LOADING" class="loadingMask">
      <van-loading v-if="LOADING" class="loading" type="spinner" color="black" />
    </div>
    <van-popup v-model="showProgress" class="progress-ct">
      <div class="progress-title">玉兰B2B正在下载更新</div>
      <van-progress :percentage="downloadPercent" color="#0c78d1"/>
    </van-popup>
  </div>
</template>
<script>
window.alert = function (name) {
  var iframe = document.createElement("IFRAME");
  iframe.style.display = "none";
  iframe.setAttribute("src", "data:text/plain,");
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);
  iframe.parentNode.removeChild(iframe);
};
import { Loading, Progress, Popup } from "vant";
import { mapState } from "vuex";
export default {
  name: "App",
  watch: {
    $route(to, from) {
      if (to.path == "/client") {
        this.$store.commit("getRoute", to.path);
      } else {
        this.$store.commit("getRoute", "");
      }
    }
  },
  components: {
    [Loading.name]: Loading,
    [Progress.name]: Progress,
    [Popup.name]: Popup
  },
  data() {
    return {
      showProgress: false,
      downloadPercent: 0,
    }
  },
  mounted() {
    window.onpopstate = () => {
      history.go(1);//阻止页面后退
    };
  },
  computed: {
    ...mapState(["LOADING"])
  }
};
</script>

<style scope>
.loadingMask {
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  /* background: rgba(0, 0, 0, 0.2); */
}
.progress-ct {
  border-radius: 5px;
  width: 80%;
  padding: 20px;
}
.progress-title {
  color:black;
  font-size: 15px;
  text-align: left;
  margin-bottom: 20px;
}
</style>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
