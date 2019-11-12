<template>
  <div class="banner">
    <div class="left-arrow" @click="back"></div>
    <p class="top-p">{{title}}</p>
    <!-- <div class="option-img" @click="Sidebar"></div> -->
    <p class="welcome">欢迎,</p>
    <p class="customer-name">{{customer}}</p>
    <!-- <div class="suona-img"></div>
    <p class="notice">{{notice}}</p>-->
  </div>
</template>

<script>
import Protocol from './Protocol'
// import sidebar from '../utils/move492.js'
import { bus } from '../utils/eventBus.js';
// import Salesman from './Salesman'
// import axios from '../axios'

export default {
  name: 'Banner',
  data() {
    return {
      notice: '新消息',
      marginLeft: 0
    }
  },
  props: ['IsSidebarOut', 'title'],
  created() {
    bus.$emit('customer', this.customer);
  },
  computed: {
    customer() {
      return this.$store.state.info.data.realName;
    }
  },
  mounted() {
    window.vTop = this;

    if (this.$store.state.info.data.realName.length >= 7) {
      document.getElementsByClassName('customer-name')[0].style.fontSize = "25px"
    }
    if (this.$store.state.info.data.realName.length >= 10) {
      document.getElementsByClassName('customer-name')[0].style.fontSize = "18px"
    }
  },
  destroyed(){
    if(window.vTop==this)
      window.vTop =  null;
  },
  methods: {
    Sidebar() {
      // console.log(this.IsSidebarOut);
      var client = document.getElementsByClassName('client')[0]
      // this.$http.post ('/customerInfo/getCustomerInfo.do',{
      //     "CID": "C15056"
      //   })
      // .then(res => {
      //   console.log(res)
      // },error => {
      //   console.log(error)
      // })
      // this.$http({
      //   methods:"post",
      //   url:"/customerInfo/getCustomerInfo.do",
      //   params:{
      //     "CID": "C15056"
      //   }
      // }).then(res => {
      //   console.log(res);
      // })

      if (this.IsSidebarOut == false) {
        client.classList.remove('noactive-option');
        client.classList.add('active-option');

        setTimeout(() => {
          bus.$emit('sidebarout', true);
        }, 300)
      }
    },
    back() {
      window.vTop = null;
      this.$router.push({
        path: '/customer'
      })
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.banner {
  width: 375px;
  height: 120px; /*185*/
  position: relative;
  box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.16);
  background: -webkit-linear-gradient(left, #abd46c, #89cb81);
}
.top-p {
  font-size: 17px;
  color: #ffffff;
  position: absolute;
  left: 150px;
  top: 15px;
}
.left-arrow {
  background-image: url("../assets/arrow.png");
  position: absolute;
  background-position: center;
  background-size: contain;
  width: 20px;
  height: 20px;
  left: 17px;
  top: 18px;
}
.option-img {
  background-image: url("../assets/option.png");
  width: 30px;
  height: 30px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  /* top: 43px; */
  top: 12px;
  left: 321px;
}
.welcome {
  font-size: 32px;
  color: #fff;
  position: absolute;
  /* bottom: 80px; */
  top: 60px;
  left: 23px;
}
.customer-name {
  font-size: 25px;
  color: #fff;
  position: absolute;
  text-align: left;
  /* bottom: 85px; */
  top: 67px;
  left: 122px;
}
.suona-img {
  background-image: url("../assets/suona.png");
  width: 24px;
  height: 20px;
  background-size: contain;
  background-position: center;
  position: absolute;
  bottom: 50px;
  left: 38px;
}
.notice {
  font-size: 15px;
  color: #fff;
  position: absolute;
  bottom: 50px;
  left: 72px;
}
</style>
