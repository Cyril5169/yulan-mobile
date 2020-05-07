// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import Calendar from "vue-mobile-calendar";
import VueAwesomeSwiper from "vue-awesome-swiper";
import { Picker, ImagePreview } from "vant";
import store from "./store";
//订单系统的URL
import Global from "./Global.vue";
import mui from "./assets/mui/js/mui";
import IScroll from "./assets/iscroll/iscroll";
//import * as baseUrlASP from "./api/httpASP.js";
import { UpdatePushResponseTime } from "./api/webUserASP";

axios.defaults.baseURL = "http://14.29.221.109:10250/yulan";
//全局loading
axios.interceptors.request.use(
  config => {
    if (config.loading != undefined && config.loading == false) {
    } else {
      store.commit("showLoading");
    }
    return config;
  },
  error => {
    store.commit("hideLoading");
    return Promise.resolve(error);
  }
);
axios.interceptors.response.use(
  response => {
    store.commit("hideLoading");
    return Promise.resolve(response);
  },

  error => {
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);
//中断请求
// axios.interceptors.request.use(
//   config => {
//     config.cancelToken = new axios.CancelToken(function (cancel) {
//       store.commit('pushToken', {cancelToken: cancel})
//     })
//     return config
//   }
// )

// router.beforeEach(function (to, from, next) {
//   store.commit('clearToken') // 取消请求
//   next()
// })
Vue.use(Calendar);
Vue.use(Picker);
Vue.use(VueAwesomeSwiper);
Vue.use(ImagePreview);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.orderBaseUrl = orderBaseUrl;
Vue.prototype.fileCenterUrl = fileCenterUrl;
Vue.prototype.capitalUrl = Global.capitalUrl;
Vue.prototype.mui = mui;
Vue.prototype.IScroll = IScroll;
Vue.prototype.baseUrlASP = baseUrl;

export const $http = axios;

vm = new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
vm.UpdateVersion = Global.UpdateVersion;
vm.showPushNotification = Global.showPushNotification;
vm.showPush_customer_balance_period = Global.showPush_customer_balance_period;
vm.UpdatePushResponseTime = UpdatePushResponseTime;
app = vm.$children[0];

function plusReady() {
  //等待plus ready后再调用H5+ API：
  // 在这里调用5+ API
  var first = null;
  window.plus = plus;
  plus.key.addEventListener(
    "backbutton",
    function () {
      var overlays = document.getElementsByClassName("van-overlay"); //获取遮罩层
      if (
        overlays.length > 0 &&
        overlays[0].style &&
        overlays[0].style.display != "none"
      ) {
        console.log("触发点击了遮罩层");
        overlays[0].click(); //关闭遮罩层
        return;
      }
      //监听返回键
      if (window.vTop) {
        console.log("触发back,from是：" + window.vTop.from);
        window.vTop.back();
        return;
      }
      if (!first) {
        first = new Date().getTime(); //获取第一次点击的时间戳
        mui.toast("再按一次切换至桌面", { duration: 1000 }); // 调用mui 上的toast 提示框
        setTimeout(function () {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          //获取第二次点击的时间戳, 两次之差 小于 1000ms 说明1s点击了两次,
          plus.android.runtimeMainActivity().moveTaskToBack(false); //返回桌面
          //plus.runtime.quit(); //退出应用
        }
      }
    },
    false
  );
  if (plus.os.name == "Android")
    vm.UpdateVersion();
}

if (!window.plus) {
  document.addEventListener("plusready", function (a) {
    plusReady();
  });
} else {
  plusReady();
}
//从后台切换到前台,检查更新
document.addEventListener("resume", function () {
  vm.UpdateVersion();
});
//从前台切换到后台
document.addEventListener("pause", function () {
  console.log("已切换至后台");
  mui.toast("温馨提示：玉兰B2B继续在后台运行", { duration: 1500 });
});
// 获取错误信息
document.addEventListener("error", function (e) {
  mui.alert("请求的页面无法打开", "发生错误");
});
// 禁止选择
document.oncontextmenu = function () {
  return false;
};
//使用示例 a+b => a.add(b)   a-b => a.sub(b)  a*b => a.mul(b)  a/b => a.div(b)
/**浮点数的加运算*/
Number.prototype.add = function (arg) {
  return operation(this, arg, 'add');
};
/**浮点数的减运算*/
Number.prototype.sub = function (arg) {
  return operation(this, arg, 'subtract');
};
/**浮点数的乘运算*/
Number.prototype.mul = function (arg) {
  return operation(this, arg, 'multiply');
};
/**浮点数的除运算*/
Number.prototype.div = function (arg) {
  return operation(this, arg, 'divide');
};

function isInteger(obj) {
  return Math.floor(obj) === obj
}
/**将浮点数转为整数，并保存放大的倍数。如0.02 返回2，100 */
function toInteger(floatNum) {
  var ret = { floatLength: 1, intNum: 0 };
  if (isInteger(floatNum)) {//如果是整数
    ret.intNum = floatNum;
  }
  else {
    var strFloat = floatNum + '';
    var dotPosition = strFloat.indexOf('.');
    var len = strFloat.substr(dotPosition + 1).length;
    var floatLength = Math.pow(10, len);
    var intNum = parseInt(Math.abs(floatNum) * floatLength + 0.5, 10);//放大
    ret.floatLength = floatLength;
    if (floatNum < 0) {//负数的处理
      intNum = -intNum;
    }
    ret.intNum = intNum;
  }
  return ret;
}
function operation(a, b, opType) {
  var o1 = toInteger(a);
  var o2 = toInteger(b);
  var int1 = o1.intNum;
  var int2 = o2.intNum;
  var langth1 = o1.floatLength;
  var langth2 = o2.floatLength;
  var maxLength = langth1 > langth2 ? langth1 : langth2;//以最大位数为基准
  var result = null;
  switch (opType) {
    case 'add':
      if (langth1 === langth2) { //两个小数位数相同
        result = int1 + int2;
      } else if (langth1 > langth2) {
        result = int1 + int2 * (langth1 / langth2);
      } else {
        result = int1 * (langth2 / langth1) + int2;
      }
      return result / maxLength;
    case 'subtract':
      if (langth1 === langth2) {
        result = int1 - int2;
      } else if (langth1 > langth2) {
        result = int1 - int2 * (langth1 / langth2);
      } else {
        result = int1 * (langth2 / langth1) - int2;
      }
      return result / maxLength;
    case 'multiply':
      result = (int1 * int2) / (langth1 * langth2);
      return result;
    case 'divide':
      result = (int1 / int2) / (langth1 / langth2);
      return result;
  }
}
Vue.filter('dosageFilter', data => {
  if (typeof (data) !== 'number') return '';
  return Math.round(data * 100) / 100;
})