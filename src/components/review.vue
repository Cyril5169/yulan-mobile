<template>
  <div>
    <div class="examShow" v-show="show" @click="showIt">
      <div>
        <div class="exam">
          <div id="record2"></div>
          <span>评审记录</span>
        </div>
        <div class="status">
          <p>
            当前状态：
            <span>{{ customerInfo }}</span>
          </p>
        </div>
      </div>
      <hr />
      <div class="scoll">
        <div class="message" v-for="(text, index) in texts" :key="index">
          <div class="point"></div>
          <div class="time">
            <p>{{texts[index]}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show", "message", "customerInfo"],
  data() {
    return {
      statusNum: 0,
      isShow: "",
      texts: []
    };
  },
  watch: {
    message() {
      this.texts = this.message;
    },
  },
  methods: {
    showIt: function() {
      this.isShow = !this.show;
      this.$emit("set", this.isShow);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.exam {
  display: flex;
  align-items: center;
  color: #89cb81;
  font-size: 15px;
  justify-content: center;
  margin-bottom: 8px;
}
.exam span {
  display: block;
  text-decoration: underline;
  margin-left: 6px;
}
.examShow {
  z-index: 99;
  width: 300px;
  background: white;
  position: absolute;
  right: 11px;
  top: 115px;
  border-radius: 7px;
  border: 1px solid #d9d9d9;
}
#record2 {
  width: 12px;
  height: 12px;
  background: url("../assets/triangle_right_fill.png");
  background-size: 100% 100%;
  margin-left: 10px;
}
.status {
  font-size: 15px;
}
.status span {
  color: red;
}
hr {
  margin-top: 14px;
  border: 1px solid #dedede;
}
.message {
  display: flex;
}
.scoll {
  height: 250px;
  overflow-y: scroll;
}
.point {
  width: 5px;
  height: 5px;
  background: #89cb81;
  border-radius: 50%;
  border: none;
  margin-left: 10px;
  margin-top: 20px;
}
.time span {
  align-self: center;
  font-size: 13px;
  margin-right: 18px;
}
.time p {
  font-size: 13px;
  text-align: left;
}
.time {
  margin-top: 15px;
  margin-left: 6px;
}
</style>