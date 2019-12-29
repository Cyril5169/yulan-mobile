<template>
  <div class="searchselect">
    <ul class="searchmsg">
      <input
        type="text"
        @keypress="keysearch"
        class="searchname"
        placeholder="输入客户号"
        v-model="searchname"
      />
      <input type="button" class="select" value="大区" ref="btn_1" @click="moreselect1" />
      <input type="button" class="select" value="全部" ref="btn_2" @click="moreselect2" />
      <input
        type="button"
        class="select"
        value="年份"
        ref="btn_3"
        @click="showYear=true"
        v-model="selYear"
      />
    </ul>
    <iosselect v-on:listen="listenset" v-on:listen2="listenselect" v-show="more"></iosselect>
    <iosselect2
      v-on:listen3="listenset2"
      v-on:listen4="listenselect2"
      v-show="more2"
      :index="index"
    ></iosselect2>
    <van-popup v-model="showYear" position="bottom">
      <van-picker
        show-toolbar
        :columns="yearColumn"
        :default-index="this.$store.state.year - 2018"
        @cancel="showYear=false"
        @confirm="onConfirmStatu"
      />
    </van-popup>
  </div>
</template>

<script>
import iosselect from "@/components/Iosselect";
import iosselect2 from "@/components/Iosselect2";
import { Popup, Picker } from "vant";

export default {
  props: ["area_M"],
  data() {
    return {
      more: false,
      more2: false,
      selectitem: 1,
      selected: "",
      selected2: "",
      index: 0,
      searchname: "",
      showYear: false,
      yearColumn: [],
      selYear: this.$store.state.year
    };
  },
  mounted() {
    for (var i = 2018; i < 2101; i++) {
      this.yearColumn.push(i);
    }
  },
  watch: {
    selected() {
      this.$refs.btn_2.value = "全部";
      this.$emit("listen2", this.selected2);
    },
    selected2(val, oldval) {
      if (val == "") {
        this.$refs.btn_2.value = "全部";
      }
    }
  },
  methods: {
    onConfirmStatu(value) {
      this.selYear = value;
      this.showYear = false;
      this.$emit("listenYear", value);
    },
    moreselect1() {
      this.more = this.$store.state.position == "SALEMAN_S" ? false : true;
    },
    moreselect2() {
      if (this.selected != "" && this.selected != "全部") {
        this.more2 = true;
      }
      if (this.$store.state.position == "SALEMAN_S") {
        this.more2 = true;
      }
    },
    listenset(data) {
      this.more = data;
    },
    listenselect(data, data2) {
      this.selected = data;
      this.index = data2;
      this.$emit("listen", this.selected);
      if (this.index == 0) {
        this.$refs.btn_1.value = "大区";
      } else {
        let arr = this.selected.split("");
        let str = arr[0] + arr[1];
        this.$refs.btn_1.value = str;
      }
    },
    listenset2(data) {
      this.more2 = data;
    },
    listenselect2(data) {
      this.selected2 = data;
      this.$emit("listen2", this.selected2);
      if (this.selected2 == "") {
        this.$refs.btn_2.value = "全部";
      } else {
        let arr = this.selected2.split("");
        let str = arr[0] + arr[1];
        this.$refs.btn_2.value = str;
      }
    },
    keysearch(e) {
      var keycode = e.keyCode;
      if (keycode == 13) {
        e.preventDefault(); //禁止默认事件（默认是换行）
        var target = e.target.value;
        this.$emit("listentarget", target);
      }
    }
  },
  components: {
    iosselect,
    iosselect2,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  }
};
</script>

<style scoped>
.searchselect {
  height: 32px;
}
.searchmsg {
  position: absolute;
  top: 44px;
  padding-top: 10px;
  text-align: left;
  height: 45px;
  width: 100%;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
}
.searchmsg input {
  display: inline-block;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  text-decoration: none;
  height: 26px;
  margin: 5px 0px 0 6px;
  outline: none;
  /* box-shadow:  0 1px 1px rgba(0,0,0,0.16); */
}
.searchmsg .searchname {
  width: 100px;
  padding-left: 20px;
  box-sizing: border-box;
  margin-left: 17px;
  background-image: url(../assets/search.png);
  background-size: 16px;
  background-repeat: no-repeat;
  background-position-x: 5px;
  background-position-y: 6px;
}
.searchname::-webkit-input-placeholder {
  line-height: 26px;
  font-size: 13px;
  color: #ffffff;
}
.searchmsg .select {
  font-size: 13px;
  width: 70px;
  vertical-align: middle;
  margin-top: 0;
  color: #ffffff;
  text-align: left;
  padding-left: 10px;
  background-image: url(../assets/unfold.png);
  background-size: 15px;
  background-repeat: no-repeat;
  background-position-x: 50px;
  background-position-y: 5px;
}
</style>