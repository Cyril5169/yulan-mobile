<template>
  <div class="lanju-details">
    <top :top="set" :from="from"></top>
    <span v-if="STATE=='SUBMITTED'" class="lanju-details-state">新增售后单</span>
    <div class="lanju-details-msg">
      <!-- <div class="msg">
        <div><span class="left">客户代码</span><span class="right">{{companyId}}</span></div>
        <div><span class="left">客户名称</span><span class="right">{{companyName}}</span></div>
        <div><span class="left">单据状态</span><span class="right">{{submit.STATE|statusTrans}}</span></div>
      </div> -->
      <div  class="msg">
        <div><span class="left">客户代码</span><span class="right">系统带出</span></div>
        <div><span class="left">客户名称</span><span class="right">系统带出</span></div>
      </div>
      <div  class="msg">
        <div>
          <span class="left">联系人<span style="color:red;">*</span></span>
          <input
            placeholder="请填写联系人"
            class="right bank-input"
            v-model="submit.CONTACT_MAN"
          />
          </div>
        <div>
          <span class="left">联系电话<span style="color:red;">*</span></span>
          <input
            placeholder="请填写联系电话"
            class="right bank-input"
            v-model="submit.CONTACT_PHONE"
          />
        </div>
      </div>
      <div class="msg">
        <!-- 这两个需要连表去查 -->
        <div><span class="left">提货单号</span><span class="right">{{submit.SALE_NO}}</span></div>
        <div><span class="left">物流单号</span><span class="right">{{submit.TRANS_ID}}</span></div>

        <div><span class="left">B2B订单号</span><span class="right">{{submit.orderNo}}</span></div>
        <div><span class="left">ERP订单号</span><span class="right">{{CONTRACT_NO}}</span></div>
      </div>

      <div  class="msg">
          <!-- partInfo里的PRODUCTION_VERSION是代码不是名称 -->
        <div><span class="left">产品名称</span><span class="right">{{productVersionTrans(submit.PRODUCTION_VERSION)}}</span></div>
        <div><span class="left">产品型号</span><span class="right">{{submit.ITEM_NO}}</span></div>
        <div><span class="left">单位</span><span class="right">{{submit.UNIT}}</span></div>
        <div>
          <span class="left">数量<span style="color:red;">*</span></span>
          <input
            placeholder="请填写相应数量"
            class="right bank-input"
            v-model="submit.QTY"
          />
        </div>
        <div>
          <span class="left">问题描述<span style="color:red;">*</span></span>
          <input
            placeholder="请对货物的相关问题进行描述"
            class="right bank-input"
            v-model="submit.NOTES"
          />
        </div>
      </div>
  
    </div>
    <div class="edit-bank">
      <span v-if="STATE=='SUBMITTED'"  class="edit-bank-fw" @click="showNote=true;">服务须知</span>
      <span v-if="STATE=='SUBMITTED'"  class="edit-bank-xg" @click="_addRefundSubmit()">确认提交</span>
    </div>

    <van-popup v-model="showNote" position="bottom">
          <div style="margin:4px 0px 4px 4px;text-align:left;font-size:20px;color:red">
               注意事项：
          </div>
          <div style="margin:4px 0px 4px 4px;text-align:left;">
               1.若您未在我公司对您的《退货/赔偿申请书》提交处理意见之日起15日内确认、提出异议的，则视为放弃赔偿权利；<br />
               2.玉兰公司支付的退货金额，仅限于本《退货/赔偿申请书》的金额，不承担其他费用；<br />
               3.请您仔细阅读本《退货/赔偿申请书》相关信息，一旦确认，视为同意我公司的处理方案。<br />
               <br />
               公司名称：广东玉兰集团股份有限公司<br />
               地址：东莞市莞城莞龙路段狮龙路莞城科技园内<br />
               电话:0769-23321708&emsp;&emsp;邮政编码:523119<br />
               邮箱：yulan315@yulangroup.cn<br />
          </div>
    </van-popup>   
  </div>
</template>

<script>
  import top from '../../../components/Top'
  import axios from 'axios'
  import { digitUppercase,GetCompensationById,getReturnInfoApp,InsertCompensation,UpdateState} from "@/api/newRefundASP";
  import {
  getPackDetailInfo,
  } from "@/api/orderListASP";
  import { Popup,Dialog ,Toast, Collapse, CollapseItem ,DatetimePicker,Uploader ,Button,Rate } from 'vant';
  export default {
    name: "addOrEditRefund",
    components:{
      top,
      [Popup.name]: Popup,
      [Dialog.name]: Dialog,
      [Rate.name]: Rate,
    },
    data(){
      return{
        from:"",
        set: 105,
        partInfo: this.$route.params.partInfo, //获取订单详情中的部分数据
        STATE:this.$route.params.STATE, 
        CONTRACT_NO:"",//ERP订单号
        SALE_NO:"",//提货单号
        submit: [],//明细表数据RTCB_ITEM
        submitHead:[],//表头数据RETURNCOMPENSATIONBILL
        CID: this.$store.getters.getCMId, //客户编号
        CNAME: this.$store.getters.getrealName,  //客户姓名
        companyId:this.$store.getters.getCMId,//公司账号
        companyName:"",//公司名
        showNote: false, //显示服务须知
        myType:"请输入投诉类型",//类型选择栏绑定数据
        ORDER_NO:this.$route.params.partInfo.ORDER_NO
      }
    },
    filters: {
    dateTrans(value) {
      //时间戳转化大法
      if (value == null||value=="9999/12/31 00:00:00") {
        return "";
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ':' + m ;
    },
    statusTrans(value){
      switch (value) {
        case  1:
          return "未处理";
        case  2:
          return "已处理未评价";
        case  3:
          return "已处理已评价";
      }
    },
    rateTrans(value){
           switch (value)
                {
                    case "1":
                        return "极差";
                    case "2":
                        return "失望";
                    case "3":
                        return "一般";
                    case "4":
                        return "满意";
                    case "5":
                        return "惊喜";
                };
    }
    },
    methods: {
    //新建一条售后记录
    async addRefundRecord(data) { 
      this.submitHead = {
          ID:"",
          ERP_CREATOR:"", //创建人编号
          ERP_CREATORNAME: "", //创建人姓名
          CID: "", //客户编号
          CNAME: "",  //客户姓名
          SENDBACK_REASON: "", //退回理由
          ITEM_COUNT: "", //总货品数量
          ITEM_MAX_INDEX:"",//最大索引
          STATE:"",//状态
          PRINTED:"",//打印方式
          FIRST_AUDITION:"",//初审意见
          RETURN_TYPE:"",//退货类型
          RETURN_ADDRESS:"",//退货地址
          REASSURE_TS:"",//签订日期
          DEALMAN_CODE:"",
          DEAL_TS:"",
          DEALMAN_NAME:"",
      };
      this.submit = {
          RTCB_ID: "", //退货单ID
          ITEM_NO: "", //产品型号
          PRODUCTION_VERSION: "", //版本（项目、产品）
          UNIT: "", //单位
          QTY: "", //数量
          NOTES: "", //问题描述
          CONTACT_MAN:"",//联系人
          CONTACT_PHONE:"",//联系方式
          SALE_NO:"",//提货单号
          orderNo:"",//B2B订单号
          ITEM_NO:"",//产品型号
          TRANS_ID:"",//物流单号
          UNIT:"",//单位
          NOTE:"",//类型
          fileList:[],//附件列表
          ATTACHMENT_FILE:"",//附件
          ATTACHMENT_FILE_FOLDER:"",//附件文件夹
      };
        //获得提货单号
        var res1 = await  getPackDetailInfo({
                orderNo: this.partInfo.ORDER_NO,
                lineNo: this.partInfo.LINE_NO,
                itemNo: this.partInfo.ITEM_NO
        });
        if (res1.code == 0) {
                this.SALE_NO = res1.data[0].packDetails[0].SALE_NO;
        } ;
        this.submit.orderNo = this.partInfo.ORDER_NO;
        this.submit.ITEM_NO = this.partInfo.ITEM_NO;
        this.submit.UNIT = this.partInfo.UNIT;
        this.submit.SALE_NO = this.SALE_NO;
        var res2 = await  getReturnInfoApp({
                companyId:this.companyId,
                SALE_NO:this.submit.SALE_NO,
                ITEM_NO:this.submit.ITEM_NO
        });
        console.log(res2)
        if (res2.code == 0) {
                this.companyName=res2.data[0].CUSTOMER_NAME;
                this.CONTRACT_NO=res2.data[0].CONTRACT_NO;
                this.submit.TRANS_ID=res2.data[0].TRANS_ID;
                this.submit.PRODUCTION_VERSION = res2.data[0].PRODUCTVERSION_NAME;
        };
    },
    //新增售后记录提交
    _addRefundSubmit() {
      //判断是否填完所有信息
      if (
        !this.submit.CONTACT_MAN ||
        !this.submit.CONTACT_PHONE ||
        !this.submit.NOTES ||
        !this.submit.QTY 
      ) {
        Toast({
            message: "请完善信息",
            duration: 1000
          });
        return;
      }
      //退货数量应小于下单数量
      if (
        this.submit.QTY > this.zongshuliang 
      ){
        Toast({
            message: "填写数量必须小于下单数量",
            duration: 1000
          });
        return;
      }
      if (this.submit.QTY <=0 )
      {
        Toast({
            message: "填写数量必须为正数",
            duration: 1000
          });
        return;
      } 
      this.submit.ITEM_INDEX = 1;
      this.submitHead.ERP_CREATOR=this.CID;
      this.submitHead.ERP_CREATORNAME = this.CNAME;
      this.submitHead.CID=this.companyId;
      this.submitHead.CNAME = this.companyName;
      this.submitHead.SENDBACK_REASON = null;
      this.submitHead.ITEM_COUNT = 1;
      this.submitHead.ITEM_MAX_INDEX = 1;
      this.submitHead.SALE_NO=this.submit.SALE_NO;
      this.submitHead.ORDER_NO=this.submit.orderNo;
      InsertCompensation({ head: this.submitHead, details: this.submit })
            .then(res => {
                UpdateState({
                  id: res.data.ID,
                  state: "SUBMITTED"
                })
                  .then(res => {
                      if (res.code == 0) {
                          Toast({
                             message: "提交成功",
                             duration: 1000
                         });
                      } else {
                          Toast({
                             message: "提交失败",
                             duration: 1000
                         });
                      }
                  })
            });
     this.$router.push({
        name: "orderdetails",
        params:{
          find:this.ORDER_NO
        }
     });
    },
    //如果产品名称为空,则返回一个值
    productVersionTrans(val)
    {
       if(val==null ||val=="")
       {
         return "无数据";
       }
       else{
         return val;
       }
    },
    },
    created() {
      this.from = this.$route.params.from
          this.addRefundRecord();
    }
  }
</script>

<style scoped>
  .lanju-details {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #ededed;
    overflow-y: scroll;
  }
  .lanju-details-state {
    position: fixed;
    top: 13px;
    right: 20px;
    color: #e94d28;
    z-index: 999;
    font-weight: bold;
  }
  .lanju-details-msg {
    margin: 60px 0;
  }
  .lanju-details-msg .msg {
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px;
    background: white;
  }
  .lanju-details-msg .msg div {
    height: 30px;
    line-height: 30px;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .fkpz {
    /*margin-bottom: 10px;*/
    border-radius: 5px;
    /*padding: 0 10px 10px;*/
    background: white;
  }
  .fkpz div {
    text-align: center;
    padding: 8px;
    color: white;
    margin-bottom: 5px;
    background: #a0cb8dd4;
  }
  .bank-input {
  border: none;
  text-align: right;
  }
  .bank-img {
    width: 100px;
    height: 100px;
    padding: 20px;
    border: 1px solid #969799;
  }
  .bank-img-big {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
  .edit-bank {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    background: white;
    border-top: 1px solid #00000052;
    display:flex;
    justify-content:flex-end;
    align-items: center;
  }
  .edit-bank span {
    padding: 8px 13px;
    border-radius: 18px;
    margin: 0 10px;
    height: 20px;
    line-height: 20px;
  }
  .edit-bank-xg {
    background: #89cb81;
    color: white;
  }
  .edit-bank-fw {
    background: #f5c836;
    color: white;
  }
  .edit-bank-dl {
    background: #fd5538;
    color: white;
  }
  .typeSelector {
    color: white;
  }
  .edit-bank {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  background: white;
  border-top: 1px solid #00000052;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.edit-bank-xg {
  background: #89cb81;
  color: white;
}
</style>
