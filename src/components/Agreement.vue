<template>
  <div class="agreement">
    <Top :top="top"></Top>
    <div class="content" v-show="IsShow">
      <!-- <div class="download">
                <div class="download_img"></div>
                <div class="download_text">下载文档</div>
      </div>-->
      <div class="review">
        <div class="review-box" @click="more">
          <span>评审记录</span>
        </div>
        <div id="reviewcard">
          <review :show="show4" v-on:set="listen" :message="messages" :customerInfo="customerInfo"></review>
        </div>
      </div>
      <div class="agreement-text">
        <h1>广东玉兰集团年度经销协议书</h1>
        <div class="text-box">
          <p class="footnote">
            内部编号 ：
            <span class="green">{{fileNum}}</span>
          </p>
          <p class="content-text">签约地点 ： 东莞</p>
          <p class="content-text">
            <strong>甲方</strong>： 广东玉兰集团股份有限公司
          </p>
          <p class="content-text">
            地址：
            <span>东莞市莞城莞龙路段狮龙路莞城科技园内</span>
          </p>
          <p class="content-text">
            <strong>乙方</strong> ：
            <span class="green">{{ user }}</span>（营业执照登记名称）
          </p>
          <p class="content-text">
            地址：
            <span class="green">{{ userAddress }}</span>
          </p>
          <p
            class="content-text indent"
          >经双方友好协商，就所销产品及任务、市场划分及市场规范管理等方面事项达成如下协议，双方共同遵守，并作为处理和解决争端的依据。协议内容如下：</p>
          <br>

          <div class="content-title">
            <p class="title-text">一、经营区域及经营期限</p>
          </div>
          <p class="content-text indent">
            1、甲方同意乙方作为甲方产品在
            <span class="green">{{capital}}</span>（省）
            <span class="green">{{city}}</span>（市）
            <span class="green">{{county}}</span>（县/区）
            的特约经销商。
          </p>
          <p class="content-text indent">
            2、经营期限从
            <span class="green">{{startDate}}</span>至
            <span class="green">{{endDate}}</span>。至本协议届满前一个月，甲、乙双方共同协商是否终止合作，若继续合作，另行签订协议书，协议内容依照协商确定；若终止合作，本协议到期之日将自动失效。
          </p>

          <div class="content-title">
            <p class="title-text">二、经销产品及价格确定</p>
          </div>
          <p class="content-text indent">1、经营品牌：
            <span class="green">{{ preferedbrand }}</span>
          </p>
          <p class="content-text indent">
            <strong>说明：若乙方确认经营该品牌的（勾选即确认），应无条件接受该品牌后续发出的各种销售工具，</strong>如新版本、玉兰·兰居尚品吊卡、宣传品等（首本由公司扣款直发），发出时乙方款项不足的，应予补足以保证甲方能顺利发出，否则甲方有权单方面对乙方作停货处理。
          </p>
          <p class="content-text indent">2、产品目录及价格：见2018年广东玉兰集团产品价格表。</p>

          <div class="content-title">
            <p class="title-text">三、销售任务及协议备货</p>
          </div>
          <p class="content-text indent">
            1、销售任务：乙方承诺在所经营市场及期限内完成的销售总任务为
            <span class="green">{{money1}}</span>（万元），其中玉兰品牌
            <span class="green">{{money2}}</span>（万元），玉兰·兰居尚品
            <span class="green">{{money3}}</span>（万元），各月任务分解如下：
          </p>

          <table>
            <tr>
              <td>1月</td>
              <td>2月</td>
              <td>3月</td>
              <td>4月</td>
              <td>5月</td>
              <td>6月</td>
            </tr>
            <tr class="green">
              <td>{{m1}}</td>
              <td>{{m2}}</td>
              <td>{{m3}}</td>
              <td>{{m4}}</td>
              <td>{{m5}}</td>
              <td>{{m6}}</td>
            </tr>

            <tr>
              <td>7月</td>
              <td>8月</td>
              <td>9月</td>
              <td>10月</td>
              <td>11月</td>
              <td>12月</td>
            </tr>
            <tr class="green">
              <td>{{m7}}</td>
              <td>{{m8}}</td>
              <td>{{m9}}</td>
              <td>{{m10}}</td>
              <td>{{m11}}</td>
              <td>{{m12}}</td>
            </tr>

            <tr>
              <td>合计</td>
            </tr>
            <tr>
              <td class="green">{{totalm}}</td>
            </tr>
          </table>

          <p></p>

          <p class="content-text indent">2、销售奖励：</p>
          <p class="content-text indent">
            1) 总任务完成奖励：甲方同意，在乙方当年总含税净销售达到总销售任务时
            <span
              style="color:red;text-decoration:none"
            >（含税净销售指经销商全年的实际销售出货扣减相应的返利出货、奖励出货等之后的含税销售净值）</span>
            ，给予乙方当年含税净销售的(
            <span class="green">{{precent1}}</span>%)返点作为奖励，奖励计算方式为：
          </p>
          <p class="content-text">
            <strong>总任务完成返利=（全年总含税净销售-兰居品牌全年含税净销售）×返点；</strong>
          </p>
          <p
            class="content-text indent"
          >2) 玉兰·兰居尚品任务完成奖励：在乙方完成年度总销售任务且同时完成玉兰·兰居尚品品牌任务时，甲方同意，给予乙方当年“兰居尚品”品牌产品含税净销售的(
            <span class="green">{{precent2}}</span>%)返点作为奖励，奖励计算方式为：
          </p>
          <p class="content-text">
            <strong>兰居尚品品牌返利=兰居品牌全年含税净销售×返点；</strong>
          </p>
          <p class="content-text indent">
            3) 纳入上述两项返利计算的
            <strong>含税净销售</strong>应扣减注明不带返利的特批、促销、宣传品、运费等项目；
          </p>
          <p
            class="content-text indent"
          >4) 奖励返还方式：于次年以产品价格折让的方式兑现（次年分12个月按月补充至乙方货款账户，作为乙方提货优惠），该部分奖励乙方仅能提货时使用、不得提取现金、甲方不向乙方开具发票、不计入乙方销售任务、不享受年底完成任务奖。若与乙方合作终止，此部分金额限一次完成提货；</p>
          <p
            class="content-text indent"
          >5) 若协议签订时乙方没有经营玉兰·兰居尚品品牌产品，但后续申请销售的，甲方同意开通品牌经营权限，但不再给予玉兰·兰居尚品任务完成奖励。</p>
          <p class="content-text indent">
            3、年度备货：双方达成合作后，乙方应按甲方要求进行备货，备货金额不得低于年度总任务的
            <span class="green">{{precent3}}</span>%（合人民币
            <span class="green">{{money4}}</span>元），若乙方在约定时间内未足额备货或不备货的，甲方有权变更合同（取消销售奖励返点）直至终止合同。
          </p>
          <p
            class="content-text indent"
          >4、乙方应在每次订单确认后的当日内，先以电汇、汇票或现金等方式支付约定的货款，经甲方确认无误后安排发货。如乙方不按本协议付款条件支付货款，甲方有权把约定的发货期顺延。</p>

          <div class="content-title">
            <p class="title-text">四、乙方义务</p>
          </div>
          <p
            class="content-text indent"
          >1、乙方须具备一定的经济实力，能严格按甲方形象店要求进行店面装修，能按销售进度完成约定的年度销售额。若乙方在本协议期间不能达到进度比例的，则甲方有权要求乙方进行次月备货补足任务。</p>
          <p
            class="content-text indent"
          >2、乙方保证甲方产品作为其同类产品的主营品牌。在甲方进行统一的市场推广宣传活动时，乙方须按甲方要求配合执行店面宣传、促销活动、宣传品的购买配备等。不得有恶意窜货或发生二次销售的行为。</p>
          <p
            class="content-text indent"
          >3、乙方必须遵守甲方根据市场情况制定的产品销售价格实行明码标价，对产品零售价格允许有上下20%浮动，有电子商务销售需要的，应向甲方报备，并严格遵守甲方价格管理制度。未经允许私自突破价格管控的，一经甲方查证，乙方须向甲方承担违约责任。</p>
          <p
            class="content-text indent"
          >4、乙方登陆甲方订单系统时，需先确认其未确认的对账单，只有经点击“确认”按钮后系统才接受订单申请。从对账单生成之日起超过15日乙方仍未点击的，甲方的ERP系统将视为乙方已对对账单数据进行了确认。</p>
          <p
            class="content-text indent"
          >5、乙方在经营过程中，应遵守国家的法律法规，并不得违法进行广告宣传（如使用“中国驰名商标”、“最佳”、“顶级”、“第一”等），不得使甲方受到行政处罚，不得给甲方品牌及商誉造成负面影响。</p>
          <p
            class="content-text indent"
          >6、本协议期满时双方终止合作或提前解除本协议的，双方应及时处理债权债务；乙方在协议解除后应按照甲方要求承担归还资料和清除涉及使用甲方字样、图样的知识产权（甲方提供归还、清除范围的清单），乙方怠于履行该义务的，承担违约责任。</p>
          <p
            class="content-text indent"
          >7、乙方对甲方产品退货的，须遵循甲方关于退货的有关规定，否则甲方不予受理，其损失由乙方自行承担。乙方在处理终端客户墙纸质量问题时，应向甲方提供用户详细信息（姓名、地址、使用场所、电话）、销售凭证（发票、收据）等，否则甲方将不予提供相应的支持服务。</p>

          <div class="content-title">
            <p class="title-text">五、甲方义务</p>
          </div>
          <p class="content-text indent">1、保障乙方在授权区域内的产品经销权，当出现其他非正常渠道的玉兰品牌产品进入该市场销售时，甲方有义务及时处理。</p>
          <p class="content-text indent">2、以经销价格向乙方提供符合国家标准的产品。</p>
          <p class="content-text indent">3、向乙方免费开放网络订单平台使用。</p>
          <p class="content-text indent">4、不定期对乙方提供相关培训，以提高乙方的销售经营能力。</p>
          <p class="content-text indent">5、建立保护性工程销售系统，支持、辅导、配合乙方的工程销售。</p>
          <p
            class="content-text indent"
          >6、免费或成本价提供玉兰产品的相关宣传资料和培训资料、形象店设计，允许乙方在合法范围内使用玉兰商标及形象标识等无形资产。</p>

          <div class="content-title">
            <p class="title-text">六、终端服务承诺</p>
          </div>
          <p
            class="content-text indent"
          >乙方应与甲方共同维护好终端消费市场，为消费者提供优质服务。不得为签单而对消费者故意夸大、虚假宣传；尽责为消费者提供实实在在的售后服务。</p>

          <div class="content-title">
            <p class="title-text">七、结算</p>
          </div>
          <p class="content-text indent">1、乙方既有营业执照又有对公账户的，乙方向甲方付款时，甲方只接受乙方对公账户的打款。</p>
          <p
            class="content-text indent"
          >2、采取现款现货的结算方式，乙方可以先预付一定货款至甲方账户，每次订货时进行扣减，款项不足时甲方将及时通知乙方予以补足。</p>

          <div class="content-title">
            <p class="title-text">八、违约责任</p>
          </div>
          <p
            class="content-text indent"
          >1、乙方仿制甲方产品或者销售与甲方该产品的假冒伪劣产品时，乙方除应向甲方承担实际损失外，还应向甲方支付该年度销售总任务金额的30%的违约金。</p>
          <p
            class="content-text indent"
          >2、乙方发生恶意串货或二次销售行为的，甲方一经发现，有权根据其窜货性质或二次销售行为收取乙方违约金500~5000元；并可给予以下处罚措施的一种或多种：①收回窜货版本，当年内对该版本不再供货；②取消相关优惠或奖励；③停止供货；④取消经销权。</p>
          <p
            class="content-text indent"
          >3、乙方违反甲方产品销售价格体系，造成甲方价格管理制度损害的，甲方有权制止乙方违规销售价格行为，并视乙方情节轻重要求乙方承担违约金2000-10000元。</p>
          <p
            class="content-text indent"
          >4、乙方经甲方通知仍不履行次月备货补足义务或连续三个月不能完成进度比例任务，甲方有权提前终止本协议，另行在乙方所在区域内开发新销售网点，以满足市场消费需求。</p>
          <p
            class="content-text indent"
          >5、乙方因违法进行广告宣传的造成甲方行政处罚或商誉受到损失的，应向甲方承担不低于人民币十万元的违约金。乙方违法情节严重的，甲方有权立即解除本协议并按本协议的约定追究乙方的违约责任。</p>

          <div class="content-title">
            <p class="title-text">九、争议解决</p>
          </div>
          <p class="content-text indent">对发生的争议，双方可通过协商解决；否则，任何一方均有权向甲方所在地人民法院提起诉讼。</p>

          <div class="content-title">
            <p class="title-text">十、补充条款</p>
          </div>
          <p
            class="content-text ten indent"
          >1、乙方签订本协议前，甲方已特提请乙方充分了解双方约定的相关经销内容及规则，乙方自主决定与甲方签约，并自愿遵守本协议的内容。乙方签订经销协议（网签）时，应同时上传其营业执照（未三证合一且有税务登记证、组织机构代码证的须同时上传）、身份证等证照的电子图片以供甲方核查。</p>
          <p
            class="content-text ten indent"
          >2、乙方不得假冒、借用他人营业执照或其他资质文件与甲方签订《经销协议书》。因乙方原因导致业务不合规的，由乙方承担相应责任。</p>
          <p
            class="content-text ten indent"
          >3、甲方通过第三方物流公司运输给乙方的货物，自甲方货交第三方物流公司之日起即视为货物已发生风险转移。货物在运输过程中若发生遗失或损坏的，甲方可配合乙方向第三方物流公司进行索赔。</p>

          <div class="content-title">
            <p class="title-text">十一、本协议一式两份，双方各执一份，具同等法律效力。</p>
          </div>
          <p class="content-text">甲方（加盖章）：广东玉兰集团股份有限公司</p>
          <p class="content-text">法人代表（或指定代表）：</p>
          <p class="content-text">受委托人：</p>
          <p class="content-text">年&nbsp;&nbsp; 月&nbsp;&nbsp; 日</p>
          <p class="content-text">联系电话：</p>
          <br>
          <p class="content-text">乙方（加盖章）：</p>
          <p class="content-text">法人代表（或指定代表）：</p>
          <p class="content-text">受委托人：</p>
          <p class="content-text">年 &nbsp;&nbsp;月 &nbsp;&nbsp;日</p>
          <p class="content-text">联系电话：</p>
          <br>

          <div class="content-title">
            <p class="title-text">客户银行账号基本信息</p>
          </div>
          <p class="content-text" v-if="who">公司汇款账号信息：</p>
          <p class="content-text" v-else>个人汇款账号信息：</p>
          <p class="content-text">开户名：
            <span class="green">{{account_name}}</span>
          </p>
          <p class="content-text">开户行：
            <span class="green">{{account_bank}}</span>
          </p>
          <p class="content-text">银行账号：
            <span class="green">{{account}}</span>
          </p>
          <p class="content-text">银行所在地：
            <span class="green">{{account_location}}</span>
          </p>

          <p class="content-text">注：</p>
          <p class="content-text">1、协议经销范围无特殊约定时仅限定于城区。</p>
          <p class="content-text">2、签订协议前务必提供最新的客户资料，以便双方业务往来。</p>
        </div>

        <div class="occupy"></div>
      </div>
      <div class="bottom1">
        <div class="save2">
          <div @click="build" ref="build">通过协议书</div>
        </div>
        <div class="save1">
          <div @click="backcard" ref="backcard">退回协议书</div>
        </div>
      </div>
      <div class="foldwrap" v-show="show"></div>
      <div class="foldbox" v-show="show">
        <div class="box-top">
          <!-- <div class="warnimg"></div> -->
          <div class="warnmsg">
            <p>是否确定协议书信息</p>
            <p>完整且无误？</p>
            <p>点击确定将通过</p>
            <p>协议书的编辑。</p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="sure" @click="sure">确定</div>
          <div class="cancel" @click="cancel">取消</div>
        </div>
      </div>
      <div class="foldwrap" v-show="show2"></div>
      <div class="foldbox" v-show="show2">
        <div class="box-top">
          <!-- <div class="warnimg" id="warnimg2"></div> -->
          <div class="warnmsg" id="warnmsg2">
            <p>是否确定退回协议书</p>
            <p>并重新填写？</p>
          </div>
        </div>
        <div class="box-bottom">
          <div class="sure" @click="sure2">确定</div>
          <div class="cancel" @click="cancel2">取消</div>
        </div>
      </div>
      <div class="foldwrap" v-show="show3"></div>
      <div class="foldbox" v-show="show3">
        <div class="box-top">
          <div class="close" @click="cancel3"></div>
          <div class="title">
            退回原因
            <span>(*必填)</span>
          </div>
          <textarea v-model="reason" placeholder="请输入退回原因..." class="reason"></textarea>
          <!-- <div class="warnimg" id="warnimg2"></div>
                    <div class="warnmsg" id="warnmsg2">
                        <p>是否确定退回客户资料卡</p>
                        <p>并重新填写？</p>
          </div>-->
        </div>
        <div class="box-bottom">
          <div class="sure" @click="sure3">退回</div>
          <div class="cancel" @click="cancel3">取消</div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import Top from "@/components/Top";
import review from "@/components/review";
// import agreement from http://14.29.221.109:10250/uplohttp://14.29.221.109:10250/upload/assets/agreement.html'

export default {
  data() {
    return {
      IsShow:false,
      top: 9,
      ccid: "",
      textmodel: "",
      messages: "",
      customerInfo: "",
      show: false,
      show2: false,
      show3: false,
      show4: false,
      reason: "",
      who: "",
      fileNum: "YULAN-JX-19",
      user: "",
      userAddress: "",
      capital: "",
      city: "",
      county: "",
      start: "",
      end: "",
      preferedbrand: "",
      //第三部分数据
      precent1: "",
      precent2: "",
      precent3: "",
      money1: "",
      money2: "",
      money3: "",
      money4: "",
      //银行信息
      account_name: "",
      account_bank: "",
      account: "",
      account_location: "",
      m1: "",
      m2: "",
      m3: "",
      m4: "",
      m5: "",
      m6: "",
      m7: "",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      m12: "",
      totalm: "",
      startDate: "",
      endDate: "",
      signed: 0,
      state: "",
      year: "",
      month: "",
      day: "",
      hour: "",
      minutue: "",
      position: "",
      reviseflag: false, //是否能修改协议书
      market: " ",
      csa: " "
    };
  },
  methods: {
    initTime(time) {
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      let date = time.getDate();
      if (parseInt(date) < 10) {
        date = "0" + date;
      }
      let hour = time.getHours();
      if (parseInt(hour) < 10) {
        hour = "0" + hour;
      }
      let minute = time.getMinutes();
      if (parseInt(minute) < 10) {
        minute = "0" + minute;
      }

      return year + "-" + month + "-" + date + " " + hour + ":" + minute + " ";
    },
    more() {
      this.show4 = true;
    },
    listen(data) {
      this.show4 = false;
    },
    getdata() {
      let url = "/infoState/getYLcontractentryState.do";
      let data = {
        cid: this.companyId,
        cyear: this.$store.state.year
      };

      this.$http.post(url, data).then(res => {
        var alldata = res.data;
        this.customerInfo = alldata.yLcontractInfo;
        this.messages = alldata.yLcontractentryMemo.reverse();
      });
    },
    sure() {
      let nowTime = this.initTime(new Date());
      let th = this;
      console.log(this.$store.state.position);
      switch (this.$store.state.position) {
        case "SALEMAN_M":
        case "SALEMAN_S":
          this.signed = 0;
          this.state = "CUSTOMERAFFIRM";
          break;
        case "MANAGER":
          this.signed = 0;
          this.state = "DEP_MARKET_CHECK";
          break;
        case "MARKETCHECKER":
          this.signed = 0;
          this.state = "CSA_CHECK";
          break;
        case "VSMAPPROVEXII":
          this.signed = 1;
          this.state = "APPROVED";
          break;
        default:
          this.signed = 0;
          this.state = "ASM_CHECKING";
          break;
      }
      if (this.$store.state.info.data.type === "ECWEB") {
        this.state = "ASM_CHECKING";
        this.signed = 0;
        this.position = " ";
      }
      if (this.$store.state.position == "VSMAPPROVEXII") {
        this.csa = this.$store.state.info.data.realName;
      }
      if (this.$store.state.position == "MARKETCHECKER") {
        this.market = this.$store.state.info.data.realName;
      }
      let data = {
        cid: this.companyId,
        state: this.state,
        wfmemo:
          nowTime +
          this.position +
          " " +
          this.$store.state.info.data.realName +
          " 通过协议书;",
        signed: this.signed,
        market: this.market,
        csa: this.csa
      };
      console.log(data);
      this.$http
        .post("/infoState/checkYLcontractentryState.do", data)
        .then(function(res) {
          console.log(res);
          th.$router.push({
            path: "/success5"
          });
        });
    },
    cancel() {
      this.show = false;
    },
    build() {
      console.log(this.reviseflag);
      this.show = this.reviseflag ? true : false;
    },
    backcard() {
      this.show2 = this.reviseflag ? true : false;
    },
    sure2() {
      this.show2 = false;
      this.show3 = true;
    },
    cancel2() {
      this.show2 = false;
    },
    sure3() {
      let th = this;
      let nowTime = this.initTime(new Date());
      console.log(this.reason);
      if (!this.reason) {
        alert("请填写退回原因!");
      } else {
        this.show3 = false;
        if (this.$store.state.info.data.type === "ECWEB") {
          this.position = " ";
        }
        this.$http
          .post("/infoState/checkYLcontractentryState.do", {
            cid: this.companyId,
            state: "SALEMANMODIFYING",
            wfmemo:
              nowTime +
              this.position +
              " " +
              this.$store.state.info.data.realName +
              "退回协议书 [" +
              this.reason +
              "];",
            signed: 2,
            market: this.market,
            csa: this.csa
          })
          .then(function(res) {
            console.log(1);
            th.$router.push({
              path: "/success5"
            });
          });
      }
    },
    cancel3() {
      this.show3 = false;
    }
  },
  mounted() {
    let th = this;
    if (this.$store.state.info.data.type == "ECWEB") {
      this.ccid = this.$store.state.info.data.loginName;
    } else {
      this.ccid = this.$store.state.CCID;
    }
    this.$http.post("/infoState/getYLcontractentryState.do",{
        cid:this.companyId,
        cyear:this.$store.state.year
    }).then(res => {

      if(res.data.yLcontractInfo != undefined){
        this.IsShow = true;

    this.$http
      .post("/customerInfo/getNcustomerinfo.do", {
        year: this.$store.state.year,
        limit: "10",
        page: "1",
        state: "",
        cid: "",
        find: this.getNcustomerinfo,
        area_1: "",
        area_2: "",
        position: "",
        ylcstate: ""
      })
      .then(function(res) {
        let ylcstate = res.data.data[0].YLCSTATE;
        if (th.$store.state.info.data.type == "ECWEB") {
          if (ylcstate == "CUSTOMERAFFIRM") {
            th.reviseflag = true;
          }
        } else {
          switch (th.$store.state.position) {
            case "SALEMAN_M":
              th.position = "办事处经理";
              th.reviseflag = false;
              break;
            case "SALEMAN_S":
              th.position = "业务经理";
              th.reviseflag = false;
              break;
            case "MANAGER":
              th.position = "中心总经理";
              if (ylcstate == "ASM_CHECKING") {
                th.reviseflag = true;
              }
              break;
            case "MARKETCHECKER":
              th.position = "市场部";
              if (ylcstate == "DEP_MARKET_CHECK") {
                th.reviseflag = true;
              }
              break;
            case "VSMAPPROVEXII":
              th.position = "销售总监";
              if (ylcstate == "CSA_CHECK") {
                th.reviseflag = true;
              }
              break;
            default:
              break;
          }
        }
        if (!th.reviseflag) {
          th.$refs.backcard.style.background = "#c2c2c2";
          th.$refs.build.style.background = "#c2c2c2";
        }
      })
      .catch(function(res) {
        console.log(res);
      });

    if (this.$store.state.position == undefined) {
      this.position = "客户" + this.$store.state.info.data.realName;
      this.reviseflag = true;
    }

    this.getdata(),
      this.$http
        .post("/YLcontractentry/getYLcontractAPP.do", {
          cid: this.getNcustomerinfo
        })
        .then(res => {
          this.who = parseInt(res.data.State);
          this.user = res.data.cname;
          this.userAddress = res.data.xPostAddress;
          this.capital = res.data.xDistrict;
          this.city = res.data.xAreaDistrict2;
          this.county = res.data.xAreaDistrict3;
          this.start = res.data.startDate;
          this.end = res.data.endDate;
          this.m1 = res.data.m1;
          this.m2 = res.data.m2;
          this.m3 = res.data.m3;
          this.m4 = res.data.m4;
          this.m5 = res.data.m5;
          this.m6 = res.data.m6;
          this.m7 = res.data.m7;
          this.m8 = res.data.m8;
          this.m9 = res.data.m9;
          this.m10 = res.data.m10;
          this.m11 = res.data.m11;
          this.m12 = res.data.m12;
          this.account_name = res.data.Account2Name;
          this.account_bank = res.data.Account2Bank;
          this.account = res.data.Account2;
          this.account_location = res.data.Account2Location;
          this.money1 = res.data.total;
          this.money2 = res.data.aRetailing;
          this.money3 = res.data.cMatching;
          this.money4 = res.data.RMB;
          this.totalm = res.data.totalm;
          this.precent1 = res.data.rewordpercent;
          this.precent2 = res.data.rewordpercent2;
          this.precent3 = res.data.Stockpercent;
          this.startDate = res.data.startDate;
          this.endDate = res.data.endDate;
          this.preferedbrand = res.data.preferedbrand;
        });
      }else{
        alert("如资料卡已通过审批，请联系业务经理生成协议书，谢谢!")
        this.IsShow = false;
      }
    }).catch(err =>{
      console.log(err);
    })
    if( this.IsShow == true){

    }
  },
  components: {
    Top,
    review
  },
  computed: {
    CID() {
      if (this.$store.state.info.data.type != "ECWEB") {
        return this.$store.state.CCID;
      } else {
        return this.$store.state.info.data.loginName;
      }
    },
    companyId() {
      return this.$store.getters.getCMId;
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}
.agreement {
  font-family: "PingFangHK-Regular", sans-serif;
  width: 375px;
  height: 100vh;
  overflow-x: hidden;
  background: #efefef;
}
.content {
  /* height: 588px; */
  overflow-x: hidden;
  background: #efefef;
  overflow-y: scroll;
  padding-top: 55px;
  height: 100vh;
  box-sizing: border-box;
}
.content::-webkit-scrollbar {
  display: none;
}
.download {
  width: 67px;
  height: 86px;
  position: fixed;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  border-radius: 7px;
  left: 14px;
  top: 71px;
  opacity: 0.7;
}
.download_img {
  width: 34px;
  height: 34px;
  padding-top: 17px;
  display: inline-block;
  background-image: url(../assets/download.png);
  background-repeat: no-repeat;
  background-size: 34px;
  background-position-y: 17px;
}
.download_text {
  padding-top: 3px;
  color: #ffffff;
  font-size: 10px;
}
.review {
  height: 51px;
  position: relative;
}
.review-box {
  position: absolute;
  bottom: 8px;
  width: 80px;
  text-align: right;
  right: 35px;
  font-size: 15px;
  color: #89cb81;
  background-image: url(../assets/triangle_down_fill.png);
  background-size: 12px 17px;
  background-repeat: no-repeat;
  background-position: 6px 2px;
}
.review-box span {
  text-decoration: underline;
}
.agreement-text {
  display: inline-block;
  width: 318px;
  background: #ffffff;
  padding-top: 35px;
  padding-bottom: 20px;
  border-radius: 7px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  font-size: 12px;
}
.agreement-text h1 {
  font-size: 17px;
  margin: 0;
}
.footnote {
  font-size: 10px;
  color: #666666;
  text-align: left;
  font-size: 13px;
  /* padding-left: 130px; */
  margin-bottom: 0;
}
.text-box {
  padding-top: 10px;
  display: inline-block;
  width: 280px;
}
.content-text {
  padding-top: 5px;
  text-align: left;
  font-size: 13px;
  color: #7d7d7d;
  margin: 0px;
  line-height: 25px;
}
.content-text > span {
  text-decoration: underline;
}
.green {
  color: #89cb81;
}
.content-title {
  width: 100%;
  border-radius: 5px;
}
.title-text {
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 14px;
  padding: 2px 0;
  color: #000000;
  text-align: left;
  margin: 9px 0 7px 0;
  line-height: 21px;
}
.bottom {
  width: 100%;
  height: 15px;
}
#reviewcard {
  position: absolute;
  top: -90px;
  left: 380px;
}
.bottom1 {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background: rgb(112, 111, 111);
}
.save1 div {
  box-sizing: border-box;
  line-height: 37px;
  width: 116px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: #4b4b4b;
  float: left;
  margin: 11px auto 11px 55px;
}
.save2 div {
  box-sizing: border-box;
  width: 116px;
  line-height: 37px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  float: left;
  margin: 11px auto 11px 44px;
}
.foldwrap {
  width: 100%;
  height: 1000px;
  position: fixed;
  top: 0;
  background: rgba(54, 54, 54, 0.4);
  z-index: 30;
}
.foldbox {
  width: 286px;
  height: 203px;
  background: #ffffff;
  position: fixed;
  top: 199px;
  z-index: 40;
  border-radius: 10px;
  left: 45px;
}
.box-top {
  height: 155px;
  width: 100%;
}
/* .warnimg {
  background-image: url("http://14.29.221.109:10250/upload/assets/warn.png");
  width: 65px;
  height: 65px;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  top: 28px;
  display: inline-block;
} */
.warnmsg {
  position: relative;
  top: 35px;
  padding-left: 40px;
  padding-right: 40px;
  letter-spacing: 2px;
}
.warnmsg p {
  margin: 0;
  line-height: 22px;
  font-family: "PingFang-Regular", sans-serif;
  font-size: 15px;
  color: #7d7d7d;
}
.box-bottom {
  height: 48px;
  width: 100%;
  font-size: 0;
}
.sure,
.cancel {
  width: 50%;
  height: 100%;
  line-height: 48px;
  display: inline-block;
  font-size: 18px;
  background: #f2f2f2;
  color: #7d7d7d;
}
.sure {
  border-radius: 0 0 0 10px;
  background: #363636;
  color: rgba(255, 255, 255, 1);
}
.cancel {
  border-radius: 0 0 10px 0;
}
#warnimg2 {
  top: 48px;
}
#warnmsg2 {
  top: 65px;
}
.close {
  background: url(http://14.29.221.109:10250/upload/assets/close.png);

  background-size: contain;
  background-repeat: no-repeat;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 11px;
  top: 9.5px;
}
.title {
  font-size: 15px;
  padding-top: 17px;
  text-align: left;
  color: #000000;
  padding-left: 32px;
}
.title span {
  color: red;
}
.reason {
  width: 236px;
  height: 85px;
  margin-top: 5px;
  border-radius: 10px;
  border: 1px solid #b1b1b1;
  padding: 5px;
  overflow: scroll;
}
.reason::placeholder {
  font-size: 13px;
  color: #b1b1b1;
  padding-left: 8px;
}
.occupy {
  height: 64px;
}
.ten {
  text-decoration: underline;
}
.indent {
  text-indent: 26px;
}
td {
  border: 1px solid #eee;
}
</style>


