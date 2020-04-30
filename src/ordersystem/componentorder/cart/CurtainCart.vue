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
            <span class="type">
              {{ group.productGroupType ? group.productGroupType : "无产品" }}
              -
              {{
              group.activityGroupType ? group.activityGroupType : "Z"
              }}组
            </span>
            <span class="huodong">{{ group.curtainCartItems[0].cid }}</span>
          </div>
          <div
            class="details-content"
            v-for="(product, inndex) in group.curtainCartItems"
            :key="inndex"
          >
            <input
              type="checkbox"
              :value="product"
              v-model="checkBoxModel"
              class="checkbox"
              @change.stop="pickOne(product, index, inndex)"
              :disabled="product.curtainLists[product.unNullNum]
                      .curtainCommodities[0].activityEffective === false"
            />
            <div style="width:100%;height:100%" @click="wallDetails(index, inndex)">
              <table>
                <tr>
                  <th>型号：</th>
                  <td>{{ product.modelNumber }}</td>
                </tr>
                <tr>
                  <th>宽度*高度：</th>
                  <td>{{ product.width }}*{{ product.height }}(米)</td>
                </tr>
                <tr>
                  <th nowrap="nowrap">帘外包宽度：</th>
                  <td v-if="product.outsourcingBoxExist === 1">
                    {{
                    product.outsourcingBoxWidth !== null &&
                    product.outsourcingBoxWidth !== 0
                    ? product.outsourcingBoxWidth
                    : "--"
                    }}(米)
                  </td>
                  <td v-else>--</td>
                </tr>
                <tr>
                  <th>褶皱倍数：</th>
                  <td>{{ product.drape }}</td>
                </tr>
                <tr>
                  <th>位置：</th>
                  <td>
                    {{
                    product.location === null || product.location === ""
                    ? "--"
                    : product.location
                    }}
                  </td>
                </tr>
                <tr>
                  <th>活动：</th>
                  <td>
                    <span
                      style="color: red;"
                      v-if="
                        product.curtainLists[product.unNullNum]
                          .curtainCommodities[0].activityEffective === false
                      "
                    >(过期活动)</span>
                    {{ product.activity }}
                  </td>
                </tr>
                <tr>
                  <th>小计：</th>
                  <td
                    class="price"
                    v-if="showPrice"
                  >￥{{ product.count * product.price | dosageFilter}}</td>
                  <td class="price" v-else-if="!showPrice">***</td>
                </tr>
                <tr v-if="product.activity != '不参与活动'">
                  <th>折后：</th>
                  <td class="price" v-if="showPrice">
                    ￥{{ product.salPromotion
                    ? (product.salPromotion.type == 1?
                    product.salPromotion.discount *(product.price * product.count)
                    :product.salPromotion.price * product.count)
                    : (product.price * product.count) | dosageFilter}}
                  </td>
                  <td class="price" v-else-if="!showPrice">***</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div v-if="cartlist.length == 0" style="min-height: 450px;margin-top:5px;">暂无数据</div>
      </van-pull-refresh>
    </div>
    <div class="cart-bottom">
      <div class="cart-right" v-if="!showManage">
        <span>合计：</span>
        <span v-if="showPrice" class="total-price">￥{{ totalPrice | dosageFilter}}</span>
        <span v-else class="total-price">***</span>
        <span class="settle-down" @click="fillOrder">结算</span>
      </div>
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
      // url:this.$store.getters.geturl,
      url: "http://106.14.159.244:8080/yulan-order",
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
      allCartList: {},
      //购物车列表
      cartlist: this.$store.getters.getCartlist.curtain,
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
      loading: false,
      isLoading: false,
      showPrice: this.$store.getters.getIsManage != "0"
    };
  },
  methods: {
    wallDetails(index, inndex) {
      this.$router.push({
        name: "curtaindetails",
        params: {
          curtain: this.cartlist[index].curtainCartItems[inndex],
          from: "shoppingcart",
          AddOrNot: false
        }
      });
    },
    //购物车选中一个
    pickOne(product, index, inndex) {
      if (this.checkBoxModel.length == 1) {
        //产品组别
        this.thisGroup = this.cartlist[index].activityGroupType;
        this.cartlist[index].curtainCartItems[inndex].checked = true;
        if (
          this.checkBoxModel.length ==
          this.cartlist[index].curtainCartItems.length
        ) {
          this.checkGroupModel = [];
          this.checkGroupModel.push(this.cartlist[index]);
          this.cartlist[index].checked = true;
        } else {
          this.checkGroupModel = [];
          this.cartlist[index].checked = false;
        }
      } else if (this.cartlist[index].activityGroupType != this.thisGroup) {
        Dialog.alert({
          message: "不同组别的商品不能一起选择，请重新选择"
        }).then(() => {
          this.checkBoxModel = this.checkBoxModel.slice(0, -1);
          this.cartlist[index].curtainCartItems[inndex].checked = false;
        });
      } else {
        if (
          this.checkBoxModel.length ==
          this.cartlist[index].curtainCartItems.length
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
        for (let i = 0; i < group.curtainCartItems.length; i++) {
          this.cartlist[index].curtainCartItems[i].checked = false;
        }
      } else {
        if (this.checkGroupModel.length == 1) {
          if (this.thisGroup == "") {
            this.thisGroup = this.cartlist[index].activityGroupType;
          } else if (this.thisGroup != this.cartlist[index].activityGroupType) {
            Dialog.alert({
              message: "不同组别的商品不能一起选择，请重新选择"
            }).then(() => {
              this.checkGroupModel = this.checkGroupModel.slice(0, -1);
              for (let i = 0; i < group.curtainCartItems.length; i++) {
                this.cartlist[index].curtainCartItems[i].checked = false;
              }
            });
            return;
          }
          this.checkBoxModel = [];
          for (let i = 0; i < group.curtainCartItems.length; i++) {
            this.checkBoxModel.push(
              this.checkGroupModel[0].curtainCartItems[i]
            );
            this.cartlist[index].curtainCartItems[i].checked = true;
          }
          group.checked = true;
        } else if (this.thisGroup != this.cartlist[index].activityGroupType) {
          Dialog.alert({
            message: "不同组别的商品不能一起选择，请重新选择"
          }).then(() => {
            this.checkGroupModel = this.checkGroupModel.slice(0, -1);
            for (let i = 0; i < group.curtainCartItems.length; i++) {
              this.cartlist[index].curtainCartItems[i].checked = false;
            }
          });
        }
      }
    },
    checkActiviyEffect(group) {
      for (let i = 0; i < group.curtainCartItems.length; i++) {
        if (group.curtainCartItems[i].activityEffective == false) return true;
      }
      return false;
    },
    //订单填写
    fillOrder() {
      if (this.checkBoxModel.length == 0) {
        Toast({
          duration: 2000,
          message: "请选择商品"
        });
      } else {
        for (var i = 0; i < this.checkBoxModel.length; i++) {
          let _index = this.checkBoxModel[i].unNullNum;
          let _data = this.checkBoxModel[i].curtainLists[_index]
            .curtainCommodities[0];
          this.checkBoxModel[i].item = new Object();
          this.checkBoxModel[i].item.itemNo = this.checkBoxModel[i].modelNumber;
          this.checkBoxModel[i].item.itemNoSample = !_itemNoSample
            ? this.checkBoxModel[i].modelNumber
            : _itemNoSample;
          this.checkBoxModel[i].item.itemVersion = _data.item.itemVersion;
          this.checkBoxModel[i].item.groupType = "E";
          this.checkBoxModel[i].id = _data.id;
          let _itemNoSample = _data.item.oldItemNo;
          this.checkBoxModel[i].unit = "米";
          this.checkBoxModel[i].quantity = 1;
          this.checkBoxModel[i].newactivityId = this.checkBoxModel[i].activity;
        }
        this.$store.commit("setOrderProduct", this.checkBoxModel);
        this.$router.push({
          name: "fillorder",
          params: {
            isX: true
          }
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
      GetCartItem({
        cid: this.$store.getters.getCId,
        commodityType: "curtain"
      })
        .then(res => {
          this.checkBoxModel = [];
          this.checkGroupModel = [];
          this.thisGroup = "";
          var data = res.data;
          for (let i = 0; i < data.length; ) {
            if (data[i].curtainCartItems.length == 0) {
              data.splice(i, 1);
            } else {
              i++;
            }
          }
          var allData = this.$store.state.allCart;
          allData.curtain = data;
          //添加到购物车列表全局变量
          this.$store.commit("setcart", allData);
          return data;
        })
        .then(cartdata => {
          this.cartlist = cartdata;
          this.isLoading = false;
          this.loading = false;
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
        let deleteUrl = this.orderBaseUrl + "/cart/deleteCartItems.do";
        this.deleteList = [];
        for (var i = 0; i < this.checkBoxModel.length; i++) {
          this.deleteList.push(this.checkBoxModel[i].cartItemId);
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
          }
        });
      }
    }
  },
  computed: {
    //计算总价
    totalPrice: function() {
      this.total = 0;
      for (var i = 0; i < this.checkBoxModel.length; i++) {
        let sub = this.checkBoxModel[i].price * this.checkBoxModel[i].count;
        this.total +=
          Math.round(
            (this.checkBoxModel[i].salPromotion
              ? this.checkBoxModel[i].salPromotion.type == 1
                ? this.checkBoxModel[i].salPromotion.discount * sub
                : this.checkBoxModel[i].salPromotion.price *
                  this.checkBoxModel[i].count
              : sub) * 100
          ) / 100;
      }
      return this.total;
    }
  },
  activated() {
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
