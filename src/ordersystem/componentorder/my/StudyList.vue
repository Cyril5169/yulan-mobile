<template>
  <div>
    <top :top="set" :from="from"></top>
    <div class="list">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        :finished="finished"
        finished-text
      >
        <van-cell @click="onClick(item)" v-for="item in list" :key="item.ID" is-link center>
          <van-icon slot="icon" name="records" size="18px" color="gray" />
          <div slot="title" class="cell">
            <span>{{item.TITLE}}</span>
          </div>
          <van-icon v-if="item.completeStatus==1"
            slot="right-icon"
            name="success"
            style="line-height: inherit;"
            color="yellowgreen"
          />
        </van-cell>
      </van-list>
    </div>
    <van-popup v-model="showStudyForm" class="study-form">
      <StudyForm></StudyForm>
    </van-popup>
  </div>
</template>

<script>
import top from "../../../components/Top";
import { Popup, Toast, List, Cell, Icon } from "vant";
import { getCustomerStudy, getGroupContextOption } from "@/api/studyASP";
import StudyForm from '@/components/StudyForm';

export default {
  components: {
    top,
    StudyForm,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [List.name]: List,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
  },
  data() {
    return {
      set: 27.2,
      from: "",
      list: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      showStudyForm: false,
    };
  },
  computed: {
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        getCustomerStudy(this.$store.getters.getCId).then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            this.list.push(res.data[i]);
          }
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
        }).catch((err) => {

        })
      }, 500);
    },
    onClick(data) {
      if(data.completeStatus==1){
        Toast("该调查表已填写完成");
        return;
      }
      this.showStudyForm = true;
    }
  },
  created() {
    this.from = this.$route.params.from;
  }
};
</script>

<style scoped>
.list {
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
  font-size: 13px;
}
.cell {
  text-align: left !important;
  margin-left: 5px;
}
.study-form {
  height: 100%;
  width: 100%;
}
</style>
