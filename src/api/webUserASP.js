import { get, post, patch, put } from "./httpASP";
import { Notify } from "vant";

//修改密码
export function ChangePassword(loginName, password, newPassword) {
  return post("/WEB_USER/ChangePassword", {
    loginName: loginName,
    password: password,
    newPassword: newPassword
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
//更新CID
export function UpdateAppClientId(loginName, APP_CID, APP_OS_NAME, APP_VENDOR, APP_VERSION) {
  return post("/WEB_USER/UpdateAppClientId", {
    loginName: loginName,
    APP_CID: APP_CID,
    APP_OS_NAME: APP_OS_NAME,
    APP_VENDOR: APP_VENDOR,
    APP_VERSION: APP_VERSION
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
//更新推送的接收时间
export function UpdatePushResponseTime(
  LOGINNAME,
  APP_CID,
  BILL_ID,
  PUSH_TYPE,
  type
) {
  return post("/WEB_USER/UpdatePushResponseTime", {
    LOGINNAME: LOGINNAME,
    APP_CID: APP_CID,
    BILL_ID: BILL_ID,
    PUSH_TYPE: PUSH_TYPE,
    type: type
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
//获取提醒的信息
export function GetTips(
  cid
) {
  return post("/WEB_USER/GetTips", {
    cid: cid,
  },{loading:false})
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

