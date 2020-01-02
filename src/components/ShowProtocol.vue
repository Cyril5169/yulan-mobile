<template>
  <div class="show-protocol">
    <div class="top">
      <div class="top-bottom">
        <div class="arrow">
          <div class="arrow-img" @click="back"></div>
          <div class="top-text">{{msg}}</div>
        </div>
      </div>
      <searchselect
        v-on:listen="listen"
        v-on:listen2="listen2"
        v-on:listentarget="listen3"
        @listenYear="listen6"
      ></searchselect>
      <div class="search">
        <ul class="ulhead">
          <li class="lileft">客户号</li>
          <li class="licenter">客户名称</li>
          <li class="liright">协议</li>
        </ul>
      </div>
    </div>

    <div class="content" ref="SearchResult">
      <li v-for="cardMsg in cardMsgs" :key="cardMsg.id">
        <littlecard :cardMsg="cardMsg"></littlecard>
      </li>
    <changepage
      v-on:listennext="listennext"
      :count1="count1"
      :count2="count2"
      :select1="select1"
      :select2="select2"
      :select3="select3"
      :signed="signed"
      :change="1"
      @pageChange="pageChange"
    ></changepage>
    </div>
    <div class="bottom-box"></div>
  </div>
</template>


<script>
import littlecard from "./LittleCard4";
import searchselect from "@/components/Searchselect";
import changepage from "@/components/Pagechange";

export default {
  data() {
    return {
      msg: "待审核协议",
      signed: "checking", //审核状态
      count1: "",
      count2: "",
      select1: "", //大区选项处的数据
      select2: "", //全部选项处的数据
      select3: "", //输入客户名称处的数据
      select4: "", //状态值的筛选值
      cardMsgs: [],
      card: [],
      selYear: this.$store.state.year,
      currentPage: 1
    };
  },
  mounted() {
    var th = this;
    this.$http
      .post("/YLcontractentry/getYlcsbysigned.do", {
        limit: "10",
        page: "1",
        year: this.$store.state.year,
        cid: this.$store.state.info.data.loginName,
        area_1: "",
        area_2: "",
        find: "",
        need: "checking",
        position: this.$store.state.position
      })
      .then(function(res) {
        th.cardMsgs = res.data.data;
        th.card = res.data.data;
        th.count1 = Math.ceil(res.data.count / 10).toString();
        th.count2 = res.data.count;
        var area_M = res.data.area;
        th.$store.commit("getarea_M", area_M);
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
        .post("/YLcontractentry/getYlcsbysigned.do", {
          limit: "10",
          page: "1",
          need: "checking",
          year: this.selYear,
          cid: this.$store.state.info.data.loginName,
          area_1: this.select1,
          area_2: this.select2,
          find: this.select3,
          position: this.$store.state.position
        })
        .then(function(res) {
          th.cardMsgs = res.data.data;
          th.card = res.data.data;
          th.count1 = Math.ceil(res.data.count / 10).toString();
          th.count2 = res.data.count;
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    back() {
      this.$router.push({
        path: "/customer"
      });
    },
    listennext(data) {
      this.cardMsgs = data;
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
    listen6(year) {
      this.selYear = year;
      this.currentPage = 1;
      this.searchAll();
    },
    pageChange(page) {
      this.currentPage = page;
      this.searchAll();
    }
  },
  components: {
    littlecard,
    searchselect,
    changepage
  },
  watch: {
    cardMsgs() {
      this.$refs.SearchResult.scrollIntoView();
    }
  }
};
</script>

<style scoped>
.show-protocol {
  background-color: rgb(239, 239, 239);
  height: 100vh;
  overflow: scroll;
}
li {
  display: inline-block;
}
.bottom-box {
  width: 100%;
  height: 20px;
  background-color: rgb(239, 239, 239);
}
.top {
  width: 100%;
  height: 135px;
  top: 0;
  position: fixed;
  z-index: 20;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
}
.top-bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: absolute;
  top: 0;
}
.arrow {
  display: inline-block;
}
.arrow-img {
  background: url("../assets/arrow.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  width: 30px;
  height: 30px;
  z-index: 33;
  position: absolute;
  left: 10px;
  top: 5px;
}
.top-text {
  display: inline-block;
  color: #f3faff;
  vertical-align: middle;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
}
.content {
  width: 100%;
  position: absolute;
  top: 135px;
  background-color: rgb(239, 239, 239);
  overflow-x: hidden;
}
.search {
  width: 100%;
  height: 44px;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  position: absolute;
  bottom: 0;
}
ul {
  margin: 0;
  padding: 0;
}
.ulhead {
  position: fixed;
  top: 98px;
  text-align: left;
  line-height: 37px;
  width: 100%;
  height: 37px;
  font-size: 15px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.lileft {
  padding-right: 30px;
  padding-left: 30px;
}
.ulhead li {
  color: #000000;
  display: inline-block;
}
.licenter {
  padding-left: 30px;
  padding-right: 60px;
  box-sizing: content-box;
}
.liright {
  position: relative;
}
.changepage {
  position: relative;
  left: 4px;
}
</style>