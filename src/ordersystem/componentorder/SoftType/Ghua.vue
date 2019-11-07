<template>
  <div>
    <div class="searchtop">
      <van-search
        class="search-top"
        v-model="searchvalue"
        placeholder="请输入挂画型号"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <div class="img" @click="back"></div>
    </div>
    <div class="all-mliao">
      <div
        class="single-wall"
        v-for="(mliao,index) in mliaos"
        @click="mliaoDetails(index)"
        :key="index"
      >
        <div class="wall-title">{{mliao.note}}</div>
        <table>
          <tr>
            <th>型号：</th>
            <td>{{mliao.itemNo}}</td>
          </tr>
          <tr>
            <th>名称：</th>
            <td>{{mliao.note}}</td>
          </tr>
          <tr>
            <th>风格：</th>
            <td>{{mliao.fixType}}</td>
          </tr>
          <tr>
            <th>尺寸：</th>
            <td>{{mliao.fixGrade}}mm</td>
            <!--<td class="show-kucun"><span @click.stop="checkKucun">查看库存</span></td>-->
          </tr>
          <!--后台在显示列表的时候这个字段值为null，但是在商品详情页面这个字段有值-->
          <!--<tr>-->
          <!--<th>品牌：</th>-->
          <!--<td>{{mliao.productBrand}}</td>-->
          <!--<td class="show-kucun"><span @click.stop="checkKucun">查看库存</span></td>-->
          <!--</tr>-->
        </table>
        <span class="show-kucun" @click.stop="checkKucun(index)">查看库存</span>
        <iframe :src="storeUrl(mliao.itemNo)" style="display: none" frameborder="0"></iframe>
      </div>
    </div>
    <!--底部分页-->
    <div class="fy-contain" v-show="hidshow2">
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
    <!--查看库存-->
    <van-action-sheet class="kucun-popup" v-model="showKucun" title="库存查询结果">
      <div class="kucun-result">
        <table width="100%">
          <tr v-for="(kucun,index) in singleKuCun" :key="index">
            <!--<td>库存总数</td>-->
            <td>{{kucun}}</td>
          </tr>
        </table>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import axios from "axios";
import { Search, ActionSheet, Pagination, Toast } from "vant";
import "../../assetsorder/actionsheet.css";

export default {
  name: "",
  // props:["isShow"],
  data() {
    return {
      //搜索框输入值
      searchvalue: "",
      //显示库存
      showKucun: false,
      //当前页数
      currentPage: 1,
      //所有面料list
      mliaos: [],
      //总条数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 10,
      //总页数
      totalPage: 0,
      //通过页数来判断change是执行哪个函数
      pageMark: 0,
      storeMsg: [], //储存当前页面的库存信息。所有的
      singleKuCun: [], //单个库存信息
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow2: true //显示或者隐藏footer
    };
  },
  components: {
    [Search.name]: Search,
    [ActionSheet.name]: ActionSheet,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast
  },
  methods: {
    //查看库存
    checkKucun(index) {
      this.singleKuCun = [];
      if (this.storeMsg.length) {
        this.showKucun = true;
        if (this.storeMsg[index].indexOf("，") != -1) {
          this.singleKuCun = this.storeMsg[index].split("，");
        } else {
          this.singleKuCun.push(this.storeMsg[index]);
        }
      } else {
        Toast({
          duration: 2000,
          message: "暂无查询结果"
        });
      }
    },
    storeUrl(itemNo) {
      return `http://www.luxlano.com/ddkc/ecqueryItemStock.asp?IID=${itemNo}`;
    },
    //搜索
    onSearch() {
      this.mliaos = [];
      let url = this.orderBaseUrl + "/item/getSoftInfoSingle.do";
      let data = {
        itemType: "GH",
        // "cid":"C01613",
        cid: this.$store.getters.getCId,
        itemNo: this.searchvalue.toUpperCase(), //模糊查询内容
        limit: 10, //一页限制条数
        page: this.currentPage //第几页
      };
      axios.post(url, data).then(data => {
        if (data.data.code == 1) {
          this.mliaos = [];
          this.totalPage = 1;
          Toast({
            duration: 2000,
            message: "暂无查询结果"
          });
        } else {
          this.mliaos = data.data.data;
          //总页数
          if (this.mliaos.length) {
            this.totalPage = Math.ceil(this.mliaos[0].total / 10);
          }
          for (let i = 0; i < this.mliaos.length; i++) {
            if ((this.mliaos[i].fixType = "01")) {
              this.mliaos[i].fixType = "定宽";
            } else if ((this.mliaos[i].fixType = "02")) {
              this.mliaos[i].fixType = "定高";
            }
          }
        }
        //这里面axios的this不指向vue,所以在使用axios是最好使用es6箭头函数
      });
    },
    back() {
      window.vTop = null;
      this.$router.push({
        path: "/shopstore"
      });
    },
    //详情
    mliaoDetails(index) {
      this.$router.push({
        name: "softdetails",
        params: {
          itemType: "GH",
          // "cid":this.$store.getters.getCId,
          itemNo: this.mliaos[index].itemNo, //模糊查询的内容
          from: "searchsoft/ghua"
        }
      });
    },
    //获取数据列表
    getRzLists() {
      this.mliaos = [];
      let mlUrl = this.orderBaseUrl + "/item/getSoftDecorationInfo.do";
      let data = {
        itemType: "GH", //想要查询的产品类型
        // "cid":"C01613" ,//客户ID
        cid: this.$store.getters.getCId,
        limit: 10, //一页限制条数
        page: this.currentPage //第几页
      };
      axios.post(mlUrl, data).then(data => {
        if (data.data.code == 1) {
          this.mliaos = [];
        } else {
          this.mliaos = data.data.data;
          this.pageMark = Math.ceil(this.mliaos[0].total / 10);
          //总页数
          if (this.mliaos.length) {
            this.totalPage = Math.ceil(this.mliaos[0].total / 10);
          }
          for (let i = 0; i < this.mliaos.length; i++) {
            if ((this.mliaos[i].fixType = "01")) {
              this.mliaos[i].fixType = "定宽";
            } else if ((this.mliaos[i].fixType = "02")) {
              this.mliaos[i].fixType = "定高";
            }
          }
        }
        //这里面axios的this不指向vue,所以在使用axios是最好使用es6箭头函数
      });
    },
    //改变页数
    changePage() {
      if (this.pageMark == this.totalPage) {
        this.getRzLists();
      } else {
        this.onSearch();
      }
    }
  },
  created() {
    this.getRzLists();
  },
  mounted() {
    window.vTop = this;
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
    const self = this;
    window.addEventListener(
      "message",
      function(e) {
        self.storeMsg.push(e.data);
      },
      false
    );
  },
  destroyed(){
    if(window.vTop==this)
      window.vTop =  null;
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow2 = false;
      } else {
        this.hidshow2 = true;
      }
    }
  }
};
</script>

<style scoped>
.all-mliao {
  margin: 40px 20px 70px 20px;
}

.single-wall {
  position: relative;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  padding: 20px 10px;
  box-shadow: 0 4px 8px 0 rgba(19, 19, 19, 0.2),
    0 6px 20px 0 rgba(12, 12, 12, 0.19);
}

.single-wall th,
.single-wall td {
  text-align: left;
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
  right: 10px;
  bottom: 17px;
  border-radius: 15px;
  color: white;
  background: #a0cb8d;
  padding: 5px 10px;
  font-size: 13px;
}

.kucun-result table {
  font-size: 15px;
  padding: 20px;
  margin-bottom: 50px;
}

.kucun-result table tr {
  height: 30px;
}
.kucun-result table tr:nth-child(odd) {
  background: rgba(160, 203, 141, 0.64);
  color: white;
}
.kucun-result table tr:nth-child(even) {
  background: #f1f1f1;
  color: #696969;
}
.img {
  display: inline-block;
  width: 20px;
  height: 20px;
  z-index: 33;
  position: fixed;
  left: 17px;
  top: 52px;
  background-image: url(../../assetsorder/back2.png);
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 99;
}

.searchtop {
  height: 40px;
}

.search-top {
  position: fixed;
  top: 35px;
  z-index: 99;
}

.fy-contain {
  width: 100%;
  height: 50px;
  background: white;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #e8e8e8;
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
