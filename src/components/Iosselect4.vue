<template>
  <div class="fold">
    <div class="foldwrap"></div>
    <div class="foldbox">
      <div class="box-top">
        <div class="select-box">
          <area-selector v-on:listen="listenselect" />
        </div>
      </div>
      <div class="box-bottom">
        <div class="sure" @click="sure">确定</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import AS from "@/components/AreaSelector";
export default {
  data() {
    return {
      columns: [""],
      selected: "",
      more: false,
      a: 1,
      index: 0,
      province: [],
      city: [],
      town: []
    };
  },
  mounted() {
    let th = this;
  },
  components: {
    "area-selector": AS
  },
  methods: {
    sure() {
      this.more = false;
      this.$emit("listen3", this.more);
      this.$emit("listen4", this.selected);
    },
    cancel() {
      this.more = false;
      this.$emit("listen3", this.more);
    },
    listenselect(data) {
      this.selected = data;
    }
  }
};
</script>

<style scoped>
.foldwrap {
  width: 100%;
  height: 1000px;
  position: fixed;
  top: 0;
  background: rgba(54, 54, 54, 0.4);
  z-index: 40;
}
.foldbox {
  width: 350px;
  height: 300px;
  background: #ffffff;
  position: fixed;
  top: 199px;
  z-index: 40;
  border-radius: 10px;
  left: 16px;
}
.box-top {
  height: 260px;
  width: 100%;
  border-radius: 10px;
}
.select-box {
  margin: 0;
  display: inline-block;
  padding-top: 10px;
  width: 100%;
  height: 210px;
  overflow: hidden;
}
.van-picker-column.province,
.van-picker-column.town {
  border-radius: 10px;
}
.van-picker-column__item--selected {
  font-size: 18px;
}
.van-hairline--top-bottom:after {
  border-width: 3px 0;
  content: "";
}
.box-bottom {
  height: 48px;
  width: 100%;
  font-size: 0;
}
.sure,
.cancel {
  width: 50%;
  height: 100%;
  line-height: 48px;
  display: inline-block;
  font-size: 18px;
  background: #f2f2f2;
  color: #7d7d7d;
}
.sure:hover,
.cancel:hover {
  background: #363636;
  color: rgba(255, 255, 255, 1);
}
.sure {
  border-radius: 0 0 0 10px;
}
.cancel {
  border-radius: 0 0 10px 0;
}
</style>
