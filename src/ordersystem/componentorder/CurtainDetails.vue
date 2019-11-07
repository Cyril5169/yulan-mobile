<template>
  <div class="single-curtain">
    <top :top="set" :from="from"></top>
    <div class="contain">
      <div class="select-this">
        <div class="title-item">
          <span class="title-left">款号</span>
          <span class="title-right">{{itemNO}}</span>
        </div>
        <div class="title-item">
          <span class="title-left">成品宽度*高度</span>
          <span class="title-right">{{width}}*{{height}} (米)</span>
        </div>
        <div class="title-item">
          <span class="title-left">假帘高</span>
          <span class="title-right">{{highJia}} (米)</span>
        </div>
        <div class="title-item">
          <span class="title-left">褶皱倍数</span>
          <span class="title-right">{{multiple}}</span>
        </div>
        <div class="title-item">
          <span class="title-left">帘头外包盒单边宽度</span>
          <span class="title-right">{{WBH=== "" ? "无" :WBH}} (米)</span>
        </div>
        <!-- <div class="title-item">
          <span class="title-left">活动</span>
          <span class="title-right"></span>
        </div>
        <div class="title-item">
          <span class="title-left">兰居意见</span>
          <span class="title-right"></span>
        </div>-->
        <div class="title-item">
          <span class="title-left">位置</span>
          <span class="title-right">{{location === "" ? "无" :location}}</span>
        </div>
      </div>
      <div class="show-result">
        <van-collapse v-model="activeName" accordion>
          <div style="position: relative" v-if="lt.length">
            <van-collapse-item title="帘头" name="1" class="curtain-item">
              <!--帘头-->
              <div class="curtain-head">
                <div class="content" v-for="(liantou,index) in lt" :key="index">
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      @click="changeXh('lt',index,liantou.productType,liantou.itemMLGY.changeFlag,liantou.itemMLGY,liantou.useamount)"
                      class="title-right title-right2"
                      :class="{'title-right3':liantou.itemMLGY.changeFlag =='Y'}"
                    >{{liantou.itemNo}}</span>
                    <span style="float:right;margin:4px 5px 0 0;">
                      <van-checkbox
                        v-if="liantou.itemMLGY.deleteFlag =='Y'"
                        v-model="liantou.choose"
                        @change="changeLinkReverse(liantou)"
                      ></van-checkbox>
                    </span>
                    <span v-if="bigToSmall(liantou) == true" class="item-icon2"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span class="title-right title-right2">{{liantou.note}}</span>
                    <!--<span class="item-icon"></span>-->
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{liantou.fixGrade/1000}}</span>
                  </div>
                  <div
                    class="title-item2"
                    @click="liantou.showFG = true"
                    v-if="liantou.fixType != '--' && liantou.itemMLGY.productType =='ML'"
                  >
                    <span class="title-left">面料属性</span>
                    <span class="title-right">{{liantou.fixType}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <span>{{liantou.useamount}}{{liantou.unit}}</span>
                      <input
                        type="number"
                        v-show="liantou.itemMLGY.modifyFlag=='Y'"
                        class="use-num"
                        placeholder="输入用量"
                      />
                    </span>
                  </div>
                  <div class="title-item2" v-show="liantou.LtZz" @click="liantou.showLtZz = true">
                    <span class="title-left">制造说明</span>
                    <span class="title-right title-right2">{{liantou.LtZz}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2" v-show="liantou.notes">
                    <span class="title-left">说明</span>
                    <span class="title-right">{{liantou.notes}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="title-right">
                      <input type="text" class="curtain-beizhu" placeholder="填写备注" />
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.fixType">
                        <van-cell-group>
                          <van-cell title="定宽" clickable @click="changeFG('定宽','lt',liantou)">
                            <van-radio name="定宽" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="定高" clickable @click="changeFG('定高','lt',liantou)">
                            <van-radio name="定高" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择帘头制造说明-->
                  <div class="head-make-details" @click="liantou.showLtZz = false">
                    <van-popup v-model="liantou.showLtZz" position="center">
                      <van-radio-group v-model="liantou.LtZz">
                        <van-cell-group>
                          <van-cell title="么术贴正车" clickable @click="liantou.LtZz = '么术贴正车'">
                            <van-radio name="么术贴正车" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="么术贴反车" clickable @click="liantou.LtZz = '么术贴反车'">
                            <van-radio name="么术贴反车" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="穿/挂杆款" clickable @click="liantou.LtZz = '穿/挂杆款'">
                            <van-radio name="穿/挂杆款" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="特殊见备注" clickable @click="liantou.LtZz = '特殊见备注'">
                            <van-radio name="特殊见备注" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
          <div style="position: relative" v-if="ls.length">
            <van-checkbox class="change-this" v-model="chooseBig[1]" @change="changeLink('ls',1)"></van-checkbox>
            <van-collapse-item title="帘身" name="2" class="curtain-item">
              <!--帘身-->
              <div class="curtain-head">
                <div class="content" v-for="(liantou,index) in ls" :key="index">
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      @click="changeXh('ls',index,liantou.productType,liantou.itemMLGY.changeFlag,liantou.itemMLGY,liantou.useamount)"
                      class="title-right title-right2"
                      :class="{'title-right3':liantou.itemMLGY.changeFlag =='Y'}"
                    >{{liantou.itemNo}}</span>
                    <span style="float:right;margin:4px 5px 0 0;">
                      <van-checkbox
                        v-if="liantou.itemMLGY.deleteFlag=='Y'"
                        v-model="liantou.choose"
                        @change="changeLinkReverse(liantou)"
                      ></van-checkbox>
                    </span>
                    <span v-if="bigToSmall(liantou) == true" class="item-icon2"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span class="title-right title-right2">{{liantou.note}}</span>
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{liantou.fixGrade/1000}}</span>
                  </div>
                  <div
                    class="title-item2"
                    @click="liantou.showFG = true"
                    v-if="liantou.fixType != '--' && liantou.itemMLGY.productType =='ML'"
                  >
                    <span class="title-left">面料属性</span>
                    <span class="title-right">{{liantou.fixType}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <span>{{liantou.useamount}}{{liantou.unit}}</span>
                      <input
                        type="number"
                        v-show="liantou.itemMLGY.modifyFlag =='Y'"
                        class="use-num"
                        placeholder="输入用量"
                      />
                    </span>
                  </div>
                  <div class="title-item2" v-show="liantou.MlZz" @click="liantou.showMlZz = true">
                    <span class="title-left">制造说明</span>
                    <span class="title-right title-right2">{{liantou.MlZz}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2" v-show="liantou.notes">
                    <span class="title-left">说明</span>
                    <span class="title-right">{{liantou.notes}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="title-right">
                      <input type="text" class="curtain-beizhu" placeholder="填写备注" />
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.fixType">
                        <van-cell-group>
                          <van-cell title="定宽" clickable @click="changeFG('定宽','lt',liantou)">
                            <van-radio name="定宽" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="定高" clickable @click="changeFG('定高','lt',liantou)">
                            <van-radio name="定高" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择帘身制造说明-->
                  <div class="head-make-details" @click="liantou.showMlZz = false">
                    <van-popup v-model="liantou.showMlZz" position="center">
                      <van-radio-group v-model="liantou.MlZz">
                        <van-cell-group>
                          <van-cell title="对开" clickable @click="liantou.MlZz = '对开'">
                            <van-radio name="对开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="单开" clickable @click="liantou.MlZz = '单开'">
                            <van-radio name="单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="特殊见备注" clickable @click="liantou.MlZz = '特殊见备注'">
                            <van-radio name="特殊见备注" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
          <div style="position: relative" v-if="lspb.length">
            <!--帘身配布-->
          </div>
          <div style="position: relative" v-if="sha.length">
            <van-checkbox class="change-this" v-model="chooseBig[3]" @change="changeLink('sha',3)"></van-checkbox>
            <van-collapse-item title="纱" name="3" class="curtain-item">
              <!--纱-->
              <div class="gauze">
                <div class="content" v-for="(liantou,index) in sha" :key="index">
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      @click="changeXh('sha',index,liantou.productType,liantou.itemMLGY.changeFlag,liantou.itemMLGY)"
                      class="title-right title-right2"
                      :class="{'title-right3':liantou.itemMLGY.changeFlag=='Y'}"
                    >{{liantou.itemNo}}</span>
                    <span style="float:right;margin:4px 5px 0 0;">
                      <van-checkbox
                        v-if="liantou.itemMLGY.deleteFlag=='Y'"
                        v-model="liantou.choose"
                        @change="changeLinkReverse(liantou)"
                      ></van-checkbox>
                    </span>
                    <span v-if="bigToSmall(liantou) == true" class="item-icon2"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span class="title-right title-right2">{{liantou.note}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{liantou.fixGrade}}</span>
                  </div>
                  <div
                    class="title-item2"
                    @click="liantou.showFG = true"
                    v-if="liantou.fixType && liantou.itemMLGY.productType =='ML'"
                  >
                    <span class="title-left">面料属性</span>
                    <span class="title-right">{{liantou.fixType}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <span>{{liantou.useamount}}{{liantou.unit}}</span>
                      <input
                        type="number"
                        v-if="liantou.itemMLGY.modifyFlag =='Y'"
                        class="use-num"
                        placeholder="输入用量"
                      />
                    </span>
                  </div>
                  <div class="title-item2" v-if="liantou.MlZz" @click="liantou.showMlZz = true">
                    <span class="title-left">制造说明</span>
                    <span class="title-right title-right2">{{liantou.MlZz}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2" v-if="liantou.notes">
                    <span class="title-left">说明</span>
                    <span class="title-right">{{liantou.notes}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="title-right">
                      <input type="text" class="curtain-beizhu" placeholder="填写备注" />
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.fixType">
                        <van-cell-group>
                          <van-cell title="定宽" clickable @click="changeFG('定宽','lt',liantou)">
                            <van-radio name="定宽" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="定高" clickable @click="changeFG('定高','lt',liantou)">
                            <van-radio name="定高" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择纱面料制造说明-->
                  <div class="head-make-details" @click="liantou.showMlZz = false">
                    <van-popup v-model="liantou.showMlZz" position="center">
                      <van-radio-group v-model="liantou.MlZz">
                        <van-cell-group>
                          <van-cell title="对开" clickable @click="liantou.MlZz = '对开'">
                            <van-radio name="对开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="单开" clickable @click="liantou.MlZz = '单开'">
                            <van-radio name="单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="特殊见备注" clickable @click="liantou.MlZz = '特殊见备注'">
                            <van-radio name="特殊见备注" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
          <div style="position: relative" v-if="pjb.length">
            <van-collapse-item title="配件" name="4" class="curtain-item">
              <!--配件-->
              <div class="gauze">
                <div class="content" v-for="(liantou,index) in pjb" :key="index">
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      @click="changeXh('pjb',index,liantou.productType,liantou.itemMLGY.changeFlag,liantou.itemMLGY)"
                      class="title-right title-right2"
                      :class="{'title-right3':liantou.itemMLGY.changeFlag=='Y'}"
                    >{{liantou.itemNo}}</span>
                    <span v-if="bigToSmall(liantou) == true" class="item-icon2"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span class="title-right title-right2">{{liantou.note}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{liantou.fixGrade}}</span>
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.fixType && liantou.itemMLGY.productType =='ML'"
                  >
                    <span class="title-left">面料属性</span>
                    <span class="title-right">{{liantou.fixType}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <span>{{liantou.useamount}}{{liantou.unit}}</span>
                      <input
                        type="number"
                        v-show="liantou.itemMLGY.modifyFlag =='Y'"
                        class="use-num"
                        placeholder="输入用量"
                      />
                    </span>
                  </div>
                  <div class="title-item2" v-show="liantou.notes">
                    <span class="title-left">说明</span>
                    <span class="title-right">{{liantou.notes}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="title-right">
                      <input type="text" class="curtain-beizhu" placeholder="填写备注" />
                    </span>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
        </van-collapse>
      </div>
    </div>
    <!--选择帘身制造说明-->
    <div class="body-make-details">
      <van-popup v-model="showBodyMakeDetails" position="bottom">
        <van-radio-group v-model="bodyMakeDetails">
          <van-cell-group>
            <van-cell title="未选择" clickable @click="bodyMakeDetails = '未选择'">
              <van-radio name="未选择" checked-color="#89cb81" />
            </van-cell>
            <van-cell title="对开" clickable @click="bodyMakeDetails = '对开'">
              <van-radio name="对开" checked-color="#89cb81" />
            </van-cell>
            <van-cell title="单开" clickable @click="bodyMakeDetails = '单开'">
              <van-radio name="单开" checked-color="#89cb81" />
            </van-cell>
            <van-cell title="特殊见备注" clickable @click="bodyMakeDetails = '特殊见备注'">
              <van-radio name="特殊见备注" checked-color="#89cb81" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="comfirm-bottom" @click="comfirmMakeDetails">
          <span>确定</span>
        </div>
      </van-popup>
    </div>
    <!--选择配件包-->
    <div class="parts-package-details">
      <van-popup v-model="showPartsPackage" position="bottom">
        <van-radio-group v-model="partsPackage">
          <van-cell-group>
            <van-cell title="上样安装包(罗马杆+方轨)" clickable @click="partsPackage = '上样安装包(罗马杆+方轨)'">
              <van-radio name="上样安装包(罗马杆+方轨)" checked-color="#89cb81" />
            </van-cell>
            <van-cell title="上样安装包(罗马杆)" clickable @click="partsPackage = '上样安装包(罗马杆)'">
              <van-radio name="上样安装包(罗马杆)" checked-color="#89cb81" />
            </van-cell>
            <van-cell title="上样安装包(方轨)" clickable @click="partsPackage = '上样安装包(方轨)'">
              <van-radio name="上样安装包(方轨)" checked-color="#89cb81" />
            </van-cell>
            <van-cell title="未选择配件包" clickable @click="partsPackage = '未选择配件包'">
              <van-radio name="未选择配件包" checked-color="#89cb81" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <div class="comfirm-bottom" @click="comfirmMakeDetails">
          <span>确定</span>
        </div>
      </van-popup>
    </div>
    <!--制造工艺-->
    <van-popup v-model="showGy" position="right" class="show-gy">
      <div class="searchtop">
        <van-search
          class="search-more"
          v-model="inputValue"
          background="linear-gradient(to right, #BEDD81, #87CA81)"
          placeholder="输入型号"
          show-action
          @search="onSearchWall"
        >
          <div slot="action" @click="onSearchWall" style="color: white">搜索</div>
        </van-search>
        <img class="img" src="../assetsorder/back.png" @click="nolist" />
      </div>
      <!--可替换型号列表-->
      <div class="all-itemlists">
        <ul v-if="productType != 'GY'">
          <li
            v-for="(item,index) in itemNolists"
            @click="selthisItemNo(item)"
            class="itemNolist"
            :key="index"
          >{{item.itemNo}}</li>
        </ul>
        <ul v-else>
          <li
            v-for="(item,index) in itemNolists"
            @click="selthisItemNo(item)"
            class="itemNolist"
            :key="index"
          >{{item.itemNo}}</li>
        </ul>
      </div>
      <!--底部分页-->
      <div class="fy-contain">
        <van-pagination
          class="fy-bottom"
          v-model="currentPage"
          :page-count="totalPage"
          :items-per-page="itemsPerPage"
          :total-items="totalLists"
          mode="simple"
          @change="changePage"
        />
      </div>
    </van-popup>
    <div class="shop-btn" @click="toCart">加入购物车</div>
  </div>
</template>

<script>
import axios from "axios";
import top from "../../components/Top";
import { GetDosageAll, GetDosageByNo } from "@/api/itemInfoASP";
import {
  Search,
  Checkbox,
  CheckboxGroup,
  Popup,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Collapse,
  CollapseItem,
  Icon,
  Pagination,
  Toast
} from "vant";

export default {
  name: "singlecurtain",
  components: {
    top,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Icon.name]: Icon,
    [Search.name]: Search,
    [Pagination.name]: Pagination,
    [Toast.name]: Toast
  },
  data() {
    return {
      set: 28,
      limit: 26,
      activeName: "",
      itemNO: this.$route.params.itemNO,
      width: this.$route.params.width, //成品宽度
      height: this.$route.params.height, //成品高度
      WBH: this.$route.params.WBH, //帘头外包盒宽度
      multiple: this.$route.params.multiple, //褶皱倍数
      location: this.$route.params.location,
      isWBH: this.$route.params.isWBH,
      activity: this.$route.params.activity,
      groupType: this.$route.params.groupType,
      highJia: 0,
      //帘头制造说明
      showHeadMakeDetails: false,
      heaadMakeDetails: "未选择",
      //帘身和纱制造说明
      showBodyMakeDetails: false,
      bodyMakeDetails: "未选择",
      //配件包
      showPartsPackage: false,
      //制造工艺
      showGy: false,
      type: "",
      partsPackage: "无",
      partsPackageNum: "未选择配件包",
      lt: [], //帘头
      ls: [], //帘身
      lspb: [], //帘身配布
      sha: [], //纱
      pjb: [], //配件包
      inputValue: "",
      itemNolists: [], //所有可供选择的型号
      chooseBig: [true, true, true, true, true], //是否选择了大类
      //当前页数
      currentPage: 1,
      //总页数
      totalPage: 0,
      //总记录数
      totalLists: 0,
      //每页记录数
      itemsPerPage: 10,
      //通过页数来判断change是执行哪个函数
      pageMark: 0,
      index: "",
      productType: "",
      itemType: "",
      changeFlag: "",
      itemMLGY: {},
      useamount: "", //用量
      from: ""
    };
  },
  methods: {
    changeLink(type, index) {
      if (type == "ls") {
        for (var i = 0; i < this.ls.length; i++) {
          this.ls[i].choose = this.chooseBig[index];
        }
      } else if (type == "sha") {
        for (var i = 0; i < this.sha.length; i++) {
          this.sha[i].choose = this.chooseBig[index];
        }
      } else if (type == "lspb") {
      }
    },
    changeLinkReverse(data) {
      let _index;
      let _arr = [];
      let flag = true;
      switch (data.itemMLGY.itemType) {
        case "lt":
          _index = 0;
          _arr = this.lt;
          break;
        case "ls":
          _index = 1;
          _arr = this.ls;
          break;
        case "lspb":
          _index = 2;
          _arr = this.lspb;
          break;
        case "sha":
          _index = 3;
          _arr = this.sha;
          break;
        case "pjb":
          _index = 4;
          _arr = this.pjb;
          break;
        default:
          _index = -1;
      }
      /**
       * 8.22新需求
       * 帘头改为配件包的勾选方式
       * 即取消双向绑定，帘头固定
       */
      if (_index >= 1 && _index <= 4) {
        _arr.forEach(item => {
          if (item.itemMLGY.deleteFlag !== "Y" || item.choose === true) {
            flag = false;
          }
        });
        if (data.choose || flag) {
          this.chooseBig[_index] = data.choose;
          this.$set(this.chooseBig, _index, data.choose);
        }
      }
    },
    //选择此款
    selectThis() {
      if (this.$route.params.WBH == "") {
        this.$route.params.WBH = "0";
      }
      let URL = this.orderBaseUrl + "/item/getCurtainInfo.do";
      let data = {
        itemNO: this.$route.params.itemNO,
        width: this.$route.params.width, //成品宽度
        height: this.$route.params.height, //成品高度
        WBH:
          this.$route.params.isWBH === false || this.$route.params.WBH === ""
            ? "0"
            : this.$route.params.WBH, //帘头外包盒宽度
        multiple: this.$route.params.multiple, //褶皱倍数
        location: this.$route.params.location
      };
      axios.post(URL, data).then(res => {
        GetDosageAll(data).then(res2 => {
          let itemLists = res.data.itemList;
          this.highJia = res.data.itemList[0].highJia;
          this.lt = [];
          this.ls = [];
          this.sha = [];
          this.pjb = [];
          //替换用量
          var dosageFilter = res2.data;
          var gy003 = dosageFilter.filter(item => item.ITEM_NO == "GY-003");
          if (gy003.length > 0) res.data.GY = gy003[0].dosage;
          if (res.data.lt) {
            res.data.lt = dosageFilter.find(item => item.type == "lt").dosage;
          }
          if (res.data.ls) {
            res.data.ls = dosageFilter.find(item => item.type == "ls").dosage;
          }
          if (res.data.XHBlt) {
            res.data.XHBlt = dosageFilter.find(
              item => item.type == "XHBlt"
            ).dosage;
          }
          if (res.data.XHBls) {
            res.data.XHBls = dosageFilter.find(
              item => item.type == "XHBls"
            ).dosage;
          }
          if (res.data.LCB) {
            res.data.LCB = dosageFilter.find(item => item.type == "LCB").dosage;
          }
          if (res.data.sha) {
            res.data.sha = dosageFilter.find(item => item.type == "sha").dosage;
          }
          //将数据进行分类
          for (let i = 0; i < itemLists.length; i++) {
            itemLists[i].choose = true;
            //风格
            if (itemLists[i].fixType == "01") {
              itemLists[i].fixType = "定宽";
            } else if (itemLists[i].fixType == "02") {
              itemLists[i].fixType = "定高";
            } else {
              itemLists[i].fixType = "--";
            }
            this.$set(itemLists[i], "showFG", false);
            //规格
            // if (itemLists[i].fixGrade == 0) {
            //   itemLists[i].fixGrade = "--"
            // }
            //单位乱码转换
            if (itemLists[i].unit == "°ü") {
              itemLists[i].unit = "包";
            }
            if (itemLists[i].itemMLGY.itemType == "lt") {
              if (itemLists[i].itemMLGY.productType == "LCB") {
                this.$set(itemLists[i], "useamount", res.data.LCB);
              } else if (itemLists[i].itemMLGY.productType == "XHB") {
                this.$set(itemLists[i], "useamount", res.data.XHBlt);
              } else {
                this.$set(itemLists[i], "useamount", res.data.lt);
              }
              this.$set(itemLists[i], "LtZz", "未选");
              this.$set(itemLists[i], "showLtZz", false);
              this.lt.push(itemLists[i]);
            } else if (itemLists[i].itemMLGY.itemType == "ls") {
              if (itemLists[i].itemMLGY.productType == "LCB") {
                this.$set(itemLists[i], "useamount", res.data.LCB);
              } else if (itemLists[i].itemMLGY.productType == "XHB") {
                this.$set(itemLists[i], "useamount", res.data.XHBls);
              } else {
                this.$set(itemLists[i], "useamount", res.data.ls);
              }
              //制造说明
              if (itemLists[i].itemMLGY.productType == "ML") {
                this.$set(itemLists[i], "MlZz", "未选");
                this.$set(itemLists[i], "showMlZz", false);
              }
              this.ls.push(itemLists[i]);
            } else if (itemLists[i].itemMLGY.itemType == "lspb") {
              this.lspb.push(itemLists[i]);
            } else if (itemLists[i].itemMLGY.itemType == "sha") {
              if (itemLists[i].itemMLGY.productType == "LCB") {
                this.$set(itemLists[i], "useamount", res.data.LCB);
              } else {
                this.$set(itemLists[i], "useamount", res.data.sha);
              }
              //制造说明
              if (itemLists[i].itemMLGY.productType == "ML") {
                this.$set(itemLists[i], "MlZz", "未选");
                this.$set(itemLists[i], "showMlZz", false);
              }
              this.sha.push(itemLists[i]);
            } else if (itemLists[i].itemMLGY.itemType == "pjb") {
              if (itemLists[i].itemMLGY.productType == "LCB") {
                this.$set(itemLists[i], "useamount", res.data.LCB);
              } else {
                this.$set(itemLists[i], "useamount", res.data.pjb);
              }
              this.pjb.push(itemLists[i]);
            }
          }
        });
      });
    },
    //改变型号类型
    changeXh(itemType, index, productType, changeFlag, itemMLGY, useamount) {
      this.inputValue = "";
      this.itemType = itemType;
      this.index = index;
      this.productType = productType;
      this.changeFlag = itemMLGY.changeFlag;
      this.itemMLGY = itemMLGY;
      this.useamount = useamount;
      if (this.showGy == false) {
        this.currentPage = 1;
      }
      this.itemNolists = [];
      if (changeFlag == "Y") {
        if (productType == "ML") {
          this.type = "面料";
        } else if (productType == "LCB") {
          this.type = "里衬布";
        } else if (productType == "PJB") {
          this.type = "配件包";
        }
        if (productType != "GY") {
          let url = this.orderBaseUrl + "/item/getCurtainItemTypeAll.do";
          let data = {
            limit: this.limit,
            page: this.currentPage,
            itemNO: productType
          };
          axios
            .post(url, data)
            .then(res => {
              this.itemNolists = res.data.data;
              this.totalPage = Math.ceil(
                this.itemNolists[0].total / this.limit
              );
              this.pageMark = this.totalPage;
            })
            .catch(err => {
              this.itemNolists = [];
              this.totalPage = 0;
              this.pageMark = this.totalPage;
            });
        } else {
          let url = this.orderBaseUrl + "/item/getGYList.do";
          let data = {
            itemNO: this.$route.params.itemNO //所属型号
          };
          axios.post(url, data).then(res => {
            this.itemNolists = res.data.itemList;
            this.totalPage = 1;
            this.pageMark = this.totalPage;
          });
        }
        this.showGy = true;
      }
    },
    //风格转码
    fgChange(fg) {
      if (fg == "01") {
        return "定宽";
      } else if (fg == "02") {
        return "定高";
      }
    },
    //改变风格
    changeFG(fg, itemType, liantou) {
      if (fg != liantou.fixType) {
        if (fg == "定宽") {
          fg = "01";
        } else if (fg == "定高") {
          fg = "02";
        }
        let url = this.orderBaseUrl + "/item/changeCurtainItem.do";
        let data = {
          width: this.$route.params.width, //成品宽度
          height: this.$route.params.height, //成品高度
          WBH: this.$route.params.WBH, //帘头外包盒宽度
          multiple: this.$route.params.multiple, //褶皱倍数
          parentItemNo: this.$route.params.itemNO,
          itemNO: liantou.itemNo,
          itemType: itemType,
          fixType: fg //01--定宽，02--定高，如果客户没有修改也要传入默认值，不能为空
        };
        axios.post(url, data).then(res => {
          if (itemType == "ls") {
            for (let i = 0; i < this.ls.length; i++) {
              if (this.ls[i].productType != "LCB") {
                this.$set(this.ls[i], "useamount", res.data.ls);
              }
            }
          } else if (itemType == "sha") {
            for (let i = 0; i < this.sha.length; i++) {
              if (this.sha[i].productType != "LCB") {
                this.$set(this.sha[i], "useamount", res.data.sha);
              }
            }
          }
          liantou.fixType = this.fgChange(fg);
        });
      }
      liantou.showFG = false;
    },
    //隐藏列表
    nolist() {
      this.showGy = false;
    },
    searchClick() {
      this.currentPage = 1;
      this.onSearchWall();
    },
    //窗帘模糊查询
    onSearchWall() {
      this.itemNolists = [];
      let url = this.orderBaseUrl + "/item/searchCurtainItemTypeAll.do";
      let data = {
        limit: this.limit,
        page: this.currentPage,
        itemType: this.productType,
        itemNO: this.inputValue //模糊查询的内容
      };
      axios.post(url, data).then(res => {
        this.itemNolists = res.data.data;
        if (this.itemNolists.length == 0) {
          this.itemNolists = [];
          this.currentPage = 1;
          this.totalPage = 1;
          Toast({
            duration: 2000,
            message: "暂无查询结果"
          });
        } else {
          this.totalPage = Math.ceil(this.itemNolists[0].total / this.limit);
        }
      });
    },
    //改变页数
    changePage() {
      if (this.inputValue == "") {
        this.changeXh(
          this.itemType,
          this.index,
          this.productType,
          this.changeFlag,
          this.itemMLGY
        );
      } else {
        this.onSearchWall(this.inputValue);
      }
    },
    //选择改变的型号
    selthisItemNo(item) {
      //说明字段
      if (this.productType == "ML") {
        item.notes = "非标配";
      }
      if (this.productType == "ML" || this.productType == "XHB") {
        let url = this.orderBaseUrl + "/item/changeCurtainItem.do";
        let data = {
          width: this.$route.params.width, //成品宽度
          height: this.$route.params.height, //成品高度
          WBH: this.$route.params.WBH, //帘头外包盒宽度
          multiple: this.$route.params.multiple, //褶皱倍数
          parentItemNo: this.$route.params.itemNO,
          itemNO: item.itemNo,
          itemType: this.itemType,
          fixType: item.fixType //01--定宽，02--定高，如果客户没有修改也要传入默认值，不能为空
        };
        axios.post(url, data).then(res => {
          res.data.item.itemMLGY = this.itemMLGY; //为了保留是否可改变的三个字段
          res.data.item.fixType = this.fgChange(res.data.item.fixType);
          this.$set(res.data.item, "showFG", false);
          if (this.itemType == "ls") {
            //制造说明
            if (res.data.item.productType == "ML") {
              this.$set(this.ls[this.index], "MlZz", "未选");
              this.$set(this.ls[this.index], "showMlZz", false);
            }
            this.$set(this.ls, this.index, res.data.item);
            for (let i = 0; i < this.ls.length; i++) {
              if (this.ls[i].productType != "LCB") {
                this.$set(this.ls[i], "useamount", res.data.ls);
              } else if (this.ls[i].productType == "XHB") {
                this.$set(this.ls[i], "useamount", this.useamount);
              }
            }
          } else if (this.itemType == "sha") {
            //制造说明
            if (res.data.item.productType == "ML") {
              this.$set(this.sha[this.index], "MlZz", "未选");
              this.$set(this.sha[this.index], "showMlZz", false);
            }
            this.$set(this.sha, this.index, res.data.item);
            for (let i = 0; i < this.sha.length; i++) {
              if (this.sha[i].productType != "LCB") {
                this.$set(this.sha[i], "useamount", res.data.sha);
              }
            }
          } else if (this.itemType == "lt") {
            //制造说明
            this.$set(this.lt[this.index], "LtZz", "未选");
            this.$set(this.lt[this.index], "showLtZz", false);
            this.$set(this.lt, this.index, res.data.item);
            for (let i = 0; i < this.lt.length; i++) {
              if (this.lt[i].productType == "XHB") {
                this.$set(this.lt[i], "useamount", this.useamount);
              }
            }
          }
        });
      }
      this.showGy = false;
    },
    comfirmMakeDetails() {
      this.showHeadMakeDetails = false;
      this.showBodyMakeDetails = false;
      this.showPartsPackage = false;
    },
    toCart() {},
    bigToSmall: function(data) {
      let index = -1;
      switch (data.itemMLGY.itemType) {
        case "lt":
          index = 0;
          break;
        case "ls":
          index = 1;
          break;
        case "lspb":
          index = 2;
          break;
        case "sha":
          index = 3;
          break;
        case "pjb":
          index = 4;
        default:
          index = -1;
      }
      if (index >= 0 && index <= 4) {
        if (this.chooseBig[index] === false || !data.choose) {
          return true;
        }
      }
      return false;
    }
  },
  created() {
    this.from = this.$route.params.from;
    this.selectThis();
  },
  watch: {
    partsPackage: function(val, oldVal) {
      if (val == "上样安装包(罗马杆+方轨)") {
        this.partsPackageNum = "PJB-005";
      }
      if (val == "上样安装包(方轨)") {
        this.partsPackageNum = "PJB-003";
      }
      if (val == "上样安装包(罗马杆)") {
        this.partsPackageNum = "PJB-004";
      }
      if (val == "未选择配件包") {
        this.partsPackageNum = "未选择配件包";
      }
    }
  }
};
</script>

<style scoped>
.single-curtain {
  height: 100vh;
  width: 375px;
  overflow: scroll;
  background-color: #f8f8f8;
  font-size: 13px;
}

.curtain-item {
  margin-bottom: 8px;
  position: relative;
}

.contain {
  margin-top: 60px;
  margin-bottom: 60px;
}

.select-this {
  position: relative;
  padding: 10px 15px;
  background-color: white;
}

.title-item {
  position: relative;
  height: 20px;
  line-height: 20px;
  font-size: 13px;
}

.title-item2 {
  position: relative;
  font-size: 13px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #f5f6f7;
}

.title-item3 {
  position: relative;
  font-size: 13px;
  height: 30px;
  line-height: 30px;
}

.title-left {
  float: left;
}

.title-right {
  margin-right: 20px;
  float: right;
}

.title-right2 {
  margin-right: 20px;
}

.title-right3 {
  color: #007aff;
  text-decoration: underline;
}

.use-num {
  width: 100px;
  height: 13px;
  border: none;
  text-align: right;
}

.curtain-beizhu {
  width: 200px;
  height: 13px;
  border: none;
  text-align: right;
}

.item-icon {
  position: absolute;
  width: 15px;
  height: 30px;
  right: 0;
  background: url("../assetsorder/more.png") center no-repeat;
  background-size: 12px 12px;
}

.item-icon2 {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  background: url("../assetsorder/del.png") center no-repeat;
  background-size: 15px 15px;
}

.select-this input {
  width: 50px;
  border: none;
}

.select-this .need-head {
  width: 80px;
  text-align: right;
  /*margin-left: 20px;*/
}

.select-this .position {
  width: 130px;
}

/*选择褶皱倍数*/
.select-multiple {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../assetsorder/more.png") no-repeat center;
  background-size: 100% 100%;
}

.select-this tr {
  /*height: 30px;*/
  /*padding: 5px;*/
}

.select-this th {
  text-align: left;
  width: 170px;
}

.select-this td {
  text-align: left;
}

.select-this-bottom {
  height: 50px;
  line-height: 50px;
  text-align: right;
}

.select-this-bottom span {
  width: 100px;
  padding: 10px 20px;
  border-radius: 20px;
  background: #89cb81;
  color: white;
}

.show-multiple .van-cell-group {
  height: 300px;
  overflow: scroll;
  margin-bottom: 50px;
}

.head-make-details .van-cell-group {
  max-height: 220px;
  overflow: scroll;
  width: 290px;
}

.head-make-details .van-popup--center {
  border-radius: 5px;
}

.body-make-details .van-cell-group {
  max-height: 210px;
  overflow: scroll;
  margin-bottom: 50px;
}

.comfirm-bottom {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #89cb81;
  position: fixed;
  bottom: 0;
  z-index: 99;
}

.comfirm-bottom span {
  color: white;
  font-size: 20px;
}
.nav-tip {
  height: 30px;
  line-height: 30px;
  background: #f8f8f8;
}

.nav-tip span {
  margin: 0 20px;
}

.change-this {
  position: absolute;
  top: 10px;
  right: 60px;
  font-size: 15px;
  z-index: 9;
}
.del-this {
  position: absolute;
  top: 10px;
  right: 60px;
  font-size: 15px;
  z-index: 9;
}

/*帘头*/
.curtain-head,
.curtain-body,
.gauze,
.parts {
  background: white;
  border-radius: 8px;
}

.type-head {
  height: 30px;
  line-height: 30px;
  position: relative;
  /*background: #89cb81;*/
  /*color: white;*/
  border-bottom: 1px solid #ececec;
}

.curtain-list-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 25px;
  top: 10px;
}

.delete {
  width: 20px;
  height: 20px;
  float: right;
  margin-right: 50px;
  margin-top: 5px;
}

.type-title {
  float: left;
  margin-left: 50px;
  font-size: 15px;
  font-weight: bold;
}

/*详细细节*/
.content {
  padding: 0px 10px;
  border-radius: 5px;
  margin-bottom: 8px;
  font-size: 14px;
  border: 1px solid #a0cb8d;
}

.cntent-item1 span {
  display: inline-block;
  margin: 5px 20px;
}

.select-make-details {
  /*float: right;*/
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../assetsorder/more.png") no-repeat center;
  background-size: 100% 100%;
}

.item-left {
  text-align: left;
  width: 113px;
}

.item-right {
  width: 55px;
  text-align: right;
}

.mark {
  text-align: left;
  position: relative;
}

.mark-title {
  padding-left: 2px;
}

.mark-content {
  position: absolute;
  width: 180px;
  border: none;
  top: 2px;
  left: 120px;
}

.shop-btn {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #89cb81;
  line-height: 50px;
  color: white;
  font-size: 20px;
  z-index: 99;
}

.show-gy {
  width: 100%;
  height: 100%;
}

.coupon-title {
  background: #363636;
  width: 100%;
  height: 50px;
  line-height: 50px;
  top: 0;
  color: white;
  font-size: 15px;
  position: fixed;
}

.backCoupon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 17px;
  top: 50%;
  margin-top: -10px;
}

.searchtop {
  height: 50px;
  /*overflow: hidden;*/
  /*position: fixed;*/
  top: 0;
}

.img {
  width: 20px;
  height: 20px;
  z-index: 999;
  position: fixed;
  left: 17px;
  top: 12px;
}
.all-itemlists {
  margin-top: 10px;
}
.itemNolist {
  display: inline-block;
  width: 45%;
  margin: 5px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #89cb81;
}

.fy-bottom {
  border-top: 1px solid #d8d8d8;
  background: #f8f8f8;
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  color: white !important;
}
.fy-bottom .van-pagination__item {
  color: #89cb81;
}
.show-FG .van-cell-group {
  max-height: 100px;
  width: 280px;
  overflow: scroll;
}

.show-FG .van-popup--center {
  border-radius: 5px;
}
</style>
