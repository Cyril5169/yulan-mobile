<template>
    <div class="littlecard" @click="toAgreement">
        <div class="wrap">
            <div class="code">{{cardMsg.CID}}</div>
            <div class="name">{{cardMsg.CNAME}}</div>
            <div class="protocol-name">
              <span class="area1">{{cardMsg.MARKETNAME}} [{{cardMsg.MARKETMANAGERNAME}}]</span>
              <span class="area2">{{ cardMsg.SUBMARKETNAME }} [{{ cardMsg.SUBMARKETMANAGERNAME}}]</span>
            </div>
            <div class="more"></div>
        </div>
    </div>
</template>

<script>
export default {
  props:["cardMsg"],
  mounted() {
    console.log(this.cardMsg)
    if(this.cardMsg.status == '已通过'){
      this.$refs.status.classList.add('getGreen');
    }else if(this.cardMsg.status == '客户查看确认中'){
      this.$refs.status.classList.add('getRed');
    }

  },
  methods:{
    toAgreement() {
      this.$store.commit("getCCID",this.cardMsg.CID);
      this.$store.commit("setReviewed",false)
      this.$router.push({
        path:'/agreement',
        // query:{reviewed:false}
      })
    }
  }
}
</script>

<style scoped>
    .wrap{
        display: inline-block;
        width: 354px;
        height: 77px;
        text-align: left;
        border-radius: 7px;
        background: #ffffff;
        margin-top: 10px;
        box-shadow:  0 3px 3px rgba(0,0,0,0.16);
        position: relative;
        box-sizing: border-box;
        font-size: 0;
    }
    /* .wrap div{

    } */
    .area1{
      font-size: 8px;
      color:#7D7D7D
    }
    .area2{
      font-size: 8px;
      color:#7D7D7D
    }
    .code{
        margin-left: 27px;
        position: relative;
        margin-right: 12px;
        display: inline-block;
        font-size: 13px;
        height: 100%;
        line-height: 77px;
    }
    .protocol-name{
        /* width: 107px; */
        position: absolute;
        right:40px;
        height: 77px;
        max-width: 100px;
        /* margin-left: 10px; */
        text-align: right;
        /* margin-right: 20px; */
        /* margin-top: -20px; */
        right: 25px;
        display: inline-flex;
        justify-content: center;
        flex-direction: column;
        /* flex-wrap: wrap; */

    }
    .protocol-name span{
        height: 15px;
        font-size: 10px;
        /* line-height: 15px;
        height: 15px; */
    }
    .name{
        position: absolute;
        /* top: 29px; */
        height: 77px;
        /* line-height: 77px; */
        display: inline-flex;
        align-items: center;
        /* width: 78px; */
        width: 120px;
        margin-left: 20px;
        font-size: 13px;
        vertical-align: middle;
        text-align: center;
        /* line-height: 77px; */
    }
    .wrap .more{
      position: absolute;
      background-image:url(../assets/right1.png);
      width: 12px;
      height:12px;
      top:33px;
      right:2px;
      background-size: cover;
    }
    .getGreen{
      color: #89CB81;
    }
    .getRed{
      color: #F15656;
    }
</style>
