<script>
import Vue from "vue";
//订单接口地址
const orderBaseUrl = "http://14.29.223.114:10250/yulan-order"; //正式
//const orderBaseUrl = "http://120.79.140.75:567/yulan-order"; //测试

const capitalUrl = "http://14.29.223.114:10250/yulan-capital";
function checkversion(o, n) {
  var tempo = o.split(".");
  var tempn = n.split(".");
  if (
    tempo[0] * 100 + tempo[1] * 10 + tempo[2] * 1 <
    tempn[0] * 100 + tempn[1] * 10 + tempn[2] * 1
  ) {
    return true;
  } else {
    return false;
  }
}
function UpdateVersion(ischeck) {
  var showLoading;
  plus.runtime.getProperty(plus.runtime.appid, function(inf) {
    console.log("当前版本号为:" + inf.version);
    if (plus.os.name.toLowerCase() == "ios") {
      mui.ajax(
        "http://itunes.apple.com/cn/lookup?id=1500678970&v=" +
          Date.parse(new Date()),
        {
          data: {},
          dataType: "json",
          type: "get",
          success: function(data) {
            if (data.results.length == 0) return;
            var iosVersion = data.results[0].version;
            if (checkversion(inf.version, iosVersion)) {
              mui.confirm(
                `当前版本为${inf.version}，最新版本为${iosVersion}，检查到新版本，前往苹果商店下载更新？`,
                "检查更新",
                ["确定"],
                function(e) {
                  let appUrl =
                    "itms-apps://itunes.apple.com/cn/app/id1500678970?mt=8";
                  plus.runtime.openURL(appUrl);
                  plus.runtime.quit(); //退出应用
                }
              );
            }
          }
        }
      );
      return;
    }
    mui.ajax(updateUrl + "?v=" + Date.parse(new Date()), {
      data: {},
      dataType: "json",
      type: "get",
      success: function(data) {
        console.log("服务器版本号为：" + data.version);
        function installApp(path) {
          plus.nativeUI.showWaiting("安装文件...");
          plus.runtime.install(
            path,
            {
              force: false //是否强制安装
            },
            function(widgetInfo) {
              plus.nativeUI.closeWaiting();
              if (widgetInfo.version == inf.version) {
                console.log("没有安装");
                plus.nativeUI.alert("应用资源没有完成更新！", function() {
                  plus.runtime.restart();
                });
              } else {
                console.log("安装文件成功！");
                plus.nativeUI.alert("应用资源更新完成！", function() {
                  plus.runtime.restart();
                });
              }
            },
            function(e) {
              plus.nativeUI.closeWaiting();
              console.log(
                "安装文件失败[" + e ? e.code : "" + "]：" + e ? e.message : ""
              );
              plus.nativeUI.alert(
                "安装文件失败[" + e ? e.code : "" + "]：" + e ? e.message : ""
              );
            }
          );
        }
        // 如果有新版本，则提示需要更新
        if (checkversion(inf.version, data.version)) {
          if (app.showProgress === true) return;
          mui.confirm(
            `当前版本为${inf.version}，最新版本为${data.version}，检查到新版本，是否马上下载并更新？`,
            "检查更新",
            ["是", "否，将退出程序"],
            function(e) {
              if (e.index == 0) {
                showLoading = plus.nativeUI.showWaiting("准备更新...");
                var wgtUrl = data.downloadURI;
                console.log(wgtUrl);
                var downToaknew = plus.downloader.createDownload(
                  wgtUrl,
                  {
                    filename: "_doc/update/"
                  },
                  function(d, status) {
                    //alert(d)
                    if (status == 200) {
                      Vue.set(app, "showProgress", false);
                      installApp(d.filename);
                    } else {
                      showLoading.setTitle("下载失败");
                    }
                  }
                );
                downToaknew.start(); // 开启下载的任务
                Vue.set(app, "downloadPercent", 0);
                Vue.set(app, "showProgress", true);
                var prg = 0;
                downToaknew.addEventListener("statechanged", function(
                  task,
                  status
                ) {
                  //给下载任务设置一个监听 并根据状态做操作
                  switch (task.state) {
                    case 1:
                      showLoading.setTitle("正在下载");
                      break;
                    case 2:
                      showLoading.setTitle("已连接到服务器");
                      break;
                    case 3:
                      plus.nativeUI.closeWaiting();
                      prg = parseInt(
                        (parseFloat(task.downloadedSize) /
                          parseFloat(task.totalSize)) *
                          100
                      );
                      Vue.set(app, "downloadPercent", prg);
                  }
                });
              } else {
                plus.runtime.quit(); //退出应用
              }
            }
          );
        } else {
          if (ischeck) {
            plus.nativeUI.toast("已是最新版本", {
              duration: "long",
              align: "center",
              verticalAlign: "center"
            });
          }
          plus.nativeUI.closeWaiting();
        }
      },
      error: function(err) {}
    });
  });
}
//显示推送的公告
function showPushNotification(ID) {
  if (app.$route.name == "notificationlist") {
    Vue.set(notificationlist, "ID", ID);
  } else {
    app.$router.push({
      name: "notificationlist",
      params: {
        ID: ID,
        showNotification: true,
        from: "customer"
      }
    });
  }
}
function showPush_customer_balance_period() {
  if (app.$route.name != "billmanage") {
    app.$router.push({
      name: "billmanage"
    });
  }
}
export default {
  orderBaseUrl,
  capitalUrl,
  UpdateVersion,
  showPushNotification,
  showPush_customer_balance_period
};
</script>
