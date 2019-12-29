<template>
  <div class="show-protocol">
    <div class="top">
      <div class="top-bottom">
          <div class="arrow">
            <div class="arrow-img" @click="back"></div>
            <div class="top-text">{{msg}}</div>
          </div>
      </div>
      <searchselect v-on:listen="listen" v-on:listen2="listen2" v-on:listentarget='listen3'></searchselect>
      <div class="search">
        <ul class="ulhead">
            <li class="lileft">客户号</li>
            <li class="licenter">客户名称</li>
            <li class="liright">协议</li>
        </ul>
      </div>
    </div>

      <div class="content">
        <li v-for="cardMsg in cardMsgs" :key="cardMsg.id">
          <littlecard :cardMsg="cardMsg"></littlecard>
        </li>
      </div>
      <changepage v-on:listennext="listennext" :count1= 'count1' :count2='count2' :select1='select1' :select2='select2' :select3='select3' :signed='signed'></changepage>
      <div class="bottom-box"></div>

  </div>
</template>


<script>
import littlecard from './LittleCard4'
import searchselect from '@/components/Searchselect'
import changepage from '@/components/Pagechange2'

export default {
  data() {
    return{
      msg:'2019待审核协议',
      signed:"checking",//审核状态
      count1:'',
      count2:'',
      select1:'',//大区选项处的数据
      select2:'',//全部选项处的数据
      select3:'',//输入客户名称处的数据
      select4:'',//状态值的筛选值
      cardMsgs:[

      ],
      card:[

      ]
    }
  },
  mounted(){
    var th = this;
        this.$http.post('/YLcontractentry/getYlcsbysigned.do',{
            "limit":"5",
            "page":"1",
            "year":this.$store.state.year,
            "cid":this.$store.state.info.data.loginName,
            "area_1":"",
            "area_2":"",
            "find":"",
            "need":"checking",
            "position":this.$store.state.position
        }).then(function(res){
            console.log(res.data)
            th.cardMsgs = res.data.data;
            th.card = res.data.data;
            th.count1 = Math.ceil(res.data.count/10).toString();
            th.count2 = res.data.count;
            console.log(th.cardMsgs)
        }).catch(function(res){
            console.log(res);
        });
  },
  methods:{
    back() {
      this.$router.push({
        path: '/customer'
      })
    },
    listennext(data) {
      this.cardMsgs = data;
    },
    listen(data) {
            if(this.select1 != data){
                this.select2 = '全部';
                this.select1 = data;
            }
            console.log(data);
            let key = data;//匹配内容
            let show =[];
            this.card.forEach(function(value,index,arr){
                if(value.area == key){//查看是否匹配
                    show.push(value);//将所有匹配项放入一个数组
                }
            });
            console.log(show);
            this.cardMsgs = show;
        },
        listen2(data) {
            console.log(data)
                this.select2 = data;
                let key =this.select2;
                let show =[];
                this.card.forEach(function(value,index,arr){
                    if(value.littlearea == key){
                    show.push(value);
                    }
                });
                this.cardMsgs = show;
                console.log(this.cardMsgs);
        },
        listen3(data) {
            this.select3 = data;
            // let key =this.select3;
            // let show =[];
            // this.card.forEach(function(value,index,arr){
            //     if(value.code == key ||value.name == key){
            //         show.push(value);
            //     }
            // });
            // this.cardMsgs = show;
        },

  },
  components:{
    littlecard, searchselect,changepage
  },
  watch:{
        select1(val,oldval){
            var th = this;
            console.log(val)
            if(val == '全部'){
                this.$http.post('/YLcontractentry/getYlcsbysigned.do',{
                    "limit":"5",
                    "page":"1",
                    "year":this.$store.state.year,
                    "cid":this.$store.state.info.data.loginName,
                    "area_1":"",
                    "area_2":"",
                    "find":"",
                    "need":"checking",
                    "position":this.$store.state.position
                }).then(function(res){
                    th.cardMsgs = res.data.data;
                    th.count1 = Math.ceil(res.data.count/10).toString();
                    th.count2 = res.data.count;
                    console.log(th.cardMsgs)
                }).catch(function(res){
                    console.log(res);
                });
            }
            else{
                this.$http.post('/YLcontractentry/getYlcsbysigned.do',{
                    "limit":"5",
                    "page":"1",
                    "need":"checking",
                    "year":this.$store.state.year,
                    "cid":this.$store.state.info.data.loginName,
                    "area_1":val,
                    "area_2":"",
                    "find":"",
                    "position":this.$store.state.position
                }).then(function(res){
                    th.cardMsgs = res.data.data;
                    th.count1 = Math.ceil(res.data.count/10).toString();
                    th.count2 = res.data.count;
                    console.log(th.cardMsgs)
                }).catch(function(res){
                    console.log(res);
                });
            }
        },
        select2(val,oldval){
            let th = this;
            console.log(val);
            if(val == '全部'){
                this.$http.post('/YLcontractentry/getYlcsbysigned.do',{
                    "limit":"5",
                    "page":"1",
                    "need":"checking",
                    "year":this.$store.state.year,
                    "cid":this.$store.state.info.data.loginName,
                    "area_1":th.select1,
                    "area_2":"",
                    "find":"",
                    "position":this.$store.state.position
                }).then(function(res){
                    th.cardMsgs = res.data.data;
                    th.count1 = Math.ceil(res.data.count/10).toString();
                    th.count2 = res.data.count;
                    console.log(th.cardMsgs)
                }).catch(function(res){
                    console.log(res);
                });
            }
            else{
                this.$http.post('/YLcontractentry/getYlcsbysigned.do',{
                    "year":this.$store.state.year,
                    "limit": "5",
                    "page": "1",
                    "need":"checking",
                    "cid":this.$store.state.info.data.loginName,
                    "find":"",
                    "area_1":th.select1,
                    "area_2":val,
                    "position":this.$store.state.position
                }).then(function(res){
                    console.log(res.data)
                    th.count1 = Math.ceil(res.data.count/10).toString();
                    th.count2 = res.data.count;
                    th.cardMsgs = res.data.data;
                }).catch(function(res){

                });
            }
        },
        select3(val,oldval){
            var th = this;
            // console.log(val);
            this.$http.post('/YLcontractentry/getYlcsbysigned.do',{
                "year":this.$store.state.year,
                "limit": "5",
                "page": "1",
                "need":"checking",
                "cid":this.$store.state.info.data.loginName,
                "find":val,
                "area_1":'',
                "area_2":'',
                "position":this.$store.state.position
            }).then(function(res){
                th.count1 = Math.ceil(res.data.count/10).toString();
                th.count2 = res.data.count;
                th.cardMsgs = res.data.data;
            }).catch(function(res){

            });
        },
  }
}
</script>

<style scoped>
  .show-protocol{
    background-color: rgb(239, 239, 239);
    height: 100vh;
    position: relative;
  }
  li{
    display: inline-block;
  }
  .show-protocol::-webkit-scrollbar{
    display: none;
  }
  .bottom-box{
    width: 375px;
    height: 20px;
    background-color: rgb(239, 239, 239);
  }
  .top{
      /* background: #363636; */
      width: 100%;
      height: 135px;
      top: 0;
      position: fixed;
      z-index: 20;
      background: -webkit-linear-gradient(left,#BEDD81,#87CA81);
  }
  .top-bottom{
      width: 100%;
      height: 50px;
      line-height: 50px;
      position: absolute;
      /* bottom: 76px; */
      top: 0;
      /* bottom: -44px; */
  }
  .arrow{
      display: inline-block;
  }
  .arrow-img{
      background: url('../assets/arrow.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      display: inline-block;
      width: 30px;
      height: 30px;
      z-index: 33;
      position: absolute;
      left: 10px;
      top: 5px;
      /* left: 17px;
      bottom: 16px; */
  }
  .top-text{
      display: inline-block;
      color: #F3FAFF;
      vertical-align: middle;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      text-align: center;
  }
  .content{

    width: 375px;
    position: absolute;
    top: 135px;
    /* margin-top: 103px; */
    background-color: rgb(239, 239, 239);
  }

  .search{
      width:100%;
      position: absolute;
      bottom: 0;
  }
  ul{
      margin: 0;
      padding: 0;
  }
  .ulhead{
      position: absolute;
      bottom: 0;
      background: -webkit-linear-gradient(left,#F2F2F2,#E1E1E1);
      /* text-align: center; */
      line-height: 37px;
      padding-left: 7px;
      text-align: left;
      width: 100%;
      font-size: 15px;
      box-shadow: 0 3px 6px rgba(0, 0, 0,0.16);
  }
  .lileft{
    padding-right: 30px;
    padding-left: 30px;
  }
  .ulhead li{
      color: #000000;
      display: inline-block;
  }
  .licenter{
      padding-left: 22px;
      padding-right: 82px;
      /* margin-right: 10px; */
      box-sizing:content-box;
  }
  .liright{
      position: relative;
      /* left: -4px; */
  }
  .changepage{
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
</style>
