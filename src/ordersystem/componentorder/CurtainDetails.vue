<template>
  <div class="single-curtain">
    <top :top="set" :from="from"></top>
    <div class="contain">
      <div class="select-this">
        <div class="title-item">
          <span class="title-left">款号</span>
          <span class="title-right">{{itemNo}}</span>
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
          <span class="title-right">{{WBH=== "" || WBH=== "0"? "无" :WBH}} (米)</span>
        </div>
        <div class="title-item">
          <span class="title-left">位置</span>
          <span class="title-right">{{location === "" ? "无" :location}}</span>
        </div>
        <div class="title-item">
          <span class="title-left" style="color:#1989fa;">活动</span>
          <span
            class="title-right"
            style="width:70%;display:inline-flex;align-items: center;justify-content: flex-end;"
            @click="showActivity = true"
          >
            {{changeActivi}}
            <img style="width:15px;height:15px;" src="../assetsorder/more.png" alt />
          </span>
        </div>
        <div class="title-item">
          <span class="title-left">总计</span>
          <span class="title-right">
            <span style="color:red;">￥{{allTotal | dosageFilter}}</span>
          </span>
        </div>
      </div>
      <div class="show-result">
        <van-collapse v-model="activeName" accordion>
          <!--帘头-->
          <div style="position: relative" v-if="lt.length">
            <van-collapse-item title="帘头" name="1" class="curtain-item">
              <div class="curtain-head">
                <div class="content" v-for="(liantou,index) in lt" :key="index">
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      @click="changeXh('lt',index,liantou.productType,liantou.itemMLGY.changeFlag,liantou.itemMLGY,liantou.dosage)"
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
                    <span
                      class="title-right title-right2"
                      v-if="liantou.note != null"
                    >{{liantou.note}}</span>
                    <span
                      class="title-right title-right2"
                      v-else
                    >{{ getTypeName(liantou.itemMLGY.itemType) }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2">{{liantou.price}}元</span>
                  </div>
                  <div class="title-item2" v-if="showPrice && salPromotion.P_ID">
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2">
                      {{salPromotion.TYPE == 1?
                      salPromotion.DISCOUNT * liantou.price
                      : salPromotion.PRICE | dosageFilter}}元
                    </span>
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格</span>
                    <span class="title-right">{{liantou.fixGrade/1000}}米/对</span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <input
                        type="number"
                        v-if="liantou.itemMLGY.modifyFlag=='Y'"
                        class="use-num"
                        placeholder="0.00"
                        v-model="liantou.dosage"
                        oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
                      />
                      <span v-else>{{liantou.dosage}}</span>
                      <span>{{liantou.unit}}</span>
                    </span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">总价</span>
                    <span class="title-right title-right2">{{oneTotal(liantou)}}元</span>
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.manufacturingInstructions"
                    @click="liantou.showZZSM = true"
                  >
                    <span class="title-left" style="color:#1989fa;">制造说明</span>
                    <span class="title-right title-right2">{{liantou.manufacturingInstructions}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color:red;">{{liantou.illustrate}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="title-right">
                      <input
                        type="text"
                        v-model="liantou.remark"
                        class="curtain-beizhu"
                        placeholder="填写备注"
                      />
                    </span>
                  </div>
                  <!--选择帘头制造说明-->
                  <div class="head-make-details" @click="liantou.showZZSM = false">
                    <van-popup v-model="liantou.showZZSM" position="center">
                      <van-radio-group v-model="liantou.manufacturingInstructions">
                        <van-cell-group>
                          <van-cell
                            title="么术贴正车"
                            clickable
                            @click="liantou.manufacturingInstructions = '么术贴正车'"
                          >
                            <van-radio name="么术贴正车" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="么术贴反车"
                            clickable
                            @click="liantou.manufacturingInstructions = '么术贴反车'"
                          >
                            <van-radio name="么术贴反车" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="穿/挂杆款"
                            clickable
                            @click="liantou.manufacturingInstructions = '穿/挂杆款'"
                          >
                            <van-radio name="穿/挂杆款" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="特殊见备注"
                            clickable
                            @click="liantou.manufacturingInstructions = '特殊见备注'"
                          >
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
          <!--帘身-->
          <div style="position: relative" v-if="ls.length">
            <van-checkbox class="change-this" v-model="chooseBig[1]" @change="changeLink('ls',1)"></van-checkbox>
            <van-collapse-item title="帘身" name="2" class="curtain-item">
              <div class="curtain-head">
                <div class="content" v-for="(liantou,index) in ls" :key="index">
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      @click="changeXh('ls',index,liantou.productType,liantou.itemMLGY.changeFlag,liantou.itemMLGY,liantou.dosage)"
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
                    <span
                      class="title-right title-right2"
                      v-if="liantou.note != null"
                    >{{liantou.note}}</span>
                    <span
                      class="title-right title-right2"
                      v-else
                    >{{ getTypeName(liantou.itemMLGY.itemType) }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2">{{liantou.price}}元</span>
                  </div>
                  <div class="title-item2" v-if="showPrice && salPromotion.P_ID">
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2">
                      {{salPromotion.TYPE == 1?
                      salPromotion.DISCOUNT * liantou.price
                      : salPromotion.PRICE | dosageFilter}}元
                    </span>
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格</span>
                    <span class="title-right">{{liantou.fixGrade/1000}}米/对</span>
                  </div>
                  <div
                    class="title-item2"
                    @click="liantou.showFG = true"
                    v-if="liantou.fixType && liantou.itemMLGY.productType =='ML'"
                  >
                    <span class="title-left" style="color:#1989fa;">面料属性</span>
                    <span class="title-right">{{liantou.fixType | fixTypeFilter}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <input
                        type="number"
                        v-if="liantou.itemMLGY.modifyFlag=='Y'"
                        class="use-num"
                        placeholder="0.00"
                        v-model="liantou.dosage"
                        oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 2)"
                      />
                      <span v-else>{{liantou.dosage}}</span>
                      <span>{{liantou.unit}}</span>
                    </span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">总价</span>
                    <span class="title-right title-right2">{{oneTotal(liantou)}}元</span>
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.manufacturingInstructions"
                    @click="liantou.showZZSM = true"
                  >
                    <span class="title-left" style="color:#1989fa;">制造说明</span>
                    <span class="title-right title-right2">{{liantou.manufacturingInstructions}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color:red;">{{liantou.illustrate}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="remarkText">{{getRemark(liantou)}}</span>
                    <span class="title-right">
                      <input
                        type="text"
                        class="curtain-beizhu"
                        :style="{width:getRemark(liantou) ==''?'180px':'120px'}"
                        placeholder="填写备注"
                        v-model="liantou.remark"
                      />
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.fixType">
                        <van-cell-group>
                          <van-cell title="定宽" clickable @click="changeFG('01','ls',liantou,index)">
                            <van-radio name="01" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell title="定高" clickable @click="changeFG('02','ls',liantou,index)">
                            <van-radio name="02" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择帘身制造说明-->
                  <div class="head-make-details" @click="liantou.showZZSM = false">
                    <van-popup v-model="liantou.showZZSM" position="center">
                      <van-radio-group v-model="liantou.manufacturingInstructions">
                        <van-cell-group>
                          <van-cell
                            title="对开"
                            clickable
                            @click="liantou.manufacturingInstructions = '对开'"
                          >
                            <van-radio name="对开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="左单开"
                            clickable
                            @click="liantou.manufacturingInstructions = '左单开'"
                          >
                            <van-radio name="左单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="右单开"
                            clickable
                            @click="liantou.manufacturingInstructions = '右单开'"
                          >
                            <van-radio name="右单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="特殊开备注"
                            clickable
                            @click="liantou.manufacturingInstructions = '特殊开备注'"
                          >
                            <van-radio name="特殊开备注" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
          <!--帘身配布-->
          <div style="position: relative" v-if="lspb.length">
            <van-checkbox class="change-this" v-model="chooseBig[3]" @change="changeLink('sha',3)"></van-checkbox>
            <van-collapse-item title="帘身配布" name="3" class="curtain-item">
              <div class="gauze">
                <div class="content" v-for="(liantou,index) in lspb" :key="index">
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      @click="changeXh('lspb',index,liantou.productType,liantou.itemMLGY.changeFlag,liantou.itemMLGY)"
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
                    <span
                      class="title-right title-right2"
                      v-if="liantou.note != null"
                    >{{liantou.note}}</span>
                    <span
                      class="title-right title-right2"
                      v-else
                    >{{ getTypeName(liantou.itemMLGY.itemType) }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2">{{liantou.price}}元</span>
                  </div>
                  <div class="title-item2" v-if="showPrice && salPromotion.P_ID">
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2">
                      {{salPromotion.TYPE == 1?
                      salPromotion.DISCOUNT * liantou.price
                      : salPromotion.PRICE | dosageFilter}}元
                    </span>
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格</span>
                    <span class="title-right">{{liantou.fixGrade/1000}}米/对</span>
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.manufacturingInstructions"
                    @click="liantou.showZZSM = true"
                  >
                    <span class="title-left" style="color:#1989fa;">制造说明</span>
                    <span class="title-right title-right2">{{liantou.manufacturingInstructions}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color:red;">{{liantou.illustrate}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="remarkText">{{getRemark(liantou)}}</span>
                    <span class="title-right">
                      <input
                        type="text"
                        class="curtain-beizhu"
                        :style="{width:getRemark(liantou) ==''?'180px':'120px'}"
                        placeholder="填写备注"
                        v-model="liantou.remark"
                      />
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.fixType">
                        <van-cell-group>
                          <van-cell
                            title="定宽"
                            clickable
                            @click="changeFG('01','lspb',liantou,index)"
                          >
                            <van-radio name="01" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="定高"
                            clickable
                            @click="changeFG('02','lspb',liantou,index)"
                          >
                            <van-radio name="02" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择帘身配布制造说明-->
                  <div class="head-make-details" @click="liantou.showZZSM = false">
                    <van-popup v-model="liantou.showZZSM" position="center">
                      <van-radio-group v-model="liantou.manufacturingInstructions">
                        <van-cell-group>
                          <van-cell
                            title="一个褶"
                            clickable
                            @click="liantou.manufacturingInstructions = '一个褶'"
                          >
                            <van-radio name="一个褶" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="一个半褶"
                            clickable
                            @click="liantou.manufacturingInstructions = '一个半褶'"
                          >
                            <van-radio name="一个半褶" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="两个褶"
                            clickable
                            @click="liantou.manufacturingInstructions = '两个褶'"
                          >
                            <van-radio name="两个褶" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="两个半褶"
                            clickable
                            @click="liantou.manufacturingInstructions = '两个半褶'"
                          >
                            <van-radio name="两个半褶" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="三个褶"
                            clickable
                            @click="liantou.manufacturingInstructions = '三个褶'"
                          >
                            <van-radio name="三个褶" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="三个半褶"
                            clickable
                            @click="liantou.manufacturingInstructions = '三个半褶'"
                          >
                            <van-radio name="三个半褶" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
          <!--纱-->
          <div style="position: relative" v-if="sha.length">
            <van-checkbox class="change-this" v-model="chooseBig[3]" @change="changeLink('sha',3)"></van-checkbox>
            <van-collapse-item title="纱" name="4" class="curtain-item">
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
                    <span
                      class="title-right title-right2"
                      v-if="liantou.note != null"
                    >{{liantou.note}}</span>
                    <span
                      class="title-right title-right2"
                      v-else
                    >{{ getTypeName(liantou.itemMLGY.itemType) }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2">{{liantou.price}}元</span>
                  </div>
                  <div class="title-item2" v-if="showPrice && salPromotion.P_ID">
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2">
                      {{salPromotion.TYPE == 1?
                      salPromotion.DISCOUNT * liantou.price
                      : salPromotion.PRICE | dosageFilter}}元
                    </span>
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格</span>
                    <span class="title-right">{{liantou.fixGrade/1000}}米/对</span>
                  </div>
                  <div
                    class="title-item2"
                    @click="liantou.showFG = true"
                    v-if="liantou.fixType && liantou.itemMLGY.productType =='ML'"
                  >
                    <span class="title-left" style="color:#1989fa;">面料属性</span>
                    <span class="title-right">{{liantou.fixType | fixTypeFilter}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <input
                        type="number"
                        v-if="liantou.itemMLGY.modifyFlag=='Y'"
                        class="use-num"
                        placeholder="0.00"
                        v-model="liantou.dosage"
                        oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 2)"
                      />
                      <span v-else>{{liantou.dosage}}</span>
                      <span>{{liantou.unit}}</span>
                    </span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">总价</span>
                    <span class="title-right title-right2">{{oneTotal(liantou)}}元</span>
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.manufacturingInstructions"
                    @click="liantou.showZZSM = true"
                  >
                    <span class="title-left" style="color:#1989fa;">制造说明</span>
                    <span class="title-right title-right2">{{liantou.manufacturingInstructions}}</span>
                    <span class="item-icon"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color:red;">{{liantou.illustrate}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="remarkText">{{getRemark(liantou)}}</span>
                    <span class="title-right">
                      <input
                        type="text"
                        class="curtain-beizhu"
                        :style="{width:getRemark(liantou) ==''?'180px':'120px'}"
                        placeholder="填写备注"
                        v-model="liantou.remark"
                      />
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.fixType">
                        <van-cell-group>
                          <van-cell
                            title="定宽"
                            clickable
                            @click="changeFG('01','sha',liantou,index)"
                          >
                            <van-radio name="01" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="定高"
                            clickable
                            @click="changeFG('02','sha',liantou,index)"
                          >
                            <van-radio name="02" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择纱面料制造说明-->
                  <div class="head-make-details" @click="liantou.showZZSM = false">
                    <van-popup v-model="liantou.showZZSM" position="center">
                      <van-radio-group v-model="liantou.manufacturingInstructions">
                        <van-cell-group>
                          <van-cell
                            title="对开"
                            clickable
                            @click="liantou.manufacturingInstructions = '对开'"
                          >
                            <van-radio name="对开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="左单开"
                            clickable
                            @click="liantou.manufacturingInstructions = '左单开'"
                          >
                            <van-radio name="左单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="右单开"
                            clickable
                            @click="liantou.manufacturingInstructions = '右单开'"
                          >
                            <van-radio name="右单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="特殊开备注"
                            clickable
                            @click="liantou.manufacturingInstructions = '特殊开备注'"
                          >
                            <van-radio name="特殊开备注" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
          <!--配件-->
          <div style="position: relative" v-if="pjb.length">
            <van-collapse-item title="配件" name="5" class="curtain-item">
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
                    <span
                      class="title-right title-right2"
                      v-if="liantou.note != null"
                    >{{liantou.note}}</span>
                    <span
                      class="title-right title-right2"
                      v-else
                    >{{ getTypeName(liantou.itemMLGY.itemType) }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2">{{liantou.price}}元</span>
                  </div>
                  <div class="title-item2" v-if="showPrice && salPromotion.P_ID">
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2">
                      {{salPromotion.TYPE == 1?
                      salPromotion.DISCOUNT * liantou.price
                      : salPromotion.PRICE | dosageFilter}}元
                    </span>
                  </div>
                  <div class="title-item2" v-if="liantou.fixGrade">
                    <span class="title-left">规格</span>
                    <span class="title-right">{{liantou.fixGrade/1000}}米/对</span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <input
                        type="number"
                        v-if="liantou.itemMLGY.modifyFlag=='Y'"
                        class="use-num"
                        placeholder="0.00"
                        v-model="liantou.dosage"
                        oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 2)"
                      />
                      <span v-else>{{liantou.dosage}}</span>
                      <span>{{liantou.unit}}</span>
                    </span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">总价</span>
                    <span class="title-right title-right2">{{oneTotal(liantou)}}元</span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color:red;">{{liantou.illustrate}}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="title-right">
                      <input
                        type="text"
                        class="curtain-beizhu"
                        placeholder="填写备注"
                        v-model="liantou.remark"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
        </van-collapse>
      </div>
    </div>
    <div class="shop-btn" @click="toCart">{{AddOrNot?'加入购物车':'保存至购物车'}}</div>
    <!--替换item-->
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
    <van-popup v-model="showActivity" style="width:300px;">
      <van-radio-group v-model="activityId">
        <van-cell-group>
          <template v-for="(hdg,index) in activityOptions">
            <van-cell :key="index +'hdground' +  index" clickable @click="selectthisHd(hdg.P_ID)">
              <div style="text-align:center">
                <span>{{hdg.ORDER_TYPE? hdg.ORDER_TYPE + ' -- ' + hdg.ORDER_NAME : hdg.ORDER_NAME}}</span>
                <van-radio style="display:inline-block" :name="hdg.P_ID" checked-color="#89cb81" />
              </div>
            </van-cell>
          </template>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
import top from "../../components/Top";
import { GetDosageAll, GetDosageByNo } from "@/api/itemInfoASP";
import { getItemById, GetPromotionByItem } from "@/api/orderListASP";
import { UpdateCartItem } from "@/api/shopASP";
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
  Toast,
  Dialog
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
    [Toast.name]: Toast,
    [Dialog.name]: Dialog
  },
  data() {
    return {
      set: 28,
      limit: 26,
      activeName: "",
      AddOrNot: false,
      curtainData: this.$route.params.curtain,
      itemNo: this.$route.params.itemNo,
      width: this.$route.params.width, //成品宽度
      height: this.$route.params.height, //成品高度
      WBH: this.$route.params.WBH, //帘头外包盒宽度
      multiple: this.$route.params.multiple, //褶皱倍数
      location: this.$route.params.location,
      isWBH: this.$route.params.isWBH,
      activityId: this.$route.params.activityId,
      groupType: this.$route.params.groupType,
      highJia: 0,
      //制造工艺
      showGy: false,
      lt: [], //帘头
      ltAll: [],
      ls: [], //帘身
      lsAll: [],
      lspb: [], //帘身配布
      lspbAll: [],
      sha: [], //纱
      shaAll: [],
      pjb: [], //配件包
      pjbAll: [],
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
      dosage: "", //用量
      from: "",
      allData: [],
      showPrice: this.$store.getters.getIsManage != "0",
      activityOptions: [],
      showActivity: false
    };
  },
  filters: {
    fixTypeFilter(val) {
      switch (val) {
        case "01":
          return "定宽";
        case "02":
          return "定高";
      }
      return "--";
    }
  },
  computed: {
    changeActivi() {
      if (this.activityId && this.activityOptions.length) {
        var active = this.activityOptions.filter(
          item => item.P_ID == this.activityId
        )[0];
        var name = active.ORDER_TYPE
          ? active.ORDER_TYPE + " -- " + active.ORDER_NAME
          : active.ORDER_NAME;
        return name;
      } else {
        return "不参与活动";
      }
    },
    salPromotion() {
      var selectActivity = this.activityOptions.filter(
        item => item.P_ID == this.activityId
      );
      if (selectActivity.length) {
        return selectActivity[0];
      } else {
        return {};
      }
    },
    allTotal() {
      var _curtainData = [];
      for (var i = 0; i < this.lt.length; i++) {
        if (this.lt[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.lt[i])));
        }
      }
      for (var i = 0; i < this.ls.length; i++) {
        if (this.ls[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.ls[i])));
        }
      }
      for (var i = 0; i < this.lspb.length; i++) {
        if (this.lspb[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.lspb[i])));
        }
      }
      for (var i = 0; i < this.sha.length; i++) {
        if (this.sha[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.sha[i])));
        }
      }
      for (var i = 0; i < this.pjb.length; i++) {
        if (this.pjb[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.pjb[i])));
        }
      }
      let totalMoney = 0;
      for (let i = 0; i < _curtainData.length; i++) {
        if (_curtainData[i].choose != false) {
          totalMoney =  totalMoney.add(this.oneTotal(_curtainData[i]));
        }
      }

      return totalMoney;
    }
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
      if (this.WBH == "") {
        this.WBH = "0";
      }
      this.lt = [];
      this.ls = [];
      this.lspb = [];
      this.sha = [];
      this.pjb = [];
      let URL = this.orderBaseUrl + "/item/getCurtainInfo.do";
      let data = {
        itemNO: this.itemNo,
        width: this.width, //成品宽度
        height: this.height, //成品高度
        WBH: this.isWBH === false || this.WBH === "" ? "0" : this.WBH, //帘头外包盒宽度
        multiple: this.multiple, //褶皱倍数
        location: this.location
      };
      axios.post(URL, data).then(res => {
        GetDosageAll(data).then(res2 => {
          let itemLists = res.data.itemList;
          this.allData = JSON.parse(JSON.stringify(res.data));
          if (res.data.itemList.length)
            this.highJia = res.data.itemList[0].highJia;
          //替换用量
          var dosageFilter = res2.data;
          var gy003 = dosageFilter.filter(item => item.ITEM_NO == "GY-003");
          if (gy003.length > 0) res.data.GY = gy003[0].dosage;
          if (res.data.lt) {
            res.data.lt = dosageFilter.filter(
              item => item.type == "lt"
            )[0].dosage;
          }
          if (res.data.ls) {
            res.data.ls = dosageFilter.filter(
              item => item.type == "ls"
            )[0].dosage;
          }
          if (res.data.XHBlt) {
            res.data.XHBlt = dosageFilter.filter(
              item => item.type == "XHBlt"
            )[0].dosage;
          }
          if (res.data.XHBls) {
            res.data.XHBls = dosageFilter.filter(
              item => item.type == "XHBls"
            )[0].dosage;
          }
          if (res.data.LCB) {
            res.data.LCB = dosageFilter.filter(
              item => item.type == "LCB"
            )[0].dosage;
          }
          if (res.data.sha) {
            res.data.sha = dosageFilter.filter(
              item => item.type == "sha"
            )[0].dosage;
          }
          //将数据进行分类
          for (let i = 0; i < itemLists.length; i++) {
            itemLists[i].choose = true;
            itemLists[i].illustrate = ""; //说明
            itemLists[i].remark = ""; //备注
            var price = this.getPrice(
              this.$store.getters.getCtype,
              res.data.itemList[i]
            );
            itemLists[i].price = price;

            this.$set(itemLists[i], "showFG", false);
            //单位乱码转换
            if (itemLists[i].unit == "°ü") {
              itemLists[i].unit = "包";
            }
            if (itemLists[i].itemMLGY.itemType == "lt") {
              if (itemLists[i].itemMLGY.productType == "XHB") {
                this.$set(
                  itemLists[i],
                  "dosage",
                  Math.round(res.data.XHBlt * 100) / 100
                );
              } else {
                this.$set(
                  itemLists[i],
                  "dosage",
                  Math.round(res.data.lt * 100) / 100
                );
              }
              this.$set(itemLists[i], "manufacturingInstructions", "未选");
              this.$set(itemLists[i], "showZZSM", false);
              this.lt.push(itemLists[i]);
            } else if (itemLists[i].itemMLGY.itemType == "ls") {
              if (itemLists[i].itemMLGY.productType == "LCB") {
                this.$set(
                  itemLists[i],
                  "dosage",
                  Math.round(res.data.LCB * 10) / 10
                );
              } else if (itemLists[i].itemMLGY.productType == "XHB") {
                this.$set(
                  itemLists[i],
                  "dosage",
                  Math.round(res.data.XHBls * 10) / 10
                );
              } else {
                this.$set(
                  itemLists[i],
                  "dosage",
                  Math.round(res.data.ls * 10) / 10
                );
              }
              //制造说明
              if (itemLists[i].itemMLGY.productType == "ML") {
                this.$set(itemLists[i], "manufacturingInstructions", "未选");
                this.$set(itemLists[i], "showZZSM", false);
              }
              this.ls.push(itemLists[i]);
            } else if (itemLists[i].itemMLGY.itemType == "lspb") {
              this.$set(itemLists[i], "manufacturingInstructions", "未选");
              this.$set(itemLists[i], "showZZSM", false);
              this.lspb.push(itemLists[i]);
            } else if (itemLists[i].itemMLGY.itemType == "sha") {
              this.$set(
                itemLists[i],
                "dosage",
                Math.round(res.data.sha * 10) / 10
              );
              //制造说明
              if (itemLists[i].itemMLGY.productType == "ML") {
                this.$set(itemLists[i], "manufacturingInstructions", "未选");
                this.$set(itemLists[i], "showZZSM", false);
              }
              this.sha.push(itemLists[i]);
            } else if (itemLists[i].itemMLGY.itemType == "pjb") {
              this.$set(
                itemLists[i],
                "dosage",
                Math.round(res.data.pjb * 10) / 10
              );
              this.pjb.push(itemLists[i]);
            }
          }
          this.ltAll = JSON.parse(JSON.stringify(this.lt));
          this.lsAll = JSON.parse(JSON.stringify(this.ls));
          this.lspbAll = JSON.parse(JSON.stringify(this.lspb));
          this.shaAll = JSON.parse(JSON.stringify(this.sha));
          this.pjbAll = JSON.parse(JSON.stringify(this.pjb));
        });
      });
    },
    getPrice(type, item) {
      var price = 0;
      if (type == "02" || type == "08" || type == "10") {
        //经销
        price = item.priceSale;
      } else if (type == "05") {
        price = item.salePrice;
      } else if (type == "06") {
        price = item.priceFx;
      } else if (type == "09") {
        price = item.priceHome;
      }
      return price;
    },
    //改变型号类型
    changeXh(itemType, index, productType, changeFlag, itemMLGY, dosage) {
      this.inputValue = "";
      this.itemType = itemType;
      this.index = index;
      this.productType = productType;
      this.changeFlag = itemMLGY.changeFlag;
      this.itemMLGY = itemMLGY;
      this.dosage = dosage;
      if (this.showGy == false) {
        this.currentPage = 1;
      }
      this.itemNolists = [];
      if (changeFlag == "Y") {
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
              if (itemType == "pjb") {
                this.itemNolists.sort(function(a, b) {
                  return a.itemNo > b.itemNo ? 1 : -1; //升序
                });
              }
            })
            .catch(err => {
              this.itemNolists = [];
              this.totalPage = 0;
              this.pageMark = this.totalPage;
            });
        } else {
          let url = this.orderBaseUrl + "/item/getGYList.do";
          let data = {
            itemNO: this.itemNo //所属型号
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
    //改变风格
    changeFG(fg, itemType, liantou, index) {
      liantou.fixType = fg;
      var data = this.getChangeArray(itemType);
      let url = this.orderBaseUrl + "/item/changeCurtainItem.do";
      let obj = {
        width: this.width, //成品宽度
        height: this.height, //成品高度
        WBH: this.WBH, //帘头外包盒宽度
        multiple: this.multiple, //褶皱倍数
        parentItemNo: this.itemNo,
        itemNO: liantou.itemNo,
        itemType: itemType,
        fixType: fg //01--定宽，02--定高，如果客户没有修改也要传入默认值，不能为空
      };
      //axios.post(url, data).then(res => {
      GetDosageByNo(obj).then(res => {
        var keys;
        if (itemType == "lt") keys = Math.round(res.data[0].dosage * 100) / 100;
        else keys = Math.round(res.data[0].dosage * 10) / 10;
        if (this.productType == "XHB") {
          data[index].dosage = keys;
        } else if (this.productType == "ML") {
          this.updateDosage(itemType, keys);
        }
        this.judgeTip(data[index], index);
      });
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
      let status2 = item.fixType === null || this.itemType === "lspb";
      var data = this.getChangeArray(this.itemType);
      var oriData = this.getOrignalArray(this.itemType);
      var price = this.getPrice(this.$store.getters.getCtype, item);
      data[this.index].note = item.note;
      data[this.index].fixGrade = item.fixGrade;
      data[this.index].fixType = status2 ? "" : item.fixType;
      data[this.index].itemNo = item.itemNo;
      data[this.index].price = price;
      if (this.itemType == "pjb") {
        data[this.index].unit = item.unit == "°ü" ? "包" : item.unit;
      }
      oriData[this.index].fixType = status2 ? "" : item.fixType;
      if (this.productType != "GY") {
        //非工艺用量修改
        if (this.itemType == "lspb") {
          this.judgeTip(data[this.index], this.index);
          this.showGy = false;
          return;
        }
        let obj = {
          width: this.width, //成品宽度
          height: this.height, //成品高度
          WBH: this.WBH, //帘头外包盒宽度
          multiple: this.multiple, //褶皱倍数
          parentItemNo: this.itemNo,
          itemNO: item.itemNo,
          itemType: this.itemType,
          fixType: item.fixType //01--定宽，02--定高，如果客户没有修改也要传入默认值，不能为空
        };
        GetDosageByNo(obj).then(res => {
          var keys;
          if (this.itemType == "lt")
            keys = Math.round(res.data[0].dosage * 100) / 100;
          else keys = Math.round(res.data[0].dosage * 10) / 10;
          if (this.productType == "XHB") {
            data[this.index].dosage = keys;
          } else if (this.productType == "ML") {
            this.updateDosage(this.itemType, keys);
          }
          this.judgeTip(data[this.index], this.index);
        });
      } else {
        //工艺修改用量
        this.judgeTip(data[this.index], this.index);
        if (data[this.index].itemNo == "GY-003") {
          data[this.index].dosage = this.allData.GY;
        } else {
          var mlData = data.filter(item => item.productType == "ML")[0];
          if (mlData) data[this.index].dosage = mlData.dosage;
        }
      }
      this.showGy = false;
    },
    getChangeArray(itemType) {
      switch (itemType) {
        case "lt":
          return this.lt;
        case "ls":
          return this.ls;
        case "lspb":
          return this.lspb;
        case "sha":
          return this.sha;
        case "pjb":
          return this.pjb;
      }
    },
    getOrignalArray(itemType) {
      switch (itemType) {
        case "lt":
          return this.ltAll;
        case "ls":
          return this.lsAll;
        case "lspb":
          return this.lspbAll;
        case "sha":
          return this.shaAll;
        case "pjb":
          return this.pjbAll;
      }
    },
    //动态判断制造说明
    judgeTip(data, index) {
      let status = -1;
      var oriData = this.getOrignalArray(data.itemMLGY.itemType);
      if (data.fixType === "02" && oriData[index].fixType === "01") {
        status = 1;
      }
      if (data.fixType === "01" && oriData[index].fixType === "02") {
        status = 2;
      }
      if (data.itemNo !== oriData[index].itemNo) {
        if (status === 1) status = 4;
        else if (status === 2) status = 5;
        else status = 3;
      }
      if (
        data.itemMLGY.itemType === "pjb" ||
        data.productType === "LCB" ||
        data.productType == "GY"
      ) {
        status = -1;
      }
      switch (status) {
        case 1:
          data.illustrate = "修改为定高";
          break;
        case 2:
          data.illustrate = "修改为定宽";
          break;
        case 3:
          data.illustrate = "非标配";
          break;
        case 4:
          data.illustrate = "修改为定高，非标配";
          break;
        case 5:
          data.illustrate = "修改为定宽，非标配";
          break;
        default:
          data.illustrate = "";
      }
    },
    //加入购物车
    toCart() {
      var _curtainData = [];
      for (var i = 0; i < this.lt.length; i++) {
        if (this.lt[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.lt[i])));
        }
      }
      for (var i = 0; i < this.ls.length; i++) {
        if (this.ls[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.ls[i])));
        }
      }
      for (var i = 0; i < this.lspb.length; i++) {
        if (this.lspb[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.lspb[i])));
        }
      }
      for (var i = 0; i < this.sha.length; i++) {
        if (this.sha[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.sha[i])));
        }
      }
      for (var i = 0; i < this.pjb.length; i++) {
        if (this.pjb[i].choose) {
          _curtainData.push(JSON.parse(JSON.stringify(this.pjb[i])));
        }
      }

      for (var i = 0; i < _curtainData.length; i++) {
        let _itemType = _curtainData[i].itemMLGY.itemType;
        if (_itemType === "ls" || _itemType === "sha" || _itemType === "lspb") {
          if (_curtainData[i].productType === "ML") {
            if (
              _curtainData[i].manufacturingInstructions === "" ||
              _curtainData[i].manufacturingInstructions === "未选"
            ) {
              Dialog.alert({
                message: this.getTypeName(_itemType) + "制造说明不能为空!"
              });
              return;
            }
          }
        }
        if (
          _itemType === "lt" &&
          _curtainData[i].productType !== "XHB" &&
          (_curtainData[i].manufacturingInstructions === "" ||
            _curtainData[i].manufacturingInstructions === "未选")
        ) {
          Dialog.alert({
            message: this.getTypeName(_itemType) + "制造说明不能为空!"
          });
          return;
        }
        if (
          _curtainData[i].manufacturingInstructions === "特殊见备注" ||
          _curtainData[i].manufacturingInstructions === "特殊开备注"
        ) {
          if (this.isNull(_curtainData[i].remark)) {
            Dialog.alert({
              message: `${_curtainData[i].manufacturingInstructions}不能为空`
            });
            return;
          }
        }
      }
      let _isWBH;
      let _WBH;
      let _curtainLists = [];
      let _data = [
        { name: "lt", number: 0 },
        { name: "ls", number: 0 },
        { name: "lspb", number: 0 },
        { name: "sha", number: 0 },
        { name: "pjb", number: 0 }
      ];
      if (this.isWBH === false) {
        _isWBH = 0;
        _WBH = null;
      } else {
        _isWBH = 1;
        _WBH = this.WBH;
      }
      //判断个数
      for (let i = 0; i < _curtainData.length; i++) {
        switch (_curtainData[i].itemMLGY.itemType) {
          case "lt":
            _data[0].number++;
            break;
          case "ls":
            _data[1].number++;
            break;
          case "lspb":
            _data[2].number++;
            break;
          case "sha":
            _data[3].number++;
            break;
          case "pjb":
            _data[4].number++;
          default:
            break;
        }
      }
      let _index = [0, 0, 0, 0, 0];
      for (let i = 0; i < _data.length; i++) {
        for (let k = i; k >= 0; k--) {
          _index[i] += _data[k].number;
        }
      }
      for (let i = 0; i < _data.length; i++) {
        if (_data[i].number === 0) continue;
        let _obj = {
          partName: this.getTypeName(_data[i].name),
          curtainCommodities: []
        };
        let j = 0;
        for (let k = i; k > 0; k--) {
          j += _data[k - 1].number;
        }
        for (; j < _index[i]; j++) {
          if (_curtainData[j].itemNo === null) continue;
          let _certainHeightWidth = _curtainData[j].fixType;
          if (_certainHeightWidth === "01") _certainHeightWidth = 1;
          if (_certainHeightWidth === "02") _certainHeightWidth = 0;
          let _obj1 = {};
          if (this.AddOrNot) {
            //新增
            _obj1 = {
              activityId: this.salPromotion.P_ID,
              item: {
                itemNo: _curtainData[j].itemNo
              },
              note: _curtainData[j].remark,
              unit: _curtainData[j].unit,
              curtainPartName: this.getTypeName(_data[i].name),
              curtainItemName:
                _curtainData[j].note === null
                  ? this.getTypeName(_data[i].name)
                  : _curtainData[j].note,
              dosage: _curtainData[j].dosage,
              manufacturingInstructions: _curtainData[j]
                .manufacturingInstructions
                ? _curtainData[j].manufacturingInstructions
                : "",
              certainHeightWidth: _certainHeightWidth,
              specification:
                _curtainData[j].fixGrade === null
                  ? null
                  : Math.round((_curtainData[j].fixGrade / 1000) * 100) / 100,
              illustrate: _curtainData[j].illustrate,
              deleteFlag: _curtainData[j].itemMLGY.deleteFlag,
              modifyFlag: _curtainData[j].itemMLGY.modifyFlag,
              changeFlag: _curtainData[j].itemMLGY.changeFlag,
              inlineNo: _curtainData[j].itemMLGY.no
            };
          } else {
            //修改
            _obj1 = {
              id: _curtainData[j].id,
              cartItemId: _curtainData[j].cartItemId,
              price: _curtainData[j].price,
              activityId: this.salPromotion.P_ID,
              item: {
                itemNo: _curtainData[j].item.itemNo
              },
              quantity: _curtainData[j].quantity,
              width: _curtainData[j].width,
              height: _curtainData[j].height,
              note: _curtainData[j].remark,
              unit: _curtainData[j].unit,
              status: _curtainData[j].status,
              curtainItemName:
                _curtainData[j].note === null
                  ? this.getTypeName(_data[i].name)
                  : _curtainData[j].note,
              curtainPartName: _curtainData[j].curtainPartName,
              dosage: _curtainData[j].dosage,
              manufacturingInstructions:
                _curtainData[j].manufacturingInstructions,
              certainHeightWidth: _curtainData[j].certainHeightWidth,
              specification:
                _curtainData[j].fixGrade === null
                  ? null
                  : Math.round((_curtainData[j].fixGrade / 1000) * 100) / 100,
              illustrate: _curtainData[j].illustrate,
              deleteFlag: _curtainData[j].itemMLGY.deleteFlag,
              modifyFlag: _curtainData[j].itemMLGY.modifyFlag,
              changeFlag: _curtainData[j].itemMLGY.changeFlag,
              inlineNo: _curtainData[j].itemMLGY.no
            };
          }
          _obj.curtainCommodities.push(_obj1);
        }
        if (_obj.curtainCommodities.length !== 0) _curtainLists.push(_obj);
      }
      if (
        _curtainLists.length == 0 ||
        (_curtainLists.length === 1 &&
          _curtainLists[0].partName === "配件" &&
          _curtainLists[0].curtainCommodities.length === 0)
      ) {
        Dialog.alert({
          message: "在请至少选择一款配件!"
        });
        return;
      }
      if (this.AddOrNot) {
        let url = this.orderBaseUrl + "/cart/addCurtainCartItem.do";
        let obj = {
          modelNumber: this.itemNo,
          CID: this.$store.getters.getCId,
          customerType: this.$store.getters.getCtype,
          price: "",
          activityGroupType: this.salPromotion.GROUP_TYPE,
          width: this.width,
          height: this.height,
          drape: this.multiple,
          outsourcingBoxWidth: _isWBH,
          outsourcingBoxWidth: _WBH,
          curtainLists: _curtainLists,
          location: this.location,
          falseShadeHigh: this.highJia
        };
        axios.post(url, obj).then(res => {
          if (res.data.code == 0) {
            Toast({
              duration: 2000,
              message: "加入购物车成功"
            });
            this.$router.push({
              name: "shoppingcart",
              params: {
                activeName: "/mycart/curtaincart"
              }
            });
          } else {
            Dialog.alert({
              message: res.data.msg
            });
          }
        });
      } else {
        let url = this.orderBaseUrl + "/cart/updateCurtainCartItem.do";
        let obj = {
          customerType: this.$store.getters.getCtype,
          curtainLists: _curtainLists
        };
        axios.post(url, obj).then(res => {
          if (res.data.code == 0) {
            UpdateCartItem({
              CART_ITEM_ID: _curtainData[0].cartItemId,
              ACTIVITY_GROUP_TYPE: this.salPromotion.GROUP_TYPE,
              UpdateColumns: ["ACTIVITY_GROUP_TYPE"]
            }).then(res2 => {
              Toast({
                duration: 2000,
                message: "修改成功"
              });
              this.$router.push({
                name: "shoppingcart",
                params: {
                  activeName: "/mycart/curtaincart"
                }
              });
            });
          } else {
            Dialog.alert({
              message: res.data.msg
            });
          }
        });
      }
    },
    //获取窗帘大类名称
    getTypeName(val) {
      switch (val) {
        case "lt":
          return "帘头";
        case "ls":
          return "帘身";
        case "lspb":
          return "帘身配布";
        case "sha":
          return "纱";
        case "pjb":
          return "配件";
        default:
          return "暂无名称";
      }
    },
    //根据中文名称获取itemType
    getItemType(partName) {
      switch (partName) {
        case "帘头":
          return "lt";
        case "帘身":
          return "ls";
        case "纱":
          return "sha";
        case "配件":
          return "pjb";
        case "帘身配布":
          return "lspb";
      }
    },
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
    },
    //判空
    isNull(str) {
      if (str === "" || str === undefined || str === null) return true;
      var regu = "^[ ]+$";
      var re = new RegExp(regu);
      return re.test(str);
    },
    //动态修改大类的全部用量
    updateDosage(itemType, dosage) {
      var data = this.getChangeArray(itemType);
      for (let i = 0; i < data.length; i++) {
        let pType = data[i].productType;
        if (
          data[i].itemMLGY.itemType === itemType &&
          pType !== "LCB" &&
          pType !== "XHB"
        ) {
          if (data[i].itemNo !== "GY-003") {
            data[i].dosage = dosage;
          } else {
            data[i].dosage = this.allData.GY;
          }
        }
      }
    },
    //获取备注文字
    getRemark(data) {
      if (data.fixType === "02" && data.fixGrade != 0) {
        let _fixType = data.fixGrade / 1000;
        if (_fixType < this.height) {
          return "超高帘，用量待审核!";
        }
      }
      return "";
    },
    getNowData() {
      //表头
      this.itemNo = this.curtainData.modelNumber;
      this.width = this.curtainData.width;
      this.height = this.curtainData.height;
      this.WBH = this.curtainData.outsourcingBoxWidth;
      this.multiple = this.curtainData.drape;
      this.location = this.curtainData.location;
      this.isWBH = this.curtainData.outsourcingBoxExist == 1;
      this.activityId = this.curtainData.activityId;
      this.groupType = this.curtainData.activityGroupType;
      this.highJia = this.curtainData.falseShadeHigh;
      //明细
      for (var i = 0; i < this.curtainData.curtainLists.length; i++) {
        for (
          var j = 0;
          j < this.curtainData.curtainLists[i].curtainCommodities.length;
          j++
        ) {
          var _data = this.curtainData.curtainLists[i].curtainCommodities[j];
          let obj = {
            id: _data.id,
            price: _data.price,
            activityId: _data.activityId,
            itemNo: _data.item.itemNo,
            item: {
              itemNo: _data.item.itemNo
            },
            itemType: this.getItemType(_data.curtainPartName),
            productType: _data.item.productType,
            cartItemId: _data.cartItemId,
            quantity: _data.quantity,
            status: _data.status,
            curtainItemName: _data.curtainItemName,
            curtainPartName: _data.curtainPartName,
            fixGrade: _data.specification * 1000,
            fixType: _data.certainHeightWidth == 0 ? "02" : "01",
            deleteFlag: _data.deleteFlag,
            modifyFlag: _data.modifyFlag,
            changeFlag: _data.changeFlag,
            inlineNo: _data.inlineNo,
            itemMLGY: {
              deleteFlag: _data.deleteFlag,
              modifyFlag: _data.modifyFlag,
              changeFlag: _data.changeFlag,
              no: _data.inlineNo,
              itemType: this.getItemType(_data.curtainPartName),
              productType: _data.item.productType
            },
            choose: true,
            illustrate: _data.illustrate,
            remark: _data.note,
            unit: _data.unit === "°ü" ? "包" : _data.unit,
            showFG: false,
            manufacturingInstructions: _data.manufacturingInstructions,
            note: _data.curtainItemName,
            showZZSM: false,
            dosage: _data.dosage
          };
          var data = this.getChangeArray(obj.itemType);
          var oriData = this.getOrignalArray(obj.itemType);
          data.push(JSON.parse(JSON.stringify(obj)));
          oriData.push(JSON.parse(JSON.stringify(obj)));
        }
      }
    },
    async getOldData() {
      //原始数据
      let URL = this.orderBaseUrl + "/item/getCurtainInfo.do";
      let data = {
        itemNO: this.itemNo,
        width: this.width.toString(), //成品宽度
        height: this.height.toString(), //成品高度
        WBH:
          this.isWBH === false || this.WBH === "" ? "0" : this.WBH.toString(), //帘头外包盒宽度
        multiple: this.multiple.toString(), //褶皱倍数
        location: this.location
      };
      axios.post(URL, data).then(async res => {
        let itemLists = res.data.itemList;
        for (let i = 0; i < itemLists.length; i++) {
          var oriData = this.getOrignalArray(itemLists[i].itemMLGY.itemType);
          for (var j = 0; j < oriData.length; j++) {
            if (itemLists[i].itemMLGY.no == oriData[j].itemMLGY.no) {
              if (
                oriData[j].fixType !== null &&
                oriData[j].productType === "ML"
              ) {
                let _itemObj = {
                  itemType: oriData[j].itemMLGY.productType,
                  itemNO: oriData[j].item.itemNo,
                  limit: 1,
                  page: 1
                };
                let itemurl =
                  this.orderBaseUrl + "/item/searchCurtainItemTypeAll.do";
                let ress = await axios.post(itemurl, _itemObj);
                if (ress.data.data.length > 0) {
                  oriData[j].certainHeightWidth = ress.data.data[0].fixType;
                  oriData[j].fixType = ress.data.data[0].fixType;
                }
              }
              if (oriData[j].item.itemNo != itemLists[i].itemNo) {
                oriData[j].item.itemNo = itemLists[i].itemNo;
                oriData[j].itemNo = itemLists[i].itemNo;
              }
            }
          }
        }
      });
    },
    getActivity() {
      this.activityOptions = [];
      getItemById({ itemNo: this.itemNo }).then(itemRes => {
        GetPromotionByItem({
          cid: this.$store.getters.getCId,
          customerType: this.$store.getters.getCtype,
          itemNo: itemRes.data.ITEM_NO,
          itemVersion: itemRes.data.ITEM_VERSION,
          productType: itemRes.data.PRODUCT_TYPE,
          productBrand: itemRes.data.PRODUCT_BRAND
        }).then(res => {
          this.activityOptions = res.data;
          this.activityOptions.push({
            ORDER_TYPE: "",
            ORDER_NAME: "不参与活动",
            P_ID: null
          });
        });
      });
    },
    selectthisHd(id) {
      this.showActivity = false;
      this.activityId = id;
    },
    oneTotal(row) {
      return (
        Math.round(
          (this.salPromotion.P_ID
            ? this.salPromotion.TYPE == 1
              ? this.salPromotion.DISCOUNT * row.price
              : this.salPromotion.PRICE
            : row.price
          ).mul(100)
        ) / 100
      ).mul(row.dosage);
    }
  },
  created() {
    this.from = this.$route.params.from;
    if (this.$route.params.AddOrNot)
      this.AddOrNot = this.$route.params.AddOrNot;
    if (this.AddOrNot) {
      //新增
      this.getActivity();
      this.selectThis();
    } else {
      this.getNowData();
      this.getOldData();
      this.getActivity();
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
  margin-top: 8px;
  position: relative;
}

.contain {
  margin-top: 50px;
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
  width: 50px;
  height: 15px;
  text-align: center;
  border: 1px solid #666;
}

.curtain-beizhu {
  width: 180px;
  height: 17px;
  border: none;
  text-align: right;
}
.remarkText {
  color: red;
  font-size: 11px;
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

/* .select-this tr {
  height: 30px;
  padding: 5px;
} */

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
<style>
.curtain-item .van-collapse-item__content {
  padding: 10px 15px !important;
}
</style>