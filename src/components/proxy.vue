<template>
  <div class="tax">
    <div class="bigPic" v-show="bigPic1">
      <img :src="headerImage1" alt />
    </div>
    <div class="bigPic" v-show="bigPic2">
      <img :src="headerImage2" alt />
    </div>
    <div class="bigPic" v-show="bigPic3">
      <img :src="headerImage3" alt />
    </div>
    <div class="shadow" v-show="bigPic1"></div>
    <div class="shadow" v-show="bigPic2"></div>
    <div class="shadow" v-show="bigPic3"></div>
    <div class="bottom" v-show="bigPic1">
      <div class="save1" @click="outPic1">
        <button>确定</button>
      </div>
      <div class="save2">
        <button>
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
        <button>
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
        <button>
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
    <top :top="set"></top>
    <div class="nothing"></div>
    <div class="content">
      <div class="content-all">
        <p id="topp">受托人银行信息</p>
        <div class="topBox">
          <p>
            姓名
            <input type="text" v-model="person" name="person" class="kuang" />
          </p>
        </div>
        <div class="box">
          <p>
            身份证号
            <input type="text" v-model="CIDnumber" name="CIDnumber" class="kuang" />
          </p>
        </div>
        <div class="bank">
          <p>
            开户银行
            <input type="text" v-model="bank" name="bank" class="kuang" />
          </p>
        </div>
        <div class="bank">
          <p>
            银行账户
            <input type="text" v-model="banknumber" name="banknumber" class="kuang" />
          </p>
        </div>
        <div class="box" id="bankaddress">
          <p>
            银行所在地
            <input
              name
              v-model="selected"
              @click="iosselect"
              id="form_select"
              value
              ref="bank"
            />
          </p>
        </div>
      </div>
      <div class="send">
        <div class="linefirst">
          <div class="IDfirst" id="CIDtop">
            <p>身份证头像面</p>
            <div class="show" @click="showBig1">
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
          </div>
          <div class="IDfirst" id="CIDback">
            <p>身份证国徽面</p>
            <div class="show" @click="showBig2">
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
            <p id="secondp">营业执照</p>
            <div class="show" @click="showBig3">
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
          </div>
        </div>
      </div>
    </div>
    <div class="save" @click="sendData">
      <button ref="save">保存当前页面信息</button>
    </div>
    <iosselect v-on:listen3="listenmore" v-on:listen4="listenselect" v-show="more"></iosselect>
  </div>
</template>

<script>
var remoteImageURL = "http://14.29.221.109:10250/upload";
import Exif from "exif-js";
import top from "./Top";
import iosselect from "@/components/Iosselect4";
export default {
  data() {
    return {
      more: false,
      bigPic1: false,
      bigPic2: false,
      bigPic3: false,
      set: 5,
      headerImage1: "",
      headerImage2: "",
      headerImage3: "",
      FileImage1: " ",
      FileImage2: " ",
      FileImage3: " ",
      picValue1: "",
      picValue2: "",
      picValue3: "",
      isShow1: true,
      isShow2: true,
      isShow3: true,
      image1: "",
      image2: "",
      image3: "",
      person: " ",
      CIDnumber: " ",
      bank: " ",
      kkp: 0,
      banknumber: "",
      selected: "",
      contractyear: this.$store.state.year
    };
  },
  components: {
    top,
    iosselect
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
  methods: {
    iosselect() {
      // console.log(1)
      this.more = true;
    },
    listenmore(data) {
      this.more = data;
    },
    listenselect(data) {
      this.selected = data;
      this.$refs.bank.value = this.selected;
      console.log(this.selected);
    },
    showBig1() {
      if (this.headerImage1 == null || this.headerImage1 == "") {
        console.log("上传照片");
      } else {
        this.bigPic1 = true;
      }
    },
    showBig2() {
      if (this.headerImage2 == null || this.headerImage2 == "") {
        console.log("上传照片");
      } else {
        this.bigPic2 = true;
      }
    },
    showBig3() {
      if (this.headerImage3 == null || this.headerImage3 == "") {
        console.log("上传照片");
      } else {
        this.bigPic3 = true;
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
      fd.append("imgType", "YLcontract");
      var instance1 = this.$http.create({
        withCredentials: true
      });
      instance1
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.image1 = res.data.data.path;
            this.imageUrl1 = remoteImageURL + this.image1;
          }
        })
        .catch(err => {
          console.log("错误", err);
        });
      this.picValue1 = files[0];
      this.imgPreview1(this.picValue1);
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
      fd.append("imgType", "YLcontract");
      var instance2 = this.$http.create({
        withCredentials: true
      });
      instance2
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.image2 = res.data.data.path;
            this.imageUrl2 = remoteImageURL + this.image2;
          }
        })
        .catch(err => {
          console.log("错误", err);
        });
      this.picValue2 = files[0];
      this.imgPreview2(this.picValue2);
    },
    imgPreview1(file) {
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
        this.companyId + "-" + "(" + this.contractyear + ")" + "-" + "AUTHFILE"
      );
      fd.append("imgType", "YLcontract");
      var instance3 = this.$http.create({
        withCredentials: true
      });
      instance3
        .post("/customerInfo/upload.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data != null && res.data.code == 0) {
            this.image3 = res.data.data.path;
            this.imageUrl3 = remoteImageURL + this.image3;
            console.log("第三张上传图片成功" + this.image3);
            console.log("预览图片路径是" + this.imageUrl3);
          }
        })
        .catch(err => {
          console.log("错误", err);
        });
      this.picValue3 = files[0];
      this.imgPreview3(this.picValue3);
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
        console.log("大于400万像素");
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
        console.log("超过100W像素");
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
      console.log("压缩前：" + initSize);
      console.log("压缩后：" + ndata.length);
      console.log(
        "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    sendData() {
      var s = document.getElementsByClassName("kuang");
      for (let i = 0; i < s.length; i++) {
        if (s[i].value == "" || this.$refs.bank.value == "") {
          this.doSub = 0;
          break;
        } else {
          this.doSub = 1;
        }
      }
      if (
        this.doSub == 1 &&
        (this.image1 != "" || this.headerImage1 != "") &&
        (this.image2 != "" || this.headerImage2 != "") &&
        (this.image3 != "" || this.headerImage3 != "")
      ) {
        if (this.doSend == "Y") {
          let url = "/customerInfo/updateYLcontract.do";
          let data = {
            ccid: this.companyId,
            ccyear: this.contractyear,
            name: this.person,
            accountBank: this.bank,
            accout: this.banknumber,
            accountLocation: this.selected,
            idcardNo: this.CIDnumber,
            authfileIamge: this.image3, //授权付款委托书
            idcardIamge1: this.image1, //身份证正面
            idcardIamge2: this.image2 //身份证背面
          };
          this.$http.post(url, data).then(res => {
            console.log(res.data);
          });
        } else if (this.doSend == "N") {
          let url = "/customerInfo/createYLcontract.do";
          let data = {
            ccid: this.companyId,
            ccyear: this.contractyear,
            name: this.person,
            accountBank: this.bank,
            accout: this.banknumber,
            accountLocation: this.selected,
            idcardNo: this.CIDnumber,
            authfileIamge: this.image3, //授权付款委托书
            idcardIamge1: this.image1, //身份证正面
            idcardIamge2: this.image2 //身份证背面
          };
          this.$http.post(url, data).then(res => {});
        }
        let url2 = "/customerInfo/updateCustomerInfo.do";
        let data2 = {
          cid: this.companyId,
          contractyear: this.contractyear,
          privateAccountAuthed: "Y"
        };
        this.$http.post(url2, data2).then(res => {
          this.$router.push({
            path: "/success2"
          });
        });
      } else {
        alert("信息填写不完整");
      }
    },
    getData() {
      let url = "/customerInfo/getCustomerInfo.do";
      let data = {
        CID: this.companyId
      };
      this.$http.post(url, data).then(res => {
        if (res.data.code == 0 || res.data.data != null) {
          var alldata = res.data.data;
          this.contractyear = alldata.contractyear;

          let url2 = "/infoState/getCustomerInfoCardState.do";
          let data2 = {
            cid: this.companyId,
            year: this.contractyear
          };
          this.$http.post(url2, data2).then(res2 => {
            if (res2.data.memo != null) {
              var alldata = res2.data;
              this.customerInfo = alldata.customerInfo;
              if (
                res2.data.customerInfo == "业务员审核中" ||
                res2.data.customerInfo == "资料卡通过" ||
                res2.data.customerInfo == "订单部审核中"
              ) {
                this.$refs.save.style.background = "#c2c2c2";
                this.$refs.save.disabled = true;
                const s = document.getElementsByTagName("input");
                for (let i = 0; i < s.length; i++) {
                  s[i].disabled = true;
                }
              }
            }
          });
          let url1 = "/customerInfo/getYLcontract.do";
          let data1 = {
            ccid: this.companyId,
            ccyear: this.contractyear
          };
          this.$http.post(url1, data1).then(res3 => {
            if (res3.data.code == 0 && res.data.data != null) {
              this.doSend = "Y";
              this.person = res3.data.data.name;
              this.CIDnumber = res3.data.data.idcardNo;
              this.bank = res3.data.data.accountBank;
              this.banknumber = res3.data.data.accout;
              this.selected = res3.data.data.accountLocation;
              this.FileImage1 = remoteImageURL + res3.data.data.idcardIamge1;
              this.FileImage2 = remoteImageURL + res3.data.data.idcardIamge2;
              this.FileImage3 = remoteImageURL + res3.data.data.authfileIamge;
              if (res3.data.data.idcardIamge1 != null) {
                this.isShow1 = false;
                this.headerImage1 = this.FileImage1;
              } else {
                this.isShow1 = true;
              }
              if (res3.data.data.idcardIamge2 != null) {
                this.isShow2 = false;
                this.headerImage2 = this.FileImage2;
              } else {
                this.isShow2 = true;
              }
              if (res3.data.data.authfileIamge != null) {
                this.isShow3 = false;
                this.headerImage3 = this.FileImage3;
              } else {
                this.isShow3 = true;
              }
              console.log(this.headerImage1);
            } else if (res.data.code == 1 || res.data.data == null) {
              console.log("不存在");
              this.doSend = "N";
            }
          });
        } else if (res.data.code === 1 || res.data.data == null) {
          console.log("不存在");
        }
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.tax {
  background: #efefef;
  height: 100vh;
}
.nothing {
  height: 50px;
  width: 100%;
}
.content {
  margin: 26px 22px 23px 22px;
  height: 478px;
  width: 331px;
  background: white;
  overflow: hidden;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.content-all {
  width: 318px;
  height: 208px;
}
#topp {
  font-size: 18px;
  color: #000000;
  margin-bottom: 20px;
  margin: 21px 160px 15px 25px;
}
.content-all p {
  font-size: 15px;
  color: #000000;
  text-align: left;
}
.topBox {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-left: 40px;
}
.topBox input {
  height: 19px;
  width: 158px;
  background: #ffffff;
  font-size: 13px;
  color: #7d7d7d;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  margin-left: 55px;
  padding: 0 8px;
}
.box {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 15px;
  margin-left: 40px;
}
.box input {
  height: 19px;
  width: 158px;
  background: #ffffff;
  font-size: 13px;
  color: #7d7d7d;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  margin-left: 25px;
  padding: 0 8px;
}
.bank {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 15px;
  margin-left: 40px;
}
.bank input {
  height: 19px;
  width: 158px;
  background: #ffffff;
  font-size: 13px;
  color: #7d7d7d;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-top: 1px;
  margin-left: 25px;
  padding: 0 8px;
}
#form_select {
  /* 清除默认边框 */
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  padding-left: 11px;
  padding-right: 11px;
  width: 155px;
  height: 19px;
  font-size: 13px;
  margin-left: 2px;
  color: #7d7d7d;
  /* 清除默认的箭头样式 */
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /* 右侧添加小箭头的背景图 */
  background-image: url(../assets/select_arrow.png);
  background: 160px center no-repeat;
  background-size: 6px 6px;
}
.save button {
  box-sizing: border-box;
  width: 349px;
  height: 52px;
  border-radius: 26px;
  border: none;
  font-size: 15px;
  color: #ffffff;
  background: -webkit-linear-gradient(left, #bedd81, #87ca81);
}
.send {
  margin-left: 20px;
}
.account {
  font-size: 15px;
  color: #000000;
}
.linefirst {
  display: flex;
  justify-content: space-between;
}
.IDfirst > p {
  text-align: left;
  color: #000000;
  font-size: 13px;
  margin-left: 41px;
  margin-top: 18px;
  margin-bottom: 7px;
}
.show {
  width: 140px;
  height: 70px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  background: #b1b1b1;
}
.show input {
  display: none;
}
input[type="file"] + label {
  display: block;
  width: 100%;
  height: 100%;
}
.show p {
  font-size: 10px;
  color: #ffffff;
  margin-bottom: 14px;
  text-align: center;
}
.picture {
  /* width: 100%;
  height: 100%; */
  overflow: auto;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.picture img {
  width: 140px;
  height: 70px;
}
.bigPic {
  width: 90%;
  height: 70%;
  right: 0;
  left: 20px;
  bottom: 105px;
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
  top: 575px;
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
  margin-left: 50px;
  margin-bottom: 2px;
}
.CIDnumber {
  display: block;
  width: 134px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
}
.IDnumber {
  display: block;
  width: 136px;
  border-radius: 5px;
  border: none;
  font-size: 13px;
  color: #7d7d7d;
  padding: 0 6px;
  background: -webkit-linear-gradient(left, #f2f2f2, #e1e1e1);
}
.linesecond {
  display: flex;
  justify-content: space-between;
  /* margin-top: 3px; */
}
#first {
  margin-left: 53px;
}
#CIDtop {
  margin-right: 20px;
}
#CIDback {
  margin-right: 25px;
}
#secondp {
  margin-left: 45px;
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
</style>