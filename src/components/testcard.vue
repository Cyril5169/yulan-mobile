<template>
  <div>
    <div class="cardQuery">
      <top-show :top="set"></top-show>
      <div class="bigPic" v-show="bigPic1">
        <img :src="headerImage15" alt />
      </div>
      <div class="bigPic" v-show="bigPic2">
        <img :src="headerImage25" alt />
      </div>
      <div class="bigPic" v-show="bigPic3">
        <img :src="headerImage35" alt />
      </div>
      <div class="bigPic" v-show="bigPic4">
        <img :src="headerImage45" alt />
      </div>
      <div class="shadow" v-show="bigPic1"></div>
      <div class="shadow" v-show="bigPic2"></div>
      <div class="shadow" v-show="bigPic3"></div>
      <div class="shadow" v-show="bigPic4"></div>
      <div class="picButton" v-show="bigPic1">
        <div class="toSmall" @click="outPic1">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic2">
        <div class="toSmall" @click="outPic2">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic3">
        <div class="toSmall" @click="outPic3">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic4">
        <div class="toSmall" @click="outPic4">
          <button>确定</button>
        </div>
      </div>
      <div class="bigPic" v-show="bigPic5">
        <img :src="headerImage55" alt />
      </div>
      <div class="bigPic" v-show="bigPic6">
        <img :src="headerImage65" alt />
      </div>
      <div class="bigPic" v-show="bigPic7">
        <img :src="headerImage75" alt />
      </div>
      <div class="bigPic" v-show="bigPic8">
        <img :src="headerImage85" alt />
      </div>
      <div class="shadow" v-show="bigPic5"></div>
      <div class="shadow" v-show="bigPic6"></div>
      <div class="shadow" v-show="bigPic7"></div>
      <div class="shadow" v-show="bigPic8"></div>
      <div class="picButton" v-show="bigPic5">
        <div class="toSmall" @click="outPic5">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic6">
        <div class="toSmall" @click="outPic6">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic7">
        <div class="toSmall" @click="outPic7">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic8">
        <div class="toSmall" @click="outPic8">
          <button>确定</button>
        </div>
      </div>
      <div class="bigPic" v-show="bigPic9">
        <img :src="headerImage95" alt />
      </div>
      <div class="bigPic" v-show="bigPic10">
        <img :src="headerImage105" alt />
      </div>
      <div class="bigPic" v-show="bigPic11">
        <img :src="headerImage115" alt />
      </div>
      <div class="bigPic" v-show="bigPic12">
        <img :src="headerImage125" alt />
      </div>
      <div class="shadow" v-show="bigPic9"></div>
      <div class="shadow" v-show="bigPic10"></div>
      <div class="shadow" v-show="bigPic11"></div>
      <div class="shadow" v-show="bigPic12"></div>
      <div class="picButton" v-show="bigPic9">
        <div class="toSmall" @click="outPic9">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic10">
        <div class="toSmall" @click="outPic10">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic11">
        <div class="toSmall" @click="outPic11">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic12">
        <div class="toSmall" @click="outPic12">
          <button>确定</button>
        </div>
      </div>
      <div class="bigPic" v-show="bigPic13">
        <img :src="headerImage135" alt />
      </div>
      <div class="bigPic" v-show="bigPic14">
        <img :src="headerImage145" alt />
      </div>
      <div class="bigPic" v-show="bigPic15">
        <img :src="headerImage155" alt />
      </div>
      <div class="bigPic" v-show="bigPic16">
        <img :src="headerImage165" alt />
      </div>
      <div class="shadow" v-show="bigPic13"></div>
      <div class="shadow" v-show="bigPic14"></div>
      <div class="shadow" v-show="bigPic15"></div>
      <div class="shadow" v-show="bigPic16"></div>
      <div class="picButton" v-show="bigPic13">
        <div class="toSmall" @click="outPic13">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic14">
        <div class="toSmall" @click="outPic14">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic15">
        <div class="toSmall" @click="outPic15">
          <button>确定</button>
        </div>
      </div>
      <div class="picButton" v-show="bigPic16">
        <div class="toSmall" @click="outPic16">
          <button>确定</button>
        </div>
      </div>
      <div class="files">
        <div class="files-word">
          <h4>基本信息</h4>
          <p>{{cusName}}</p>
        </div>
        <div class="exam" v-show="!isShow">
          <div id="record" @click="showIt"></div>
          <span @click="showIt">评审记录</span>
        </div>
        <reviews-show
          v-on:set="setChange"
          v-show="isShow"
          :show="isShow"
          :message="messages"
          :customerInfo="customerInfo"
        ></reviews-show>
      </div>
      <div class="content">
        <div class="content-all">
          <div class="topBox">
            <p>
              主营区域：
              <input type="text" v-model="district" readonly="true" name="area" />
            </p>
          </div>
          <div class="newbox" id="newbrand">
            <p>
              意向品牌：
              <label class="test1">
                <input type="checkbox" class="check" name="check" :checked="boxcheck1" disabled />玉兰（墙纸类产品）
              </label>
            </p>
            <p id="second">
              <label class="test1">
                <input type="checkbox" class="check" name="check" :checked="boxcheck2" disabled />玉兰·兰尚居品（软装类产品）
              </label>
            </p>
          </div>
          <div class="box" id="nowbrand">
            <p>
              现主经营产品品牌：
              <input type="text" v-model="nowbrand" name="nowbrand" disabled />
            </p>
          </div>
          <div class="box" id="square">
            <p>
              店铺面积：
              <input type="text" v-model="square" name="fax" disabled />平方米
            </p>
          </div>
          <div class="nbox">
            <p>
              发票开具类型&nbsp;:
              <label class="invoice">
                <input
                  type="radio"
                  name="invoice"
                  id="tax1"
                  value="不开发票"
                  :checked="radiocheck101"
                  disabled
                />
                <label for="tax1" class="intype"></label>
                <span class="radio-name">不开发票</span>
              </label>
            </p>
            <p id="insecond">
              <label class="invoice">
                <input
                  type="radio"
                  name="invoice"
                  id="tax2"
                  value="增值税普通发票"
                  :checked="radiocheck22"
                  disabled
                />
                <label for="tax2" class="intype"></label>
                <span class="radio-name">增值税普通发票</span>
              </label>
              <label class="invoice" id="num2">
                <input
                  type="radio"
                  name="invoice"
                  id="tax3"
                  value="电子普通发票"
                  :checked="radiocheck33"
                  disabled
                />
                <label for="tax3" class="intype"></label>
                <span class="radio-name">电子普通发票</span>
              </label>
            </p>
            <p id="inthird">
              <label class="invoice">
                <input
                  type="radio"
                  name="invoice"
                  id="tax4"
                  value="增值税专用发票"
                  :checked="radiocheck404"
                  disabled
                />
                <label for="tax4" class="intype" id="num4"></label>
                <span class="radio-name">增值税专用发票</span>
              </label>
              <span v-show="goTo" id="togo" @click="checkTax">查看发票信息</span>
            </p>
          </div>
          <div class="box" id="email" v-show="showEmail">
            <p>
              接收邮箱：
              <input type="text" name="email" v-model="reEmail" disabled />
            </p>
          </div>
          <div class="nbox" id="people">
            <p>
              一般纳税人：
              <label>
                <input
                  type="radio"
                  name="type"
                  id="adviceRadio1"
                  value="1"
                  :checked="radiocheck5"
                  hidden
                  disabled
                />
                <label for="adviceRadio1" class="advice"></label>
                <span class="radio-name">是</span>
              </label>
              <label class="no">
                <input
                  type="radio"
                  name="type"
                  id="adviceRadio2"
                  value="2"
                  :checked="radiocheck6"
                  hidden
                  disabled
                />
                <label for="adviceRadio2" class="advice"></label>
                <span class="radio-name">否</span>
              </label>
            </p>
          </div>
          <div class="box" id="manager">
            <p>
              法人代表/经营者：
              <input type="text" v-model="manager" readonly="true" name="address" />
            </p>
          </div>
          <div class="box" id="cellphone">
            <p>
              手机：
              <input v-model="phone" type="text" name="cellphone" disabled />
            </p>
          </div>
        </div>
      </div>
      <div class="content2">
        <h4>业务信息</h4>
        <div class="content-all2">
          <div class="topBox2">
            <p>
              联系人：
              <input type="text" v-model="person2" readonly="true" name="person" />
            </p>
          </div>
          <div class="box2" id="phone2">
            <p>
              电话：
              <input type="text" v-model="tel2" readonly="true" name="phone" />
            </p>
          </div>
          <div class="box2" id="phone2">
            <p>
              手机：
              <input type="text" v-model="phone2" readonly="true" name="cellphone" />
            </p>
          </div>
          <div class="box2" id="fax2">
            <p>
              传真：
              <input type="text" v-model="fax2" name="fax" disabled />
            </p>
          </div>
          <div class="box2" id="qq2">
            <p>
              qq：
              <input type="text" v-model="qq2" name="QQ" disabled />
            </p>
          </div>
          <div class="box2" id="e-mail2">
            <p>
              e-mail：
              <input type="text" v-model="email2" name="E-mail" disabled />
            </p>
          </div>
          <div class="box2" id="address2">
            <p>
              通讯地址：
              <input type="text" v-model="address2" readonly="true" name="address" />
            </p>
          </div>
          <div class="box2" id="fax2">
            <p>
              邮编：
              <input type="text" v-model="zip2" name="mail" disabled />
            </p>
          </div>
        </div>
      </div>
      <div class="content3">
        <h4>物流信息</h4>
        <div class="content-all3">
          <div class="topBox3">
            <p>
              联系人：
              <input type="text" v-model="person3" readonly="true" name="person" />
            </p>
          </div>
          <div class="box3" id="phone3">
            <p>
              电话：
              <input type="text" v-model="tel3" readonly="true" name="personphone" />
            </p>
          </div>
          <div class="box3" id="phone13">
            <p>
              物流手机：
              <input type="text" v-model="phone3" readonly="true" name="logisticsphone" />
            </p>
          </div>
          <div class="box3" id="fax3">
            <p>
              传真：
              <input type="text" v-model="faxwl3" name="fax" disabled />
            </p>
          </div>
          <div class="box3" id="readdress3">
            <p>
              收货地址：
              <input type="text" v-model="address3" readonly="true" name="address" />
            </p>
          </div>
          <div class="box3" id="fax3">
            <p>
              邮编：
              <input type="text" v-model="zipwl3" name="mail" disabled />
            </p>
          </div>
        </div>
      </div>
      <div class="content4">
        <h4>银行账户</h4>
        <div class="content-all4">
          <div class="nbox4">
            <p>
              经营方式：
              <label class="saleWay4">
                <input
                  type="radio"
                  name="saleWay"
                  id="way14"
                  value="有公司"
                  :checked="radiocheck14"
                  hidden
                  disabled
                />
                <label for="way14" class="way4"></label>
                <span class="radio-name">有营业执照-有对公账号</span>
              </label>
            </p>
            <p id="insecond4">
              <label class="saleWay4">
                <input
                  type="radio"
                  name="saleWay"
                  id="way24"
                  value="无公司"
                  :checked="radiocheck24"
                  hidden
                  disabled
                />
                <label for="way24" class="way4"></label>
                <span class="radio-name">有营业执照-无对公账号</span>
              </label>
            </p>
            <p id="third4" v-show="isShow4">
              <span>是否增加委托授权付款银行账号</span>
            </p>
            <p id="thirdc4" v-show="isShow4">
              <span>（仅限经营者配偶）</span>
            </p>
            <p id="forth4" v-show="c4">
              <label class="saleWay4">
                <input
                  type="radio"
                  name="adType"
                  id="type14"
                  value="1"
                  :checked="radiocheck44"
                  hidden
                  disabled
                />
                <label for="type14" class="way4"></label>
                <span class="radio-name">是</span>
              </label>
              <label class="saleWay4">
                <input
                  type="radio"
                  name="adType"
                  id="type24"
                  value="2"
                  :checked="radiocheck54"
                  hidden
                  disabled
                />
                <label for="type24" class="way4"></label>
                <span class="radio-name">否</span>
              </label>
            </p>
            <p id="fifth4" v-show="b4">
              <router-link to="/cardquery/checkproxy">
                <span id="togo4">查看授权委托账号信息</span>
              </router-link>
            </p>
            <p id="inthird4">
              <label class="saleWay4">
                <input
                  type="radio"
                  name="saleWay"
                  id="way34"
                  value="个人"
                  :checked="radiocheck34"
                  hidden
                  disabled
                />
                <label for="way34" class="way4"></label>
                <span class="radio-name">无营业执照</span>
              </label>
            </p>
          </div>
          <div class="ctbox4">
            <p>{{msg4}}：</p>
          </div>
          <div class="box4" id="person4" v-show="acc14">
            <p>
              汇款人：
              <input type="text" v-model="person14" readonly="true" name="monperson1" disabled />
            </p>
          </div>
          <div class="box4" id="person4" v-show="acc24">
            <p>
              汇款人：
              <input type="text" v-model="person24" readonly="true" name="monperson2" disabled />
            </p>
          </div>
          <div class="box4" id="bank4" v-show="acc14">
            <p>
              汇款银行：
              <input type="text" v-model="bank14" name="bank1" disabled />
            </p>
          </div>
          <div class="box4" id="bank4" v-show="acc24">
            <p>
              汇款银行：
              <input type="text" v-model="bank24" name="bank2" disabled />
            </p>
          </div>
          <div class="box4" id="number4" v-show="acc14">
            <p>
              账号：
              <input type="text" v-model="number14" name="number1" disabled />
            </p>
          </div>
          <div class="box4" id="number4" v-show="acc24">
            <p>
              账号：
              <input type="text" v-model="number24" name="number2" disabled />
            </p>
          </div>
          <div class="box4" id="bankaddress4">
            <p>
              银行所在地：
              <input name id="form_select" disabled="disabled" :value="location4" ref="bank" />
            </p>
          </div>
        </div>
      </div>
      <div class="content5">
        <h4>上传资质文件</h4>
        <div class="content-all5">
          <div class="account5">
            <p>
              您的账号实体类型：
              <input
                type="text"
                v-model="sss"
                readonly="true"
                class="form_select5"
                disabled
              />
            </p>
          </div>
          <div class="nojoin5" v-show="nojoin5">
            <div class="linefirst5">
              <div class="IDfirst5">
                <p>身份证头像面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig1">
                    <img :src="headerImage15" alt />
                    <input
                      type="file"
                      id="upload15"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload15"></label>
                  </div>
                  <div class="pic5" v-show="isShow15">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="CID5">身份证号码</p>
                <input type="text" class="CIDnumber5" v-model="CIDnumber5" disabled />
              </div>
              <div class="IDfirst5">
                <p>身份证国徽面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig2">
                    <img :src="headerImage25" alt />
                    <input
                      type="file"
                      id="upload25"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload25"></label>
                  </div>
                  <div class="pic5" v-show="isShow25">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="linesecond5">
              <div class="IDfirst5">
                <p id="first5">营业执照</p>
                <div class="show5">
                  <div class="picture5" @click="showBig3">
                    <img :src="headerImage35" alt />
                    <input
                      type="file"
                      id="upload35"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload35"></label>
                  </div>
                  <div class="pic5" v-show="isShow35">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="business5">营业执照注册号</p>
                <input type="text" class="IDnumber5" v-model="businumber5" readonly="true" disabled />
                <p id="business5">营业执照有效期</p>
                <input name id="form_select25" v-model="selectDate" readonly />
              </div>
              <div class="IDfirst5">
                <p id="second5">税务登记证（国税）</p>
                <div class="show5">
                  <div class="picture5" @click="showBig4">
                    <img :src="headerImage45" alt />
                    <input
                      type="file"
                      id="upload45"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload45"></label>
                  </div>
                  <div class="pic5" v-show="isShow45">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="tax5">税务证号</p>
                <input type="text" class="IDnumber5" v-model="taxNumber5" readonly="true" disabled />
                <div id="forever">
                  <label class="test">
                    <input type="checkbox" class="check" :checked="boxcheck11" disabled /> 永久有效
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="join5" v-show="join5">
            <div class="linefirst5">
              <div class="IDfirst5">
                <p>身份证头像面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig5">
                    <img :src="headerImage55" alt />
                    <input
                      type="file"
                      id="upload55"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload55"></label>
                  </div>
                  <div class="pic5" v-show="isShow55">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="CID5">身份证号码</p>
                <input type="text" class="CIDnumber5" v-model="CIDnumber5" disabled />
              </div>
              <div class="IDfirst5">
                <p>身份证国徽面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig6">
                    <img :src="headerImage65" alt />
                    <input
                      type="file"
                      id="upload65"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload65"></label>
                  </div>
                  <div class="pic5" v-show="isShow65">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="linesecond5">
              <div class="IDfirst5">
                <p id="first5">营业执照</p>
                <div class="show5">
                  <div class="picture5" @click="showBig7">
                    <img :src="headerImage75" alt />
                    <input
                      type="file"
                      id="upload75"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload75"></label>
                  </div>
                  <div class="pic5" v-show="isShow75">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="business5">营业执照注册号</p>
                <input type="text" class="IDnumber5" v-model="businumber5" readonly="true" disabled />
                <p id="business5">营业执照有效期</p>
                <input name id="form_select25" v-model="selectDate" readonly />
              </div>
              <div id="forever2">
                <label class="test">
                  <input type="checkbox" class="check" :checked="boxcheck22" disabled />永久有效
                </label>
              </div>
            </div>
          </div>
          <div class="single5" v-show="single5">
            <div class="linefirst5" id="sin5">
              <div class="IDfirst5">
                <p>身份证头像面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig8">
                    <img :src="headerImage85" alt />
                    <input
                      type="file"
                      id="upload85"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload85"></label>
                  </div>
                  <div class="pic5" v-show="isShow85">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="CID5">身份证号码</p>
                <input type="text" class="CIDnumber5" v-model="CIDnumber5" disabled />
              </div>
              <div class="IDfirst5">
                <p>身份证国徽面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig9">
                    <img :src="headerImage95" alt />
                    <input
                      type="file"
                      id="upload95"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload95"></label>
                  </div>
                  <div class="pic5" v-show="isShow95">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Self-employed person5" v-show="personality5">
            <div class="linefirst5">
              <div class="IDfirst5">
                <p>身份证头像面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig10">
                    <img :src="headerImage105" alt />
                    <input
                      type="file"
                      id="upload105"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload105"></label>
                  </div>
                  <div class="pic5" v-show="isShow105">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="CID5">身份证号码</p>
                <input type="text" class="CIDnumber5" v-model="CIDnumber5" disabled />
              </div>
              <div class="IDfirst5">
                <p>身份证国徽面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig11">
                    <img :src="headerImage115" alt />
                    <input
                      type="file"
                      id="upload115"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload115"></label>
                  </div>
                  <div class="pic5" v-show="isShow115">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="linesecond5">
              <div class="IDfirst5">
                <p id="first5">营业执照</p>
                <div class="show5">
                  <div class="picture5" @click="showBig12">
                    <img :src="headerImage125" alt />
                    <input
                      type="file"
                      id="upload125"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload125"></label>
                  </div>
                  <div class="pic5" v-show="isShow125">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="business5">营业执照注册号</p>
                <input type="text" class="IDnumber5" v-model="businumber5" readonly="true" disabled />
                <p id="business5">营业执照有效期</p>
                <input name id="form_select25" v-model="selectDate" readonly />
              </div>
              <div class="IDfirst5">
                <p id="second5">税务登记证（国税）</p>
                <div class="show5">
                  <div class="picture5" @click="showBig13">
                    <img :src="headerImage135" alt />
                    <input
                      type="file"
                      id="upload135"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload135"></label>
                  </div>
                  <div class="pic5" v-show="isShow135">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="tax5">税务证号</p>
                <input type="text" class="IDnumber5" v-model="taxNumber5" readonly="true" disabled />
                <div id="forever">
                  <label class="test">
                    <input type="checkbox" class="check" :checked="boxcheck33" disabled /> 永久有效
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="Self-noemployed person5" v-show="nopersonality5">
            <div class="linefirst5">
              <div class="IDfirst5">
                <p>身份证头像面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig14">
                    <img :src="headerImage145" alt />
                    <input
                      type="file"
                      id="upload145"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload145"></label>
                  </div>
                  <div class="pic5" v-show="isShow145">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="CID5">身份证号码</p>
                <input type="text" class="CIDnumber5" v-model="CIDnumber5" disabled />
              </div>
              <div class="IDfirst5">
                <p>身份证国徽面</p>
                <div class="show5">
                  <div class="picture5" @click="showBig15">
                    <img :src="headerImage155" alt />
                    <input
                      type="file"
                      id="upload155"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload155"></label>
                  </div>
                  <div class="pic5" v-show="isShow155">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="linesecond5">
              <div class="IDfirst5">
                <p id="first5">营业执照</p>
                <div class="show5">
                  <div class="picture5" @click="showBig16">
                    <img :src="headerImage165" alt />
                    <input
                      type="file"
                      id="upload165"
                      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                      disabled
                    />
                    <label for="upload165"></label>
                  </div>
                  <div class="pic5" v-show="isShow165">
                    <div class="add5"></div>
                    <p>尚未上传</p>
                  </div>
                </div>
                <p id="business5">营业执照注册号</p>
                <input
                  type="text5"
                  class="IDnumber5"
                  v-model="businumber5"
                  readonly="true"
                  disabled
                />
                <p id="business5">营业执照有效期</p>
                <input name id="form_select25" v-model="selectDate" readonly />
              </div>
              <div id="forever2">
                <label class="test">
                  <input type="checkbox" class="check" :checked="boxcheck44" disabled />永久有效
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="tips">
          <span>
            *灰色底框内容只供客户核对，不允许修改。如要修改提供
            <br />纸质证明，并提交订单业务部修改ERP。
          </span>
        </div>
        <div class="nthing"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="save2">
        <div class="build" @click="build" ref="build">通过资料卡</div>
      </div>
      <div class="save1" @click="backcard">
        <div class="backcard" ref="backcard">退回资料卡</div>
      </div>
      <div class="foldwrap" v-show="show"></div>
      <div class="foldbox" v-show="show">
        <div class="box-top">
          <div class="warnimg"></div>
          <div class="warnmsg">
            <p>是否确定客户资料卡信息</p>
            <p>完整且无误？</p>
            <p>点击确定将通过对应客户</p>
            <p>资料卡。</p>
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
          <div class="warnimg" id="warnimg2"></div>
          <div class="warnmsg" id="warnmsg2">
            <p>是否确定退回客户资料卡</p>
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
    </div>
  </div>
</template>

<script>
var remoteImageURL = "http://14.29.221.109:10250/upload";
import top from "./Top";
import Review from "@/components/review";
export default {
  data() {
    return {
      checkProxy: 0,
      set: 3,
      isShow: false,
      district: "",
      goTo: false,
      show: false,
      show2: false,
      show3: false,
      state: "",
      reason: "",
      cardstate: "", //资料卡的当前状态
      position: "", //position转化为中文
      reviseflag: false, //判断按钮是否能操作
      messages: " ",
      customerInfo: " ",
      cusName: "",
      phone: " ",
      boxcheck1: false,
      boxcheck2: false,
      showEmail: false, //1
      IsPonitOut: false,
      goTo: false,
      nowbrand: "",
      square: "",
      manager: " ",
      radiocheck101: false,
      radiocheck22: false,
      radiocheck33: false,
      radiocheck404: false,
      radiocheck5: false,
      radiocheck6: false,
      preferedbrand: "",
      tax: " ",
      reEmail: "", //1
      person2: "",
      phone2: " ",
      tel2: " ",
      fax2: " ",
      qq2: " ",
      email2: " ",
      address2: " ",
      zip2: " ", //2
      person3: " ",
      tel3: " ",
      phone3: " ",
      faxwl3: " ",
      address3: " ",
      zipwl3: " ", //3
      msg4: "公司汇款账号信息",
      isShow4: false,
      b4: false,
      c4: false,
      person14: " ",
      person24: " ",
      bank14: " ",
      bank24: " ", //4
      number14: " ",
      number24: " ",
      acc14: true,
      acc24: false,
      radiocheck14: false,
      radiocheck24: false,
      radiocheck34: false,
      radiocheck44: false,
      radiocheck54: false,
      no4: "",
      location4: " ",
      bank1Location4: "",
      bank2Location4: "", //4
      headerImage15: "",
      headerImage25: "",
      headerImage35: "",
      headerImage45: "",
      headerImage55: "",
      headerImage65: "",
      headerImage75: "",
      headerImage85: "",
      headerImage95: "",
      headerImage105: "",
      headerImage115: "",
      headerImage125: "",
      headerImage135: "",
      headerImage145: "",
      headerImage155: "",
      headerImage165: "", //5
      boxcheck11: false,
      boxcheck22: false,
      boxcheck33: false,
      boxcheck44: false,
      picValue15: "",
      picValue25: "",
      picValue35: "",
      picValue45: "",
      picValue55: "",
      picValue65: "",
      picValue75: "",
      picValue85: "",
      picValue95: "",
      picValue105: "",
      picValue115: "",
      picValue125: "",
      picValue135: "",
      picValue145: "",
      picValue155: "",
      picValue165: "",
      isShow15: true,
      isShow25: true,
      isShow35: true,
      isShow45: true,
      isShow55: true,
      isShow65: true,
      isShow75: true,
      isShow85: true,
      isShow95: true,
      isShow105: true,
      isShow115: true,
      isShow125: true,
      isShow135: true,
      isShow145: true,
      isShow155: true,
      isShow165: true,
      nojoin5: true,
      join5: false,
      single5: false,
      nopersonality5: false,
      personality5: false,
      more5: false,
      sss: "",
      businumber5: " ",
      CIDnumber5: " ",
      taxNumber5: " ",
      Idcard15: "",
      authFileImage15: " ",
      authFileImage25: " ",
      authFileImage35: " ",
      authFileImage45: " ",
      imageUrl15: " ",
      imageUrl25: " ",
      imageUrl35: " ",
      imageUrl45: " ",
      FileImage15: " ",
      FileImage25: " ",
      FileImage35: " ",
      FileImage45: " ",
      FileImage55: " ",
      FileImage65: " ",
      FileImage75: " ",
      FileImage85: " ",
      FileImage95: " ",
      FileImage105: " ",
      FileImage115: " ",
      FileImage125: " ",
      FileImage135: " ",
      FileImage145: " ",
      FileImage155: " ",
      FileImage165: " ",
      selectDate: "",
      bigPic1: false,
      bigPic2: false,
      bigPic3: false,
      bigPic4: false,
      bigPic5: false,
      bigPic6: false,
      bigPic7: false,
      bigPic8: false,
      bigPic9: false,
      bigPic10: false,
      bigPic11: false,
      bigPic12: false,
      bigPic13: false,
      bigPic14: false,
      bigPic15: false,
      bigPic16: false,
      contractyear: this.$store.state.year
    };
  },
  components: {
    "top-show": top,
    "reviews-show": Review
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
    sure() {
      let th = this;
      // if(this.$store.state.position == 'SALEMAN_M' || this.$store.state.position == 'SALEMAN_M')
      switch (this.$store.state.position) {
        case "SALEMAN_M":
        case "SALEMAN_S":
          this.state = "BIILDEPCHECKING";
          break; //业务员
        case "BILLDEP_APPROVE":
          this.state = "APPROVED";
          break; //订单部审核
        default:
          break;
      }
      let nowTime = this.initTime(new Date());
      this.show3 = false;
      this.show3 = false;
      this.$http
        .post("/infoState/bussinessCheckCustomerInfoCard.do", {
          //客户代码S
          cid: this.$store.state.CID,
          //操作后资料卡状态
          state: this.state,
          //审核记录
          memo:
            nowTime +
            this.position +
            this.$store.state.info.data.realName +
            "通过资料卡;"
        })
        .then(function(res) {
          console.log(th.state);
          th.show = false;
          th.$router.push({
            path: "/success6"
          });
        });
    },
    cancel() {
      this.show = false;
    },
    build() {
      this.show = this.reviseflag ? true : false;
    },
    backcard() {
      console.log(this.show2);
      this.show2 = this.reviseflag ? true : false;
    },
    sure2() {
      this.show2 = false;
      this.show3 = true;
    },
    checkTax() {
      this.$router.push({
        path: "/cardquery/checktax"
      });
    },
    showBig1() {
      if (this.headerImage15 == null || this.headerImage15 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic1 = true;
      }
    },
    showBig2() {
      if (this.headerImage25 == null || this.headerImage25 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic2 = true;
      }
    },
    showBig3() {
      if (this.headerImage35 == null || this.headerImage35 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic3 = true;
      }
    },
    showBig4() {
      if (this.headerImage45 == null || this.headerImage45 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic4 = true;
      }
    },
    showBig5() {
      if (this.headerImage55 == null || this.headerImage55 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic5 = true;
      }
    },
    showBig6() {
      if (this.headerImage65 == null || this.headerImage65 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic6 = true;
      }
    },
    showBig7() {
      if (this.headerImage75 == null || this.headerImage75 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic7 = true;
      }
    },
    showBig8() {
      if (this.headerImage85 == null || this.headerImage85 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic8 = true;
      }
    },
    showBig9() {
      if (this.headerImage95 == null || this.headerImage95 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic9 = true;
      }
    },
    showBig10() {
      if (this.headerImage105 == null || this.headerImage105 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic10 = true;
      }
    },
    showBig11() {
      if (this.headerImage115 == null || this.headerImage115 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic11 = true;
      }
    },
    showBig12() {
      if (this.headerImage125 == null || this.headerImage125 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic12 = true;
      }
    },
    showBig13() {
      if (this.headerImage135 == null || this.headerImage135 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic13 = true;
      }
    },
    showBig14() {
      if (this.headerImage145 == null || this.headerImage145 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic14 = true;
      }
    },
    showBig15() {
      if (this.headerImage155 == null || this.headerImage155 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic15 = true;
      }
    },
    showBig16() {
      if (this.headerImage165 == null || this.headerImage165 == "") {
        alert("客户尚未上传照片");
      } else {
        this.bigPic16 = true;
      }
    },
    outPic1() {
      this.bigPic1 = false;
    },
    outPic2() {
      this.bigPic2 = false;
    },
    outPic3() {
      this.bigPic3 = false;
    },
    outPic4() {
      this.bigPic4 = false;
    },
    outPic5() {
      this.bigPic5 = false;
    },
    outPic6() {
      this.bigPic6 = false;
    },
    outPic7() {
      this.bigPic7 = false;
    },
    outPic8() {
      this.bigPic8 = false;
    },
    outPic9() {
      this.bigPic9 = false;
    },
    outPic10() {
      this.bigPic10 = false;
    },
    outPic11() {
      this.bigPic11 = false;
    },
    outPic12() {
      this.bigPic12 = false;
    },
    outPic13() {
      this.bigPic13 = false;
    },
    outPic14() {
      this.bigPic14 = false;
    },
    outPic15() {
      this.bigPic15 = false;
    },
    outPic16() {
      this.bigPic16 = false;
    },
    cancel2() {
      this.show2 = false;
    },
    sure3() {
      let th = this;
      let nowTime = this.initTime(new Date());
      if (!this.reason) {
        alert("请填写退回原因!");
      } else {
        this.show3 = false;
        this.$http
          .post("/infoState/bussinessCheckCustomerInfoCard.do", {
            //客户代码S
            cid: this.$store.state.CID,
            //操作后资料卡状态
            state: "CUSTOMERPORCESSING2",
            //审核记录
            memo:
              nowTime +
              this.position +
              this.$store.state.info.data.realName +
              "退回资料卡 [" +
              this.reason +
              "];"
          })
          .then(function(res) {
            th.$router.push({
              path: "/success6"
            });
          });
      }
    },
    cancel3() {
      this.show3 = false;
    },
    showIt: function() {
      this.isShow = true;
    },
    setChange: function(data) {
      this.isShow = data;
    },
    lookProxy: function() {
      if (this.checkProxy == 1) {
        this.radiocheck44 = true;
        this.radiocheck54 = false;
        this.b4 = true;
      } else if (this.checkProxy == 0) {
        this.radiocheck54 = true;
        this.radiocheck44 = false;
        this.b4 = false;
      }
    },
    change2: function() {
      this.msg4 = "个人汇款账号信息 ";
      this.isShow = false;
      this.c4 = true;
      this.acc24 = true;
      this.acc14 = false;
      this.radiocheck24 = true;
      this.radiocheck14 = false;
      this.radiocheck34 = false;
    },
    change1: function() {
      this.msg4 = "公司汇款账号信息 ";
      this.isShow4 = false;
      this.acc14 = true;
      this.acc24 = false;
      this.c4 = false;
      this.b4 = false;
      this.radiocheck14 = true;
      this.radiocheck24 = false;
      this.radiocheck34 = false;
    },
    change3: function() {
      this.msg4 = "个人汇款账号信息 ";
      this.isShow4 = false;
      this.c4 = false;
      this.b4 = false;
      this.acc24 = true;
      this.acc14 = false;
      this.radiocheck34 = true;
      this.radiocheck24 = false;
      this.radiocheck14 = false;
    },
    getdata1() {
      let url = "/infoState/getCustomerInfoCardState.do	";
      let data = {
        cid: this.CID,
        year: this.contractyear
      };

      this.$http.post(url, data).then(res => {
        console.log(res);
        if (res.data.memo != null) {
          var alldata = res.data;
          this.customerInfo = alldata.customerInfo;
          this.messages = alldata.memo.reverse();
        } else {
          console.log("无评审记录");
        }
      });
    },
    getdata2() {
      let th = this;
      let url = "/customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.CID
      };
      this.$http.post(url, data).then(res => {
        if (res.data.code == 0 || res.data.data != null) {
          console.log(res)
          th.cardstate = res.data.data.state;
          if (this.$store.state.position == "SALEMAN_M") {
            this.position = "中心总经理";
            if (this.cardstate == "BUSINESSCHECKING") {
              this.reviseflag = true;
            }
          } else if (this.$store.state.position == "SALEMAN_S") {
            this.position = "办事处经理";
            if (this.cardstate == "BUSINESSCHECKING") this.reviseflag = true;
          } else if (this.$store.state.position == "BILLDEP_APPROVE") {
            this.position = "订单部";
            if (this.cardstate == "BIILDEPCHECKING") this.reviseflag = true;
          }
          if (!this.reviseflag) {
            this.$refs.backcard.style.background = "#c2c2c2";
            this.$refs.build.style.background = "#c2c2c2";
          }
          var alldata = res.data.data;
          this.contractyear = alldata.contractyear;
          this.cusName = alldata.cname;
          this.district = alldata.districtText;
          this.phone = alldata.juridicPersonHandset;
          if (alldata.preferedbrand != null) {
            var newband = alldata.preferedbrand.split("");
            if (newband.indexOf("墙") > -1) {
              this.boxcheck1 = true;
            }
            if (newband.indexOf("软") > -1) {
              this.boxcheck2 = true;
            }
          }
          this.nowbrand = alldata.currentProduct;
          this.square = alldata.shopArea;
          this.manager = alldata.xJuridicPerson;
          var invoiceType = alldata.invoiceType;
          if (invoiceType == "不开发票") {
            this.radiocheck101 = true;
            this.radiocheck6 = true;
            this.radiocheck33 = false;
            this.radiocheck22 = false;
            this.radiocheck404 = false;
          }
          if (invoiceType == "增值税普通发票") {
            this.radiocheck22 = true;
            this.radiocheck6 = true;
            this.radiocheck33 = false;
            this.radiocheck101 = false;
            this.radiocheck404 = false;
          }
          if (invoiceType == "电子普通发票") {
            this.radiocheck33 = true;
            this.showEmail = true;
            this.radiocheck6 = true;
            this.radiocheck101 = false;
            this.radiocheck22 = false;
            this.radiocheck404 = false;
          }
          if (invoiceType == "增值税专用发票") {
            this.radiocheck404 = true;
            this.goTo = true;
            this.radiocheck5 = true;
            this.radiocheck33 = false;
            this.radiocheck22 = false;
            this.radiocheck101 = false;
          }
          this.reEmail = alldata.recipeTargetMb; //1
          this.person2 = alldata.txAgentName;
          this.phone2 = alldata.xHandset2;
          var tell2 = alldata.xOfficeTel;
          this.tel2 = tell2.split(" ")[0];
          this.fax2 = alldata.xFax;
          this.qq2 = alldata.qq;
          this.email2 = alldata.xEmail;
          this.address2 = alldata.xPostAddress;
          this.zip2 = alldata.xZipCode; //2
          this.person3 = alldata.wlAgentName;
          this.tel3 = alldata.xOfficeTel1.split(" ")[0];
          this.phone3 = alldata.xHandset;
          this.faxwl3 = alldata.faxWl;
          this.address3 = alldata.xDeliveryAdress;
          this.zipwl3 = alldata.zipCodeWl; //3
          this.person14 = alldata.account1Name;
          this.bank14 = alldata.account1Bank;
          this.bank1Location4 = alldata.account1Location;
          this.person24 = alldata.account2Name;
          this.bank24 = alldata.account2Bank;
          this.bank2Location4 = alldata.account2Location;
          this.number14 = alldata.account1;
          this.number24 = alldata.account2;
          this.no4 = alldata.hasPublicAccount;
          var difference = alldata.busientType;
          if (difference == "公司" && this.no4 == "N") {
            this.radiocheck2 = true;
            this.change2();
            this.lookProxy();
          }
          if (difference == "公司" && this.no4 == "Y") {
            this.radiocheck1 = true;
            this.change1();
          }
          if (difference == "个体户") {
            this.radiocheck3 = true;
            this.change3();
          }
          if (this.no4 == "Y") {
            this.location4 = this.bank1Location4;
          } else {
            this.location4 = this.bank2Location4;
          }
          this.spouse = alldata.privateAccountAuthed;
          if (this.spouse == "Y") {
            this.radiocheck44 = true;
            this.radiocheck54 = false;
          }
          if (this.spouse == "N") {
            this.radiocheck44 = false;
            this.radiocheck54 = true;
          } //4
          if (alldata.customerentitytypex == 1) {
            this.sss = "公司-三证五证合一";
          }
          if (alldata.customerentitytypex == 2) {
            this.sss = "公司-三证五证未合";
          }
          if (alldata.customerentitytypex == 3) {
            this.sss = "个体户-有税务登记证";
          }
          if (alldata.customerentitytypex == 4) {
            this.sss = "个体户-无税务登记证";
          }
          if (alldata.customerentitytypex == 5) {
            this.sss = "个人";
          }
          this.dateForever = alldata.file2BusinesslicenseNoend;
          this.selectDate = alldata.file2BusinesslicenseEnd;
          this.businumber5 = alldata.file2BusinesslicenseNo;
          this.CIDnumber5 = alldata.file1IdcardNo;
          this.taxNumber5 = alldata.file4GtqcNo;
          var customerIndex5 = alldata.customerentitytypex;
          this.FileImage15 = remoteImageURL + alldata.file1Idcard;
          this.FileImage25 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage35 = remoteImageURL + alldata.file2Businesslicense;
          this.FileImage45 = remoteImageURL + alldata.file4Gtqc;
          this.FileImage55 = remoteImageURL + alldata.file1Idcard;
          this.FileImage65 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage75 = remoteImageURL + alldata.file2Businesslicense;
          this.FileImage85 = remoteImageURL + alldata.file1Idcard;
          this.FileImage95 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage105 = remoteImageURL + alldata.file1Idcard;
          this.FileImage115 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage125 = remoteImageURL + alldata.file2Businesslicense;
          this.FileImage135 = remoteImageURL + alldata.file4Gtqc;
          this.FileImage145 = remoteImageURL + alldata.file1Idcard;
          this.FileImage155 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage165 = remoteImageURL + alldata.file2Businesslicense;
          if (customerIndex5 == 2) {
            if (this.dateForever == 0) {
              this.boxcheck11 = false;
            } else if (this.dateForever == 1) {
              this.boxcheck11 = true;
              this.selectDate = "";
            }
            if (alldata.file1Idcard != null) {
              this.isShow15 = false;
              this.headerImage15 = this.FileImage15;
            } else {
              this.isShow15 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow25 = false;
              this.headerImage25 = this.FileImage25;
            } else {
              this.isShow25 = true;
            }
            if (alldata.file2Businesslicense != null) {
              this.isShow35 = false;
              this.headerImage35 = this.FileImage35;
            } else {
              this.isShow35 = true;
            }
            if (alldata.file4Gtqc != null) {
              this.isShow45 = false;
              this.headerImage45 = this.FileImage45;
            } else {
              this.isShow45 = true;
            }
          }
          if (customerIndex5 == 1) {
            if (this.dateForever == 0) {
              this.boxcheck22 = false;
            } else if (this.dateForever == 1) {
              this.boxcheck22 = true;
              this.selectDate = "";
            }
            if (alldata.file1Idcard != null) {
              this.isShow55 = false;
              this.headerImage55 = this.FileImage55;
            } else {
              this.isShow55 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow65 = false;
              this.headerImage65 = this.FileImage65;
            } else {
              this.isShow65 = true;
            }
            if (alldata.file2Businesslicense != null) {
              this.isShow75 = false;
              this.headerImage75 = this.FileImage75;
            } else {
              this.isShow75 = true;
            }
          }
          if (customerIndex5 == 4) {
            if (this.dateForever == 0) {
              this.boxcheck44 = false;
            } else if (this.dateForever == 1) {
              this.boxcheck44 = true;
              this.selectDate = "";
            }
            if (alldata.file1Idcard != null) {
              this.isShow145 = false;
              this.headerImage145 = this.FileImage145;
            } else {
              this.isShow145 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow155 = false;
              this.headerImage155 = this.FileImage155;
            } else {
              this.isShow155 = true;
            }
            if (alldata.file2Businesslicense != null) {
              this.isShow165 = false;
              this.headerImage165 = this.FileImage165;
            } else {
              this.isShow165 = true;
            }
          }
          if (customerIndex5 == 5) {
            if (alldata.file1Idcard != null) {
              this.isShow85 = false;
              this.headerImage85 = this.FileImage85;
            } else {
              this.isShow85 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow95 = false;
              this.headerImage95 = this.FileImage95;
            } else {
              this.isShow95 = true;
            }
          }
          if (customerIndex5 == 3) {
            if (this.dateForever == 0) {
              this.boxcheck33 = false;
            } else if (this.dateForever == 1) {
              this.boxcheck33 = true;
              this.selectDate = "";
            }
            if (alldata.file1Idcard != null) {
              this.isShow105 = false;
              this.headerImage105 = this.FileImage105;
            } else {
              this.isShow105 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow115 = false;
              this.headerImage115 = this.FileImage115;
            } else {
              this.isShow115 = true;
            }
            if (alldata.file2Businesslicense != null) {
              this.isShow125 = false;
              this.headerImage125 = this.FileImage125;
            } else {
              this.isShow125 = true;
            }
            if (alldata.file4Gtqc != null) {
              this.isShow135 = false;
              this.headerImage135 = this.FileImage135;
            } else {
              this.isShow135 = true;
            }
          }

          let url1 = "/infoState/getCustomerInfoCardState.do";
          let data1 = {
            cid: this.CID,
            year: this.contractyear
          };

          this.$http.post(url1, data1).then(res1 => {
            if (res1.data.memo != null) {
              var alldata = res1.data;
              this.customerInfo = alldata.customerInfo;
              this.messages = alldata.memo.reverse();
            } else {
              console.log("无评审记录");
            }
          });

          let url2 = "/customerInfo/getYLcontract.do";
          let data2 = {
            ccid: this.CID,
            ccyear: this.contractyear
          };
          this.$http.post(url2, data2).then(res2 => {
            if (res2.data.code == 0 && res2.data.data != null) {
              this.checkProxy = 1;
            } else if (res2.data.code == 1 || res2.data.data == null) {
              console.log("不存在");
              this.checkProxy = 0;
            }
          });
        }
      });
    },
    getData3() {
      let url = "/customerInfo/getYLcontract.do";
      let data = {
        ccid: this.CID,
        ccyear: this.contractyear
      };
      this.$http.post(url, data).then(res => {
        console.log(res);
        if (res.data.code == 0 && res.data.data != null) {
          this.checkProxy = 1;
        } else if (res.data.code == 1 || res.data.data == null) {
          console.log("不存在");
          this.checkProxy = 0;
        }
      });
    }
  },
  computed: {
    CID() {
      if (this.$store.state.info.data.type != "ECWEB") {
        return this.$store.state.CCID;
      } else {
        return this.$store.state.info.data.loginName;
      }
    }
  },
  mounted() {
    this.getdata2();
  },

  watch: {
    sss() {
      if (this.sss == "公司-三证五证未合") {
        this.nojoin5 = true;
        this.join5 = false;
        this.single5 = false;
        this.personality5 = false;
        this.nopersonality5 = false;
      }
      if (this.sss == "公司-三证五证合一") {
        this.nojoin5 = false;
        this.join5 = true;
        this.single5 = false;
        this.personality5 = false;
        this.nopersonality5 = false;
      }
      if (this.sss == "个人") {
        this.nojoin5 = false;
        this.join5 = false;
        this.single5 = true;
        this.personality5 = false;
        this.nopersonality5 = false;
      }
      if (this.sss == "个体户-有税务登记证") {
        this.personality5 = true;
        this.nojoin5 = false;
        this.join5 = false;
        this.single5 = false;
        this.nopersonality5 = false;
      }
      if (this.sss == "个体户-无税务登记证") {
        this.nopersonality5 = true;
        this.personality5 = false;
        this.nojoin5 = false;
        this.join5 = false;
        this.single5 = false;
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.cardQuery {
  overflow-y: scroll;
}
.files {
  width: 100%;
  height: 70px;
  padding-top: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.files-word {
  width: 188px;
  margin-left: 24px;
  text-align: left;
}
.files-word h4 {
  color: #000000;
  font-size: 20px;
  font-family: PingFang HK;
  font-weight: normal;
}
.files-word p {
  color: #7d7d7d;
  font-size: 13px;
  font-family: PingFang HK;
}
.exam {
  display: flex;
  align-items: center;
  color: #89cb81;
  font-size: 15px;
  align-self: center;
  margin-bottom: 8px;
  margin-right: 13px;
}
.exam span {
  text-align: center;
  text-decoration: underline;
  margin-left: 6px;
}
.examShow {
  z-index: 99;
  width: 143px;
  height: 237px;
  background: white;
  /* background: pink; */
  position: absolute;
  right: 11px;
  top: 115px;
  border-radius: 7px;
  border: 1px solid #d9d9d9;
}
#record {
  width: 12px;
  height: 12px;
  background: url("../assets/triangle_down_fill.png");
  background-size: 100% 100%;
}
.content {
  width: 100%;
  background: white;
}
.content-all {
  width: 318px;
  background: white;
  margin: 5px 19.1px 1px 37.9px;
}
.content-all p {
  font-size: 15px;
  color: #000000;
}
.topBox {
  width: 100%;
  height: 20px;
}
.topBox p {
  text-align: left;
}
.topBox input {
  margin-left: 8px;
}
.topBox input {
  height: 21px;
  width: 140px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding-left: 10px;
}
.newbox {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 12px;
}
.box {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 12px;
}
.box input {
  height: 19px;
  width: 138px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
.nbox {
  width: 100%;
  height: 60px;
  text-align: left;
  margin-top: 12px;
}
#people {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 9px;
}
#manager {
  margin-top: 9px;
}
.no {
  margin-left: 24px;
}
.nbox label {
  font-size: 13px;
}
#newbrand {
  width: 100%;
  height: 40px;
}
#newbrand p {
  text-align: left;
}
.test1 {
  vertical-align: middle;
  display: inline-block;
  font-size: 13px;
}
.check[type="checkbox"] {
  width: 11px;
  height: 11px;
  -webkit-appearance: none;
  border: 1px solid black;
  border-radius: 2px;
  outline: none;
  vertical-align: top;
  margin-top: 4px;
  margin-right: 5px;
}
.check[type="checkbox"]:checked {
  background: url("../assets/check1.png")
    no-repeat center;
}
.invoice {
  margin: 5px;
}
#tax1 {
  display: none;
}
#tax2 {
  display: none;
}
#tax3 {
  display: none;
}
#tax4 {
  display: none;
}
#num2 {
  margin-left: 1px;
}
#num4 {
  margin-left: 102px;
}
.advice {
  height: 12px;
  width: 12px;
  display: inline-block;
  background: url("../assets/select1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  margin-top: -4px;
}
input[type="radio"]:checked + .advice {
  background-image: url("../assets/select3.png");
}
.intype {
  height: 12px;
  width: 12px;
  display: inline-block;
  background: url("../assets/select1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  margin-top: -4px;
}
input[type="radio"]:checked + .intype {
  background-image: url("../assets/select3.png");
}
#second {
  margin-left: 79px;
  font-size: 13px;
  text-align: center;
  margin-top: 4px;
}
#insecond {
  font-size: 13px;
  text-align: center;
  margin-top: 4px;
  margin-left: 98px;
}
#inthird {
  margin-top: 4px;
}
#inthird span {
  font-size: 13px;
  text-align: center;
}
#yes #no {
  font-size: 13px;
}
#no {
  margin-left: 20px;
}
#nowbrand input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 19px;
  width: 118px;
}
#square input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 19px;
  width: 80px;
}
#cellphone {
  margin-top: 9px;
}
#cellphone input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 19px;
  width: 118px;
}
#email input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
  height: 19px;
  width: 118px;
}
#togo {
  color: #89cb81;
  text-decoration: underline;
  text-decoration-color: #89cb81;
} /* 11111111 */
.content2 {
  width: 100%;
  background: white;
  margin-top: 20px;
}
.content2 h4 {
  font-size: 20px;
  color: #000000;
  text-align: left;
  font-weight: normal;
  margin-bottom: 10px;
  margin-left: 26px;
}
.content-all2 {
  width: 318px;
  margin: 0px 19.1px 1px 37.9px;
}
.content-all2 p {
  font-size: 15px;
  color: #000000;
}
.topBox2 {
  width: 100%;
  height: 20px;
  text-align: left;
}
.topBox2 input {
  height: 21px;
  width: 140px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
.topBox2 p {
  margin-left: 15px;
}
.box2 {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 18px;
}
.box2 input {
  height: 19px;
  width: 138px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
#phone2 p {
  margin-left: 30px;
}
#fax2 p {
  margin-left: 30px;
}
#fax2 input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#qq2 p {
  margin-left: 43px;
}
#qq2 input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#e-mail2 p {
  margin-left: 18px;
}
#e-mail2 input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#phone2 input {
  height: 21px;
  width: 140px;
}
#address2 input {
  height: 21px;
  width: 140px;
} /*222222222*/
.content3 {
  width: 100%;
  background: white;
  margin-top: 15px;
}
.content3 h4 {
  font-size: 20px;
  color: #000000;
  text-align: left;
  font-weight: normal;
  margin-bottom: 10px;
  margin-left: 26px;
}
.content-all3 {
  width: 318px;
  margin: 5px 19.1px 5px 37.9px;
}
.content-all3 p {
  font-size: 15px;
  color: #000000;
}
.topBox3 {
  width: 100%;
  height: 20px;
  text-align: left;
}
.topBox3 input {
  height: 21px;
  width: 140px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
.topBox3 p {
  margin-left: 15px;
}
.box3 {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 18px;
}
.box3 input {
  height: 19px;
  width: 138px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
#phone3 p {
  margin-left: 30px;
}
#fax3 p {
  margin-left: 30px;
}
#fax3 input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#qq3 p {
  margin-left: 43px;
}
#qq3 input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#e-mail3 p {
  margin-left: 18px;
}
#e-mail3 input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#phone3 input {
  height: 21px;
  width: 140px;
}
#phone13 input {
  height: 21px;
  width: 140px;
}
#readdress3 input {
  height: 21px;
  width: 140px;
} /*3333333333*/
.content4 {
  width: 100%;
  background: white;
  margin-top: 15px;
}
.content4 h4 {
  font-size: 20px;
  color: #000000;
  text-align: left;
  font-weight: normal;
  margin-bottom: 10px;
  margin-left: 26px;
}
.content-all4 {
  width: 318px;
  margin: 5px 19.1px 5px 37.9px;
}
.content-all4 p {
  font-size: 15px;
  color: #000000;
}
.nbox4 {
  text-align: left;
}
.nbox4 label {
  font-size: 13px;
}
.saleWay4 {
  margin: 5px;
}
.way4 {
  height: 12px;
  width: 12px;
  display: inline-block;
  background: url("../assets/select1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  vertical-align: middle;
  margin-top: -4px;
}
input[type="radio"]:checked + .way4 {
  background-image: url("../assets/select3.png");
}
#insecond4 {
  font-size: 13px;
  text-align: center;
  margin-top: 4px;
}
#third4 {
  margin-top: 4px;
}
#third4 span {
  font-size: 13px;
  text-align: left;
  margin-left: 100px;
  color: #7d7d7d;
}
#thirdc4 {
  line-height: 12px;
}
#thirdc4 span {
  font-size: 13px;
  text-align: left;
  margin-left: 100px;
  color: #7d7d7d;
}
#forth4 {
  height: 18px;
  margin-left: 85px;
  margin-top: 10px;
}
#fifth4 a {
  font-size: 10px;
  color: #89cb81;
  text-decoration: none;
}
#download4 {
  border-bottom: 1px solid #89cb81;
  /* padding-bottom: 0.5px; */
  margin-left: 88px;
}
#togo4 {
  color: #89cb81;
  font-size: 10px;
  margin-left: 105px;
  border-bottom: 1px solid #89cb81;
}
#inthird4 {
  margin-top: 4px;
  margin-left: 79px;
}
#inthird4 span {
  font-size: 13px;
  text-align: center;
}
.ctbox4 {
  text-align: left;
  margin-top: 10px;
}
.box4 {
  text-align: left;
  margin-top: 9px;
}
.box4 input {
  height: 19px;
  width: 138px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
  font-size: 13px;
  color: #7d7d7d;
  border: 0px;
  border-radius: 5px;
  margin-top: 1px;
  padding: 0 8px;
}
#person4 p {
  margin-left: 30px;
}
#bank4 p {
  margin-left: 15px;
}
#bank4 input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#number4 p {
  margin-left: 45px;
}
#number4 input {
  background: #ffffff;
  border: 1px solid #7d7d7d;
}
#person4 input {
  height: 21px;
  width: 140px;
}
#form_select {
  background: #ffffff;
  /* 清除默认边框 */
  font-size: 11px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  padding-left: 11px;
  padding-right: 11px;
  width: 127px;
  font-size: 13px;
  color: #7d7d7d;
  /* 清除默认的箭头样式 */
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
} /*4444444*/
.content5 {
  width: 100%;
  background: white;
  margin-top: 15px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.36);
}
.content5 h4 {
  font-size: 20px;
  color: #000000;
  text-align: left;
  font-weight: normal;
  margin-bottom: 10px;
  margin-left: 26px;
}
.content-all5 {
  width: 300px;
  margin: 5px 19.1px 5px 37.9px;
}
.account5 {
  font-size: 15px;
  color: #000000;
}
.form_select5 {
  width: 134px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
  background: white;
}
#form_select25 {
  /* 清除默认边框 */
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  padding-left: 11px;
  padding-right: 11px;
  width: 120px;
  font-size: 13px;
  color: #7d7d7d;
  /* 清除默认的箭头样式 */
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /* 右侧添加小箭头的背景图 */
  background: url("../assets/select_arrow.png") 132px center no-repeat;
  background-size: 6px 6px;
}
.linefirst5 {
  display: flex;
  justify-content: space-between;
}
.IDfirst5 > p {
  text-align: left;
  color: #000000;
  font-size: 13px;
  margin-left: 41px;
  margin-top: 18px;
  margin-bottom: 7px;
}
.show5 {
  width: 140px;
  height: 70px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  /* border: 1px solid #d5d5d5; */
  background: #b1b1b1;
  margin-left: 6px;
}
.show5 input {
  display: none;
}
input[type="file"] + label {
  display: block;
  width: 100%;
  height: 100%;
  /* background: url("http://14.29.221.109:10250/upload/assets/add.png");
  background-size: 100% 100%; */
}
.show5 p {
  font-size: 10px;
  color: #ffffff;
}
.pic5 {
  position: absolute;
  top: 15px;
  left: 40px;
  right: 40px;
  pointer-events: none;
}
.add5 {
  background: url("../assets/add.png");
  background-size: 100% 100%;
  width: 28px;
  height: 28px;
  margin: 0 auto;
}
.picture5 {
  /* width: 100%;
  height: 100%; */
  overflow: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.picture5 img {
  width: 140px;
  height: 70px;
}
.bigPic {
  width: 80%;
  height: 60%;
  left: 40px;
  right: 0;
  top: 1300px;
  bottom: 45px;
  position: absolute;
  background-size: 100% 100%;
  z-index: 100;
}
.bigPic img {
  width: 80%;
  height: 80%;
}
.shadow {
  position: absolute;
  z-index: 50;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  left: 0;
  right: 0;
  top: 1208px;
  bottom: 50px;
  background-color: #3b3b3b;
}
.picButton {
  width: 100%;
  position: absolute;
  z-index: 100;
  top: 1720px;
  left: 0;
  right: 0;
}
.toSmall button {
  box-sizing: border-box;
  width: 163px;
  height: 33px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: #4b4b4b;
  margin: 8px auto 11px 4px;
}
#CID5 {
  font-size: 10px;
  margin-top: 3px;
  margin-left: 50px;
  margin-bottom: 2px;
}
.CIDnumber5 {
  display: block;
  width: 134px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
  background: white;
}
.IDnumber5 {
  display: block;
  width: 136px;
  border-radius: 5px;
  border: none;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
}
.linesecond5 {
  display: flex;
  justify-content: space-between;
  /* margin-top: 3px; */
}
#first5 {
  margin-left: 53px;
}
#business5 {
  font-size: 10px;
  margin-top: 3px;
  margin-left: 45px;
  margin-bottom: 2px;
}
#tax5 {
  font-size: 10px;
  margin-top: 3px;
  margin-left: 57px;
  margin-bottom: 2px;
}
#second5 {
  margin-left: 20px;
}
#sin5 {
  flex-direction: column;
  margin-left: 80px;
}
.tips {
  text-align: center;
  /* margin-left: 58px; */
  margin-top: 30px;
  /* margin-bottom: 40px; */
  font-size: 10px;
  line-height: 15px;
  color: #b5b5b5;
}
.nthing {
  width: 100%;
  height: 30px;
  margin-bottom: 6px;
}
.bottom {
  height: 76px;
  width: 100%;
  background: #efefef;
}
.backcard {
  box-sizing: border-box;
  width: 163px;
  height: 52px;
  line-height: 52px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: #4b4b4b;
  float: left;
  margin: 13px auto 11px 15px;
}
.build {
  box-sizing: border-box;
  width: 163px;
  height: 52px;
  line-height: 52px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  float: left;
  margin: 13px auto 11px 20px;
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
  background: url(../assets/close.png);
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
  overflow: scroll;
  border: 1px solid #b1b1b1;
  padding: 5px;
}
.reason::placeholder {
  font-size: 13px;
  color: #b1b1b1;
  padding-left: 8px;
}
#forever {
  margin-top: 25px;
}
#forever2 {
  margin-top: 180px;
}
.test {
  display: inline-block;
  font-size: 13px;
  font-weight: bold;
  margin-right: 60px;
}
.check[type="checkbox"] {
  width: 15px;
  height: 15px;
  -webkit-appearance: none;
  border: 1px solid black;
  border-radius: 2px;
  outline: none;
  vertical-align: top;
  margin-top: 2px;
  margin-right: 5px;
}
.check[type="checkbox"]:checked {
  background: url("../assets/check2.png") no-repeat center;
}
</style>