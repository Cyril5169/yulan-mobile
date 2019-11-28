<template>
  <div>
    <top :top="set" :from="from" ref="top"></top>
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
    <van-popup v-model="showNotification" @closed="notifyClose" class="nt-detail">
      <top @backclick="hideNotification()" msgtitle="公告详情" ref="detailTop"></top>
      <div class="nt-content" v-html="detail"></div>
    </van-popup>
  </div>
</template>

<script>
import top from "../../../components/Top";
import { Popup, Toast, List, Cell, Icon } from "vant";
import { getPageDataTable, GetById } from "@/api/notificationASP";

export default {
  components: {
    top,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [List.name]: List,
    [Cell.name]: Cell,
    [Icon.name]: Icon
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
      CONTENT: "",
      TITLE: "",
      ID: null,
    };
  },
  computed: {
    detail() {
      if(this.CONTENT) this.CONTENT = this.CONTENT.replace(/\[ReplaceMark\]/g, this.fileCenterUrl)
      return "<p style='font-weight:bold;font-size:17px;text-align:center;'>" + this.TITLE + "</p>" + this.CONTENT;
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        let data = {
          cid: this.$store.getters.getCId, //客户号
          condition: "",
          limit: 20,
          page: this.page
        };
        getPageDataTable(data)
          .then(res => {
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
          })
          .catch(err => { });
      }, 500);
    },
    onClick(e, a) {
      this.CONTENT = e.CONTENT;
      this.TITLE = e.TITLE;
      this.showNotification = true;
    },
    hideNotification() {
      this.showNotification = false;
      window.vTop = this.$refs.top;
    },
    notifyClose() {
      window.vTop = this.$refs.top;
    },
  },
  created() {
    notificationlist = this;
    var me = this;
    this.from = this.$route.params.from;
    //如果传入ID，就去查找改公告并展示
    if (this.$route.params.ID) {
      this.ID = this.$route.params.ID;
    } else {
      this.CONTENT = this.$route.params.CONTENT;
      this.TITLE = this.$route.params.TITLE;
      this.showNotification = this.$route.params.showNotification;
    }
  },
  destroyed(){
    notificationlist = null;
  },
  watch:{
    ID: function(val){
      var me = this;
      GetById(val).then((res) => {
        me.TITLE = res.data.TITLE;
        me.CONTENT = res.data.CONTENT;
        me.showNotification = true;
      }).catch(err => {
        me.TITLE = error;
      })
    }
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
  background: #f8f8f8;
  overflow: hidden;
}
.nt-content {
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  bottom: 0;
  left: 5px;
  right: 5px;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
  font-size: 13px;
  text-align: left;
}
</style>
