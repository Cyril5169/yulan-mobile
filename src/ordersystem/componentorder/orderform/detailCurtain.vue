<template>
  <div class="single-curtain">
    <top
      msgtitle="窗帘详情"
      :greenBackground="true"
      :isPopup="true"
      @backclick="backclick"
    ></top>
    <div class="contain">
      <div class="select-this">
        <div class="title-item">
          <span class="title-left">款号</span>
          <span class="title-right">{{ itemNo }}</span>
        </div>
        <div class="title-item">
          <span class="title-left">成品宽度*高度</span>
          <span class="title-right">{{ width }}*{{ height }} (米)</span>
        </div>
        <div class="title-item">
          <span class="title-left">假帘高</span>
          <span class="title-right">{{ highJia }} (米)</span>
        </div>
        <div class="title-item">
          <span class="title-left">褶皱倍数</span>
          <span class="title-right">{{ multiple }}</span>
        </div>
        <div class="title-item">
          <span class="title-left">帘头外包盒单边宽度</span>
          <span class="title-right"
            >{{ WBH === "" || WBH === "0" ? "无" : WBH }} (米)</span
          >
        </div>
        <div class="title-item">
          <span class="title-left">位置</span>
          <span class="title-right">{{
            location === "" ? "无" : location
          }}</span>
        </div>
        <div class="title-item">
          <span class="title-left">活动</span>
          <span class="title-right">{{ activityName }}</span>
        </div>
        <div class="title-item">
          <span class="title-left">总计</span>
          <span class="title-right">
            <span style="color: red">￥{{ allTotal | dosageFilter }}</span>
          </span>
        </div>
      </div>
      <div class="show-result">
        <van-collapse v-model="activeName">
          <!--帘头-->
          <div style="position: relative" v-if="lt.length">
            <van-collapse-item title="帘头" name="1" class="curtain-item">
              <div class="curtain-head">
                <div
                  class="content"
                  v-for="(liantou, index) in lt"
                  :key="index"
                >
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      v-if="tableStatus != 0"
                      @click="
                        changeXh(
                          'lt',
                          index,
                          liantou.productType,
                          liantou.changeFlag,
                          liantou.itemMLGY,
                          liantou.dosage
                        )
                      "
                      class="title-right title-right2"
                      :class="{ 'title-right3': liantou.changeFlag == 'Y' }"
                      >{{ liantou.item.itemNo }}</span
                    >
                    <span v-else class="title-right title-right2">{{
                      liantou.item.itemNo
                    }}</span>
                    <span
                      style="float: right; margin: 4px 5px 0 0"
                      v-if="tableStatus != 0"
                    >
                      <van-checkbox
                        v-if="liantou.deleteFlag == 'Y'"
                        v-model="liantou.choose"
                        @change="changeLinkReverse(liantou)"
                      ></van-checkbox>
                    </span>
                    <span
                      v-if="bigToSmall(liantou) == true"
                      class="item-icon2"
                    ></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span
                      class="title-right title-right2"
                      v-if="liantou.curtainItemName != null"
                      >{{ liantou.curtainItemName }}</span
                    >
                    <span class="title-right title-right2" v-else>{{
                      getTypeName(liantou.itemType)
                    }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2"
                      >{{ liantou.price }}元</span
                    >
                  </div>
                  <div
                    class="title-item2"
                    v-if="showPrice && salPromotion.P_ID"
                  >
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2"
                      >{{ calculatePromotionPrice(liantou) }}元</span
                    >
                  </div>
                  <div class="title-item2" v-if="liantou.specification">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{ liantou.specification }}</span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <input
                        type="number"
                        v-if="liantou.modifyFlag == 'Y' && tableStatus != '0'"
                        class="use-num"
                        placeholder="0.00"
                        v-model="liantou.dosage"
                        oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 3)"
                      />
                      <span v-else>{{ liantou.dosage }}</span>
                      <span>{{ liantou.unit }}</span>
                    </span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">总价</span>
                    <span class="title-right title-right2"
                      >{{ oneTotal(liantou) }}元</span
                    >
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.manufacturingInstructions"
                    @click="liantou.showZZSM = tableStatus != '0'"
                  >
                    <span class="title-left">制造说明</span>
                    <span class="title-right title-right2">{{
                      liantou.manufacturingInstructions
                    }}</span>
                    <span class="item-icon" v-if="tableStatus != '0'"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color: red">{{
                      liantou.illustrate
                    }}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="title-right">
                      <input
                        v-if="tableStatus != 0"
                        type="text"
                        v-model="liantou.note"
                        class="curtain-beizhu"
                        placeholder="填写备注"
                      />
                      <span v-else>{{ liantou.note }}</span>
                    </span>
                  </div>
                  <!--选择帘头制造说明-->
                  <div
                    class="head-make-details"
                    @click="liantou.showZZSM = false"
                  >
                    <van-popup v-model="liantou.showZZSM" position="center">
                      <van-radio-group
                        v-model="liantou.manufacturingInstructions"
                      >
                        <van-cell-group>
                          <van-cell
                            title="么术贴正车"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '么术贴正车'
                            "
                          >
                            <van-radio
                              name="么术贴正车"
                              checked-color="#89cb81"
                            />
                          </van-cell>
                          <van-cell
                            title="么术贴反车"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '么术贴反车'
                            "
                          >
                            <van-radio
                              name="么术贴反车"
                              checked-color="#89cb81"
                            />
                          </van-cell>
                          <van-cell
                            title="穿/挂杆款"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '穿/挂杆款'
                            "
                          >
                            <van-radio
                              name="穿/挂杆款"
                              checked-color="#89cb81"
                            />
                          </van-cell>
                          <van-cell
                            title="特殊见备注"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '特殊见备注'
                            "
                          >
                            <van-radio
                              name="特殊见备注"
                              checked-color="#89cb81"
                            />
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
            <van-checkbox
              class="change-this"
              v-if="tableStatus != 0"
              v-model="chooseBig[1]"
              @change="changeLink('ls', 1)"
            ></van-checkbox>
            <van-collapse-item title="帘身" name="2" class="curtain-item">
              <div class="curtain-head">
                <div
                  class="content"
                  v-for="(liantou, index) in ls"
                  :key="index"
                >
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      v-if="tableStatus != 0"
                      @click="
                        changeXh(
                          'ls',
                          index,
                          liantou.productType,
                          liantou.changeFlag,
                          liantou.itemMLGY,
                          liantou.dosage
                        )
                      "
                      class="title-right title-right2"
                      :class="{ 'title-right3': liantou.changeFlag == 'Y' }"
                      >{{ liantou.item.itemNo }}</span
                    >
                    <span v-else class="title-right title-right2">{{
                      liantou.item.itemNo
                    }}</span>
                    <span
                      style="float: right; margin: 4px 5px 0 0"
                      v-if="tableStatus != 0"
                    >
                      <van-checkbox
                        v-if="liantou.deleteFlag == 'Y'"
                        v-model="liantou.choose"
                        @change="changeLinkReverse(liantou)"
                      ></van-checkbox>
                    </span>
                    <span
                      v-if="bigToSmall(liantou) == true"
                      class="item-icon2"
                    ></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span
                      class="title-right title-right2"
                      v-if="liantou.curtainItemName != null"
                      >{{ liantou.curtainItemName }}</span
                    >
                    <span class="title-right title-right2" v-else>{{
                      getTypeName(liantou.itemType)
                    }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2"
                      >{{ liantou.price }}元</span
                    >
                  </div>
                  <div
                    class="title-item2"
                    v-if="showPrice && salPromotion.P_ID"
                  >
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2"
                      >{{ calculatePromotionPrice(liantou) }}元</span
                    >
                  </div>
                  <div class="title-item2" v-if="liantou.specification">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{ liantou.specification }}</span>
                  </div>
                  <div
                    class="title-item2"
                    @click="liantou.showFG = tableStatus != 0"
                    v-if="
                      liantou.certainHeightWidth !== null &&
                      liantou.productType == 'ML'
                    "
                  >
                    <span class="title-left">面料属性</span>
                    <span class="title-right">{{
                      liantou.certainHeightWidth | fixTypeFilter
                    }}</span>
                    <span class="item-icon" v-if="tableStatus != 0"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <input
                        type="number"
                        v-if="liantou.modifyFlag == 'Y' && tableStatus != '0'"
                        class="use-num"
                        placeholder="0.00"
                        v-model="liantou.dosage"
                        oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 2)"
                      />
                      <span v-else>{{ liantou.dosage }}</span>
                      <span>{{ liantou.unit }}</span>
                    </span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">总价</span>
                    <span class="title-right title-right2"
                      >{{ oneTotal(liantou) }}元</span
                    >
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.manufacturingInstructions"
                    @click="liantou.showZZSM = tableStatus != 0"
                  >
                    <span class="title-left">制造说明</span>
                    <span class="title-right title-right2">{{
                      liantou.manufacturingInstructions
                    }}</span>
                    <span class="item-icon" v-if="tableStatus != 0"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color: red">{{
                      liantou.illustrate
                    }}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span style="float: left; margin-left: 10px; color: red">{{
                      getRemark(liantou)
                    }}</span>
                    <span class="title-right">
                      <input
                        type="text"
                        v-if="tableStatus != 0"
                        class="curtain-beizhu"
                        :style="{
                          width: getRemark(liantou) == '' ? '200px' : '130px',
                        }"
                        placeholder="填写备注"
                        v-model="liantou.note"
                      />
                      <span v-else>{{ liantou.note }}</span>
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.certainHeightWidth">
                        <van-cell-group>
                          <van-cell
                            title="定宽"
                            clickable
                            @click="changeFG(1, 'ls', liantou, index)"
                          >
                            <van-radio :name="1" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="定高"
                            clickable
                            @click="changeFG('02', 'ls', liantou, index)"
                          >
                            <van-radio :name="0" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择帘身制造说明-->
                  <div
                    class="head-make-details"
                    @click="liantou.showZZSM = false"
                  >
                    <van-popup v-model="liantou.showZZSM" position="center">
                      <van-radio-group
                        v-model="liantou.manufacturingInstructions"
                      >
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
                            @click="
                              liantou.manufacturingInstructions = '左单开'
                            "
                          >
                            <van-radio name="左单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="右单开"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '右单开'
                            "
                          >
                            <van-radio name="右单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="特殊开备注"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '特殊开备注'
                            "
                          >
                            <van-radio
                              name="特殊开备注"
                              checked-color="#89cb81"
                            />
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
            <van-checkbox
              class="change-this"
              v-if="tableStatus != 0"
              v-model="chooseBig[2]"
              @change="changeLink('lspb', 2)"
            ></van-checkbox>
            <van-collapse-item title="帘身配布" name="3" class="curtain-item">
              <div class="gauze">
                <div
                  class="content"
                  v-for="(liantou, index) in lspb"
                  :key="index"
                >
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      v-if="tableStatus != 0"
                      @click="
                        changeXh(
                          'lspb',
                          index,
                          liantou.productType,
                          liantou.changeFlag,
                          liantou.itemMLGY
                        )
                      "
                      class="title-right title-right2"
                      :class="{ 'title-right3': liantou.changeFlag == 'Y' }"
                      >{{ liantou.item.itemNo }}</span
                    >
                    <span v-else class="title-right title-right2">{{
                      liantou.item.itemNo
                    }}</span>
                    <span
                      style="float: right; margin: 4px 5px 0 0"
                      v-if="tableStatus != 0"
                    >
                      <van-checkbox
                        v-if="liantou.deleteFlag == 'Y'"
                        v-model="liantou.choose"
                        @change="changeLinkReverse(liantou)"
                      ></van-checkbox>
                    </span>
                    <span
                      v-if="bigToSmall(liantou) == true"
                      class="item-icon2"
                    ></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span
                      class="title-right title-right2"
                      v-if="liantou.curtainItemName != null"
                      >{{ liantou.curtainItemName }}</span
                    >
                    <span class="title-right title-right2" v-else>{{
                      getTypeName(liantou.itemType)
                    }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2"
                      >{{ liantou.price }}元</span
                    >
                  </div>
                  <div
                    class="title-item2"
                    v-if="showPrice && salPromotion.P_ID"
                  >
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2"
                      >{{ calculatePromotionPrice(liantou) }}元</span
                    >
                  </div>
                  <div class="title-item2" v-if="liantou.specification">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{ liantou.specification }}</span>
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.manufacturingInstructions"
                    @click="liantou.showZZSM = tableStatus != 0"
                  >
                    <span class="title-left">制造说明</span>
                    <span class="title-right title-right2">{{
                      liantou.manufacturingInstructions
                    }}</span>
                    <span class="item-icon" v-if="tableStatus != 0"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color: red">{{
                      liantou.illustrate
                    }}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span style="float: left; margin-left: 10px; color: red">{{
                      getRemark(liantou)
                    }}</span>
                    <span class="title-right">
                      <input
                        type="text"
                        v-if="tableStatus != 0"
                        class="curtain-beizhu"
                        :style="{
                          width: getRemark(liantou) == '' ? '200px' : '130px',
                        }"
                        placeholder="填写备注"
                        v-model="liantou.note"
                      />
                      <span v-else>{{ liantou.note }}</span>
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.certainHeightWidth">
                        <van-cell-group>
                          <van-cell
                            title="定宽"
                            clickable
                            @click="changeFG(1, 'lspb', liantou, index)"
                          >
                            <van-radio :name="1" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="定高"
                            clickable
                            @click="changeFG(0, 'lspb', liantou, index)"
                          >
                            <van-radio :name="0" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择帘身配布制造说明-->
                  <div
                    class="head-make-details"
                    @click="liantou.showZZSM = false"
                  >
                    <van-popup v-model="liantou.showZZSM" position="center">
                      <van-radio-group
                        v-model="liantou.manufacturingInstructions"
                      >
                        <van-cell-group>
                          <van-cell
                            title="一个褶"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '一个褶'
                            "
                          >
                            <van-radio name="一个褶" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="一个半褶"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '一个半褶'
                            "
                          >
                            <van-radio
                              name="一个半褶"
                              checked-color="#89cb81"
                            />
                          </van-cell>
                          <van-cell
                            title="两个褶"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '两个褶'
                            "
                          >
                            <van-radio name="两个褶" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="两个半褶"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '两个半褶'
                            "
                          >
                            <van-radio
                              name="两个半褶"
                              checked-color="#89cb81"
                            />
                          </van-cell>
                          <van-cell
                            title="三个褶"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '三个褶'
                            "
                          >
                            <van-radio name="三个褶" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="三个半褶"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '三个半褶'
                            "
                          >
                            <van-radio
                              name="三个半褶"
                              checked-color="#89cb81"
                            />
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
            <van-checkbox
              class="change-this"
              v-if="tableStatus != 0"
              v-model="chooseBig[3]"
              @change="changeLink('sha', 3)"
            ></van-checkbox>
            <van-collapse-item title="纱" name="4" class="curtain-item">
              <div class="gauze">
                <div
                  class="content"
                  v-for="(liantou, index) in sha"
                  :key="index"
                >
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      v-if="tableStatus != 0"
                      @click="
                        changeXh(
                          'sha',
                          index,
                          liantou.productType,
                          liantou.changeFlag,
                          liantou.itemMLGY
                        )
                      "
                      class="title-right title-right2"
                      :class="{ 'title-right3': liantou.changeFlag == 'Y' }"
                      >{{ liantou.item.itemNo }}</span
                    >
                    <span v-else class="title-right title-right2">{{
                      liantou.item.itemNo
                    }}</span>
                    <span
                      style="float: right; margin: 4px 5px 0 0"
                      v-if="tableStatus != 0"
                    >
                      <van-checkbox
                        v-if="liantou.deleteFlag == 'Y'"
                        v-model="liantou.choose"
                        @change="changeLinkReverse(liantou)"
                      ></van-checkbox>
                    </span>
                    <span
                      v-if="bigToSmall(liantou) == true"
                      class="item-icon2"
                    ></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span
                      class="title-right title-right2"
                      v-if="liantou.curtainItemName != null"
                      >{{ liantou.curtainItemName }}</span
                    >
                    <span class="title-right title-right2" v-else>{{
                      getTypeName(liantou.itemType)
                    }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2"
                      >{{ liantou.price }}元</span
                    >
                  </div>
                  <div
                    class="title-item2"
                    v-if="showPrice && salPromotion.P_ID"
                  >
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2"
                      >{{ calculatePromotionPrice(liantou) }}元</span
                    >
                  </div>
                  <div class="title-item2" v-if="liantou.specification">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{ liantou.specification }}</span>
                  </div>
                  <div
                    class="title-item2"
                    @click="liantou.showFG = tableStatus != 0"
                    v-if="
                      liantou.certainHeightWidth !== null &&
                      liantou.productType == 'ML'
                    "
                  >
                    <span class="title-left">面料属性</span>
                    <span class="title-right">{{
                      liantou.certainHeightWidth | fixTypeFilter
                    }}</span>
                    <span class="item-icon" v-if="tableStatus != 0"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <input
                        type="number"
                        v-if="liantou.modifyFlag == 'Y' && tableStatus != 0"
                        class="use-num"
                        placeholder="0.00"
                        v-model="liantou.dosage"
                        oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 2)"
                      />
                      <span v-else>{{ liantou.dosage }}</span>
                      <span>{{ liantou.unit }}</span>
                    </span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">总价</span>
                    <span class="title-right title-right2"
                      >{{ oneTotal(liantou) }}元</span
                    >
                  </div>
                  <div
                    class="title-item2"
                    v-if="liantou.manufacturingInstructions"
                    @click="liantou.showZZSM = tableStatus != 0"
                  >
                    <span class="title-left">制造说明</span>
                    <span class="title-right title-right2">{{
                      liantou.manufacturingInstructions
                    }}</span>
                    <span class="item-icon" v-if="tableStatus != 0"></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color: red">{{
                      liantou.illustrate
                    }}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span style="float: left; margin-left: 10px; color: red">{{
                      getRemark(liantou)
                    }}</span>
                    <span class="title-right">
                      <input
                        type="text"
                        v-if="tableStatus != 0"
                        class="curtain-beizhu"
                        :style="{
                          width: getRemark(liantou) == '' ? '200px' : '130px',
                        }"
                        placeholder="填写备注"
                        v-model="liantou.note"
                      />
                      <span v-else>{{ liantou.note }}</span>
                    </span>
                  </div>
                  <!--选择风格-->
                  <div class="show-FG" @click="liantou.showFG = false">
                    <van-popup v-model="liantou.showFG" position="center">
                      <van-radio-group v-model="liantou.certainHeightWidth">
                        <van-cell-group>
                          <van-cell
                            title="定宽"
                            clickable
                            @click="changeFG(1, 'sha', liantou, index)"
                          >
                            <van-radio :name="1" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="定高"
                            clickable
                            @click="changeFG(0, 'sha', liantou, index)"
                          >
                            <van-radio :name="0" checked-color="#89cb81" />
                          </van-cell>
                        </van-cell-group>
                      </van-radio-group>
                    </van-popup>
                  </div>
                  <!--选择纱面料制造说明-->
                  <div
                    class="head-make-details"
                    @click="liantou.showZZSM = false"
                  >
                    <van-popup v-model="liantou.showZZSM" position="center">
                      <van-radio-group
                        v-model="liantou.manufacturingInstructions"
                      >
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
                            @click="
                              liantou.manufacturingInstructions = '左单开'
                            "
                          >
                            <van-radio name="左单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="右单开"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '右单开'
                            "
                          >
                            <van-radio name="右单开" checked-color="#89cb81" />
                          </van-cell>
                          <van-cell
                            title="特殊开备注"
                            clickable
                            @click="
                              liantou.manufacturingInstructions = '特殊开备注'
                            "
                          >
                            <van-radio
                              name="特殊开备注"
                              checked-color="#89cb81"
                            />
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
                <div
                  class="content"
                  v-for="(liantou, index) in pjb"
                  :key="index"
                >
                  <div class="title-item2">
                    <span class="title-left">编码</span>
                    <span
                      v-if="tableStatus != 0"
                      @click="
                        changeXh(
                          'pjb',
                          index,
                          liantou.productType,
                          liantou.changeFlag,
                          liantou.itemMLGY
                        )
                      "
                      class="title-right title-right2"
                      :class="{ 'title-right3': liantou.changeFlag == 'Y' }"
                      >{{ liantou.item.itemNo }}</span
                    >
                    <span v-else class="title-right title-right2">{{
                      liantou.item.itemNo
                    }}</span>
                    <span
                      v-if="bigToSmall(liantou) == true"
                      class="item-icon2"
                    ></span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">名称</span>
                    <span
                      class="title-right title-right2"
                      v-if="liantou.curtainItemName != null"
                      >{{ liantou.curtainItemName }}</span
                    >
                    <span class="title-right title-right2" v-else>{{
                      getTypeName(liantou.itemType)
                    }}</span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">单价</span>
                    <span class="title-right title-right2"
                      >{{ liantou.price }}元</span
                    >
                  </div>
                  <div
                    class="title-item2"
                    v-if="showPrice && salPromotion.P_ID"
                  >
                    <span class="title-left">折后</span>
                    <span class="title-right title-right2"
                      >{{ calculatePromotionPrice(liantou) }}元</span
                    >
                  </div>
                  <div class="title-item2" v-if="liantou.specification">
                    <span class="title-left">规格（米/对）</span>
                    <span class="title-right">{{ liantou.specification }}</span>
                  </div>
                  <div class="title-item2">
                    <span class="title-left">用量</span>
                    <span class="title-right">
                      <input
                        type="number"
                        v-if="liantou.modifyFlag == 'Y' && tableStatus != 0"
                        class="use-num"
                        placeholder="0.00"
                        v-model="liantou.dosage"
                        oninput="value=value.replace(/[^\d.]/g,'')
                                .replace(/^\./g, '').replace(/\.{2,}/g, '.')
                                .replace('.', '$#$').replace(/\./g, '')
                                .replace('$#$', '.')
                                .slice(0,value.indexOf('.') === -1? value.length: value.indexOf('.') + 2)"
                      />
                      <span v-else>{{ liantou.dosage }}</span>
                      <span>{{ liantou.unit }}</span>
                    </span>
                  </div>
                  <div class="title-item2" v-if="showPrice">
                    <span class="title-left">总价</span>
                    <span class="title-right title-right2"
                      >{{ oneTotal(liantou) }}元</span
                    >
                  </div>
                  <div class="title-item2">
                    <span class="title-left">说明</span>
                    <span class="title-right" style="color: red">{{
                      liantou.illustrate
                    }}</span>
                  </div>
                  <div class="title-item3">
                    <span class="title-left">备注</span>
                    <span class="title-right">
                      <input
                        type="text"
                        v-if="tableStatus != 0"
                        class="curtain-beizhu"
                        placeholder="填写备注"
                        v-model="liantou.note"
                      />
                      <span v-else>{{ liantou.note }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </div>
        </van-collapse>
      </div>
    </div>
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
          <div slot="action" @click="onSearchWall" style="color: white">
            搜索
          </div>
        </van-search>
        <img class="img" src="../../assetsorder/back.png" @click="nolist" />
      </div>
      <!--可替换型号列表-->
      <div class="all-itemlists">
        <ul v-if="productType != 'GY'">
          <li
            v-for="(item, index) in itemNolists"
            @click="selthisItemNo(item)"
            class="itemNolist"
            :key="index"
          >
            {{ item.itemNo }}
          </li>
        </ul>
        <ul v-else>
          <li
            v-for="(item, index) in itemNolists"
            @click="selthisItemNo(item)"
            class="itemNolist"
            :key="index"
          >
            {{ item.itemNo }}
          </li>
        </ul>
      </div>
      <!--底部分页-->
      <van-pagination
        class="fy-bottom"
        v-model="currentPage"
        :page-count="totalPage"
        :items-per-page="itemsPerPage"
        :total-items="totalLists"
        mode="simple"
        @change="changePage"
      />
    </van-popup>
    <div class="shop-btn" @click="resolveModify" v-if="tableStatus != 0">
      确认修改
    </div>
  </div>
</template>

<script>
import axios from "axios";
import top from "../../../components/Top";
import { GetDosageAll, GetDosageByNo } from "@/api/itemInfoASP";
import { GetPromotionsById } from "@/api/orderListASP";
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
  Dialog,
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
    [Dialog.name]: Dialog,
  },
  props: ["curtainData", "tableStatus"], //tableStatus 0查看 1
  data() {
    return {
      set: 28,
      limit: 26,
      activeName: ["1", "2", "3", "4", "5"],
      //curtainData: this.$route.params.curtain,
      itemNo: "",
      width: "", //成品宽度
      height: "", //成品高度
      WBH: "", //帘头外包盒宽度
      multiple: "", //褶皱倍数
      location: "",
      isWBH: "",
      activityName: "",
      groupType: "",
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
      chooseBig: [], //是否选择了大类
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
      allData: [],
      showPrice: this.$store.getters.getIsManage != "0",
      activityOptions: [],
    };
  },
  filters: {
    fixTypeFilter(val) {
      switch (val) {
        case 0:
          return "定高";
        case 1:
          return "定宽";
      }
      return "--";
    },
  },
  computed: {
    salPromotion() {
      var selectActivity = this.activityOptions.filter(
        (item) => item.P_ID == this.curtainData.curtains[0].activityId
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
          totalMoney = totalMoney.add(this.oneTotal(_curtainData[i]));
        }
      }

      return totalMoney;
    },
  },
  methods: {
    backclick() {
      this.$emit("backclick");
    },
    changeLink(type, index) {
      if (type == "ls") {
        for (var i = 0; i < this.ls.length; i++) {
          this.ls[i].choose = this.chooseBig[index];
        }
        this.chooseBig[2] = this.chooseBig[index];
        this.changeLink("lspb", 2);
      } else if (type == "sha") {
        for (var i = 0; i < this.sha.length; i++) {
          this.sha[i].choose = this.chooseBig[index];
        }
      } else if (type == "lspb") {
        for (var i = 0; i < this.lspb.length; i++) {
          this.lspb[i].choose = this.chooseBig[index];
        }
      }
      this.changeLinkTip(type, index);
    },
    changeLinkReverse(data) {
      let _index;
      let _arr = [];
      let flag = true;
      switch (data.itemType) {
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
        _arr.forEach((item) => {
          if (item.deleteFlag !== "Y" || item.choose === true) {
            flag = false;
          }
        });
        if (data.choose || flag) {
          this.chooseBig[_index] = data.choose;
          this.$set(this.chooseBig, _index, data.choose);
          this.changeLinkTip(data.itemMLGY.itemType, _index);
        }
      }
    },
    changeLinkTip(type, index) {
      if (type == "lspb") {
        //取消帘身配布如果帘身没有取消，需要在帘身工艺中备注
        //如果帘身也取消了，就改回来
        //找到工艺数据
        var gyData = this.ls.filter((item) => item.productType == "GY");
        if (gyData.length) {
          gyData = gyData[0];
          if (this.chooseBig[1] && !this.chooseBig[2]) {
            gyData.remark = "已取消购买帘身配布;" + gyData.remark;
          } else {
            gyData.remark = gyData.remark.replace("已取消购买帘身配布;", "");
          }
        }
      }
    },
    getPrice(type, item) {
      var price = 0;
      if (item) {
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
      }
      return price;
    },
    //改变型号类型
    changeXh(itemType, index, productType, changeFlag, itemMLGY, dosage) {
      this.inputValue = "";
      this.itemType = itemType;
      this.index = index;
      this.productType = productType;
      this.changeFlag = changeFlag;
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
            itemNO: productType,
          };
          axios
            .post(url, data)
            .then((res) => {
              this.itemNolists = res.data.data;
              this.totalPage = Math.ceil(
                this.itemNolists[0].total / this.limit
              );
              this.pageMark = this.totalPage;
              if (itemType == "pjb") {
                this.itemNolists.sort(function (a, b) {
                  return a.itemNo > b.itemNo ? 1 : -1; //升序
                });
              }
            })
            .catch((err) => {
              this.itemNolists = [];
              this.totalPage = 0;
              this.pageMark = this.totalPage;
            });
        } else {
          let url = this.orderBaseUrl + "/item/getGYList.do";
          let data = {
            itemNO: this.itemNo, //所属型号
          };
          axios.post(url, data).then((res) => {
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
      liantou.certainHeightWidth = fg;
      var data = this.getChangeArray(itemType);
      let _fixType = fg === 0 ? "02" : "01";
      let url = this.orderBaseUrl + "/item/changeCurtainItem.do";
      let obj = {
        width: this.width, //成品宽度
        height: this.height, //成品高度
        WBH: this.WBH, //帘头外包盒宽度
        multiple: this.multiple, //褶皱倍数
        parentItemNo: this.itemNo,
        itemNO: liantou.item.itemNo,
        itemType: itemType,
        fixType: _fixType,
      };
      //axios.post(url, data).then(res => {
      GetDosageByNo(obj).then((res) => {
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
        itemNO: this.inputValue, //模糊查询的内容
      };
      axios.post(url, data).then((res) => {
        this.itemNolists = res.data.data;
        if (this.itemNolists.length == 0) {
          this.itemNolists = [];
          this.currentPage = 1;
          this.totalPage = 1;
          Toast({
            duration: 2000,
            message: "暂无查询结果",
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
      let theFixType;
      if (item.fixType === "01") {
        theFixType = 1;
      } else if (item.fixType === "02") {
        theFixType = 0;
      }
      var data = this.getChangeArray(this.itemType);
      var oriData = this.getOrignalArray(this.itemType);
      var price = this.getPrice(this.$store.getters.getCtype, item);
      data[this.index].note = item.note;
      data[this.index].specification = item.fixGrade / 1000;
      data[this.index].certainHeightWidth = theFixType;
      data[this.index].item.itemNo = item.itemNo;
      data[this.index].price = price;
      if (this.itemType == "pjb") {
        data[this.index].unit = item.unit == "°ü" ? "包" : item.unit;
      }
      oriData[this.index].certainHeightWidth = theFixType;
      if (this.productType != "GY") {
        //非工艺用量修改
        if (this.itemType == "lspb") {
          //帘身配布没有用量
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
          fixType: item.fixType, //01--定宽，02--定高，如果客户没有修改也要传入默认值，不能为空
        };
        GetDosageByNo(obj).then((res) => {
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
        if (data[this.index].item.itemNo == "GY-003") {
          data[this.index].dosage = this.allData.GY;
        } else {
          var mlData = data.filter((item) => item.productType == "ML")[0];
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
      var oriData = this.getOrignalArray(data.itemType);
      if (
        data.certainHeightWidth === 0 &&
        oriData[index].certainHeightWidth === 1
      ) {
        status = 1;
      }
      if (
        data.certainHeightWidth === 1 &&
        oriData[index].certainHeightWidth === 0
      ) {
        status = 2;
      }
      if (data.item.itemNo !== oriData[index].item.itemNo) {
        if (status === 1) status = 4;
        else if (status === 2) status = 5;
        else status = 3;
      }
      if (
        //data.itemType === "pjb" ||
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
    bigToSmall: function (data) {
      let index = -1;
      switch (data.itemType) {
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
          data[i].itemType === itemType &&
          pType !== "LCB" &&
          pType !== "XHB"
        ) {
          if (data[i].item.itemNo !== "GY-003") {
            data[i].dosage = dosage;
          } else {
            data[i].dosage = this.allData.GY;
          }
        }
      }
    },
    //获取备注文字
    getRemark(data) {
      if (data.certainHeightWidth === 0 && data.specification != 0) {
        if (data.specification < this.height) {
          return "超高帘，用量待审核!";
        }
      }
      return "";
    },
    getNowData() {
      //表头
      this.itemNo = this.curtainData.ITEM_NO;
      this.width = this.curtainData.CURTAIN_WIDTH;
      this.height = this.curtainData.CURTAIN_HEIGHT;
      this.WBH = this.curtainData.CURTAIN_WBH_SIZE;
      this.multiple = this.curtainData.CURTAIN_SIZE_TIMES;
      this.location = this.curtainData.CURTAIN_ROOM_NAME;
      this.isWBH = this.curtainData.CURTAIN_WBH_SIZE != -1;
      this.activityName = this.curtainData.PROMOTION;
      //this.groupType = this.curtainData.activityGroupType;
      this.highJia = this.curtainData.CURTAIN_HEIGHT2;
      //明细
      for (var i = 0; i < this.curtainData.curtains.length; i++) {
        var _data = JSON.parse(JSON.stringify(this.curtainData.curtains[i]));

        _data.productType = _data.item.productType;
        _data.itemType = _data.curtainPartName;
        _data.unit = _data.unit === "°ü" ? "包" : _data.unit;
        _data.showZZSM = false;
        if (_data.choose == undefined || _data.choose == null) {
          _data.choose = true;
        }

        var data = this.getChangeArray(_data.itemType);
        var oriData = this.getOrignalArray(_data.itemType);
        data.push(JSON.parse(JSON.stringify(_data)));
        oriData.push(JSON.parse(JSON.stringify(_data)));
      }
      if (
        this.curtainData.chooseBig == undefined ||
        this.curtainData.chooseBig == null
      ) {
        this.chooseBig = [true, true, true, true, true];
      } else {
        this.chooseBig = this.curtainData.chooseBig;
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
        location: this.location,
      };
      axios.post(URL, data).then(async (res) => {
        let itemLists = res.data.itemList;
        for (let i = 0; i < itemLists.length; i++) {
          var oriData = this.getOrignalArray(itemLists[i].itemType);
          for (var j = 0; j < oriData.length; j++) {
            if (itemLists[i].no == oriData[j].inlineNo) {
              if (
                oriData[j].certainHeightWidth !== null &&
                oriData[j].productType === "ML"
              ) {
                let _itemObj = {
                  itemType: oriData[j].productType,
                  itemNO: oriData[j].item.itemNo,
                  limit: 1,
                  page: 1,
                };
                let itemurl =
                  this.orderBaseUrl + "/item/searchCurtainItemTypeAll.do";
                let ress = await axios.post(itemurl, _itemObj);
                if (ress.data.data.length > 0) {
                  oriData[j].certainHeightWidth =
                    ress.data.data[0].fixType == "01" ? 0 : 1;
                }
              }
              if (oriData[j].item.itemNo != itemLists[i].itemNo) {
                oriData[j].item.itemNo = itemLists[i].itemNo;
              }
            }
          }
        }
      });
    },
    resolveModify() {
      var _curtainData = [];
      for (var i = 0; i < this.lt.length; i++) {
        _curtainData.push(JSON.parse(JSON.stringify(this.lt[i])));
      }
      for (var i = 0; i < this.ls.length; i++) {
        _curtainData.push(JSON.parse(JSON.stringify(this.ls[i])));
      }
      for (var i = 0; i < this.lspb.length; i++) {
        _curtainData.push(JSON.parse(JSON.stringify(this.lspb[i])));
      }
      for (var i = 0; i < this.sha.length; i++) {
        _curtainData.push(JSON.parse(JSON.stringify(this.sha[i])));
      }
      for (var i = 0; i < this.pjb.length; i++) {
        _curtainData.push(JSON.parse(JSON.stringify(this.pjb[i])));
      }

      var _chooseBig = JSON.parse(JSON.stringify(this.chooseBig));
      this.$emit("getChangeData", _curtainData, _chooseBig);
    },
    getActivity() {
      this.activityOptions = [];
      GetPromotionsById({ PID: this.curtainData.curtains[0].activityId }).then(
        (res) => {
          this.activityOptions = res.data;
        }
      );
    },
    oneTotal(row) {
      var price = this.dosageFilter(this.calculatePromotionPrice(row));
      if (row.dosage == undefined) row.dosage = 0;
      return price.mul(row.dosage);
    },
    calculatePromotionPrice(data) {
      var price = 0;
      //首先判断TYPE,1折扣，2定价
      if (this.salPromotion && this.salPromotion.P_ID) {
        switch (this.salPromotion.TYPE) {
          case "1":
            //折扣
            price = data.price.mul(this.salPromotion.DISCOUNT);
            break;
          case "2":
            //定价
            price = this.salPromotion.PRICE;
        }
      } else {
        price = data.price;
      }
      return this.dosageFilter(price);
    },
  },
  created() {
    this.getNowData();
    //this.getOldData();
    this.getActivity();
  },
};
</script>

<style scoped>
.single-curtain {
  height: 100vh;
  width: 375px;
  overflow: hidden;
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
  height: calc(100%- 110px);
  overflow: scroll;
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
  height: 13px;
  text-align: center;
  border: 1px solid #666;
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
  background: url("../../assetsorder/more.png") center no-repeat;
  background-size: 12px 12px;
}

.item-icon2 {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  background: url("../../assetsorder/del.png") center no-repeat;
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
  background: url("../../assetsorder/more.png") no-repeat center;
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
  background: url("../../assetsorder/more.png") no-repeat center;
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
  padding: 10px !important;
}
</style>