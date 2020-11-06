<template>
  <div class="limitPriceQuery">
    <top :top="set" ref="top"></top>
    <ul class="ulhead">
      <li @click="showType = true">
        <span>版本:</span>
        <span class="licenter">
          <input
            class="commoboxCls"
            type="text"
            v-model="productType"
            disabled
          />
        </span>
      </li>
      <li>
        <span class="search-button" @click="initSearch">查询</span>
      </li>
    </ul>
    <div class="alllists">
      <div class="singleItem" v-for="(item, index) in shopsData" :key="index">
        <table style="width: 100%">
          <tr>
            <td style="width: 20%">版本号:</td>
            <td style="width: 30%">{{ item.ITEM_VERSION }}</td>
            <td style="width: 20%">版本名称:</td>
            <td style="width: 30%">{{ item.PRODUCTVERSION_NAME }}</td>
          </tr>
          <tr>
            <td>产品型号:</td>
            <td style="font-weight: bold">{{ item.ITEM_NO }}</td>
            <td>单位:</td>
            <td>{{ item.UNIT_NAME }}</td>
          </tr>
          <tr>
            <td>长(mm):</td>
            <td>{{ item.LENGTH }}</td>
            <td>宽(mm):</td>
            <td>{{ item.WIDTH }}</td>
          </tr>
          <tr>
            <td>基材类型:</td>
            <td>{{ item.ITEM_NO }}</td>
            <td>财务分类:</td>
            <td>{{ item.UNIT_NAME }}</td>
          </tr>
          <tr>
            <td>非普通出口贸易价:</td>
            <td style="font-weight: bold">{{ item.PRICE_ADVISE_CK2 }}</td>
          </tr>
        </table>
      </div>
    </div>
    <!--底部分页-->
    <van-pagination
      class="fy-bottom"
      v-model="currentPage"
      :page-count="totalPage"
      :total-items="count"
      mode="simple"
      @change="searchData"
    />
    <van-popup v-model="showType" position="bottom" :style="{ height: '75%' }">
      <div class="productCt">
        <van-search
          placeholder="搜索版本"
          v-model="product_filter"
          class="search_1"
        />
        <div class="list_box">
          <van-radio-group
            v-model="productKey"
            ref="checkboxGroup"
            :max="1"
            @change="onConfirmType"
          >
            <van-radio
              class="oneOption"
              v-for="item in filterProductData"
              :name="item.PRODUCTVERSION_ID"
              :key="item.PRODUCTVERSION_ID"
              >{{ item.PRODUCTVERSION_NAME }}</van-radio
            >
          </van-radio-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Pagination, Popup, Search, RadioGroup, Radio } from "vant";
import top from "../../../components/Top";
import {
  GetProductVersionData,
  GetLimitPriceByProVersion,
} from "@/api/itemInfoASP";

export default {
  data() {
    return {
      set: 107,
      showType: false,
      productType: "全部",
      productKey: [],
      productVersionData: [],
      productVersionNameData: [],
      currentPage: 1,
      totalPage: 0,
      limit: 15,
      count: 0,
      shopsData: [],
      product_filter: "",
    };
  },
  components: {
    top,
    [Pagination.name]: Pagination,
    [Popup.name]: Popup,
    [Search.name]: Search,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
  },
  computed: {
    filterProductData() {
      return this.productVersionData.filter((item) => {
        const label = item.PRODUCTVERSION_NAME;
        return (
          label.toLowerCase().indexOf(this.product_filter.toLowerCase()) > -1
        );
      });
    },
  },
  methods: {
    getProductVersion() {
      this.productVersionData = [];
      this.productVersionNameData = [];
      GetProductVersionData().then((res) => {
        this.productVersionData = res.data;
        this.productVersionNameData.push("全部");
        this.productVersionData.forEach((item) => {
          this.productVersionNameData.push(item.PRODUCTVERSION_NAME);
        });
      });
    },
    searchData() {
      this.shopsData = [];
      GetLimitPriceByProVersion({
        productVersion: this.productKey,
        limit: this.limit,
        page: this.currentPage,
      }).then((res) => {
        this.shopsData = res.data;
        this.count = res.count;
        this.totalPage = Math.ceil(this.count / this.limit);
      });
    },
    initSearch() {
      this.currentPage = 1;
      this.searchData();
    },
    onConfirmType(value) {
      var productType_temp = this.productVersionData.filter(
        (item) => item.PRODUCTVERSION_ID == value
      );
      if (productType_temp.length) {
        this.productType = productType_temp[0].PRODUCTVERSION_NAME;
      }
      this.showType = false;
    },
  },
  created() {
    this.getProductVersion();
  },
};
</script>

<style scoped>
.ulhead {
  position: fixed;
  top: 50px;
  line-height: 40px;
  width: 100%;
  height: 40px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 15px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

li {
  display: inline-block;
}
.search-button {
  color: #a0cb8d;
  font-size: 13px;
  padding: 5px 20px;
  border-radius: 15px;
  background: white;
  z-index: 99;
  position: relative;
}
.commoboxCls {
  width: 120px;
  height: 25px;
  line-height: 25px;
  background-color: #ffffff;
  font-size: 13px;
  border: none;
  padding: 0 10px;
  text-align: left;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 120px;
  background-position-y: 7px;
  background-size: 15px;
  text-overflow: ellipsis;
}
.alllists {
  position: fixed;
  width: 100%;
  top: 90px;
  bottom: 50px;
  background: #f8f8f8;
  overflow: scroll;
}
.singleItem {
  position: relative;
  background: white;
  border-radius: 10px;
  margin: 10px;
  font-size: 12px;
  padding: 5px 12px;
}
.singleItem td {
  text-align: left;
}

.productCt {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.search_1 {
  position: relative;
  top: 10px;
}
.list_box {
  margin-top: 10px;
  padding: 5px;
  flex: 1;
  overflow-y: auto;
}
.oneOption {
  margin-top: 5px;
}
</style>
