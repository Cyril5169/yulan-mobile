<template>
  <div class="ID-selection" v-if="IsIDShow">
     <div class="name">{{ name }} ,请选择登录的身份</div>
     <div class="option-box" v-for="(item, idx) in arrPos" :key="item.id" ref="pos">
        <div class="option get-grey">{{ item }}</div>
        <div class="enter" @click="enter(idx)">进入</div>
     </div>
    <!-- <button class="btn1" @click="chose1">{{ pos1 }}</button> -->
    <!-- <button class="btn2" @click="chose2">{{ pos2 }}</button> -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      arrPos:[],
      IsIDShow:true
    }
  },
  props:['IsShow','pos','name'],
  created() {
    // console.log(this.pos);

    for(let i =0 ; i< this.pos.length ; i++){
      switch(this.pos[i].position){
        case 'SALEMAN_M' :
          this.arrPos[i]= '办事处经理(审核资料卡,创建协议书)';break;
        case 'SALEMAN_S' :
          this.arrPos[i]= '业务经理(审核资料卡,创建协议书)';break;
        case 'MANAGER':
          this.arrPos[i]= '中心总经理(审核协议书)';break;
        case 'VSMAPPROVEXII':
          this.arrPos[i]= '销售总监(审核协议书)';break;
        case 'MARKETCHECKER' :
          this.arrPos[i]= '市场部(审核协议书)';break;
        case 'BILLDEP_APPROVE' :
          this.arrPos[i]= '订单部(审核资料卡)';break;
      }
    }
  },
  methods: {
    enter(idx) {
      this.$store.commit('getposition',this.pos[idx].position);
      // console.log('this.pos[idx].position : '+this.pos[idx].position);
      this.$router.push({
        path:'/customer'
      })
    }
  }
}
</script>

<style scoped>
    .ID-selection{
      width: 100vw;
      height: 500px;
      position: absolute;
      z-index: 150;
      top: 0;
      left: 0;
      background-color: #EFEFEF;
      text-align: center;
    }
    .name {
      font-size: 18px;
      color: black;
      margin-top: 167px;
    }
    .option-box div{
      font-size: 16px;
      display: inline-block;
    }
    .get-grey{
      color: #7D7D7D
    }
    .get-green{
      color: #89CB81
    }
    .option{
      margin-top: 70px;
      margin-left:5px;
      margin-right: 25px;
    }
    .enter{
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-decoration-line: underline;
      /* border-radius: 50px; */
      font-size: 18px;
      color: #7D7D7D;
      /* background:-webkit-linear-gradient(left,#BEDD81,#87CA81); */
    }
</style>
