<template>
  <!--参考淘宝购物车-->
  <div class="wall-cart">
    <span class="manage" v-if="!showManage" @click="manageCart">管理</span>
    <span class="manage-completed" v-if="showManage" @click="manageCompleted">完成</span>
    <div class="all-products">
      <div class="single-product" v-for="(group,index) in cartlist" :key="index">
        <div class="category-title">
          <input
            type="checkbox"
            :value="group"
            v-model="checkGroupModel"
            class="qiang"
            @change.stop="pickGroup(group,index)"
          />
          <!--<img class="qiang" src="../../assetsorder/wallCart.png" alt="">-->
          <span class="type">{{group.productGroupType}} - {{group.activityGroupType}}组</span>
          <!--<span class="huodong">{{group.activityGroupType}}</span>-->
          <!--<img class="huodong-icon" src="../../assetsorder/hdCart.png" alt="">-->
        </div>
        <div class="details-content" v-for="(product,inndex) in group.commodities" :key="inndex">
          <!--<van-checkbox class="checkbox" @change="buyThis(product.isbuy,index,inndex)" v-model="product.isbuy"-->
          <!--checked-color="#8cbb44"></van-checkbox>-->
          <!--<input @click="buyThis(product.isbuy,index,inndex)" id="color-input-red" class="checkbox chat-button-location-radio-input" type="checkbox"/>-->
          <!--<label  for="color-input-red"></label >-->
          <input
            type="checkbox"
            :value="product"
            v-model="checkBoxModel"
            class="checkbox"
            @change.stop="pickOne(product,index,inndex)"
          />
          <table @click="wallDetails(index,inndex)">
            <tr>
              <th>型号：</th>
              <td>{{product.item.itemNo}}</td>
            </tr>
            <!--<tr>-->
            <!--<th>名称：</th>-->
            <!--<td>{{product.item.itemVersion }}</td>-->
            <!--</tr>-->
            <tr>
              <th>活动：</th>
              <td>{{product.newactivityId}}</td>
            </tr>
            <tr>
              <th>说明：</th>
              <td>{{product.newsplitShipment}}</td>
            </tr>
            <tr>
              <th>单价：</th>
              <td v-if="showPrice" class="price">￥{{product.price}}</td>
              <td v-else class="price">***</td>
              <!--<td class="product-num">数量：{{product.quantity}}卷</td>-->
            </tr>
            <tr>
              <th>小计：</th>
              <td
                class="price"
                v-if="showPrice && product.quantity"
              >￥{{(product.quantity * product.price).toFixed(2)}}</td>
              <td
                class="price"
                v-else-if="showPrice && !product.quantity"
              >￥{{(product.width * product.height * product.price).toFixed(2)}}</td>
              <td class="price" v-else-if="!showPrice">***</td>
            </tr>
          </table>
          <div class="product-num">
            <span class v-if="product.quantity">数量：{{product.quantity}}{{product.unit}}</span>
            <span class v-if="!product.quantity">数量：{{product.width}}*{{product.height}}平方米</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-bottom">
      <!--<div class="cart-left">-->
      <!--<van-checkbox v-model="allp" @click="allPick(),checkModel()" checked-color="#8cbb44">全选</van-checkbox>-->
      <!--</div>-->
      <div class="cart-right" v-if="!showSubmitCheck&&!showManage">
        <span>合计：</span>
        <span v-if="showPrice" class="total-price">￥{{totalPrice}}</span>
        <span v-else class="total-price">****</span>
        <span class="settle-down" @click="fillOrder">结算</span>
      </div>
      <!--购物车管理-->
      <div class="cart-right" v-if="showManage">
        <span class="delete-cart" @click="deleteCart">删除</span>
      </div>
      <!--窗帘产品提交审核-->
      <div class="cart-right" v-if="showSubmitCheck&&!showManage">
        <span class="submit-check">提交审核</span>
      </div>
    </div>
    <van-loading class="loading" type="spinner" v-if="loading" color="black" />
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import { Stepper, Checkbox, CheckboxGroup } from "vant";
import { Dialog, Toast, Loading } from "vant";

export default {
  name: "wallcart",
  components: {
    top,
    [Stepper.name]: Stepper,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Loading.name]: Loading
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
      //窗帘提交审核
      showSubmitCheck: false,
      allCartList: {},
      //购物车列表
      cartlist: this.$store.getters.getCartlist.soft,
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
      loading: false
    };
  },
  methods: {
    wallDetails(index, inndex) {
      //获取版本号
      let olditemNo = this.cartlist[index].commodities[inndex].item.oldItemNo;
      this.$router.push({
        name: "softdetails",
        params: {
          //墙纸类型,获取墙纸信息
          itemType: this.cartlist[index].commodities[inndex].item.productType,
          itemNo: this.cartlist[index].commodities[inndex].item.itemNo, //模糊查询内容
          commodityID: this.cartlist[index].commodities[inndex].id, //商品条ID
          activityID: this.cartlist[index].commodities[inndex].activityId, //新活动ID
          newactivityID: this.cartlist[index].commodities[inndex].newactivityId, //新活动ID
          quantity: this.cartlist[index].commodities[inndex].quantity, //数量
          width: this.cartlist[index].commodities[inndex].width, //宽度
          height: this.cartlist[index].commodities[inndex].height, //高度
          note: this.cartlist[index].commodities[inndex].note,
          tip: this.cartlist[index].commodities[inndex].newsplitShipment,
          from: "mycart/softcart"
        }
      });
    },
    //购物车选中一个
    pickOne(product, index, inndex) {
      if (this.cartlist[index].commodities[inndex].checked) {
        this.cartlist[index].commodities[inndex].checked = false;
        // product.checked = false;
        //触发全选
        if (
          this.checkBoxModel.length != this.cartlist[index].commodities.length
        ) {
          this.checkGroupModel = [];
          this.cartlist[index].checked = false;
        }
        if (this.checkBoxModel.length == 0) {
          this.thisGroup = "";
        }
      } else {
        // product.checked = true;
        if (this.checkBoxModel.length == 1) {
          //产品组别
          // this.productType = this.cartlist[index].productGroupType
          this.thisGroup = this.cartlist[index].cartItemId;
          this.cartlist[index].commodities[inndex].checked = true;
          if (
            this.checkBoxModel.length == this.cartlist[index].commodities.length
          ) {
            this.checkGroupModel = [];
            this.checkGroupModel.push(this.cartlist[index]);
            this.cartlist[index].checked = true;
          }
        } else if (this.cartlist[index].cartItemId != this.thisGroup) {
          this.checkBoxModel.pop();
          Dialog.alert({
            message: "不同组别的商品不能一起选择，请重新选择"
          }).then(() => {
            // on close
            this.cartlist[index].commodities[inndex].checked = false;
          });
        } else if (
          this.checkBoxModel.length == this.cartlist[index].commodities.length
        ) {
          this.checkGroupModel = [];
          this.checkGroupModel.push(this.cartlist[index]);
          this.cartlist[index].checked = true;
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
              // on close
              this.checkGroupModel.pop();
              for (let i = 0; i < group.commodities.length; i++) {
                // this.checkBoxModel.pop();
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
          this.checkGroupModel.pop();
          Dialog.alert({
            message: "不同组别的商品不能一起选择，请重新选择"
          }).then(() => {
            // on close
            for (let i = 0; i < group.commodities.length; i++) {
              this.cartlist[index].commodities[i].checked = false;
            }
          });
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
      if (this.$route.path == "/cart/curtaincart") {
        this.showSubmitCheck = true;
      } else {
        this.showSubmitCheck = false;
      }
    },
    //替换所有活动
    thhd() {
      for (var i = 0; i < this.cartlist.length; i++) {
        //是否全选一组标志
        this.cartlist[i].checked = false;
        for (var j = 0; j < this.cartlist[i].commodities.length; j++) {
          //自定义一个是否选中标志
          this.cartlist[i].commodities[j].checked = false;
        }
      }
    },
    cartList() {
      this.loading = true;
      let cartUrl =
        this.orderBaseUrl +
        "/cart/getAllCartByCID.do?" +
        "CID=" +
        this.$store.getters.getCId;
      axios
        .post(cartUrl)
        .then(data => {
          this.loading = false;
          Toast.success("删除成功");
          //过滤
          for (let i = 0; i < data.data.cartItems.wallpaper.length; ) {
            if (data.data.cartItems.wallpaper[i].commodities.length == 0) {
              data.data.cartItems.wallpaper.splice(i, 1);
            } else {
              i++;
            }
          }
          for (let i = 0; i < data.data.cartItems.soft.length; ) {
            if (data.data.cartItems.soft[i].commodities.length == 0) {
              data.data.cartItems.soft.splice(i, 1);
            } else {
              i++;
            }
          }
          //一个对象
          this.allCartList = data.data.cartItems;
          //添加到购物车列表全局变量
          this.$store.commit("setcart", this.allCartList);
          return this.allCartList;
        })
        .then(cartdata => {
          //活动组转换为中文
          // for (let i = 0; i < cartdata.wallpaper.length; i++) {
          //   let hdUrl = "http://106.13.32.172:8080/yulan-order/activityGroupType/getActivityGroupTypeByName.do?" +
          //     "name=" + cartdata.wallpaper[i].activityGroupType
          //   axios.post(hdUrl).then(
          //     (data) => {
          //       console.log(data.data.value)
          //       cartdata.wallpaper[i].activityGroupType = data.data.value
          //     }
          //   )
          //   let cpURL = "http://106.13.32.172:8080/yulan-order/productGroupType/getProductGroupTypeByName.do?" +
          //     "name=" + cartdata.wallpaper[i].productGroupType
          //   axios.post(cpURL).then(
          //     (data) => {
          //       console.log(data.data.value)
          //       cartdata.wallpaper[i].productGroupType = data.data.value
          //     }
          //   )
          // }
          // for (let i = 0; i < cartdata.soft.length; i++) {
          //   let hdUrl = "http://106.13.32.172:8080/yulan-order/activityGroupType/getActivityGroupTypeByName.do?" +
          //     "name=" + cartdata.soft[i].activityGroupType
          //   axios.post(hdUrl).then(
          //     (data) => {
          //       console.log(data.data.value)
          //       cartdata.soft[i].activityGroupType = data.data.value
          //     }
          //   )
          //   let cpURL = "http://106.13.32.172:8080/yulan-order/productGroupType/getProductGroupTypeByName.do?" +
          //     "name=" + cartdata.soft[i].productGroupType
          //   axios.post(cpURL).then(
          //     (data) => {
          //       console.log(data.data.value)
          //       cartdata.soft[i].productGroupType = data.data.value
          //     }
          //   )
          // }
          return cartdata;
        })
        .then(cartdata => {
          //单个活动转换为中文
          let hdArray = [];
          for (let i = 0; i < cartdata.wallpaper.length; i++) {
            for (let j = 0; j < cartdata.wallpaper[i].commodities.length; j++) {
              if (cartdata.wallpaper[i].commodities[j].activityId != null) {
                hdArray.push(cartdata.wallpaper[i].commodities[j].activityId);
              }
            }
          }
          console.log(hdArray);
          let hdArrayUrl =
            this.orderBaseUrl + "/salPromotion/getSalPromotionsByIDs.do";
          axios.post(hdArrayUrl, hdArray).then(hdRes => {
            let hdlength = 0;
            for (let i = 0; i < cartdata.wallpaper.length; i++) {
              for (
                let j = 0;
                j < cartdata.wallpaper[i].commodities.length;
                j++
              ) {
                if (cartdata.wallpaper[i].commodities[j].activityId == null) {
                  cartdata.wallpaper[i].commodities[j].newactivityId =
                    "未选择活动";
                } else {
                  cartdata.wallpaper[i].commodities[j].newactivityId =
                    hdRes.data[hdlength++];
                }
                if (cartdata.wallpaper[i].commodities[j].splitShipment == 0) {
                  cartdata.wallpaper[i].commodities[j].newsplitShipment =
                    "等生产";
                } else if (
                  cartdata.wallpaper[i].commodities[j].splitShipment == 1
                ) {
                  cartdata.wallpaper[i].commodities[j].newsplitShipment =
                    "分批出货";
                } else {
                  cartdata.wallpaper[i].commodities[j].newsplitShipment = "--";
                }
              }
              //增加一个产品组字段
              // cartdata.wallpaper[i].commodities[j].newProductType = cartdata.wallpaper[i].productGroupType
            }
          });
          //单个活动转换为中文
          let rzArray = [];
          for (let i = 0; i < cartdata.soft.length; i++) {
            for (let j = 0; j < cartdata.soft[i].commodities.length; j++) {
              if (cartdata.soft[i].commodities[j].activityId != null) {
                rzArray.push(cartdata.soft[i].commodities[j].activityId);
              }
            }
          }
          let rzArrayUrl =
            this.orderBaseUrl + "/salPromotion/getSalPromotionsByIDs.do";
          axios
            .post(rzArrayUrl, rzArray)
            .then(hdRes => {
              let hdlength = 0;
              for (let i = 0; i < cartdata.soft.length; i++) {
                for (let j = 0; j < cartdata.soft[i].commodities.length; j++) {
                  if (cartdata.soft[i].commodities[j].activityId == null) {
                    cartdata.soft[i].commodities[j].newactivityId =
                      "未选择活动";
                  } else {
                    cartdata.soft[i].commodities[j].newactivityId =
                      hdRes.data[hdlength++];
                  }
                  if (cartdata.soft[i].commodities[j].splitShipment == 0) {
                    cartdata.soft[i].commodities[j].newsplitShipment = "等生产";
                  } else if (
                    cartdata.soft[i].commodities[j].splitShipment == 1
                  ) {
                    cartdata.soft[i].commodities[j].newsplitShipment =
                      "分批出货";
                  } else {
                    cartdata.soft[i].commodities[j].newsplitShipment = "--";
                  }
                }
                //增加一个产品组字段
                // cartdata.soft[i].commodities[j].newProductType = cartdata.soft[i].productGroupType
              }
              return cartdata;
            })
            .then(hd => {
              this.cartlist = hd.soft;
            });
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
        let deleteUrl =
          this.orderBaseUrl + "/yulan-order/cart/deleteCommodities.do";
        this.deleteList = [];
        for (var i = 0; i < this.checkBoxModel.length; i++) {
          this.deleteList.push(this.checkBoxModel[i].id);
        }
        let data = this.checkBoxModel;
        axios.post(deleteUrl, this.deleteList).then(data => {
          if (data.data.code == 0) {
            //重新请求一次购物车列表
            this.cartlist = [];
            this.cartList();
            Toast.success("删除成功");
            this.checkGroupModel = [];
            this.checkBoxModel = [];
            this.thisGroup = "";
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
          this.total +=
            this.checkBoxModel[i].price * this.checkBoxModel[i].quantity;
        } else {
          this.total +=
            this.checkBoxModel[i].price *
            this.checkBoxModel[i].width *
            this.checkBoxModel[i].height;
        }
      }
      return this.total.toFixed(2);
    }
  },
  created() {
    this.isShowPrice();
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
  margin: 80px 5px 100px 5px;
  padding: 10px 10px;
}

.single-product {
  position: relative;
  /*height: 175px;*/
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
  margin-right: 40px;
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
  margin-right:10px;
  margin-bottom: 5px;
  font-size: 14px;
  padding: 10px;
  /* border-bottom: 1px solid #f2f2f2; */
  box-shadow: 0 0 5px 0 darkgray;
}

td {
  text-align: left;
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
