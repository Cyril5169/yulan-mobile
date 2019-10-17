<template>
  <div>
    <top from="mypersonal" msgtitle="修改密码"></top>
    <form class="content" ref="form">
      <van-cell>
        <div slot="title">
          <label for="password">原密码&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            ref="pw"
            class="input"
            type="password"
            name="pw"
            placeholder="填写原密码"
            required="required"
            @keyup="KeyUp()"
            autocomplete="off"
            autofocus="autofocus"
          />
          <a href="javascript:void(0)" @click="forget()" style="font-size:11px;margin-left:5px;">忘记密码?</a>
        </div>
      </van-cell>
      <van-cell>
        <div slot="title">
          <label for="newpassword">新密码&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            ref="npw"
            class="input"
            type="password"
            name="npw"
            placeholder="填写新密码"
            required="required"
            @keyup="KeyUp()"
            autocomplete="off"
          />
        </div>
      </van-cell>
      <van-cell>
        <div slot="title">
          <label for="newpassword1">确认密码</label>
          <input
            ref="npw1"
            class="input"
            type="password"
            name="npw1"
            placeholder="再次填写新密码"
            required="required"
            @keyup="KeyUp()"
            autocomplete="off"
          />
        </div>
      </van-cell>
      <van-cell style="text-align:center;">
        <input
          ref="btn"
          class="savebutton"
          slot="title"
          type="button"
          value="确认修改"
          @click="submit()"
          :hidden="error"
        />
      </van-cell>
    </form>
  </div>
</template>

<script>
import top from "../../../components/Top";
import { Popup, Toast, List, Cell, Icon, Notify } from "vant";
import { ChangePassword } from "@/api/webUserASP";

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
      password: '',
      error: true,
    };
  },
  computed: {
  },
  methods: {
    save() {

    },
    KeyUp() {
      var form = this.$refs.form;
      var a = this.$refs.pw.value;
      var b = this.$refs.npw.value;
      var c = this.$refs.npw1.value;
      if (a != "" && b != "" && c != "" && b == c) {
        this.error = false;
      }
      else {
        this.error = true;
      }
    },
    submit() {
      var a = this.$refs.pw.value;
      var b = this.$refs.npw.value;
      var c = this.$refs.npw1.value;
      ChangePassword(this.$store.getters.getCId, a, b).then((res) => {
        Notify({ type: 'success', message: '密码修改成功' });
      }).catch((err) => {
        Notify({ type: 'warning', message: err.message || err.msg });
      })
    },
    forget(){Notify({type:'primary', message:'请联系管理员重置密码' });}
  },
  created() {
  }
};
</script>

<style scoped>
.content {
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 13px;
  text-align: left;
}
.input {
  border-color: #878787;
  border-style: solid;
  border-top-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  border-left-width: 0;
  margin-left: 20px;
  width: 200px;
}
.input:focus {
  border-color: #73f06f;
}
.savebutton {
  border-radius: 10px;
  text-align: center;
  width: 150px;
  height: 30px;
  border: 1px solid #65a714;
  background: #65a714;
  outline: none;
  color: white;
}
</style>
