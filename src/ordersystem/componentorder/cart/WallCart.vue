<template>
  <!--参考淘宝购物车-->
  <div class="wall-cart">
    <span class="manage" v-if="!showManage" @click="manageCart">管理</span>
    <span class="manage-completed" v-if="showManage" @click="manageCompleted">完成</span>
    <div class="all-products">
      <van-pull-refresh style="min-height: 450px;" v-model="isLoading" @refresh="searchCartList">
        <div class="single-product" v-for="(group, index) in cartlist" :key="index">
          <div class="category-title">
            <input
              type="checkbox"
              :value="group"
              v-model="checkGroupModel"
              class="qiang"
              @change.stop="pickGroup(group, index)"
              :disabled="checkActiviyEffect(group) && !showManage"
            />
            <!--<img class="qiang" src="../../assetsorder/wallCart.png" alt="">-->
            <span class="type">
              {{ group.productGroupType ? group.productGroupType : "无产品" }}
              -
              {{
              group.activityGroupType ? group.activityGroupType : "Z"
              }}组
            </span>
            <span class="huodong">{{ group.cid }}</span>
            <!--<img class="huodong-icon" src="../../assetsorder/hdCart.png" alt="">-->
          </div>
          <div class="details-content" v-for="(product, inndex) in group.commodities" :key="inndex">
            <input
              type="checkbox"
              :value="product"
              v-model="checkBoxModel"
              class="checkbox"
              @change.stop="pickOne(product, index, inndex)"
              :disabled="checkActiviyEffect2(product) && !showManage"
            />
            <div style="width:100%;height:100%" @click="wallDetails(index, inndex)">
              <table>
                <tr>
                  <th>型号：</th>
                  <td>{{ product.item.itemNo }}</td>
                </tr>
                <tr>
                  <th>活动：</th>
                  <td>
                    <span style="color: red;" v-if="product.activityEffective === false">(过期活动)</span>
                    {{ product.activityName ? product.activityName : "不参与活动" }}
                  </td>
                </tr>
                <tr>
                  <th nowrap="nowrap">发货说明：</th>
                  <td>{{ product.newsplitShipment }}</td>
                </tr>
                <tr>
                  <th>单价：</th>
                  <td v-if="showPrice" class="price">￥{{ product.price }}</td>
                  <td v-else class="price">***</td>
                </tr>
                <tr>
                  <th>小计：</th>
                  <td
                    class="price"
                    v-if="showPrice && product.quantity"
                  >￥{{ product.quantity * product.price | dosageFilter}}</td>
                  <td class="price" v-else-if="showPrice && !product.quantity">
                    ￥{{
                    ( product.width.mul(product.height) * product.price) | dosageFilter
                    }}
                  </td>
                  <td class="price" v-else-if="!showPrice">***</td>
                </tr>
                <tr v-if="product.activityName">
                  <th>折后：</th>
                  <td class="price" v-if="showPrice && product.quantity">
                    ￥{{ product.salPromotion?
                    (product.salPromotion.type == 1?
                    product.salPromotion.discount * product.quantity * product.price
                    : product.salPromotion.price * product.quantity)
                    : product.quantity * product.price | dosageFilter}}
                  </td>
                  <td class="price" v-else-if="showPrice && !product.quantity">
                    ￥{{ product.salPromotion?
                    (product.salPromotion.type == 1?
                    product.salPromotion.discount * product.width.mul(product.height) * product.price
                    : product.salPromotion.price * product.width.mul(product.height))
                    : product.width.mul(product.height) * product.price | dosageFilter}}
                  </td>
                  <td class="price" v-else-if="!showPrice">***</td>
                </tr>
              </table>
            </div>
            <div class="product-num">
              <span class v-if="product.quantity">
                数量：{{ product.quantity }}{{ product.unit }}
                <div
                  style="color: red;"
                  v-if="product.quantity < product.item.minimumPurchase"
                >(最小起购数量{{product.item.minimumPurchase}})</div>
              </span>
              <span class v-if="!product.quantity">
                数量：{{ product.width }}*{{ product.height }}平方米
                <div
                  style="color: red;"
                  v-if="product.width*product.height < product.item.minimumPurchase"
                >(最小起购数量{{product.item.minimumPurchase}})</div>
              </span>
            </div>
          </div>
        </div>
        <div v-if="cartlist.length == 0" style="min-height: 450px;margin-top:5px;">暂无数据</div>
      </van-pull-refresh>
    </div>
    <div class="cart-bottom">
      <div class="cart-right" v-if="!showManage">
        <span>合计：</span>
        <span v-if="showPrice" class="total-price">￥{{ totalPrice | dosageFilter }}</span>
        <span v-else class="total-price">***</span>
        <span class="settle-down" @click="fillOrder">结算</span>
      </div>
      <!--购物车管理-->
      <div class="cart-right" v-if="showManage">
        <span class="delete-cart" @click="deleteCart">删除</span>
      </div>
    </div>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import { Stepper, Checkbox, CheckboxGroup } from "vant";
import { Dialog, Toast, Loading, PullRefresh } from "vant";
import { GetCartItem } from "@/api/shopASP";

export default {
  name: "wallcart",
  // inject:['reload'],
  components: {
    top,
    [Stepper.name]: Stepper,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      set: 15,
      //购买数量
      value: 10,
      //复选框
      singleChecked: false,
      //全选
      allp: false,
      //管理购物车中的商品
      manage: "管理",
      //是否切换为管理购物车
      showManage: false,
      //所有购物车列表
      allCartList: {},
      //购物车列表
      cartlist: this.$store.getters.getCartlist.wallpaper,
      //存储勾选商品id
      checkBoxModel: [],
      //选择一组产品
      checkGroupModel: [],
      //用来判断是否属于同一组
      thisGroup: "",
      //合计
      total: "",
      //删除的购物车id集合
      deleteList: [],
      //选中的产品组别
      productType: "",
      //需要传给结算页面的商品信息
      productMsg: {},
      //价格隐藏字段
      showPrice: null,
      loading: false,
      isLoading: false
    };
  },
  methods: {
    wallDetails(index, inndex) {
      //获取版本号
      let olditemNo = this.cartlist[index].commodities[inndex].item.oldItemNo;
      console.log(this.cartlist[index].commodities[inndex]);
      this.$router.push({
        name: "walldetails",
        params: {
          //墙纸类型,获取墙纸信息
          papertype: olditemNo,
          commodityID: this.cartlist[index].commodities[inndex].id, //商品条ID
          activityID: this.cartlist[index].commodities[inndex].activityId, //新活动ID
          newactivityID: this.cartlist[index].commodities[inndex].activityName, //新活动ID
          quantity: this.cartlist[index].commodities[inndex].quantity, //数量
          width: this.cartlist[index].commodities[inndex].width, //宽度
          height: this.cartlist[index].commodities[inndex].height, //高度
          note: this.cartlist[index].commodities[inndex].note,
          tip: this.cartlist[index].commodities[inndex].newsplitShipment,
          price: this.cartlist[index].commodities[inndex].price,
          from: "shoppingcart"
        }
      });
    },
    //购物车选中一个
    pickOne(product, index, inndex) {
      if (this.checkBoxModel.length == 1) {
        //首次选，赋予组别
        //产品组别
        this.thisGroup = this.cartlist[index].cartItemId;
        this.cartlist[index].commodities[inndex].checked = true;
        if (
          this.checkBoxModel.length == this.cartlist[index].commodities.length
        ) {
          this.checkGroupModel = [];
          this.checkGroupModel.push(this.cartlist[index]);
          this.cartlist[index].checked = true;
        } else {
          this.checkGroupModel = [];
          this.cartlist[index].checked = false;
        }
      } else if (this.cartlist[index].cartItemId != this.thisGroup) {
        //不同组别
        Dialog.alert({
          message: "不同组别的商品不能一起选择，请重新选择"
        }).then(() => {
          this.checkBoxModel = this.checkBoxModel.slice(0, -1);
          this.cartlist[index].commodities[inndex].checked = false;
        });
      } else {
        if (
          //同一组勾选
          this.checkBoxModel.length == this.cartlist[index].commodities.length
        ) {
          this.checkGroupModel = [];
          this.checkGroupModel.push(this.cartlist[index]);
          this.cartlist[index].checked = true;
        } else {
          this.checkGroupModel = [];
          this.cartlist[index].checked = false;
        }
      }
    },
    //选择某一组购物车
    pickGroup(group, index) {
      if (group.checked) {
        group.checked = false;
        this.thisGroup = "";
        this.checkBoxModel = [];
        for (let i = 0; i < group.commodities.length; i++) {
          this.cartlist[index].commodities[i].checked = false;
        }
      } else {
        if (this.checkGroupModel.length == 1) {
          if (this.thisGroup == "") {
            this.thisGroup = this.cartlist[index].cartItemId;
          } else if (this.thisGroup != this.cartlist[index].cartItemId) {
            Dialog.alert({
              message: "不同组别的商品不能一起选择，请重新选择"
            }).then(() => {
              this.checkGroupModel = this.checkGroupModel.slice(0, -1);
              for (let i = 0; i < group.commodities.length; i++) {
                this.cartlist[index].commodities[i].checked = false;
              }
            });
            return;
          }
          this.checkBoxModel = [];
          for (let i = 0; i < group.commodities.length; i++) {
            this.checkBoxModel.push(this.checkGroupModel[0].commodities[i]);
            this.cartlist[index].commodities[i].checked = true;
          }
          group.checked = true;
        } else if (this.thisGroup != this.cartlist[index].cartItemId) {
          Dialog.alert({
            message: "不同组别的商品不能一起选择，请重新选择"
          }).then(() => {
            this.checkGroupModel = this.checkGroupModel.slice(0, -1);
            for (let i = 0; i < group.commodities.length; i++) {
              this.cartlist[index].commodities[i].checked = false;
            }
          });
          return;
        }
      }
    },
    checkActiviyEffect(group) {
      for (let i = 0; i < group.commodities.length; i++) {
        if (group.commodities[i].activityEffective == false) {
          return true;
        } else {
          let val;
          if (group.commodities[i].unit === "平方米") {
            val = group.commodities[i].width.mul(group.commodities[i].height);
          } else {
            val = group.commodities[i].quantity;
          }
          if (val < group.commodities[i].item.minimumPurchase) {
            return true;
          }
        }
      }
      return false;
    },
    checkActiviyEffect2(product) {
      if (product.activityEffective == false) {
        return true;
      } else {
        let val;
        if (product.unit === "平方米") {
          val = product.width.mul(product.height);
        } else {
          val = product.quantity;
        }
        if (val < product.item.minimumPurchase) {
          return true;
        } else {
          return false;
        }
      }
    },
    //订单填写
    fillOrder() {
      if (this.checkBoxModel.length == 0) {
        Toast({
          duration: 2000,
          message: "请选择商品"
        });
      } else {
        this.$store.commit("setOrderProduct", this.checkBoxModel);
        this.$router.push({
          path: "/fillorder"
        });
      }
    },
    //管理购物车
    manageCart() {
      this.showManage = true;
    },
    manageCompleted() {
      this.showManage = false;
      //取消选中
      this.checkBoxModel = [];
      this.checkGroupModel = [];
      this.thisGroup = "";
    },
    searchCartList() {
      this.loading = true;
      // let cartUrl =
      //   this.orderBaseUrl +
      //   "/cart/getAllCartByCID.do?" +
      //   "CID=" +
      //   this.$store.getters.getCId;
      // axios
      //   .post(cartUrl)
      GetCartItem({
        cid: this.$store.getters.getCId,
        commodityType: "wallpaper"
      })
        .then(res => {
          this.checkBoxModel = [];
          this.checkGroupModel = [];
          this.thisGroup = "";
          var data = res.data;
          for (let i = 0; i < data.length; ) {
            if (data[i].commodities.length == 0) {
              data.splice(i, 1);
            } else {
              i++;
            }
          }
          var allData = this.$store.state.allCart;
          allData.wallpaper = data;
          //添加到购物车列表全局变量
          this.$store.commit("setcart", allData);
          this.$root.$emit("refreshTip");
          return data;
        })
        .then(cartdata => {
          //let hdArray = [];
          for (let i = 0; i < cartdata.length; i++) {
            for (let j = 0; j < cartdata[i].commodities.length; j++) {
              // if (cartdata[i].commodities[j].activityId != null) {
              //   hdArray.push(cartdata[i].commodities[j].activityId);
              // }
              if (!cartdata[i].commodities[j].activityId) {
                cartdata[i].commodities[j].newactivityId = "";
              } else {
                cartdata[i].commodities[j].newactivityId =
                  cartdata[i].commodities[j].activityName;
              }
              if (cartdata[i].commodities[j].splitShipment == 0) {
                cartdata[i].commodities[j].newsplitShipment = "等生产";
              } else if (cartdata[i].commodities[j].splitShipment == 1) {
                cartdata[i].commodities[j].newsplitShipment = "分批出货";
              } else {
                cartdata[i].commodities[j].newsplitShipment = "--";
              }
              //增加一个产品组字段
              cartdata[i].commodities[j].newProductType =
                cartdata[i].productGroupType;
            }
          }
          // let hdArrayUrl =
          //   this.orderBaseUrl + "/salPromotion/getSalPromotionsByIDs.do";
          // axios.post(hdArrayUrl, hdArray).then(hdRes => {
          //   let hdlength = 0;
          // for (let i = 0; i < cartdata.length; i++) {
          //   for (let j = 0; j < cartdata[i].commodities.length; j++) {
          //     if (cartdata[i].commodities[j].activityId == null) {
          //       cartdata[i].commodities[j].newactivityId = "";
          //     } else {
          //       cartdata[i].commodities[j].newactivityId =
          //         hdRes.data[hdlength++];
          //     }
          //     if (cartdata[i].commodities[j].splitShipment == 0) {
          //       cartdata[i].commodities[j].newsplitShipment = "等生产";
          //     } else if (cartdata[i].commodities[j].splitShipment == 1) {
          //       cartdata[i].commodities[j].newsplitShipment = "分批出货";
          //     } else {
          //       cartdata[i].commodities[j].newsplitShipment = "--";
          //     }
          //     //增加一个产品组字段
          //     cartdata[i].commodities[j].newProductType =
          //       cartdata[i].productGroupType;
          //   }
          // }
          this.cartlist = cartdata;
          this.isLoading = false;
          this.loading = false;
          // });
        });
    },
    //购物车删除
    deleteCart() {
      if (this.checkBoxModel.length == 0) {
        Toast({
          duration: 2000,
          message: "无选择产品"
        });
      } else {
        let deleteUrl = this.orderBaseUrl + "/cart/deleteCommodities.do";
        this.deleteList = [];
        for (var i = 0; i < this.checkBoxModel.length; i++) {
          this.deleteList.push(this.checkBoxModel[i].id);
        }
        let data = this.checkBoxModel;
        axios.post(deleteUrl, this.deleteList).then(data => {
          if (data.data.code == 0) {
            //重新请求一次购物车列表
            this.cartlist = [];
            this.searchCartList();
            Toast({
              duration: 1000,
              message: "删除成功"
            });
            this.checkGroupModel = [];
            this.checkBoxModel = [];
            this.thisGroup = "";
            this.manageCompleted();
            this.$root.$emit("refreshTip");
          }
        });
      }
    },
    //价格是否隐藏
    isShowPrice() {
      if (this.$store.getters.getIsManage == "0") {
        this.showPrice = false;
      } else {
        this.showPrice = true;
      }
    }
  },
  computed: {
    //计算总价
    totalPrice: function() {
      this.total = 0;
      for (var i = 0; i < this.checkBoxModel.length; i++) {
        if (this.checkBoxModel[i].quantity) {
          let sub =
            this.checkBoxModel[i].price * this.checkBoxModel[i].quantity;
          this.total +=
            Math.round(
              (this.checkBoxModel[i].salPromotion
                ? this.checkBoxModel[i].salPromotion.type == 1
                  ? this.checkBoxModel[i].salPromotion.discount * sub
                  : this.checkBoxModel[i].salPromotion.price *
                    this.checkBoxModel[i].quantity
                : sub).mul(100)
            ) / 100;
        } else {
          let sub =
            this.checkBoxModel[i].price *
            this.checkBoxModel[i].width.mul(this.checkBoxModel[i].height);
          this.total +=
            Math.round(
              (this.checkBoxModel[i].salPromotion
                ? this.checkBoxModel[i].salPromotion.type == 1
                  ? this.checkBoxModel[i].salPromotion.discount * sub
                  : this.checkBoxModel[i].salPromotion.price *
                    this.checkBoxModel[i].width.mul(
                      this.checkBoxModel[i].height
                    )
                : sub).mul(100)
            ) / 100;
        }
      }
      return this.total;
    }
  },
  activated() {
    this.isShowPrice();
    this.cartlist = [];
    this.searchCartList();
  }
};
</script>

<style scoped>
.manage,
.manage-completed {
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 999;
  color: white;
}

.all-products {
  position: fixed;
  overflow-y: scroll;
  bottom: 110px;
  top: 80px;
  left: 2px;
  right: 2px;
  padding: 10px 10px;
}

.single-product {
  position: relative;
  margin: 20px 0;
  padding-left: 40px;
  padding-bottom: 10px;
  border-radius: 10px;
  background: white;
}

.qiang {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: 0;
}

.category-title {
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  margin-right: 10px;
  /* border-bottom: 0.5px solid rgba(153, 150, 134, 0.5); */
}

.type {
  float: left;
  padding-left: 30px;
  /*margin-top: 2px;*/
}

.huodong {
  float: right;
  margin-right: 10px;
  color: #ff5227;
}

.checkbox {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  margin-top: -10px;
  left: -30px;
}

.huodong-icon {
  width: 20px;
  height: 18px;
  position: absolute;
  top: 10px;
  right: 18px;
}

.details-content {
  position: relative;
  margin-right: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  padding: 10px;
  /* border-bottom: 1px solid #f2f2f2; */
  box-shadow: 0 0 5px 0 darkgray;
}

.details-content th {
  text-align: left !important;
}

.details-content td {
  text-align: left !important;
}

.price {
  color: #ff4c33;
}

.product-num {
  margin-right: 5px;
  position: absolute;
  right: 2px;
  bottom: 10px;
}

.single-product .van-stepper {
  width: 130px;
  position: absolute;
  bottom: 12px;
  right: 10px;
}

.cart-left {
  float: left;
  position: relative;
  top: 50%;
  margin-top: -10px;
  margin-left: 10px;
}

.cart-right {
  float: right;
  position: relative;
  top: 50%;
  margin-top: -14px;
  margin-right: 10px;
}

.cart-right .delete-cart {
  display: inline-block;
  width: 70px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  border-radius: 15px;
  color: #ff4c33;
  border: 1px solid #ff4c33;
}

.cart-bottom {
  width: 100%;
  height: 50px;
  border-top: 0.5px solid rgba(153, 150, 134, 0.5);
  border-bottom: 0.5px solid rgba(153, 150, 134, 0.5);
  position: fixed;
  background-color: #ffffff;
  bottom: 60px;
}

.settle-down,
.submit-check {
  display: inline-block;
  width: 70px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  border-radius: 15px;
  background: #ff4c33;
  color: white;
}

.submit-check {
  width: 90px;
}

.total-price {
  color: #ff4c33;
}

#color-input-red + label {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: -30px;
  background: #87ca81;
}

#color-input-red:checked + label::before {
  display: block;
  content: "\2714";
  text-align: center;
  font-size: 16px;
  color: white;
}
</style>
