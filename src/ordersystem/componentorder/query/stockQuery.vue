<template>
  <div class="stockQuery">
    <top :top="set"></top>
    <span class="search-button" @click="initSearch">查询</span>
    <ul class="ulhead">
      <li @click="showType = true">
        <input class="time" type="text" v-model="myType" disabled />
      </li>
      <li>
        <van-field
          class="item_1"
          v-model="myItem"
          placeholder="请输入产品型号"
        />
      </li>
      <li>
        <van-button round class="button" @click="clear">清空</van-button>
      </li>
    </ul>
    <div class="alllists">
      <div
        class="singleItem"
        v-for="(dormitory, index) in itemData"
        :key="index"
      >
        <table>
          <tr>
            <td style="width: 75px">型号:</td>
            <td style="font-weight: bold">{{ dormitory.ITEM_NO }}</td>
            <td style="width: 75px">墙纸规格:</td>
            <td>{{ dormitory.PRODUCT_PAPER_ID | transPaper }}</td>
          </tr>
          <tr>
            <td>毛重（kg）:</td>
            <td>{{ dormitory.GROSS }}</td>
            <td>样版型号:</td>
            <td>{{ dormitory.OLD_ITEM_NO }}</td>
          </tr>
          <tr>
            <td>墙纸基材:</td>
            <td>{{ dormitory.PROPERTY_TYPE_NAME }}</td>
            <td>净重（kg）:</td>
            <td>{{ dormitory.NET_WEIGHT }}</td>
          </tr>
          <tr>
            <td>产品类别:</td>
            <td>{{ dormitory.ITEM_TYPE_1 }}</td>
            <td>墙纸功能:</td>
            <td>{{ dormitory.MARK_TYPE | transMark }}</td>
          </tr>
          <tr>
            <td>拼花:</td>
            <td>{{ dormitory.DUIPIN_NOTE_1 }}</td>
            <td>品牌:</td>
            <td>{{ dormitory.BRAND_NAME }}</td>
          </tr>
          <tr>
            <td>长度（mm）:</td>
            <td>{{ dormitory.LENGTH }}</td>
            <td>拼花尺寸:</td>
            <td>{{ dormitory.DUIPIN_SIZE }}</td>
          </tr>
          <tr>
            <td>最新版本号:</td>
            <td>{{ dormitory.PRODUCTVERSION_NAME }}</td>
            <td>宽度（mm）:</td>
            <td>{{ dormitory.WIDTH }}</td>
          </tr>
          <tr>
            <td>图案:</td>
            <td>{{ dormitory.PATTERN | transPattern }}</td>
            <td>自产代理:</td>
            <td>{{ dormitory.GET_ID | transId }}</td>
          </tr>
          <tr>
            <td>规格:</td>
            <td>{{ dormitory.GRADE }}</td>
            <td>颜色:</td>
            <td>{{ dormitory.COLOUR | transColour }}</td>
          </tr>
          <tr>
            <td>计量单位:</td>
            <td>{{ dormitory.UNIT_NOTE_1 }}</td>
            <td>纸箱规格:</td>
            <td>{{ dormitory.BOX_TYPE }}</td>
          </tr>
          <tr>
            <td>风格:</td>
            <td>{{ dormitory.STYLE | transStyle }}</td>
            <td>备注:</td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="fy-contain">
      <van-pagination
        class="fy-bottom"
        v-model="currentPage"
        :page-count="totalPage"
        :total-items="count"
        mode="simple"
        @change="searchData"
      />
    </div>
    <!--产品类型-->
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        title="产品类型"
        :columns="orderType"
        @confirm="onConfirmType"
        @cancel="cancelType"
      />
    </van-popup>
    <!-- 库存信息 -->
    <van-popup
      v-model="showStock"
      position="bottom"
      :style="{ 'max-height': '75%' }"
      closeable
      close-icon="close"
    >
      <van-panel title="库存信息" style="font-size: 14px">
        <div style="width: 90%; margin: 0 auto">
          <div
            class="singleItem2"
            v-for="(item, index) in stockData"
            :key="index"
          >
            <table>
              <tr>
                <td>仓库名称:</td>
                <td>{{ item.NOTE }}</td>
              </tr>
              <tr>
                <td>型号:</td>
                <td>{{ item.ITEM_NO }}</td>
              </tr>
              <tr>
                <td>批号:</td>
                <td>{{ item.BATCH_NO }}</td>
              </tr>
              <tr>
                <td>版本名称:</td>
                <td>{{ item.PRODUCTVERSION_NAME }}</td>
              </tr>
              <tr>
                <td>库存量:</td>
                <td>{{ item.QTY }}</td>
              </tr>
              <tr>
                <td>已分配量:</td>
                <td v-if="item.QTY_ALLOCATE == 0">{{ item.QTY_ALLOCATE }}</td>
                <td v-else @click="showAllocateClick(item)">
                  <a
                    style=""
                    href="javascript:void(0);"
                    @click="showAllocateClick(item)"
                    >{{ item.QTY_ALLOCATE }}</a
                  >
                </td>
              </tr>
              <tr>
                <td>调整量:</td>
                <td>{{ item.QTY_ADJ }}</td>
              </tr>
              <tr>
                <td>可分配量:</td>
                <td>{{ item.QTY_SUM }}</td>
              </tr>
              <tr>
                <td>库存状态:</td>
                <td>{{ item.STATUS_ID | transStatusId }}</td>
              </tr>
              <tr>
                <td>备注:</td>
                <td>{{ item.NOTES }}</td>
              </tr>
            </table>
            <hr />
          </div>
        </div>
      </van-panel>
    </van-popup>
    <!-- 预留信息 -->
    <van-popup
      v-model="showAllocate"
      position="bottom"
      :style="{ 'max-height': '75%' }"
      closeable
      close-icon="close"
    >
      <van-panel title="库存信息" style="font-size: 14px">
        <div style="width: 90%; margin: 0 auto">
          <div
            class="singleItem2"
            v-for="(item, index) in allocateData"
            :key="index"
          >
            <table>
              <tr>
                <td>型号:</td>
                <td>{{ item.ITEM_NO }}</td>
              </tr>
              <tr>
                <td>批号:</td>
                <td>{{ item.BATCH_NO }}</td>
              </tr>
              <tr>
                <td>库房名称:</td>
                <td>{{ item.NOTE }}</td>
              </tr>
              <tr>
                <td>预留类型:</td>
                <td>{{ item.PRESTAY_TYPE | transPrestayType }}</td>
              </tr>
              <tr>
                <td>预留数量:</td>
                <td>{{ item.PRESTAY_NUMBER }}</td>
              </tr>
              <tr>
                <td>单位:</td>
                <td>{{ item.UNIT_NAME }}</td>
              </tr>
              <tr>
                <td>单据号:</td>
                <td>{{ item.ORDER_ID }}</td>
              </tr>
              <tr>
                <td>预留日期:</td>
                <td>{{ item.DATE_START | datatrans }}</td>
              </tr>
              <tr>
                <td>预留期限:</td>
                <td>{{ item.DATE_LIMIT | datatrans }}</td>
              </tr>
              <tr>
                <td>说明:</td>
                <td>{{ item.NOTES }}</td>
              </tr>
            </table>
            <hr />
          </div>
        </div>
      </van-panel>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import {
  DatetimePicker,
  Popup,
  Picker,
  Pagination,
  Toast,
  Field,
  Button,
  Panel,
} from "vant";
import {
  GetItemByProductType,
  GetStockByUser,
  GetStockByItemNo,
  GetStockDataByItemNoAndUser,
  GetAllocatByItemAndBatch,
} from "@/api/itemInfoASP";
export default {
  name: "stockQuery",
  data() {
    return {
      myItem: "NVP360603", //产品型号初始值
      set: 90,
      ksData: "",
      ksDataSet: "", //  开始时间
      showks: false, //开始时间组件显示
      showjs: false, //结束时间组件显示
      jsData: "",
      jsDataSet: "", //结束时间
      myType: "全部", //当前状态
      myTypeCode: "",
      showType: false, //状态选择显示
      showItem: false, //
      orderType: [
        "全部",
        "墙纸",
        "墙纸/布胶",
        "墙纸粉",
        "其他",
        "代理墙布",
        "版本",
        "布艺",
        "代理墙纸",
        "打样",
        "宽幅墙布",
        "基膜",
        "宽幅墙纸",
        "无纺墙布",
        "宽幅无纺墙纸",
        "广告产品",
      ],
      //当前页数
      currentPage: 1,
      //总页数
      totalPage: 0,
      page_count: 3,
      stockData: [], //库存信息
      stockIds: [],
      productType: "", //产品类型查询初始值
      itemData: [], //初始表格为空
      limit: 15,
      count: 0,
      showStock: false,
      showAllocate: false,
      allocateData: [],
    };
  },
  components: {
    top,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Button.name]: Button,
    [Panel.name]: Panel,
  },
  filters: {
    datatrans(value) {
      //时间戳转化大法
      if (value == null || value == "9999/12/31 00:00:00") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    transType(value) {
      switch (value) {
        case "0":
          return "全部";
          break;
        case "W":
          return "墙纸";
          break;
        case "G":
          return "墙纸/布胶";
        case "P":
          return "墙纸粉";
        case "T":
          return "其他";
        case "C":
          return "代理墙布";
        case "V":
          return "版本";
        case "BY":
          return "布艺";
        case "H":
          return "代理墙纸";
        case "DY":
          return "打样";
        case "F":
          return "宽幅墙布";
        case "J":
          return "基膜";
        case "A":
          return "宽幅墙纸";
        case "E":
          return "无纺墙布";
        case "AV":
          return "宽幅无纺墙纸";
        case "K":
          return "广告商品";
          break;
      }
    },
    transPattern(value) {
      switch (value) {
        case "01":
          return "大马士革";
        case "02":
          return "花草";
        case "03":
          return "条纹几何";
        case "04":
          return "抽象";
        case "05":
          return "迪士尼";
        case "06":
          return "另类";
        case "07":
          return "欧式卷草纹";
          break;
      }
    },
    transColour(value) {
      switch (value) {
        case "01":
          return "灰白";
        case "02":
          return "青色";
        case "03":
          return "棕色";
        case "04":
          return "金色";
        case "05":
          return "银色";
        case "06":
          return "红色";
        case "07":
          return "粉色";
        case "08":
          return "黄色";
        case "09":
          return "绿色";
        case "10":
          return "蓝色";
        case "11":
          return "紫色";
        case "12":
          return "橙色";
          break;
      }
    },
    transStyle(value) {
      switch (value) {
        case "01":
          return "欧式风格";
        case "02":
          return "田园风格";
        case "03":
          return "迪士尼";
        case "04":
          return "现代简约";
        case "05":
          return "另类风格";
        case "06":
          return "新东方风格";
        case "07":
          return "新古典风格";
        case "08":
          return "青少年风格";
        case "09":
          return "美式风格";
          break;
      }
    },
    transPaper(value) {
      switch (value) {
        case "F":
          return "280CM";
        case "E":
          return "130CM";
        case "J":
          return "70CM";
        case "B":
          return "花边";
        case "P":
          return "墙身";
        case "D":
          return "138CM";
        case "F":
          return "106CM";
        case "C":
          return "93CM";
          break;
      }
    },
    transMark(value) {
      switch (value) {
        case "M":
          return "防霉";
        case "S":
          return "除甲醛";
        case "Z":
          return "阻燃+防霉";
        case "W":
          return "双重防霉+除甲醛";
        case "Y":
          return "吸放湿+防霉";
        case "T":
          return "除臭+防霉";
        case "Q":
          return "负离子+防霉";
        case "R":
          return "阻燃";
        case "K":
          return "抗菌";
        case "N":
          return "普通";
          break;
      }
    },
    transId(value) {
      switch (value) {
        case "A":
          return "自产产品";
        case "B":
          return "采购产品";
        case "C":
          return "代购产品";
        case "D":
          return "代理产品";
        case "E":
          return "委外加工产品";
        case "F":
          return "委外生产产品";
          break;
      }
    },
    transStatusId(value) {
      switch (value) {
        case "Y":
          return "可用";
        case "F":
          return "封存";
        case "S":
          return "试验";
        case "T":
          return "淘汰";
          break;
      }
    },
    transPrestayType(value) {
      switch (value) {
        case "C":
          return "订货";
        case "P":
          return "提货";
        case "CJLL":
          return "车间领料";
        case "DYLL":
          return "打样领料";
        case "Z":
          return "转库";
        case "D":
          return "调拔";
        case "XQJH":
          return "改包装计划";
        case "GBZLL":
          return "改包装领料";
        case "JYZK":
          return "检验转库";
        case "SH":
          return "损耗预留";
        case "W":
          return "委外预留";
          break;
      }
    },
  },
  methods: {
    cancelType() {
      this.showType = false;
    },
    //状态选择
    onConfirmType(index) {
      this.myType = index;
      if (this.myType == "全部") {
        this.myTypeCode = "";
      } else if (this.myType == "墙纸") {
        this.myTypeCode = "W";
      } else if (this.myType == "墙纸/布胶") {
        this.myTypeCode = "G";
      } else if (this.myType == "墙纸粉") {
        this.myTypeCode = "P";
      } else if (this.myType == "其他") {
        this.myTypeCode = "T";
      } else if (this.myType == "代理墙布") {
        this.myTypeCode = "C";
      } else if (this.myType == "版本") {
        this.myTypeCode = "V";
      } else if (this.myType == "布艺") {
        this.myTypeCode = "BY";
      } else if (this.myType == "代理墙纸") {
        this.myTypeCode = "H";
      } else if (this.myType == "打样") {
        this.myTypeCode = "DY";
      } else if (this.myType == "宽幅墙布") {
        this.myTypeCode = "F";
      } else if (this.myType == "基膜") {
        this.myTypeCode = "J";
      } else if (this.myType == "宽幅墙纸") {
        this.myTypeCode = "A";
      } else if (this.myType == "无纺墙布") {
        this.myTypeCode = "E";
      } else if (this.myType == "宽幅无纺墙纸") {
        this.myTypeCode = "AV";
      } else if (this.myType == "广告产品") {
        this.myTypeCode = "K";
      }
      this.showType = false;
    },

    // 时间戳转换为固定格式时间
    exchangeTime(time) {
      var date = new Date(time);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      return Y + M + D;
    },
    //用户权限
    _GetStockByUser() {
      this.stockIds = [];
      var data = {
        userid: this.$store.state.info.data.userId,
      };
      GetStockByUser(data).then((res) => {
        if (res.data.length != 0) {
          for (var i = 0; i < res.data.length; i++) {
            this.stockIds.push(res.data[i].STOCK_NO);
          }
        } else {
          Toast({
            duration: 2000,
            message: "未分配仓库权限，请联系管理员",
          });
        }
      });
    },
    initSearch() {
      this.currentPage = 1;
      this.searchData();
    },
    searchData() {
      this.itemData = [];
      var data = {
        productType: this.myTypeCode, //产品类型
        limit: this.limit, //限制数
        page: this.currentPage, //页数
        stockIds: this.stockIds, //仓库号
        find: this.myItem,
      };
      GetItemByProductType(data)
        .then((res) => {
          this.itemData = res.data;
          this.count = res.count;
          this.totalPage = Math.ceil(this.totalLists / this.pageSize);
          if (this.count == 1) {
            this.KC_CP_SC(res.data[0]);
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //清空
    clear() {
      this.myType = "全部";
      this.myTypeCode = "";
      this.value = "";
      this.search = "";
      this.itemData = [];
      this.stockData = [];
      this.showStock = false; //库存信息显示
      this.count = 0;
      this.currentPage = 1;
      this.myItem = "";
    },
    //点击行的事件
    KC_CP_SC(val) {
      this.stockData = [];
      var data_1 = {
        itemNo: val.ITEM_NO,
        userid: this.$store.state.info.data.userId,
      };
      //按行查询库存
      GetStockDataByItemNoAndUser(data_1)
        .then((res) => {
          this.stockData = res.data;
          this.showStock = true; //库存信息显示
        })
        .catch((res) => {
          console.log(res);
        });
    },
    showAllocateClick(item) {
      this.allocateData = [];
      GetAllocatByItemAndBatch({
        itemNo: item.ITEM_NO,
        batchNo: item.BATCH_NO,
      })
        .then((res) => {
          this.allocateData = res.data;
          this.showAllocate = true;
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
  created() {
    this._GetStockByUser();
  },
};
</script>

<style scoped>
.button {
  background: #8bc34a;
  height: 29px;
  width: 67px;
  text-align: center;
  line-height: 5px;
  color: rgb(255, 255, 255);
}
.item_1 {
  margin-top: 3px;
  width: 140px;
  height: 33px;
  border: none;
  font-size: 10px;
  line-height: 5px;
  text-align: center;
}
.stockQuery {
  background-color: rgb(239, 239, 239);
  height: 100vh;
  position: relative;
  overflow: scroll;
}
.search-button {
  position: fixed;
  top: 13px;
  right: 15px;
  color: #a0cb8d;
  font-size: 13px;
  padding: 5px 20px;
  border-radius: 15px;
  background: white;
  z-index: 99;
}

.ulhead {
  position: fixed;
  top: 50px;
  line-height: 37px;
  width: 100%;
  height: 38px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  font-size: 15px;
  z-index: 999;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

li {
  display: inline-block;
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
.singleItem2 td {
  text-align: left;
}
input {
  background-color: hsla(0, 0%, 100%, 0.3);
  border-radius: 3.467vw;
  outline: none;
  border: none;
  text-decoration: none;
  height: 25px;
  line-height: 25px;
}

.time {
  width: 100px;
  height: 25px;
  line-height: 20px;
  background-color: hsl(0, 0%, 100%);
  font-size: 13px;
  padding-left: 15px;
  text-align: left;
  background-image: url("../../assetsorder/time-zk.png");
  background-repeat: no-repeat;
  background-position-x: 90px;
  background-position-y: 2vw;
  background-size: 15px;
}
.table_1 {
  border-collapse: collapse;
  border: 0px solid black;
}
</style>
