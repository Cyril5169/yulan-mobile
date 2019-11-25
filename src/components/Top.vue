<template>
  <div v-bind:class="{top:!greenBackground,'top-green':greenBackground}" ref="top">
    <div class="top-bottom">
      <div class="arrow">
        <div class="img" @click="back"></div>
        <div class="top-text">{{msg}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["top", "from", "msgtitle", "greenBackground", "isPopup"],
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    setTitle(title) {
      this.msg = title;
    },
    back() {
      window.vTop = null;
      this.$emit("backclick"); //自定义事件，提供外部使用
      if (this.from) {
        this.$router.push({
          path: "/" + this.from
        });
        return;
      }
      switch (this.top) {
        case 0:
          if (this.$store.state.info.data.type == "ECWEB") {
            this.$router.push({
              path: "/client"
            });
            break;
          }
        case 1:
          if (this.$store.state.info.data.type == "ECWEB") {
            this.$router.push({
              path: "/client"
            });
          } else
            this.$router.push({
              path: "/customer"
            });
          break;
        case 2:
          if (this.$store.state.info.data.type != "ECWEB") {
            this.$router.push({
              path: "/customer"
            });
            break;
          }
        case 3:
          if (this.$store.state.info.data.type != "ECWEB") {
            this.$router.push({
              path: "/msgsearch"
            });
            break;
          }
        case 4:
          if (this.$store.state.info.data.type != "ECWEB") {
            this.$router.push({
              path: "/cardquery"
            });
          } else if (this.$store.state.info.data.type === "ECWEB") {
            this.$router.push({
              path: "/swiper"
            });
          }
          break;
        case 5:
          if (this.$store.state.info.data.type != "ECWEB") {
            this.$router.push({
              path: "/cardquery"
            });
          } else if (this.$store.state.info.data.type === "ECWEB") {
            this.$router.push({
              path: "/swiper"
            });
          }
          break;
        case 6:
          if (this.$store.state.info.data.type != "ECWEB") {
            this.$router.push({
              path: "/msgsearch"
            });
            break;
          }
        case 7:
          if (this.$store.state.info.data.type == "ECWEB") {
            this.$router.push({
              path: "/customer"
            });
            break;
          }
        case 8:
          if (this.$store.state.info.data.type != "ECWEB") {
            this.$router.push({
              path: "/msgsearch"
            });
            break;
          }
        case 9:
          if (this.$store.state.info.data.type == "ECWEB") {
            this.$router.push({
              path: "/client"
            });
            break;
          } else if (this.$store.state.info.data.type != "ECWEB") {
            if (this.$store.state.reviewed == true) {
              this.$router.push({
                path: "/reviewedprotocol"
              });
              break;
            } else {
              this.$router.push({
                path: "/showprotocol"
              });
              break;
            }
          }
        case 10:
          if (this.$store.state.info.data.type == "ECWEB") {
            this.$router.push({
              path: "/client"
            });
            break;
          }
        //order
        case 11: //墙纸详情
          this.$router.push({
            path: "/mycart/wallcart"
          });
          break;
        case 12:
          this.$router.push({
            path: "/shopstore"
          });
          break;
        case 13:
          this.$router.push({
            path: "/shopstore"
          });
          break;
        case 14:
          this.$router.push({
            path: "/shoppingcart"
          });
          break;
        case 15: //订单详情
          this.$router.push({
            path: "/myorder"
          });
          break;
        case 16:
          this.$router.push({
            path: "/addresslist"
          });
          break;
        case 17:
          this.$router.push({
            path: "/fillorder"
          });
          break;
        case 18:
          this.$router.push({
            path: "/addresslist"
          });
          break;
        case 25:
          this.$router.go(-1);
          break;
        // case 26:
        //   this.$router.go(-1);
        //   break;
        case 27: //优惠券
          this.$router.push({
            path: "/mypersonal"
          });
          break;
        case 27.1: //最新公告
          this.$router.push({
            path: "/mypersonal"
          });
          break;
        case 27.2: //我的调查表
          this.$router.push({
            path: "/mypersonal"
          });
          break;
        case 28:
          this.$router.push({
            path: "/searchcurtain"
          });
          break;
        case 29:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 30:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 31:
          this.$router.push({
            path: "/billmanage"
          });
          break;
        case 80:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 81:
          this.$router.push({
            path: "/bank"
          });
          break;
        case 82:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 83:
          this.$router.push({
            path: "/wtphlists"
          });
          break;
        case 84:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 85:
          this.$router.push({
            path: "/tuihuolists"
          });
          break;
        case 90:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 91:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 92:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 93:
          this.$router.push({
            path: "/areaQuery"
          });
          break;
        case 94:
          this.$router.push({
            path: "/orderQuery"
          });
          break;
        case 95:
          this.$router.push({
            path: "/customer"
          });
          break;

        case 97:
          this.$router.push({
            path: "/lanjuDesign"
          });
          break;
        case 98:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 99:
          this.$router.push({
            path: "/complaint"
          });
          break;
        case 100:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 101:
          this.$router.push({
            path: "/complaint"
          });
          break;
        case 102:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 103:
          this.$router.push({
            path: "/customer"
          });
          break;
        case 104:
          this.$router.push({
            path: "/newRefund"
          });
          break;
      }

      //   if(this.top == 0|| this.top ==1 || this.top ==5  ){
      //     this.$router.push({
      //       path:'/client'
      //     })
      //   }else if(this.top == 2){
      //     this.$router.push({
      //     path:'/customer'
      //     })
      //   }else if(this.top ==7){
      //     this.$router.push({
      //       path:'/customer'
      //     })
      //   }else if(this.top == 6){
      //     this.$router.push({
      //       path:'/msgsearch'
      //     })
      //   }
    }
  },
  activated() {
    if (!this.isPopup) window.vTop = this;
  },
  mounted() {
    if (!this.isPopup) window.vTop = this;
    if (this.msgtitle) {
      this.msg = this.msgtitle;
      return;
    }
    if (this.top == 0) {
      this.msg = "网络协议签订提示书";
    }
    if (this.top == 1) {
      this.msg = "客户资料卡";
    }
    if (this.top == 2) {
      this.msg = "2019资料卡查询";
      let a = this.$refs.top;
      console.log(1);
      a.className = "top-green";
    }
    if (this.top == 3) {
      this.msg = "查看客户资料卡";
      // let a = this.$refs.top;

      // a.style.background = "-webkit-linear-gradient(to right,#BEDD81,#87CA81)";
    }
    if (this.top == 4) {
      this.msg = "增值税专用发票";
    }
    if (this.top == 5) {
      this.msg = "授权付款委托书";
    }
    if (this.top == 6) {
      this.msg = "创建协议书";
    }
    if (this.top == 7) {
      this.msg = "公告";
    }
    if (this.top == 8) {
      this.msg = "查看客户资料卡";
    }
    if (this.top == 9) {
      this.msg = "网络协议签订协议书";
    }
    if (this.top == 10) {
      this.msg = "网络协议签订授权书";
    }
    if (this.top == 20) {
      this.msg = "客户资料卡";
    }

    //order
    if (this.top == 11) {
      this.msg = "产品详情";
    }
    if (this.top == 12) {
      this.msg = "购物车";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 13) {
      this.msg = "我的订单";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 14) {
      this.msg = "填写订单";
    }
    if (this.top == 15) {
      this.msg = "订单详情";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 16) {
      this.msg = "编辑地址";
    }
    if (this.top == 17) {
      this.msg = "我的地址";
    }
    if (this.top == 18) {
      this.msg = "新增地址";
    }
    if (this.top == 25) {
      this.msg = "提货详情";
    }
    if (this.top == 26) {
      this.msg = "个人中心";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 27) {
      this.msg = "优惠券管理";
    }
    if (this.top == 27.1) {
      this.msg = "最新公告";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 27.2) {
      this.msg = "我的调查表";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 28) {
      this.msg = "窗帘详情";
    }
    if (this.top == 29) {
      this.msg = "任务查询";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 30) {
      this.msg = "对账单管理";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 80) {
      this.msg = "银行汇款凭证";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 81) {
      this.msg = "银行汇款凭证单";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 82) {
      this.msg = "委托喷绘书";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 83) {
      this.msg = "委托喷绘确认详情";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 84) {
      this.msg = "退货赔偿";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 85) {
      this.msg = "客户确认书";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 90) {
      this.msg = "库存查询";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 91) {
      this.msg = "区域提货单查询";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 92) {
      this.msg = "区域订单查询";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 93) {
      this.msg = "区域订货单列表";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 94) {
      this.msg = "区域订单列表";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 95) {
      this.msg = "兰居设计";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 97) {
      this.msg = "兰居设计";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 98) {
      this.msg = "物流投诉";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 99) {
      this.msg = "物流投诉";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 100) {
      this.msg = "形象店";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 101) {
      this.msg = "物流投诉";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 102) {
      this.msg = "销售提货单查询";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 103) {
      this.msg = "退货赔偿";
      let a = this.$refs.top;
      a.className = "top-green";
    }
    if (this.top == 104) {
      this.msg = "退货赔偿";
      let a = this.$refs.top;
      a.className = "top-green";
    }
  },
  destroyed() {
    if (window.vTop == this) window.vTop = null;
  },
  beforeRouteLeave(to, from, next) {
    // ...
    // to.meta.keepAlive = true;
    if (to.path == "/swiper") {
      to.meta.keepAlive = true;
    }
    next();
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.top {
  background: #363636;
  width: 100%;
  height: 50px;
  top: 0;
  overflow: hidden;
  position: fixed;
  z-index: 100;
}

.top-green {
  background: linear-gradient(to right, #bedd81, #87ca81);
  width: 100%;
  height: 50px;
  top: 0;
  overflow: hidden;
  position: fixed;
  z-index: 20;
}

.top-bottom {
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
}

.arrow {
  display: inline-block;
}

.img {
  display: inline-block;
  width: 20px;
  height: 20px;
  z-index: 33;
  position: absolute;
  left: 17px;
  bottom: 16px;
  background-image: url(../assets/arrow.png);
  background-repeat: no-repeat;
  background-size: contain;
}

.top-text {
  display: inline-block;
  color: #f3faff;
  /*vertical-align: -webkit-baseline-middle;*/
  vertical-align: middle;
  width: 100%;
  font-size: 17px;
  text-align: center;
}
</style>
