<template>
  <div class="card5">
    <div class="content">
      <div class="content-all">
        <div class="account">
          <p>
            <span style="color:red">*</span>您的账号实体类型：
            <input
              type="text"
              v-model="sss"
              readonly="true"
              class="form_select"
              @click="showThem"
            />
          </p>
        </div>
        <div class="nojoin" v-show="nojoin">
          <div class="bigPic" v-show="bigPic1">
            <img :src="headerImage1" alt />
          </div>
          <div class="bigPic" v-show="bigPic2">
            <img :src="headerImage2" alt />
          </div>
          <div class="bigPic" v-show="bigPic3">
            <img :src="headerImage3" alt />
          </div>
          <div class="bigPic" v-show="bigPic4">
            <img :src="headerImage4" alt />
          </div>
          <div class="shadow" v-show="bigPic1"></div>
          <div class="shadow" v-show="bigPic2"></div>
          <div class="shadow" v-show="bigPic3"></div>
          <div class="shadow" v-show="bigPic4"></div>
          <div class="bottom" v-show="bigPic1">
            <div class="save1" @click="outPic1">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过' && status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload1"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload1"
                />
                <label for="upload1">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic2">
            <div class="save1" @click="outPic2">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过' && status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload2"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload2"
                />
                <label for="upload2">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic3">
            <div class="save1" @click="outPic3">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload3"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload3"
                />
                <label for="upload3">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic4">
            <div class="save1" @click="outPic4">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过' && status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload4"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload4"
                />
                <label for="upload4">更换图片</label>
              </button>
            </div>
          </div>
          <div class="linefirst">
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证头像面
              </p>
              <div class="showPic" @click="showBig1">
                <!-- <div class="picture" @click="showBig1"> -->
                <img :src="headerImage1" alt />
                <input
                  type="file"
                  id="upload1"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload1"
                />
                <label for="upload1" v-show="isShow1"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow1">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="CID">
                <span style="color:red">*</span>身份证号码
              </p>
              <input type="text" class="CIDnumber" v-model="CIDnumber" @keyup="input1" />
            </div>
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证国徽面
              </p>
              <div class="showPic" @click="showBig2">
                <!-- <div class="picture" @click="showBig2"> -->
                <img :src="headerImage2" alt />
                <input
                  type="file"
                  id="upload2"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload2"
                />
                <label for="upload2" v-show="isShow2"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow2">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
            </div>
          </div>
          <div class="linesecond">
            <div class="IDfirst">
              <p id="first">
                <span style="color:red">*</span>营业执照
              </p>
              <div class="showPic" @click="showBig3">
                <!-- <div class="picture" @click="showBig3"> -->
                <img :src="headerImage3" alt />
                <input
                  type="file"
                  id="upload3"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload3"
                />
                <label for="upload3" v-show="isShow3"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow3">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="business">
                <span style="color:red">*</span>营业执照注册号
              </p>
              <input type="text" class="IDnumber" v-model="businumber" @keyup="input6" />
              <p id="business">
                <span style="color:red">*</span>营业执照有效期
              </p>
              <input
                name
                id="form_select2"
                @click="calShow"
                v-model="selectDate"
                readonly
                ref="time1"
              />
            </div>
            <div class="IDfirst">
              <p id="second">
                <span style="color:red">*</span>税务登记证（国税）
              </p>
              <div class="showPic" @click="showBig4">
                <!-- <div class="picture" @click="showBig4"> -->
                <img :src="headerImage4" alt />
                <input
                  type="file"
                  id="upload4"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload4"
                />
                <label for="upload4" v-show="isShow4"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow4">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="tax">
                <span style="color:red">*</span>税务证号
              </p>
              <input type="text" class="IDnumber" v-model="taxNumber" @keyup="input44" />
              <div id="forever">
                <label class="test">
                  <input type="checkbox" class="check" :checked="boxcheck1" @click="changeCheck1" /> 长期有效
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="join" v-show="join">
          <div class="bigPic" v-show="bigPic5">
            <img :src="headerImage5" alt />
          </div>
          <div class="bigPic" v-show="bigPic6">
            <img :src="headerImage6" alt />
          </div>
          <div class="bigPic" v-show="bigPic7">
            <img :src="headerImage7" alt />
          </div>
          <div class="shadow" v-show="bigPic5"></div>
          <div class="shadow" v-show="bigPic6"></div>
          <div class="shadow" v-show="bigPic7"></div>
          <div class="bottom" v-show="bigPic5">
            <div class="save1" @click="outPic5">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload5"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload5"
                />
                <label for="upload5">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic6">
            <div class="save1" @click="outPic6">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload6"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload6"
                />
                <label for="upload6">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic7">
            <div class="save1" @click="outPic7">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload7"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload7"
                />
                <label for="upload7">更换图片</label>
              </button>
            </div>
          </div>
          <div class="linefirst">
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证头像面
              </p>
              <div class="showPic" @click="showBig5">
                <!-- <div class="picture" @click="showBig5"> -->
                <img :src="headerImage5" alt />
                <input
                  type="file"
                  id="upload5"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload5"
                />
                <label for="upload5" v-show="isShow5"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow5">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="CID">
                <span style="color:red">*</span>身份证号码
              </p>
              <input type="text" class="CIDnumber" v-model="CIDnumber" @keyup="input2" />
            </div>
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证国徽面
              </p>
              <div class="showPic" @click="showBig6">
                <!-- <div class="picture" @click="showBig6"> -->
                <img :src="headerImage6" alt />
                <input
                  type="file"
                  id="upload6"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload6"
                />
                <label for="upload6" v-show="isShow6"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow6">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
            </div>
          </div>
          <div class="linesecond">
            <div class="IDfirst">
              <p id="first">
                <span style="color:red">*</span>营业执照
              </p>
              <div class="showPic" @click="showBig7">
                <!-- <div class="picture" @click="showBig7"> -->
                <img :src="headerImage7" alt />
                <input
                  type="file"
                  id="upload7"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload7"
                />
                <label for="upload7" v-show="isShow7"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow7">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="business">
                <span style="color:red">*</span>营业执照注册号
              </p>
              <input type="text" class="IDnumber" v-model="businumber" @keyup="input7" />
              <p id="business">
                <span style="color:red">*</span>营业执照有效期
              </p>
              <input
                name
                id="form_select2"
                @click="calShow"
                v-model="selectDate"
                readonly
                ref="time2"
              />
            </div>
            <div id="forever2">
              <label class="test">
                <input type="checkbox" class="check" :checked="boxcheck2" @click="changeCheck2" /> 长期有效
              </label>
            </div>
          </div>
        </div>
        <div class="single" v-show="single">
          <div class="bigPic" v-show="bigPic8">
            <img :src="headerImage8" alt />
          </div>
          <div class="bigPic" v-show="bigPic9">
            <img :src="headerImage9" alt />
          </div>
          <div class="shadow" v-show="bigPic8"></div>
          <div class="shadow" v-show="bigPic9"></div>
          <div class="bottom" v-show="bigPic8">
            <div class="save1" @click="outPic8">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload8"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload8"
                />
                <label for="upload8">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic9">
            <div class="save1" @click="outPic9">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload9"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload9"
                />
                <label for="upload9">更换图片</label>
              </button>
            </div>
          </div>
          <div class="linefirst" id="sin">
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证头像面
              </p>
              <div class="showPic" @click="showBig8">
                <!-- <div class="picture" @click="showBig8"> -->
                <img :src="headerImage8" alt />
                <input
                  type="file"
                  id="upload8"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload8"
                />
                <label for="upload8" v-show="isShow8"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow8">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="CID">
                <span style="color:red">*</span>身份证号码
              </p>
              <input type="text" class="CIDnumber" v-model="CIDnumber" @keyup="input3" />
            </div>
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证国徽面
              </p>
              <div class="showPic" @click="showBig9">
                <!-- <div class="picture" @click="showBig9"> -->
                <img :src="headerImage9" alt />
                <input
                  type="file"
                  id="upload9"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload9"
                />
                <label for="upload9" v-show="isShow9"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow9">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Self-employed person" v-show="personality">
          <div class="bigPic" v-show="bigPic10">
            <img :src="headerImage10" alt />
          </div>
          <div class="bigPic" v-show="bigPic11">
            <img :src="headerImage11" alt />
          </div>
          <div class="bigPic" v-show="bigPic12">
            <img :src="headerImage12" alt />
          </div>
          <div class="bigPic" v-show="bigPic13">
            <img :src="headerImage13" alt />
          </div>
          <div class="shadow" v-show="bigPic10"></div>
          <div class="shadow" v-show="bigPic11"></div>
          <div class="shadow" v-show="bigPic12"></div>
          <div class="shadow" v-show="bigPic13"></div>
          <div class="bottom" v-show="bigPic10">
            <div class="save1" @click="outPic10">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload10"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload10"
                />
                <label for="upload10">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic11">
            <div class="save1" @click="outPic11">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload11"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload11"
                />
                <label for="upload11">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic12">
            <div class="save1" @click="outPic12">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload12"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload12"
                />
                <label for="upload12">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic13">
            <div class="save1" @click="outPic13">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload13"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload13"
                />
                <label for="upload13">更换图片</label>
              </button>
            </div>
          </div>
          <div class="linefirst">
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证头像面
              </p>
              <div class="showPic" @click="showBig10">
                <!-- <div class="picture" @click="showBig10"> -->
                <img :src="headerImage10" alt />
                <input
                  type="file"
                  id="upload10"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload10"
                />
                <label for="upload10" v-show="isShow10"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow10">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="CID">
                <span style="color:red">*</span>身份证号码
              </p>
              <input type="text" class="CIDnumber" v-model="CIDnumber" @keyup="input4" />
            </div>
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证国徽面
              </p>
              <div class="showPic" @click="showBig11">
                <!-- <div class="picture" @click="showBig11"> -->
                <img :src="headerImage11" alt />
                <input
                  type="file"
                  id="upload11"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload11"
                />
                <label for="upload11" v-show="isShow11"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow11">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
            </div>
          </div>
          <div class="linesecond">
            <div class="IDfirst">
              <p id="first">
                <span style="color:red">*</span>营业执照
              </p>
              <div class="showPic" @click="showBig12">
                <!-- <div class="picture" @click="showBig12"> -->
                <img :src="headerImage12" alt />
                <input
                  type="file"
                  id="upload12"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload12"
                />
                <label for="upload12" v-show="isShow12"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow12">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="business">
                <span style="color:red">*</span>营业执照注册号
              </p>
              <input type="text" class="IDnumber" v-model="businumber" @keyup="input8" />
              <p id="business">
                <span style="color:red">*</span>营业执照有效期
              </p>
              <input
                name
                id="form_select2"
                @click="calShow"
                v-model="selectDate"
                readonly
                ref="time3"
              />
            </div>
            <div class="IDfirst">
              <p id="second">
                <span style="color:red">*</span>税务登记证（国税）
              </p>
              <div class="showPic" @click="showBig13">
                <!-- <div class="picture" @click="showBig13"> -->
                <img :src="headerImage13" alt />
                <input
                  type="file"
                  id="upload13"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload13"
                />
                <label for="upload13" v-show="isShow13"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow13">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="tax">
                <span style="color:red">*</span>税务证号
              </p>
              <input type="text" class="IDnumber" v-model="taxNumber" @keyup="input45" />
              <div id="forever">
                <label class="test">
                  <input type="checkbox" class="check" :checked="boxcheck3" @click="changeCheck3" /> 长期有效
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="Self-noemployed person" v-show="nopersonality">
          <div class="bigPic" v-show="bigPic14">
            <img :src="headerImage14" alt />
          </div>
          <div class="bigPic" v-show="bigPic15">
            <img :src="headerImage15" alt />
          </div>
          <div class="bigPic" v-show="bigPic16">
            <img :src="headerImage16" alt />
          </div>
          <div class="shadow" v-show="bigPic14"></div>
          <div class="shadow" v-show="bigPic15"></div>
          <div class="shadow" v-show="bigPic16"></div>
          <div class="bottom" v-show="bigPic14">
            <div class="save1" @click="outPic14">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload14"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload14"
                />
                <label for="upload14">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic15">
            <div class="save1" @click="outPic15">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload15"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload15"
                />
                <label for="upload15">更换图片</label>
              </button>
            </div>
          </div>
          <div class="bottom" v-show="bigPic16">
            <div class="save1" @click="outPic16">
              <button>确定</button>
            </div>
            <div class="save2">
              <button v-if="status!='资料卡通过'&& status!='资料卡确认中'">
                <input
                  type="file"
                  id="upload16"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload16"
                />
                <label for="upload16">更换图片</label>
              </button>
            </div>
          </div>
          <div class="linefirst">
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证头像面
              </p>
              <div class="showPic" @click="showBig14">
                <!-- <div class="picture" @click="showBig14"> -->
                <img :src="headerImage14" alt />
                <input
                  type="file"
                  id="upload14"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload14"
                />
                <label for="upload14" v-show="isShow14"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow14">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="CID">
                <span style="color:red">*</span>身份证号码
              </p>
              <input type="text" class="CIDnumber" v-model="CIDnumber" @keyup="input5" />
            </div>
            <div class="IDfirst">
              <p>
                <span style="color:red">*</span>身份证国徽面
              </p>
              <div class="showPic" @click="showBig15">
                <!-- <div class="picture" @click="showBig15"> -->
                <img :src="headerImage15" alt />
                <input
                  type="file"
                  id="upload15"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload15"
                />
                <label for="upload15" v-show="isShow15"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow15">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
            </div>
          </div>
          <div class="linesecond">
            <div class="IDfirst">
              <p id="first">
                <span style="color:red">*</span>营业执照
              </p>
              <div class="showPic" @click="showBig16">
                <!-- <div class="picture" @click="showBig16"> -->
                <img :src="headerImage16" alt />
                <input
                  type="file"
                  id="upload16"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="upload16"
                />
                <label for="upload16" v-show="isShow16"></label>
                <!-- </div> -->
                <div class="pic" v-show="isShow16">
                  <div class="add"></div>
                  <p>点击上传</p>
                </div>
              </div>
              <p id="business">
                <span style="color:red">*</span>营业执照注册号
              </p>
              <input type="text" class="IDnumber" v-model="businumber" @keyup="input9" />
              <p id="business">
                <span style="color:red">*</span>营业执照有效期
              </p>
              <input
                name
                id="form_select2"
                @click="calShow"
                v-model="selectDate"
                readonly
                ref="time4"
              />
            </div>
            <div id="forever2">
              <label class="test">
                <input type="checkbox" class="check" :checked="boxcheck4" @click="changeCheck4" /> 长期有效
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <calendar
      v-model="calendarShow"
      :defaultDate="defaultDate"
      @change="handelChage"
      :selectDate="selectDate"
    ></calendar>
  </div>
</template>

<script>
var remoteImageURL = "http://14.29.221.4:10250/upload";
import Exif from "exif-js";
import { bus } from "../utils/eventBus.js";
export default {
  props: ["sss", "status"],
  data() {
    // let self = this;
    return {
      boxcheck1: false,
      boxcheck2: false,
      boxcheck3: false,
      boxcheck4: false,
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
      headerImage1: "",
      headerImage2: "",
      headerImage3: "",
      headerImage4: "",
      headerImage5: "",
      headerImage6: "",
      headerImage7: "",
      headerImage8: "",
      headerImage9: "",
      headerImage10: "",
      headerImage11: "",
      headerImage12: "",
      headerImage13: "",
      headerImage14: "",
      headerImage15: "",
      headerImage16: "",
      picValue1: "",
      picValue2: "",
      picValue3: "",
      picValue4: "",
      picValue5: "",
      picValue6: "",
      picValue7: "",
      picValue8: "",
      picValue9: "",
      picValue10: "",
      picValue11: "",
      picValue12: "",
      picValue13: "",
      picValue14: "",
      picValue15: "",
      picValue16: "",
      isShow1: true,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      isShow5: true,
      isShow6: true,
      isShow7: true,
      isShow8: true,
      isShow9: true,
      isShow10: true,
      isShow11: true,
      isShow12: true,
      isShow13: true,
      isShow14: true,
      isShow15: true,
      isShow16: true,
      nojoin: true,
      join: false,
      single: false,
      nopersonality: false,
      personality: false,
      more: false,
      businumber: "",
      CIDnumber: " ",
      taxNumber: " ",
      Idcard1: "",
      authFileImage1: " ",
      authFileImage2: " ",
      authFileImage3: " ",
      authFileImage4: " ",
      imageUrl1: " ",
      imageUrl2: " ",
      imageUrl3: " ",
      imageUrl4: " ",
      FileImage1: " ",
      FileImage2: " ",
      FileImage3: " ",
      FileImage4: " ",
      FileImage5: " ",
      FileImage6: " ",
      FileImage7: " ",
      FileImage8: " ",
      FileImage9: " ",
      FileImage10: " ",
      FileImage11: " ",
      FileImage12: " ",
      FileImage13: " ",
      FileImage14: " ",
      FileImage15: " ",
      FileImage16: " ",
      time1: "",
      time2: "",
      time3: "",
      time4: "",
      calendarShow: false,
      defaultDate: new Date(),
      selectDate: "",
      dateForever: 2,
      contractyear: this.$store.state.year
    };
  },
  mounted() {
    this.getdata();
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
  },
  watch: {
    sss() {
      // this.valuesing = this.sss;
      if (this.sss == "公司-三证五证未合") {
        this.nojoin = true;
        this.join = false;
        this.single = false;
        this.personality = false;
        this.nopersonality = false;
      }
      if (this.sss == "公司-三证五证合一") {
        this.nojoin = false;
        this.join = true;
        this.single = false;
        this.personality = false;
        this.nopersonality = false;
      }
      if (this.sss == "个人") {
        this.nojoin = false;
        this.join = false;
        this.single = true;
        this.personality = false;
        this.nopersonality = false;
      }
      if (this.sss == "个体户-有税务登记证") {
        this.personality = true;
        this.nojoin = false;
        this.join = false;
        this.single = false;
        this.nopersonality = false;
      }
      if (this.sss == "个体户-无税务登记证") {
        this.nopersonality = true;
        this.personality = false;
        this.nojoin = false;
        this.join = false;
        this.single = false;
      }
    },
    boxcheck1(curVal, oldVal) {
      if (curVal == true) {
        this.$refs.time1.disabled = true;
        this.$emit("forever1", this.boxcheck1);
      } else if (curVal == false) {
        this.$refs.time1.disabled = false;
        this.$emit("forever1", this.boxcheck1);
      }
    },
    boxcheck2(curVal, oldVal) {
      if (curVal == true) {
        this.$refs.time2.disabled = true;
        this.$emit("forever2", this.boxcheck2);
      } else if (curVal == false) {
        this.$refs.time2.disabled = false;
        this.$emit("forever2", this.boxcheck2);
      }
    },
    boxcheck3(curVal, oldVal) {
      if (curVal == true) {
        this.$refs.time3.disabled = true;
        this.$emit("forever3", this.boxcheck3);
      } else if (curVal == false) {
        this.$refs.time3.disabled = false;
        this.$emit("forever3", this.boxcheck3);
      }
    },
    boxcheck4(curVal, oldVal) {
      if (curVal == true) {
        this.$refs.time4.disabled = true;
        this.$emit("forever4", this.boxcheck4);
      } else if (curVal == false) {
        this.$refs.time4.disabled = false;
        this.$emit("forever4", this.boxcheck4);
      }
    }
  },
  methods: {
    handelChage(data, selectDate) {
      this.selectDate = selectDate;
      this.$emit("date", this.selectDate);
      var s = document.getElementsByClassName("swiper-wrapper")[0];
      s.style.zIndex = 0;
    },
    changeCheck1() {
      this.boxcheck1 = !this.boxcheck1;
      this.selectDate = "";
      this.$emit("forever1", this.boxcheck1);
      this.$emit("date", this.selectDate);
    },
    changeCheck2() {
      this.boxcheck2 = !this.boxcheck2;
      this.selectDate = "";
      this.$emit("forever2", this.boxcheck2);
      this.$emit("date", this.selectDate);
    },
    changeCheck3() {
      this.boxcheck3 = !this.boxcheck3;
      this.selectDate = "";
      this.$emit("forever3", this.boxcheck3);
      this.$emit("date", this.selectDate);
    },
    changeCheck4() {
      this.boxcheck4 = !this.boxcheck4;
      this.selectDate = "";
      this.$emit("forever4", this.boxcheck4);
      this.$emit("date", this.selectDate);
    },
    showBig1() {
      if (this.headerImage1 == null || this.headerImage1 == "") {
      } else {
        this.bigPic1 = true;
      }
    },
    showBig2() {
      if (this.headerImage2 == null || this.headerImage2 == "") {
      } else {
        this.bigPic2 = true;
      }
    },
    showBig3() {
      if (this.headerImage3 == null || this.headerImage3 == "") {
      } else {
        this.bigPic3 = true;
      }
    },
    showBig4() {
      if (this.headerImage4 == null || this.headerImage4 == "") {
      } else {
        this.bigPic4 = true;
      }
    },
    showBig5() {
      if (this.headerImage5 == null || this.headerImage5 == "") {
      } else {
        this.bigPic5 = true;
      }
    },
    showBig6() {
      if (this.headerImage6 == null || this.headerImage6 == "") {
      } else {
        this.bigPic6 = true;
      }
    },
    showBig7() {
      if (this.headerImage7 == null || this.headerImage7 == "") {
      } else {
        this.bigPic7 = true;
      }
    },
    showBig8() {
      if (this.headerImage8 == null || this.headerImage8 == "") {
      } else {
        this.bigPic8 = true;
      }
    },
    showBig9() {
      if (this.headerImage9 == null || this.headerImage9 == "") {
      } else {
        this.bigPic9 = true;
      }
    },
    showBig10() {
      if (this.headerImage10 == null || this.headerImage10 == "") {
      } else {
        this.bigPic10 = true;
      }
    },
    showBig11() {
      if (this.headerImage11 == null || this.headerImage11 == "") {
      } else {
        this.bigPic11 = true;
      }
    },
    showBig12() {
      if (this.headerImage12 == null || this.headerImage12 == "") {
      } else {
        this.bigPic12 = true;
      }
    },
    showBig13() {
      if (this.headerImage13 == null || this.headerImage13 == "") {
      } else {
        this.bigPic13 = true;
      }
    },
    showBig14() {
      if (this.headerImage14 == null || this.headerImage14 == "") {
      } else {
        this.bigPic14 = true;
      }
    },
    showBig15() {
      if (this.headerImage15 == null || this.headerImage15 == "") {
      } else {
        this.bigPic15 = true;
      }
    },
    showBig16() {
      if (this.headerImage16 == null || this.headerImage16 == "") {
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
    calShow() {
      if (!this.calendarShow) {
        this.calendarShow = true;
        var s = document.getElementsByClassName("swiper-wrapper")[0];
        s.style.zIndex = 20;
      }
    },
    input1() {
      this.$emit("put14", this.CIDnumber);
    },
    input2() {
      this.$emit("put15", this.CIDnumber);
    },
    input3() {
      this.$emit("put16", this.CIDnumber);
    },
    input4() {
      this.$emit("put17", this.CIDnumber);
    },
    input5() {
      this.$emit("put18", this.CIDnumber);
    },
    input6() {
      this.$emit("put33", this.businumber);
    },
    input7() {
      this.$emit("put34", this.businumber);
    },
    input8() {
      this.$emit("put35", this.businumber);
    },
    input9() {
      this.$emit("put36", this.businumber);
    },
    input44() {
      this.$emit("put44", this.taxNumber);
    },
    input45() {
      this.$emit("put45", this.taxNumber);
    },
    upload1(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow1 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage1 = res.data.data.path;
            this.imageUrl1 = remoteImageURL + this.authFileImage1;
            this.$emit("file1", this.authFileImage1);
          }
        })
        .catch(err => {});
      this.picValue1 = files[0];
      this.imgPreview1(this.picValue1);
      var timer = new Date();
      this.time1 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time1", this.time1);
    },
    upload2(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow2 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD_BG"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage2 = res.data.data.path;
            this.imageUrl2 = remoteImageURL + this.authFileImage2;
            this.$emit("file2", this.authFileImage2);
          }
        })
        .catch(err => {});
      this.picValue2 = files[0];
      this.imgPreview2(this.picValue2);
      var timer = new Date();
      this.time2 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time2", this.time2);
    },
    imgPreview1(file) {
      let self = this;
      let Orientation;
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage1 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage1 = data;
              self.postImg();
            };
          }
        };
      }
    },
    imgPreview2(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage2 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage2 = data;
              self.postImg();
            };
          }
        };
      }
    },
    upload3(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow3 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId +
          "-" +
          "(" +
          this.contractyear +
          ")" +
          "-" +
          "BUSSINESSLICENSE"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage3 = res.data.data.path;
            this.imageUrl3 = remoteImageURL + this.authFileImage3;
            this.$emit("file3", this.authFileImage3);
          }
        })
        .catch(err => {});
      this.picValue3 = files[0];
      this.imgPreview3(this.picValue3);
      var timer = new Date();
      this.time3 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time3", this.time3);
    },
    upload4(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow4 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "GTQC"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage4 = res.data.data.path;
            this.imageUrl4 = remoteImageURL + this.authFileImage4;
            this.$emit("file4", this.authFileImage4);
          }
        })
        .catch(err => {});
      this.picValue4 = files[0];
      this.imgPreview4(this.picValue4);
      var timer = new Date();
      this.time4 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time4", this.time4);
    },
    imgPreview3(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage3 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage3 = data;
              self.postImg();
            };
          }
        };
      }
    },
    imgPreview4(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage4 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage4 = data;
              self.postImg();
            };
          }
        };
      }
    },
    upload5(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow5 = false;
        this.bigPic5 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage1 = res.data.data.path;
            this.imageUrl1 = remoteImageURL + this.authFileImage1;
            this.$emit("file1", this.authFileImage1);
          }
        })
        .catch(err => {});
      this.picValue5 = files[0];
      this.imgPreview5(this.picValue5);
      var timer = new Date();
      this.time1 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time5", this.time1);
    },
    upload6(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow6 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD_BG"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage2 = res.data.data.path;
            this.imageUrl2 = remoteImageURL + this.authFileImage2;
            this.$emit("file2", this.authFileImage2);
          }
        })
        .catch(err => {});
      this.picValue6 = files[0];
      this.imgPreview6(this.picValue6);
      var timer = new Date();
      this.time2 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time6", this.time2);
    },
    imgPreview5(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage5 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage5 = data;
              self.postImg();
            };
          }
        };
      }
    },
    imgPreview6(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage6 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage6 = data;
              self.postImg();
            };
          }
        };
      }
    },
    upload7(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow7 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId +
          "-" +
          "(" +
          this.contractyear +
          ")" +
          "-" +
          "BUSSINESSLICENSE"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage3 = res.data.data.path;
            this.imageUrl3 = remoteImageURL + this.authFileImage3;
            this.$emit("file3", this.authFileImage3);
          }
        })
        .catch(err => {});
      this.picValue7 = files[0];
      this.imgPreview7(this.picValue7);
      var timer = new Date();
      this.time3 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time7", this.time3);
    },
    imgPreview7(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage7 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage7 = data;
              self.postImg();
            };
          }
        };
      }
    },
    upload8(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow8 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage1 = res.data.data.path;
            this.imageUrl1 = remoteImageURL + this.authFileImage1;
            this.$emit("file1", this.authFileImage1);
          }
        })
        .catch(err => {});
      this.picValue8 = files[0];
      this.imgPreview8(this.picValue8);
      var timer = new Date();
      this.time1 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time8", this.time1);
    },
    upload9(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow9 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD_BG"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage2 = res.data.data.path;
            this.imageUrl2 = remoteImageURL + this.authFileImage2;
            this.$emit("file2", this.authFileImage2);
          }
        })
        .catch(err => {});
      this.picValue9 = files[0];
      this.imgPreview9(this.picValue9);
      var timer = new Date();
      this.time2 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time9", this.time2);
    },
    imgPreview8(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage8 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage8 = data;
              self.postImg();
            };
          }
        };
      }
    },
    imgPreview9(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage9 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage9 = data;
              self.postImg();
            };
          }
        };
      }
    },
    upload10(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow10 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage1 = res.data.data.path;
            this.imageUrl1 = remoteImageURL + this.authFileImage1;
            this.$emit("file1", this.authFileImage1);
          }
        })
        .catch(err => {});
      this.picValue10 = files[0];
      this.imgPreview10(this.picValue10);
      var timer = new Date();
      this.time1 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time10", this.time1);
    },
    upload11(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow11 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD_BG"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage2 = res.data.data.path;
            this.imageUrl2 = remoteImageURL + this.authFileImage2;
            this.$emit("file2", this.authFileImage2);
          }
        })
        .catch(err => {});
      this.picValue11 = files[0];
      this.imgPreview11(this.picValue11);
      var timer = new Date();
      this.time2 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time11", this.time2);
    },
    imgPreview10(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage10 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage10 = data;
              self.postImg();
            };
          }
        };
      }
    },
    imgPreview11(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage11 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage11 = data;
              self.postImg();
            };
          }
        };
      }
    },
    upload12(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow12 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId +
          "-" +
          "(" +
          this.contractyear +
          ")" +
          "-" +
          "BUSSINESSLICENSE"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage3 = res.data.data.path;
            this.imageUrl3 = remoteImageURL + this.authFileImage3;
            this.$emit("file3", this.authFileImage3);
          }
        })
        .catch(err => {});
      this.picValue12 = files[0];
      this.imgPreview12(this.picValue12);
      var timer = new Date();
      this.time3 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time12", this.time3);
    },
    upload13(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow13 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "GTQC"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage4 = res.data.data.path;
            this.imageUrl4 = remoteImageURL + this.authFileImage4;
            this.$emit("file4", this.authFileImage4);
          }
        })
        .catch(err => {});
      this.picValue13 = files[0];
      this.imgPreview13(this.picValue13);
      var timer = new Date();
      this.time4 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time13", this.time4);
    },
    imgPreview12(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage12 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage12 = data;
              self.postImg();
            };
          }
        };
      }
    },
    imgPreview13(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage13 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage13 = data;
              self.postImg();
            };
          }
        };
      }
    },
    upload14(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow14 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage1 = res.data.data.path;
            this.imageUrl1 = remoteImageURL + this.authFileImage1;
            this.$emit("file1", this.authFileImage1);
          }
        })
        .catch(err => {
          console.log("错误", err);
        });
      this.picValue14 = files[0];
      this.imgPreview14(this.picValue14);
      var timer = new Date();
      this.time1 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time14", this.time1);
    },
    upload15(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.isShow15 = false;
      }
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "IDCARD_BG"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage2 = res.data.data.path;
            this.imageUrl2 = remoteImageURL + this.authFileImage2;
            this.$emit("file2", this.authFileImage2);
          }
        })
        .catch(err => {
          console.log("错误", err);
        });
      this.picValue15 = files[0];
      this.imgPreview15(this.picValue15);
      var timer = new Date();
      this.time2 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time15", this.time2);
    },
    imgPreview14(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage14 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage14 = data;
              self.postImg();
            };
          }
        };
      }
    },
    imgPreview15(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage15 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage15 = data;
              self.postImg();
            };
          }
        };
      }
    },
    upload16(e) {
      let files = e.target.files || e.dataTransfer.files;
      let file = files[0];
      var freader = new FileReader();
      freader.readAsDataURL(files[0]);
      let fd = new FormData();
      fd.append("file", file);
      fd.append(
        "fileName",
        this.companyId +
          "-" +
          "(" +
          this.contractyear +
          ")" +
          "-" +
          "BUSSINESSLICENSE"
      );
      fd.append("imgType", "Customer");
      const instance = this.$http.create({
        withCredentials: true
      });
      instance
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.authFileImage3 = res.data.data.path;
            this.imageUrl3 = remoteImageURL + this.authFileImage3;
            this.$emit("file3", this.authFileImage3);
            if (this.authFileImage3.length > 0) {
              this.isShow16 = false;
            }
          }
        })
        .catch(err => {
          console.log("错误", err);
        });
      this.picValue16 = files[0];
      this.imgPreview16(this.picValue16);
      var timer = new Date();
      this.time3 =
        timer.getFullYear() +
        "-" +
        timer.getMonth() +
        1 +
        "-" +
        timer.getDate() +
        " " +
        timer.getHours() +
        ":" +
        timer.getMinutes() +
        " " +
        this.companyId;
      this.$emit("time16", this.time3);
    },
    imgPreview16(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            self.headerImage16 = this.result;
            self.postImg();
          } else {
            img.onload = function() {
              let data = self.compress(img, Orientation);
              self.headerImage16 = data;
              self.postImg();
            };
          }
        };
      }
    },
    postImg() {
      //这里写接口
    },
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    showThem: function() {
      bus.$emit("select");
    },
    getdata() {
      let url = "/customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.companyId
      };
      this.$http.post(url, data).then(res => {
        if (res.data.code == 0 && res.data.data != null) {
          var alldata = res.data.data;
          this.dateForever = alldata.file2BusinesslicenseNoend;
          this.businumber = alldata.file2BusinesslicenseNo;
          this.CIDnumber = alldata.file1IdcardNo;
          this.taxNumber = alldata.file4GtqcNo;
          var customerIndex = alldata.customerentitytypex;
          this.selectDate = alldata.file2BusinesslicenseEnd;
          this.FileImage1 = remoteImageURL + alldata.file1Idcard;
          this.FileImage2 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage3 = remoteImageURL + alldata.file2Businesslicense;
          this.FileImage4 = remoteImageURL + alldata.file4Gtqc;
          this.FileImage5 = remoteImageURL + alldata.file1Idcard;
          this.FileImage6 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage7 = remoteImageURL + alldata.file2Businesslicense;
          this.FileImage8 = remoteImageURL + alldata.file1Idcard;
          this.FileImage9 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage10 = remoteImageURL + alldata.file1Idcard;
          this.FileImage11 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage12 = remoteImageURL + alldata.file2Businesslicense;
          this.FileImage13 = remoteImageURL + alldata.file4Gtqc;
          this.FileImage14 = remoteImageURL + alldata.file1Idcard;
          this.FileImage15 = remoteImageURL + alldata.file5IdcardBg;
          this.FileImage16 = remoteImageURL + alldata.file2Businesslicense;
          this.contractyear = alldata.contractyear;
          if (customerIndex == 2) {
            if (this.dateForever == 0) {
              this.boxcheck1 = false;
            } else if (this.dateForever == 1) {
              this.boxcheck1 = true;
              this.selectDate = "";
            }
            if (alldata.file1Idcard != null) {
              this.isShow1 = false;
              this.headerImage1 = this.FileImage1;
              this.bigPic1 = false;
            } else {
              this.isShow1 = true;
              this.bigPic1 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow2 = false;
              this.headerImage2 = this.FileImage2;
            } else {
              this.isShow2 = true;
            }
            if (alldata.file2Businesslicense != null) {
              this.isShow3 = false;
              this.headerImage3 = this.FileImage3;
            } else {
              this.isShow3 = true;
            }
            if (alldata.file4Gtqc) {
              this.isShow4 = false;
              this.headerImage4 = this.FileImage4;
            } else {
              this.isShow4 = true;
            }
          }
          if (customerIndex == 1) {
            if (this.dateForever == 0) {
              this.boxcheck2 = false;
            } else if (this.dateForever == 1) {
              this.boxcheck2 = true;
              this.selectDate = "";
            }
            if (alldata.file1Idcard != null) {
              this.isShow5 = false;
              this.headerImage5 = this.FileImage5;
            } else {
              this.isShow5 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow6 = false;
              this.headerImage6 = this.FileImage6;
            } else {
              this.isShow6 = true;
            }
            if (alldata.file2Businesslicense != null) {
              this.isShow7 = false;
              this.headerImage7 = this.FileImage7;
            } else {
              this.isShow7 = true;
            }
          }
          if (customerIndex == 4) {
            if (this.dateForever == 0) {
              this.boxcheck4 = false;
            } else if (this.dateForever == 1) {
              this.boxcheck4 = true;
              this.selectDate = "";
            }
            if (alldata.file1Idcard != null) {
              this.isShow14 = false;
              this.headerImage14 = this.FileImage14;
            } else {
              this.isShow14 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow15 = false;
              this.headerImage15 = this.FileImage15;
            } else {
              this.isShow15 = true;
            }
            if (alldata.file2Businesslicense != null) {
              this.isShow16 = false;
              this.headerImage16 = this.FileImage16;
            } else {
              this.isShow16 = true;
            }
          }
          if (customerIndex == 5) {
            if (alldata.file1Idcard != null) {
              this.isShow8 = false;
              this.headerImage8 = this.FileImage8;
            } else {
              this.isShow8 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow9 = false;
              this.headerImage9 = this.FileImage9;
            } else {
              this.isShow9 = true;
            }
          }
          if (customerIndex == 3) {
            if (this.dateForever == 0) {
              this.boxcheck3 = false;
            } else if (this.dateForever == 1) {
              this.boxcheck3 = true;
              this.selectDate = "";
            }
            if (alldata.file1Idcard != null) {
              this.isShow10 = false;
              this.headerImage10 = this.FileImage10;
            } else {
              this.isShow10 = true;
            }
            if (alldata.file5IdcardBg != null) {
              this.isShow11 = false;
              this.headerImage11 = this.FileImage11;
            } else {
              this.isShow11 = true;
            }
            if (alldata.file2Businesslicense != null) {
              this.isShow12 = false;
              this.headerImage12 = this.FileImage12;
            } else {
              this.isShow12 = true;
            }
            if (alldata.file4Gtqc != null) {
              this.isShow13 = false;
              this.headerImage13 = this.FileImage13;
            } else {
              this.isShow13 = true;
            }
          }
        } else if (res.data.code === 1 || res.data.data == null) {
          console.log("出错了!");
        }
      });
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
.content {
  box-sizing: border-box;
  height: 455px;
  width: 100%;
  background: white;
  overflow: hidden;
}
.content-all {
  width: 300px;
  height: 355px;
  margin: 27px 39px 68px 40px;
}
.account {
  font-size: 15px;
  color: #000000;
}
.account p {
  font-weight: bold;
}
.form_select {
  width: 135px;
  height: 25px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
  background: url("../assets/select_arrow.png");
  background: 130px center no-repeat;
  background-size: 9px 9px;
  font-weight: normal;
}
#form_select2 {
  /* 清除默认边框 */
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  padding-left: 11px;
  padding-right: 11px;
  width: 120px;
  height: 25px;
  font-size: 13px;
  color: #7d7d7d;
  /* 清除默认的箭头样式 */
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /* 右侧添加小箭头的背景图 */
  background: url("../assets/select_arrow.png");
  background: 132px center no-repeat;
  background-size: 6px 6px;
}
.linefirst {
  display: flex;
  justify-content: space-between;
}
.IDfirst > p {
  text-align: left;
  color: #000000;
  font-size: 13px;
  margin-left: 35px;
  margin-top: 18px;
  margin-bottom: 7px;
  font-weight: bold;
}
.showPic {
  width: 140px;
  height: 70px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  /* border: 1px solid #d5d5d5; */
  background: #b1b1b1;
  margin-left: 6px;
}
.show {
  width: 140px;
  height: 70px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  /* border: 1px solid #d5d5d5; */
  background: #b1b1b1;
}
.showPic input {
  display: none;
}
input[type="file"] + label {
  display: block;
  width: 100%;
  height: 100%;
}
.showPic p {
  font-size: 10px;
  color: #ffffff;
}
.pic {
  position: absolute;
  top: 15px;
  left: 40px;
  right: 40px;
  pointer-events: none;
}
.add {
  background: url("../assets/add.png");
  background-size: 100% 100%;
  width: 28px;
  height: 28px;
  margin: 0 auto;
}
/* .picture{
  width: 140px;
  height: 50px;
  overflow:auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
} */
.showPic img {
  width: 140px;
  height: 70px;
}
.bigPic {
  width: 80%;
  height: 80%;
  left: 40px;
  right: 0;
  bottom: 85px;
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
  background-color: #3b3b3b;
  top: 0px;
}
.bottom {
  width: 100%;
  position: absolute;
  z-index: 100;
  top: 375px;
  left: 0;
  right: 0;
}
.save1 button {
  box-sizing: border-box;
  width: 163px;
  height: 33px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: #4b4b4b;
  float: left;
  margin: 13px auto 11px 15px;
}
.save2 button {
  box-sizing: border-box;
  width: 163px;
  height: 33px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
  float: left;
  margin: 13px auto 11px 20px;
}
.save2 input {
  display: none;
}
.save2 label {
  margin-top: 6px;
}
#CID {
  font-size: 10px;
  margin-top: 3px;
  margin-left: 44px;
  margin-bottom: 2px;
}
.CIDnumber {
  display: block;
  height: 25px;
  width: 134px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
  background: white;
}
.IDnumber {
  display: block;
  width: 130px;
  margin-left: 5px;
  height: 23px;
  border-radius: 5px;
  border: none;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
  border: 1px solid #7d7d7d;
  background: white;
}
.linesecond {
  display: flex;
  justify-content: space-between;
  /* margin-top: 3px; */
}
#first {
  margin-left: 47px;
}
#business {
  font-size: 10px;
  margin-top: 3px;
  margin-left: 39px;
  margin-bottom: 2px;
}
#tax {
  font-size: 10px;
  margin-top: 3px;
  margin-left: 57px;
  margin-bottom: 2px;
}
#second {
  margin-left: 20px;
}
#sin {
  flex-direction: column;
  margin-left: 80px;
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
<style>
.card5 .show .calendar {
  width: 100%;
  bottom: 0;
  left: auto;
  right: auto;
}
</style>