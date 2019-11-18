<template>
  <div class="search-order">
    <div class="searchtop">
      <van-search
        class="search-more"
        v-model="inputValue"
        background="linear-gradient(to right, #BEDD81, #87CA81)"
        placeholder="输入窗帘型号"
        show-action
        @search="onSearchWall"
      >
        <div slot="action" @click="onSearchWall(inputValue)" style="color: white">搜索</div>
      </van-search>
      <div class="img" @click="back"></div>
    </div>
    <div class="search-result">
      <div class="single-wall" v-for="(singleCurtain,index) in allCurtain" :key="index">
        <table width="100%">
          <tr>
            <th width="35%">窗帘款式：</th>
            <td>{{singleCurtain.itemNo}}</td>
          </tr>
          <tr>
            <th>成品宽*成品高：</th>
            <td>
              <input
                v-model="singleCurtain.width"
                type="number"
                class="curtain-width"
                placeholder="0.00"
                oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
              />╳
              <input
                v-model="singleCurtain.height"
                type="number"
                class="curtain-width"
                placeholder="0.00"
                oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
              />
            </td>
          </tr>
          <tr v-show="singleCurtain.wbhFlag == '1'">
            <th>帘外包宽度：</th>
            <td>
              <input
                v-model="singleCurtain.lwbWidth"
                type="number"
                class="curtain-width"
                placeholder="0.00"
                oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
              />
            </td>
            <td class="need-head">
              <van-checkbox v-model="singleCurtain.isNeed" checked-color="#89cb81">需要</van-checkbox>
            </td>
          </tr>
          <tr @click="selectzzbs(index)">
            <th>褶皱倍数：</th>
            <td>
              <input class="select-multiple" disabled v-model="singleCurtain.multiple" />
              <img style="width:15px;height:15px;" src="../assetsorder/more.png" alt />
            </td>
          </tr>
          <tr @click="selecthd(index)">
            <th>活动：</th>
            <td>
              <input
                class="select-multiple"
                disabled
                :value="changeActivi(singleCurtain.activity,index)"
              />
              <img style="width:15px;height:15px;" src="../assetsorder/more.png" alt />
            </td>
          </tr>
          <tr>
            <th>位置：</th>
            <td>
              <input
                class="myposition"
                placeholder="选填"
                v-model="singleCurtain.myposition"
                @input="oninput($event,index)"
              />
            </td>
          </tr>
        </table>
        <span class="show-kucun" @click.stop="selectThis(index)">选择此款</span>
        <!--选择褶皱倍数-->
        <div class="show-multiple" @click="noShowMul(index)">
          <van-popup v-model="singleCurtain.showMultiple">
            <van-radio-group v-model="singleCurtain.multiple">
              <van-cell-group>
                <van-cell title="1.8" clickable @click="singleCurtain.multiple = '1.8' ">
                  <van-radio name="1.8" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="1.9" clickable @click="singleCurtain.multiple = '1.9' ">
                  <van-radio name="1.9" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.0" clickable @click="singleCurtain.multiple = '2.0' ">
                  <van-radio name="2.0" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.1" clickable @click="singleCurtain.multiple = '2.1'">
                  <van-radio name="2.1" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.2" clickable @click="singleCurtain.multiple = '2.2'">
                  <van-radio name="2.2" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.3" clickable @click="singleCurtain.multiple = '2.3'">
                  <van-radio name="2.3" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.4" clickable @click="singleCurtain.multiple = '2.4'">
                  <van-radio name="2.4" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.5" clickable @click="singleCurtain.multiple = '2.5'">
                  <van-radio name="2.5" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.6" clickable @click="singleCurtain.multiple = '2.6'">
                  <van-radio name="2.6" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.7" clickable @click="singleCurtain.multiple = '2.7'">
                  <van-radio name="2.7" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.8" clickable @click="singleCurtain.multiple = '2.8'">
                  <van-radio name="2.8" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="2.9" clickable @click="singleCurtain.multiple = '2.9'">
                  <van-radio name="2.9" checked-color="#89cb81" />
                </van-cell>
                <van-cell title="3.0" clickable @click="singleCurtain.multiple = '3.0'">
                  <van-radio name="3.0" checked-color="#89cb81" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
            <!--<div class="comfirm-bottom" @click="comfirmMultiple">-->
            <!--<span>确定</span>-->
            <!--</div>-->
          </van-popup>
        </div>
        <van-popup v-model="singleCurtain.showActivity">
          <van-radio-group v-model="singleCurtain.activity">
            <van-cell-group>
              <template v-for="(hdg,indexx) in activityOptions[index]">
                <van-cell
                  :key="indexx +'hdground' +  indexx"
                  clickable
                  @click="selectthisHd(index,indexx)"
                >
                  <div style="text-align:center">
                    <span>{{hdg.label}}</span>
                    <van-radio
                      style="display:inline-block"
                      :name="hdg.value"
                      checked-color="#89cb81"
                    />
                  </div>
                </van-cell>
              </template>
            </van-cell-group>
          </van-radio-group>
        </van-popup>
      </div>
      <!--<div v-show="resN">-->
      <!--暂无查询结果-->
      <!--</div>-->
    </div>
    <!--底部分页-->
    <div class="fy-contain" v-show="hidshow">
      <van-pagination
        class="fy-bottom"
        v-model="currentPage"
        :page-count="totalPage"
        :items-per-page="itemsPerPage"
        :total-items="totalLists"
        mode="simple"
        @change="changePage"
      />
    </div>
    <!--<navBottom v-show="hidshow"></navBottom>-->
  </div>
</template>

<script>
import axios from "axios";
import {
  Search,
  ActionSheet,
  Toast,
  Checkbox,
  CheckboxGroup,
  Popup,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Pagination,
  Dialog
} from "vant";
import "../assetsorder/actionsheet.css";
import { getItemById, GetPromotionByItem } from "@/api/orderListASP";
import navBottom from "../../components/navBottom";

export default {
  name: "",
  data() {
    return {
      //搜索框输入值
      inputValue: "",
      showSearch: true, //是否显示历史搜索结果
      // historySearch:localStorage.historyItems.split("|"),//历史搜索内容
      //是否有查询结果
      resY: false,
      resN: false,
      allCurtain: [],
      needHead: false, //是否需要帘头外包
      // showMultiple: false, //选择褶皱倍数
      multiple: 2.0, //褶皱倍数
      myhd: "请选择活动",
      myposition: "",
      //当前页数
      currentPage: 1,
      //总页数
      totalPage: 0,
      //总记录数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 10,
      //通过页数来判断change是执行哪个函数
      pageMark: 0,
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      activityGroup: [],
      activityOptions: [],
      isActivity: []
    };
  },
  components: {
    [Search.name]: Search,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Pagination.name]: Pagination,
    [Dialog.name]: Dialog,
    navBottom
  },
  filters: {
    calLength(str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        } else {
          len += 2;
        }
      }
      return len;
    }
  },
  methods: {
    oninput(e, index) {
      var that = this;
      var length = this.$options.filters.calLength(e.target.value);
      if (length > 20) {
        e.target.value = e.target.value.slice(0, 20);
      }
      that.allCurtain[index].myposition = e.target.value;
    },
    back() {
      this.$router.push({
        path: "/shopstore"
      });
    },
    //窗帘模糊查询
    onSearchWall(inputValue) {
      this.allCurtain = [];
      this.inputValue = inputValue;
      let wallUrl = this.orderBaseUrl + "/item/getCurtainBySearch.do";
      let data = {
        itemNo: inputValue,
        limit: 10, //限制条数
        page: this.currentPage //页数
      };
      axios.post(wallUrl, data).then(data => {
        if (data.data.code == 1) {
        } else if (data.data.code == 0) {
          this.allCurtain = data.data.data;
          if (this.allCurtain.length == 0) {
            this.allCurtain = [];
            this.currentPage = 1;
            this.totalPage = 1;
            Toast({
              duration: 2000,
              message: "暂无查询结果"
            });
          } else {
            //总页数
            // this.currentPage = 1
            this.allCurtain = data.data.data;
            this.getActivity();
            this.totalPage = Math.ceil(this.allCurtain[0].total / 10);
            for (let i = 0; i < this.allCurtain.length; i++) {
              this.allCurtain[i].multiple = "2.2";
              this.allCurtain[i].width = "";
              this.allCurtain[i].height = "";
              this.allCurtain[i].lwbWidth = "";
              this.$set(this.$data.allCurtain[i], "isNeed", false);
              this.$set(this.$data.allCurtain[i], "showMultiple", false);
              this.$set(this.$data.allCurtain[i], "showActivity", false);
              this.allCurtain[i].activity = "";
              this.allCurtain[i].myposition = "";
            }
          }
        }
      });
      this.showSearch = false;
    },
    getCurtainXh() {
      this.allCurtain = [];
      let url = this.orderBaseUrl + "/item/getCurtainType.do";
      let data = {
        limit: 10, //限制条数
        page: this.currentPage //页数
      };
      axios.post(url, data).then(res => {
        this.allCurtain = res.data.data;
        this.getActivity();
        this.totalLists = res.data.data[0].total;
        this.pageMark = Math.ceil(this.allCurtain[0].total / 10);
        //获取总页数
        this.totalPage = Math.ceil(this.totalLists / 10);
        for (let i = 0; i < this.allCurtain.length; i++) {
          this.allCurtain[i].multiple = "2.2";
          this.allCurtain[i].width = "";
          this.allCurtain[i].height = "";
          this.allCurtain[i].lwbWidth = "";
          this.$set(this.$data.allCurtain[i], "isNeed", false);
          this.$set(this.$data.allCurtain[i], "showMultiple", false);
          this.$set(this.$data.allCurtain[i], "showActivity", false);
          this.allCurtain[i].activity = "";
          this.allCurtain[i].myposition = "";
        }
      });
    },
    async getActivity() {
      this.activityOptions = [];
      this.isActivity = [];
      for (let i = 0; i < this.allCurtain.length; i++) {
        var defaultSel = {
          pri: 0,
          id: 0
        };
        let itemRes = await getItemById(
          { itemNo: this.allCurtain[i].itemNo },
          { loading: false }
        );
        let res = await GetPromotionByItem(
          {
            cid: this.$store.getters.getCId,
            customerType: this.$store.getters.getCtype,
            itemNo: itemRes.data.ITEM_NO,
            itemVersion: itemRes.data.ITEM_VERSION,
            productType: itemRes.data.PRODUCT_TYPE,
            productBrand: itemRes.data.PRODUCT_BRAND
          },
          { loading: false }
        );
        if (res.data.length === 0) this.isActivity.push(true);
        else this.isActivity.push(false);
        let _obj = [];

        for (var j = 0; j < res.data.length; j++) {
          var obj = {
            label: res.data[j].ORDER_TYPE + " -- " + res.data[j].ORDER_NAME,
            value: res.data[j].P_ID
          };
          var obj1 = {
            pId: res.data[j].P_ID,
            groupType: res.data[j].GROUP_TYPE
          };
          if (res.data[j].PRIORITY != 0 && defaultSel.pri == 0) {
            defaultSel.pri = res.data[j].PRIORITY;
            defaultSel.id = res.data[j].P_ID;
          } else if (
            res.data[j].PRIORITY != 0 &&
            defaultSel.pri > res.data[j].PRIORITY
          ) {
            defaultSel.pri = res.data[j].PRIORITY;
            defaultSel.id = res.data[j].P_ID;
          }
          let re = this.activityGroup.some(i => i.pId === obj1.pId);
          if (re === false) this.activityGroup.push(obj1);
          _obj.push(obj);
        }
        _obj.push({
          label: "不参与活动",
          value: ""
        });
        this.activityOptions.push(_obj);

        if (defaultSel.pri != 0 && this.allCurtain[i]) {
          this.allCurtain[i].activity = defaultSel.id;
          this.$set(this.allCurtain, i, this.allCurtain[i]);
        }
      }
    },
    //改变页数
    changePage() {
      if (this.pageMark == this.totalPage) {
        this.getCurtainXh();
      } else {
        this.onSearchWall(this.inputValue);
      }
    },
    comfirmMultiple() {
      this.showMultiple = false;
    },
    //选择褶皱倍数
    selectzzbs(index) {
      this.allCurtain[index].showMultiple = true;
    },
    selecthd(index) {
      if (!this.isActivity[index]) {
        this.allCurtain[index].showActivity = true;
      }
    },
    selectthisHd(index, indexx) {
      this.allCurtain[index].showActivity = false;
      this.allCurtain[index].activity = this.activityOptions[index][
        indexx
      ].value;
    },
    //选择此款
    selectThis(index) {
      let arr = [];
      let str = "";
      if (this.allCurtain[index].width === "") {
        arr.push("宽度");
      }
      if (this.allCurtain[index].height === "") {
        arr.push("高度");
      }
      if (this.allCurtain[index].multiple === "") {
        arr.push("褶皱倍数");
      }
      if (arr.length !== 0) {
        str = arr.join("、");
        Dialog.alert({
          message: `请确保产品${this.allCurtain[index].itemNo}的${str}已经输入!!`
        });
        return;
      }
      if (
        this.allCurtain[index].wbhFlag === "1" &&
        this.allCurtain[index].isNeed === false &&
        this.allCurtain[index].lwbWidth !== ""
      ) {
        Dialog.alert({
          message: "在填写了帘外包宽度的情况下，请勾选前面的按钮!!"
        });
        return;
      }
      if (
        this.allCurtain[index].wbhFlag === "1" &&
        this.allCurtain[index].isNeed === true &&
        this.allCurtain[index].lwbWidth === ""
      ) {
        Dialog.alert({
          message: "在勾选了帘外包的情况下，帘外包宽度不能为空!!"
        });
        return;
      }
      var groupType;
      this.activityGroup.forEach(item => {
        if (item.pId === this.allCurtain[index].activity) {
          groupType = item.groupType;
        }
      });
      this.$router.push({
        name: "curtaindetails",
        params: {
          itemNo: this.allCurtain[index].itemNo,
          width: this.allCurtain[index].width, //成品宽度
          height: this.allCurtain[index].height, //成品高度
          WBH: this.allCurtain[index].lwbWidth, //帘头外包盒宽度
          isWBH: this.allCurtain[index].isNeed,
          multiple: this.allCurtain[index].multiple, //褶皱倍数
          location: this.allCurtain[index].myposition,
          activity: this.allCurtain[index].activity,
          groupType: groupType,
          from: "searchcurtain",
          AddOrNot: true
        }
      });
    },
    noShowMul(index) {
      this.allCurtain[index].showMultiple = false;
    }
  },
  created() {
    this.getCurtainXh();
  },
  computed: {
    filteredProduct() {
      return this.products.filter(product => {
        return product.type.match(this.inputValue);
      });
    },
    //获取用户cid
    CID() {
      return this.$store.state.info.data.loginName;
    },
    changeActivi() {
      return function(id, index) {
        if (id) {
          return this.activityOptions[index].find(item => item.value == id)
            .label;
        } else {
          if (this.isActivity[index]) {
            return "此产品不参与活动";
          } else {
            return "不参与活动";
          }
        }
      };
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
.search-order {
  height: 100vh;
  width: 375px;
  overflow: scroll;
}
.img {
  display: inline-block;
  width: 20px;
  height: 20px;
  z-index: 999;
  position: absolute;
  left: 17px;
  top: 18px;
  background-image: url(../../assets/arrow.png);
  background-repeat: no-repeat;
  background-size: contain;
}
.searchtop {
  height: 50px;
}
.search-page ul,
.recent-search-title {
  text-align: left;
  margin: 0 15px;
}
.search-result {
  margin-bottom: 60px;
}
.recent-search li {
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid rgb(250, 255, 248);
}

.single-wall {
  position: relative;
  font-size: 13px;
  margin: 20px 20px;
  border-radius: 5px;
  padding: 8px 10px;
  box-shadow: 0 4px 8px 0 rgba(19, 19, 19, 0.2),
    0 6px 20px 0 rgba(12, 12, 12, 0.19);
}
.single-wall th,
.single-wall td {
  text-align: left;
}
.curtain-width {
  width: 50px;
  border: 1px solid #666;
}
.select-multiple {
  display: inline-block;
  width: 80px;
  height: 15px;
  line-height: 15px;
  /*background: url("../assetsorder/zk.png") no-repeat center;*/
  /*background-position-x: 50px;*/
  /*background-position-y: 2px;*/
  /*background-size: 15PX;*/
  background-color: #ebebeb;
  border-radius: 2px;
  outline: none;
  border: none;
  /*color: white;*/
  text-decoration: none;
  padding: 3px 10px;
}
.myposition {
  display: inline-block;
  width: 80px;
  height: 15px;
  line-height: 15px;
  padding: 3px 10px;
  border: 1px solid #666;
}
.curtain-height {
  text-align: right;
}
.wall-title {
  text-align: left;
  margin-bottom: 5px;
  padding: 0 0 5px 3px;
  border-bottom: 1px solid #ebedf0;
  font-size: 16px;
}
.show-kucun {
  position: absolute;
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
  bottom: 10px;
  right: 17px;
  background: #89cb81;
}
.kucun-result table {
  font-size: 15px;
  /*padding: 20px;*/
  margin: 10px 0 70px 0;
  border-collapse: collapse;
  border: none;
}
.kucun-result table th,
.kucun-result table td {
  border: solid #000 1px;
}
.kucun-item {
  padding: 10px 0;
}
.recent-search-title {
  text-align: left;
  margin: 0 15px;
  font-size: 15px;
}
.currItem {
  display: inline-block;
  padding: 10px 15px;
  background: rgba(229, 229, 229, 0.8);
  border-radius: 15px;
  margin: 10px;
  font-size: 13px;
  /* float: left; */
}
.clear-search {
  width: 150px;
  height: 50px;
  line-height: 50px;
  margin: 80px auto;
  border-radius: 30px;
  border: 1px solid #8b8b7a;
  clear: both;
}
.comfirm-bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #89cb81;
  position: fixed;
  bottom: 0;
  z-index: 99;
}
.van-cell-group {
  width: 300px;
  max-height: 300px;
  overflow: scroll;
}
.fy-bottom {
  background: #f8f8f8;
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  color: white !important;
}
.fy-bottom .van-pagination__item {
  color: #89cb81;
}
</style>
<style>
.need-head .van-checkbox__icon .van-icon {
  border: 1px solid #666;
}
</style>>
