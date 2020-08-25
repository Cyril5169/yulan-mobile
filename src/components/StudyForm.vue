<template>
  <div class="syudyForm">
    <div class="top">
      <img
        v-if="showClose"
        class="backlist"
        @click="closePop"
        src="../ordersystem/assetsorder/back.png"
        alt
      />
      <span>{{title}}</span>
    </div>
    <div class="allStudyBody">
      <header>
        <h1 class="studyTitle">{{ selectData.TITLE }}</h1>
      </header>
      <header>
        <h1 class="studySubTitle">{{ selectData.DESCP }}</h1>
      </header>
      <div class="studyContent">
        <!-- 循环组 -->
        <div class="studyGroup" v-for="group in studyContextData" :key="group.ORDERINDEX">
          <div class="groupHead">
            <span class="groupTitle">{{ group.TITLE }} [{{ group.QUESTIONCOUNT }}]</span>
          </div>
          <!-- 循环问题 -->
          <div class="controllerItem" v-for="context in group.contextList" :key="context.SID">
            <div class="questionItem">
              <h1 class="questionTitle">{{ context.ORDERINDEX }}.{{ context.TITLE }}</h1>
              <!-- 分类加载答案 -->
              <!-- 标准5项 -->
              <div class="optionClass" v-if="context.TYPE == 'STAND_5_SINGLE'">
                <van-radio-group v-model="context.optionResultValue">
                  <van-radio
                    class="optionSingle"
                    icon-size="14px"
                    :name="index+1"
                    v-for="(option, index) in context.optionList"
                    :key="index"
                    :disabled="checkType"
                  >{{ option.OPTIONTEXT }}</van-radio>
                </van-radio-group>
              </div>
              <!-- 标准6分量化 -->
              <div class="optionClass" v-else-if="context.TYPE == 'STAND_6_SINGLE'">
                <span style="display:inline-block;margin-right:10px;">
                  {{
                  context.OPTIONTEXT1
                  }}
                </span>
                <span style="display:inline-block;">
                  <van-rate
                    class="optionSingle"
                    v-model="context.optionResultValue"
                    :count="6"
                    color="#FF9900"
                    :disabled="checkType"
                  />
                </span>
                <span style="display:inline-block;margin-left:8px;">
                  {{
                  context.OPTIONTEXT6
                  }}
                </span>
              </div>
              <!-- 自定义单选 -->
              <div class="optionClass" v-else-if="context.TYPE == 'CUSTM_SINGLE'">
                <van-radio-group v-model="context.optionResultValue">
                  <van-radio
                    class="optionSingle"
                    icon-size="14px"
                    :name="index+1"
                    @click="radioChange(context)"
                    v-for="(option, index) in context.optionList"
                    :key="index"
                    :disabled="checkType"
                  >
                    <template
                      v-if="
                        context.LASTOPTIONEEDINPUT == 1 &&
                          index == context.optionList.length - 1
                      "
                    >
                      <van-field
                        class="fieldCls"
                        style="height:35px;"
                        :label=" option.OPTIONTEXT"
                        v-model="context.optionExtraValue"
                        clickable
                        :disabled="checkType"
                      />
                    </template>
                    <span v-else>{{ option.OPTIONTEXT }}</span>
                  </van-radio>
                </van-radio-group>
              </div>
              <!-- 自定义多选 -->
              <div class="optionClass" v-else-if="context.TYPE == 'CUSTM_MULTIP'">
                <van-checkbox-group
                  v-model="context.optionResultValue"
                  @change="radioChange2(context)"
                >
                  <van-checkbox
                    class="optionSingle"
                    icon-size="14px"
                    shape="square"
                    :name="index+1"
                    v-for="(option, index) in context.optionList"
                    :key="index"
                    :disabled="checkType"
                  >
                    <template
                      v-if="
                        context.LASTOPTIONEEDINPUT == 1 &&
                          index == context.optionList.length - 1
                      "
                    >
                      <van-field
                        @click.stop
                        class="fieldCls"
                        style="height:35px;"
                        :label=" option.OPTIONTEXT"
                        :disabled="context.optionResultValue.indexOf(index + 1) == -1 || checkType"
                        v-model="context.optionExtraValue"
                        :clickable="context.optionResultValue.indexOf(index + 1) != -1"
                      />
                    </template>
                    <span v-else>{{ option.OPTIONTEXT }}</span>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
              <!-- 短填空 -->
              <div class="optionClass" v-else-if="context.TYPE == 'SHORT_INPUT'">
                <van-field
                  class="optionSingle fieldCls"
                  style="height:35px;"
                  v-model="context.optionResultValue"
                  placeholder="在此输入答案"
                  clickable
                  :disabled="checkType"
                />
              </div>
              <!-- 长填空 -->
              <div class="optionClass" v-else-if="context.TYPE == 'LONG_INPUT'">
                <van-field
                  class="optionSingle fieldCls"
                  type="textarea"
                  rows="3"
                  v-model="context.optionResultValue"
                  placeholder="在此输入答案"
                  clickable
                  :disabled="checkType"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="studyBottom">
      <span @click="submitStudy" v-if="!checkType">提交调查表</span>
    </div>
  </div>
</template>

<script>
import {
  RadioGroup,
  Radio,
  Rate,
  Field,
  CheckboxGroup,
  Checkbox,
  Toast,
} from "vant";
import {
  GetGroupContextOption,
  BeginEditStudy,
  SubmitStudy,
} from "@/api/studyASP";

export default {
  props: {
    showClose: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    selectData: {
      type: Object,
      default: null,
    },
    checkType: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Rate.name]: Rate,
    [Field.name]: Field,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast,
  },
  data() {
    return {
      showStydyForm: false,
      studyContextData: [],
    };
  },
  methods: {
    radioChange(context) {
      if (
        context.LASTOPTIONEEDINPUT == 1 &&
        context.optionResultValue != context.OPTIONNUM &&
        context.optionExtraValue
      ) {
        context.optionExtraValue = "";
      }
    },
    radioChange2(context) {
      if (
        context.LASTOPTIONEEDINPUT == 1 &&
        context.optionResultValue.indexOf(context.OPTIONNUM) == -1 &&
        context.optionExtraValue
      ) {
        context.optionExtraValue = "";
      }
    },
    editStudy() {
      this.studyContextData = [];
      BeginEditStudy({
        cid: this.$store.getters.getCId,
        sfid: this.selectData.SID,
      });
      GetGroupContextOption({
        sfid: this.selectData.SID,
        cid: this.$store.getters.getCId,
      }).then((res) => {
        this.studyContextData = res.data;
        for (var i = 0; i < this.studyContextData.length; i++) {
          for (
            var j = 0;
            j < this.studyContextData[i].contextList.length;
            j++
          ) {
            //赋值答案
            if (
              this.studyContextData[i].contextList[j].optionResultValue &&
              this.studyContextData[i].contextList[j].TYPE != "SHORT_INPUT" &&
              this.studyContextData[i].contextList[j].TYPE != "LONG_INPUT"
            ) {
              if (
                this.studyContextData[i].contextList[
                  j
                ].optionResultValue.indexOf(",") > -1
              ) {
                //多选
                var temp = [];
                this.studyContextData[i].contextList[
                  j
                ].optionResultValue = this.studyContextData[i].contextList[
                  j
                ].optionResultValue.split(",");
                for (
                  var s = 0;
                  s <
                  this.studyContextData[i].contextList[j].optionResultValue
                    .length;
                  s++
                ) {
                  this.studyContextData[i].contextList[j].optionResultValue[
                    s
                  ] = Number(
                    this.studyContextData[i].contextList[j].optionResultValue[s]
                  );
                }
              } else {
                this.studyContextData[i].contextList[
                  j
                ].optionResultValue = Number(
                  this.studyContextData[i].contextList[j].optionResultValue
                );
              }
            }
            if (
              this.studyContextData[i].contextList[j].TYPE ==
                "STAND_6_SINGLE" &&
              !this.studyContextData[i].contextList[j].optionResultValue
            )
              this.studyContextData[i].contextList[j].optionResultValue = 0;
            else if (
              this.studyContextData[i].contextList[j].TYPE == "CUSTM_MULTIP" &&
              !this.studyContextData[i].contextList[j].optionResultValue
            )
              this.studyContextData[i].contextList[j].optionResultValue = [];
          }
        }
      });
    },
    submitStudy() {
      var finalResult = [];
      for (var i = 0; i < this.studyContextData.length; i++) {
        for (var j = 0; j < this.studyContextData[i].contextList.length; j++) {
          var context = this.studyContextData[i].contextList[j];
          //判断完整性
          if (
            !context.optionResultValue ||
            context.optionResultValue.length == 0
          ) {
            if (this.studyContextData.length == 1) {
              Toast("第" + (j + 1) + "题没有填写");
            } else {
              Toast("第" + (i + 1) + "组第" + (j + 1) + "题没有填写");
            }
            return;
          } else {
            if (
              context.LASTOPTIONEEDINPUT == 1 &&
              (context.optionResultValue == context.OPTIONNUM ||
                (context.TYPE === "CUSTM_MULTIP" &&
                  context.optionResultValue.indexOf(context.OPTIONNUM) > -1)) &&
              !context.optionExtraValue
            ) {
              if (this.studyContextData.length == 1) {
                Toast("第" + (j + 1) + "题没有填写完整");
              } else {
                Toast("第" + (i + 1) + "组第" + (j + 1) + "题没有填写完整");
              }
              return;
            }
          }
          //拼接答案
          var option = "";
          if (context.TYPE === "CUSTM_MULTIP") {
            option =
              context.optionResultValue.join(",") +
              (context.optionExtraValue
                ? "_;_" + context.optionExtraValue
                : "");
          } else {
            option =
              context.optionResultValue +
              (context.optionExtraValue
                ? "_;_" + context.optionExtraValue
                : "");
          }
          finalResult.push({
            sid: context.SID,
            option: option,
          });
        }
      }
      SubmitStudy({
        resultValue: finalResult,
        cid: this.$store.getters.getCId,
        sfid: this.selectData.SID,
      }).then((res) => {
        Toast("提交成功");
        this.$emit("refresh"); //触发父组件刷新
      });
    },
    closePop() {
      this.$emit("closePop");
    },
  },
  mounted() {},
  activated() {
    this.editStudy();
  },
};
</script>

<style scoped>
.top {
  top: 0;
  position: fixed;
  /* background: #363636; */
  background: linear-gradient(to right, #bedd81, #87ca81);
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: white;
  font-size: 15px;
}
.backlist {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 17px;
  top: 50%;
  margin-top: -10px;
}
.allStudyBody {
  background: #f8f8f8;
  position: fixed;
  overflow-y: scroll;
  top: 50px;
  bottom: 0;
  left: 0;
  width: 100%;
  -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
  text-align: left !important;
  margin-bottom: 45px;
}
.studyTitle {
  margin: 5px 0;
  text-align: center;
  font-size: 20px;
  color: #555;
}
.studySubTitle {
  margin: 5px 10px;
  text-indent: 32px;
  font-size: 15px;
  color: #555;
}
.studyContent {
  padding: 5px;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
}
.studyGroup {
  margin-bottom: 10px;
  border: 1px solid #ccc;
}
.groupHead {
  height: 20px;
  border-bottom: 1px solid #ccc;
  padding: 8px;
}
.groupTitle {
  font-size: 14px;
  font-weight: bold;
}
.controllerItem {
  border-bottom: 1px dashed #ccc;
}
.questionItem {
  padding: 0;
}
.questionTitle {
  padding: 8px;
  font-size: 14px;
  color: #555;
  margin: 0;
}

.studyBottom {
  background: #89cb81;
  width: 100%;
  height: 45px;
  line-height: 45px;
  position: fixed;
  bottom: 0;
}
.studyBottom span {
  background: white;
  color: #89cb81;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 14px;
}
.optionClass {
  margin-left: 20px;
  font-size: 14px;
}
.optionSingle {
  margin-bottom: 5px;
}
.fieldCls {
  width: 80%;
  padding: 5px 10px;
}
</style>
<style>
.fieldCls .van-field__label {
  width: 50px;
}
.syudyForm .van-radio__icon--disabled.van-radio__icon--checked .van-icon {
  color: #fff;
  background-color: #1989fa;
  border-color: #1989fa;
}
.syudyForm .van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon {
  color: #fff;
  background-color: #1989fa;
  border-color: #1989fa;
}
</style>>
