<template>
    <div class="reviseagreement">
    <div class="top">
      <div class="top-bottom">
          <div class="arrow">
            <div class="arrow-img" @click="back"></div>
            <div class="top-text">{{msg}}</div>
          </div>
      </div>
      <searchselect v-on:listen="listen" v-on:listen2="listen2" v-on:listentarget='listen3'></searchselect>
      <div class="search">
        <ul class="ulhead" id="ulhead">
                <li class="lileft">客户号</li>
                <li class="licenter">客户名称</li>
                <li class="liright" >状态</li>
        </ul>
      </div>
    </div>
        <div class="search-result" ref="SearchResult">
            <div  v-for="i in cardshow" :key="i.id">
                <littlecard :card='i' ref="littlecard"   :cardshow='cardshow'></littlecard>
            </div>
            <changepage :ylcstate='ylcstate' v-on:listennext="listennext" :count1= 'count1' :count2='count2' :select1='select1' :select2='select2' :select3='select3' :select4="select4"></changepage>
        </div>
  </div>
</template>

<script>
import littlecard from './LittleCard5'
import searchselect from '@/components/Searchselect'
import changepage from '@/components/Pagechange'

export default {
  data() {
    return{
      msg:'待修改协议书',
      signed:'1',//审核状态
      count1:'',
      count2:'',
      select1:'',//大区选项处的数据
      select2:'',//全部选项处的数据
      select3:'',//输入客户名称处的数据
      select4:'',//状态值的筛选值
      // select1:'',//大区选项内容
      // select2:'',//地方选项内容
      card:[

      ],
      cardshow:[
      ],
      ylcstate:'SALEMANMODIFYING',
    }
  },
  mounted(){
    var th = this;
        this.$http.post('/customerInfo/getNcustomerinfo.do',{
            "year":this.$store.state.year,
            "limit": "10",
            "page": "1",
            "state":"",
            "cid":this.$store.state.info.data.loginName,
            "find":"",
            "area_1":'',
            "area_2":'',
            "position":this.$store.state.position,
            "ylcstate":'SALEMANMODIFYING',
        }).then(function(res){
            th.cardshow = res.data.data;
            th.count1 = Math.ceil(res.data.count/10).toString();
            th.count2 = res.data.count;
            console.log(res.data);
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
            if(data != '全部'&& data){
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
            }

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
    littlecard,
    searchselect,
    changepage
  },
  watch:{
        cardshow(){
            this.$refs.SearchResult.scrollIntoView();
        },
        select1(val,oldval){
            var th = this;
            if(val == '全部大区'){
                this.$http.post('/Ylc_info/getAllf.do',{
                    "year":this.$store.state.year,
                    "limit": "10",
                    "page": "1",
                    "state":"",
                    "cid":this.$store.state.info.data.loginName,
                    "find":"",
                    "area_1":'',
                    "area_2":'',
                }).then(function(res){
                    console.log(res.data)
                    th.count1 = Math.ceil(res.data.count/10).toString();
                    th.count2 = res.data.count;
                    th.cardshow = res.data.data;
                }).catch(function(res){

                });
            }
            else{
                this.$http.post('/Ylc_info/getAllf.do',{
                    "year":this.$store.state.year,
                    "limit": "10",
                    "page": "1",
                    "state":"",
                    "cid":this.$store.state.info.data.loginName,
                    "find":"",
                    "area_1":val,
                    "area_2":'',
                }).then(function(res){
                    console.log(res.data)
                    th.count1 = Math.ceil(res.data.count/10).toString();
                    th.count2 = res.data.count;
                    th.cardshow = res.data.data;
                }).catch(function(res){

            });
            }
        },
        select2(val,oldval){
            var th = this;
            console.log(val);
            if(val == '全部'){
                this.$http.post('/Ylc_info/getAllf.do',{
                    "year":this.$store.state.year,
                    "limit": "10",
                    "page": "1",
                    "state":"",
                    "cid":this.$store.state.info.data.loginName,
                    "find":"",
                    "area_1":th.select1,
                    "area_2":'',
                }).then(function(res){
                    console.log(res.data)
                    th.count1 = Math.ceil(res.data.count/10).toString();
                    th.count2 = res.data.count;
                    th.cardshow = res.data.data;
                }).catch(function(res){

                });
            }
            else{
                this.$http.post('/Ylc_info/getAllf.do',{
                    "year":this.$store.state.year,
                    "limit": "10",
                    "page": "1",
                    "state":"",
                    "cid":this.$store.state.info.data.loginName,
                    "find":"",
                    "area_1":th.select1,
                    "area_2":val,
                }).then(function(res){
                    console.log(res.data)
                    th.count1 = Math.ceil(res.data.count/10).toString();
                    th.count2 = res.data.count;
                    th.cardshow = res.data.data;
                }).catch(function(res){

                });
            }
        },
        select3(val,oldval){
            var th = this;
            // console.log(val);
            this.$http.post('/Ylc_info/getAllf.do',{
                "year":this.$store.state.year,
                "limit": "10",
                "page": "1",
                "state":"",
                "cid":this.$store.state.info.data.loginName,
                "find":val,
                "area_1":'',
                "area_2":''
            }).then(function(res){
                th.count1 = Math.ceil(res.data.count/10).toString();
                th.count2 = res.data.count;
                th.cardshow = res.data.data;
            }).catch(function(res){

            });
        },
    },
    //  methods:{
    //     sendCID(data) {
    //     console.log(' data '+data);
    //     this.CCID =  data;
    //   },
    //     listen(data) {
    //         if(this.select1 != data){
    //             this.select2 = '全部';
    //             this.select1 = data;
    //         }
    //         console.log(data);
    //         let key = data;//匹配内容
    //         let show =[];
    //         this.card.forEach(function(value,index,arr){
    //             if(value.area == key){//查看是否匹配
    //                 show.push(value);//将所有匹配项放入一个数组
    //             }
    //         });
    //         console.log(show);
    //         this.cardshow = show;
    //     },
    //     listen2(data) {
    //         console.log(data)
    //         if(data != '全部'&& data){
    //             this.select2 = data;
    //             let key =this.select2;
    //             let show =[];
    //             this.card.forEach(function(value,index,arr){
    //                 if(value.littlearea == key){
    //                 show.push(value);
    //                 }
    //             });
    //             this.cardshow = show;
    //             console.log(this.cardshow);
    //         }

    //     },
    //     listen3(data) {
    //         this.select3 = data;
    //         // let key =this.select3;
    //         // let show =[];
    //         // this.card.forEach(function(value,index,arr){
    //         //     if(value.code == key ||value.name == key){
    //         //         show.push(value);
    //         //     }
    //         // });
    //         // this.cardshow = show;
    //     },
    //     listen4(data){
    //         this.more = data;
    //     },
    //     listennext(data) {
    //         this.cardshow = data;
    //     }
    // },
}
</script>

<style scoped>
    .reviseagreement{
        background-color: rgb(239, 239, 239);
        height: 100vh;
        position: relative;
        overflow: scroll;
    }
   li{
    display: inline-block;
  }
  .reviewed-protocol::-webkit-scrollbar{
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
      background: url('http://14.29.221.109:10250/upload/assets/arrow.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      display: inline-block;
      width: 30px;
      height: 30px;
      z-index: 33;
      position: absolute;
      left: 10px;
      top: 10px;
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
      height: 44px;
      background: -webkit-linear-gradient(left,#BEDD81,#87CA81);
      position: absolute;
      bottom: 0;
  }
    ul{
        margin: 0;
        padding: 0;
    }
    #ulhead{
        position: fixed;
        top:98px;
        text-align: left;
        line-height: 37px;
        width: 100%;
        height:37px;
        font-size: 15px;
        background: -webkit-linear-gradient(left,#F2F2F2,#E1E1E1);
        box-shadow: 0 3px 6px rgba(0, 0, 0,0.16);
    }
    .ulhead li{
        width: 60px;
        color: #000000;
        display: inline-block;
    }
    .lileft{
        padding-left: 60px;
    }
    .licenter{
        padding-left:40px;
        margin-right: 10px;
        box-sizing:content-box;
    }
    .liright{
        position: relative;
        left: -4px;
        width: 50px;
        padding-left: 47px;
        background-size: 15px;
        background-repeat: no-repeat;
        background-position-x: 80px;
        background-position-y: 11px;
        text-align: left;
    }
    .search-result{
        width: 100%;
        height: 400px;
        padding-top:149px;
        box-sizing: border-box;
    }
</style>
