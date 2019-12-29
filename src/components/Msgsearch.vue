<template>
  <div class="msgsearch">
    <top :top="set"></top>
    <div class="search">
      <searchselect
        :back="select2"
        v-on:listen="listen"
        v-on:listen2="listen2"
        v-on:listentarget="listen3"
        @listenYear="listen6"
        :area_M="area_M"
      ></searchselect>
      <ul class="ulhead" id="ulhead">
        <li class="lileft">客户号</li>
        <li class="licenter">客户名称</li>
        <li class="liright" @click="select_pass">状态</li>
      </ul>
    </div>
    <iosselect v-on:listen3="listen4" v-on:listen4="listen5" v-show="more"></iosselect>
    <div class="search-result" ref="SearchResult">
      <div v-for="i in cardshow" :key="i.id">
        <littlecard
          :card="i"
          ref="littlecard"
          v-on:sendCID="sendCID"
          :cardshow="cardshow"
          :reviseflag="reviseflag"
        ></littlecard>
      </div>
      <changepage
        v-on:listennext="listennext"
        :count1="count1"
        :count2="count2"
        :select1="select1"
        :select2="select2"
        :select3="select3"
        :select4="select4"
        :ylcstate="ylcstate"
        :change="1"
        @pageChange="pageChange"
      ></changepage>
    </div>
  </div>
</template>

<script>
import top from "@/components/Top";
import littlecard from "@/components/Littlecard";
import searchselect from "@/components/Searchselect";
import iosselect from "@/components/Iosselect3";
import changepage from "@/components/Pagechange";

export default {
  data() {
    return {
      set: 2,
      more: false,
      count1: "",
      count2: "",
      select1: "", //大区选项处的数据
      select2: "", //全部选项处的数据
      select3: "", //输入客户名称处的数据
      select4: "", //状态值的筛选值
      card: [], //获取后台传来的卡片
      cardshow: [], //筛选后显示的卡片
      CCID: "",
      reviseflag: true, //通过登录的position判断是否能能对协议书进行修改
      ylcstate: "",
      area_1: "",
      area_M: [], //第一个地区
      selYear: this.$store.state.year,
      currentPage: 1
    };
  },
  computed: {
    CID() {
      return this.$store.state.info.data.loginName;
    }
  },
  watch: {
    cardshow() {
      this.$refs.SearchResult.scrollIntoView();
    }
  },
  components: {
    top,
    littlecard,
    searchselect,
    iosselect,
    changepage
  },
  mounted() {
    let th = this;
    if (
      this.$store.state.position != "SALEMAN_M" &&
      this.$store.state.position != "SALEMAN_S"
    ) {
      this.reviseflag = false;
    }
    this.$http
      .post("/customerInfo/getNcustomerinfo.do", {
        year: this.selYear,
        limit: "10",
        page: "1",
        state: "",
        cid: this.CID,
        find: "",
        area_1: "",
        area_2: "",
        position: this.$store.state.position,
        ylcstate: "",
        legalchecked: ""
      })
      .then(function(res) {
        th.cardshow = res.data.data;
        th.count1 = Math.ceil(res.data.count / 10).toString();
        th.count2 = res.data.count;
        th.area_M = res.data.area;
        th.$store.commit("getarea_M", th.area_M);
      })
      .catch(function(res) {
        console.log(res);
      });
  },
  methods: {
    searchAll() {
      var th = this;
      if (this.select1 == "全部") {
        this.select1 = "";
        this.select2 = "";
      }
      if (this.select1 == "") this.select2 = "";
      if (this.select2 == "全部") this.select2 = "";
      this.$http
        .post("/customerInfo/getNcustomerinfo.do", {
          year: this.selYear,
          limit: "10",
          page: this.currentPage,
          state: this.select4,
          cid: this.CID,
          find: this.select3,
          area_1: this.select1,
          area_2: this.select2,
          position: this.$store.state.position,
          ylcstate: ""
        })
        .then(function(res) {
          th.count1 = Math.ceil(res.data.count / 10).toString();
          th.count2 = res.data.count;
          th.cardshow = res.data.data;
        })
        .catch(function(res) {});
    },
    sendCID(data) {
      this.$store.commit("getCCID", data);
      this.$store.state.CCID = data;
      this.CCID = data;
    },
    select_pass() {
      this.more = true;
    },
    listen(data) {
      this.select1 = data;
      this.currentPage = 1;
      this.searchAll();
    },
    listen2(data) {
      this.select2 = data;
      this.currentPage = 1;
      this.searchAll();
    },
    listen3(data) {
      this.select3 = data;
      this.currentPage = 1;
      this.searchAll();
    },
    listen4(data) {
      this.more = data;
    },
    listen5(data, data2) {
      this.select4 = data;
      this.currentPage = 1;
      this.searchAll();
    },
    listen6(year) {
      this.selYear = year;
      this.currentPage = 1;
      this.searchAll();
    },
    listennext(data) {
      this.cardshow = data;
    },
    pageChange(page) {
      this.currentPage = page;
      this.searchAll();
    }
  }
};
</script>

<style scoped>
.msgsearch {
  height: 100vh;
  background: #efefef;
  overflow: scroll;
}
.search {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 144px;
}
ul {
  margin: 0;
  padding: 0;
}
#ulhead {
  position: fixed;
  top: 98px;
  text-align: left;
  line-height: 37px;
  width: 100%;
  height: 37px;
  font-size: 3.7vw;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.ulhead li {
  width: 16vw;
  color: #000000;
  height: 37px;
  overflow: hidden;
  display: inline-block;
}
.lileft {
  padding-left: 60px;
}
.licenter {
  padding-left: 40px;
  margin-right: 10px;
  box-sizing: content-box;
}
.liright {
  position: relative;
  left: -4px;
  width: 50px;
  background-image: url(../assets/down.png);
  padding-left: 47px;
  background-size: 15px;
  background-repeat: no-repeat;
  background-position-x: 80px;
  background-position-y: 11px;
  text-align: left;
}
.search-result {
  width: 100%;
  height: 400px;
  padding-top: 149px;
  box-sizing: border-box;
}
</style>