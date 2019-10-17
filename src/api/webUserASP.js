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
