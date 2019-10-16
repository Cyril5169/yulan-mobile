<template>
  <div>
    <top :top="set" :from="from"></top>
    <div class="notification-list">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-cell @click="onClick(item)" v-for="item in list" :key="item.ID" is-link center>
          <van-icon slot="icon" name="volume-o" size="18px" dot color="gray" />
          <div slot="title" class="nt-cell">
            <span>{{item.TITLE}}</span>
          </div>
        </van-cell>
      </van-list>
    </div>
    <van-popup v-model="showNotification" class="nt-detail">
      <div class="nt-title">
        <img
          class="backlist"
          @click="showNotification = false"
          src="../../assetsorder/back.png"
          alt
        />
        <span>公告详情</span>
      </div>
      <div class="nt-content" v-html="CONTENT">
      </div>
    </van-popup>
  </div>
</template>

<script>
import top from "../../../components/Top";
import { Popup, Toast, List, Cell, Icon } from "vant";
import { getPageDataTable } from "@/api/notificationASP";

import axios from "axios";



export default {
  components: {
    top,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [List.name]: List,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
  },
  data() {
    return {
      set: 27.1,
      from: "",
      list: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      showNotification: false,
      CONTENT:'',
    };
  },
  computed: {
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        let data = {
          cid: this.$store.getters.getCId, //客户号
          condition: '',
          limit: 20,
          page: this.page,
        };
        getPageDataTable(data).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.list.push(res.data[i]);
          }
          this.page = this.page + 1;
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.list.length >= res.count) {
            this.finished = true;
          }
        }).catch((err) => {

        })
      }, 500);
    },
    onClick(e,a){
      this.CONTENT=e.CONTENT;
      this.showNotification = true;

    }
  },
  created() {
    this.from = this.$route.params.from;
    this.showNotification = this.$route.params.showNotification;
    this.CONTENT = this.$route.params.CONTENT;
  }
};
</script>

<style scoped>
.notification-list {
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
  font-size: 13px;
}
.nt-cell {
  text-align: left !important;
  margin-left: 5px;
}

.nt-detail {
  width: 100%;
  height: 100%;
}

.nt-title {
  background: #363636;
  width: 100%;
  height: 50px;
  line-height: 50px;
  top: 0;
  color: white;
  font-size: 15px;
  position: fixed;
}

.backlist {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 17px;
  top: 50%;
  margin-top: -10px;
}
.nt-content {
  background: #f8f8f8;
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
  font-size: 13px;
}
</style>
