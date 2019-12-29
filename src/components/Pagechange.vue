<template>
  <div class="changepage">
    <div class="action">
      <div class="uppage" ref="uppage" @click="up">上一页</div>
      <div class="pagenow">{{pagenow}}</div>
      <div class="downpage" ref="nextpage" @click="next">下一页</div>
    </div>
    <!-- <div class="count">
            <div class="count_page">总页数：{{count1}}</div>
            <div class="count_card">统计数: {{count2}}</div>
    </div>-->
  </div>
</template>

<script>
export default {
  props: [
    "count1",
    "count2",
    "select1",
    "select2",
    "select3",
    "select4",
    "ylcstate",
    "change"
  ],
  data() {
    return {
      pagenow: 1,
      cardshow: [],
      selected1: "",
      selected2: "",
      selected3: "",
      selected4: ""
    };
  },
  mounted() {
    if (this.pagenow == 1) {
      this.$refs.uppage.style.color = "#B1B1B1";
    }
  },
  watch: {
    select1(val) {
      this.pagenow = 1;
      this.selected1 = val;
      this.selected3 = "";
      this.$refs.uppage.style.color = "#B1B1B1";
    },
    select2(val) {
      this.pagenow = 1;
      this.selected2 = val;
      this.selected3 = "";
      this.$refs.uppage.style.color = "#B1B1B1";
    },
    select3(val, oldval) {
      this.pagenow = 1;
      this.$refs.uppage.style.color = "#B1B1B1";
      this.selected3 = val;
      this.selected1 = "";
      this.selected2 = "";
      this.selected4 = "";
    },
    select4(val, oldval) {
      this.pagenow = 1;
      this.$refs.uppage.style.color = "#B1B1B1";
      this.selected4 = val;
      this.selected3 = "";
    },
    selected1(val) {
      if (val == "全部") {
        this.selected1 = "";
      }
    },
    selected2(val) {
      if (val == "全部") {
        this.selected2 = "";
      }
    }
  },
  methods: {
    next() {
      let th = this;
      var num = this.pagenow;
      if (num < this.count1) {
        th.pagenow++;
        if (this.change == 1) {
          this.$emit("pageChange", th.pagenow);
        } else {
          this.$http
            .post("/customerInfo/getNcustomerinfo.do", {
              year: this.$store.state.year,
              limit: "10",
              page: th.pagenow,
              state: th.selected4,
              cid: this.$store.state.info.data.loginName,
              find: th.selected3,
              area_1: th.selected1,
              area_2: th.selected2,
              position: this.$store.state.position,
              ylcstate: this.ylcstate
            })
            .then(function(res) {
              th.cardshow = res.data.data;
              th.$emit("listennext", res.data.data);
            })
            .catch(function(res) {});
        }
        this.$refs.uppage.style.color = "#000000";
        this.$refs.uppage.style.borderRight = " 1px solid #000000";
        this.$refs.uppage.style.textDecoration = "underline";
      }
      if (num == this.count1 - 1) {
        this.$refs.nextpage.style.color = "#B1B1B1";
        this.$refs.nextpage.style.borderLeft = " 1px solid #B1B1B1";
        this.$refs.nextpage.style.textDecoration = "none";
      }
      if (th.pagenow == 1) {
        this.$refs.uppage.style.color = "#B1B1B1";
        this.$refs.uppage.style.borderRight = " 1px solid #B1B1B1";
        this.$refs.uppage.style.textDecoration = "none";
      }
    },
    up() {
      if (this.pagenow >= 1) {
        var num = this.pagenow;
        let th = this;
        if (num > 1) {
          th.pagenow--;
          if (this.change == 1) {
            this.$emit("pageChange", th.pagenow);
          } else {
            this.$http
              .post("/customerInfo/getNcustomerinfo.do", {
                year: this.$store.state.year,
                limit: "10",
                page: th.pagenow,
                state: th.selected4,
                cid: this.$store.state.info.data.loginName,
                find: th.selected3,
                area_1: th.selected1,
                area_2: th.selected2,
                position: this.$store.state.position,
                ylcstate: this.ylcstate
              })
              .then(function(res) {
                th.cardshow = res.data.data;
                th.$emit("listennext", res.data.data);
              })
              .catch(function(res) {});
          }
        }
        if (num == this.count1) {
          this.$refs.nextpage.style.color = "#000000";
          this.$refs.nextpage.style.borderLeft = " 1px solid #000000";
          this.$refs.nextpage.style.textDecoration = "underline";
        }
        if (num == 2) {
          this.$refs.uppage.style.color = "#B1B1B1";
          this.$refs.uppage.style.borderRight = " 1px solid #B1B1B1";
          this.$refs.uppage.style.textDecoration = "none";
        }
      }
    }
  }
};
</script>

<style scoped>
.change {
  font-family: "PingFang-Reular", sans-serif;
}
.action {
  padding-top: 18px;
  margin-bottom: 30px;
  font-size: 0;
}
.action div {
  display: inline-block;
  font-size: 18px;
}
.pagenow {
  width: 190px;
}
.uppage {
  width: 80px;
  height: 25px;
  border-right: 1px solid #b1b1b1;
}
.downpage {
  width: 80px;
  height: 25px;
  border-left: 1px solid #000000;
  text-decoration: underline;
}
.count div {
  padding-top: 15px;
  padding-bottom: 15px;
  display: inline-block;
  height: 15px;
  font-size: 10px;
  color: #b1b1b1;
  padding-right: 10px;
}
.count_page {
  position: relative;
  left: 90px;
}
.count_card {
  position: relative;
  left: 90px;
}
</style>