import Axios from 'axios'
import {Notify} from "vant"
// import Cookies from "js-cookie";

var baseUrl = 'http://localhost:49438/';//本地
//var baseUrl = 'http://47.107.56.156:666/';//测试
//var baseUrl = 'http://14.29.223.114:568/';//正式

export {
    baseUrl
}

const DECODE = {
    CODE_INVALID: -1,//失效
    CODE_OK: 0,//成功
    CODE_FAIL: 1//失败
}

/**
 * 封装get方法
 * @param url 
 * @param params 
 * @returns {Promise} 
 */
export function get(url, params = {}, config = {}) {
    Axios.defaults.withCredentials = false;
    return new Promise((resolve, reject) => {
        // if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
        //     vm.$router.push({
        //         path: '/Sign'
        //     });
        //     reject('登录失效');
        // }
        Axios.get(baseUrl + url, {
            params: params,
        }, config)
            .then(response => {
                Axios.defaults.withCredentials = true;
                var res = response.data;
                if (res.code != undefined) {//vue返回code
                    if (res.code == DECODE.CODE_INVALID) {//失效
                        vm.$router.push({
                            path: '/Sign'
                        });
                        console.log(res.msg);
                        reject(res);
                    } else if (res.code == DECODE.CODE_OK) {//成功
                        resolve(res);
                    } else {//其他返回失败
                        console.log(res.msg);
                        reject(res);
                    }
                } else if (res.success != undefined) {//ext返回success
                    if (res.success)
                        resolve(res);
                    else {
                        console.log(res.msg);
                        reject(res);
                    }
                } else {//ext只返回数据的类型
                    resolve(res);
                }
            })
            .catch(err => {
                Axios.defaults.withCredentials = true;
                console.log(err.msg);
                reject(err)
            })
    })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config = {}) {
    Axios.defaults.withCredentials = false;
    return new Promise((resolve, reject) => {
        // if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
        //     vm.$router.push({
        //         path: '/Sign'
        //     });
        //     reject('登录失效');
        // }
        Axios.post(baseUrl + url, data, config)
            .then(response => {
                Axios.defaults.withCredentials = true;
                var res = response.data;
                if (res.code != undefined) {//vue返回code
                    if (res.code == DECODE.CODE_INVALID) {//失效
                        vm.$router.push({
                            path: '/Sign'
                        });
                        console.log(res.msg);
                        reject(res);
                    } else if (res.code == DECODE.CODE_OK) {//成功
                        resolve(res);
                    } else {//其他返回失败
                        console.log(res.msg);
                        reject(res);
                    }
                } else if (res.success != undefined) {//ext返回success
                    if (res.success)
                        resolve(res);
                    else {
                        console.log(res.msg);
                        reject(res);
                    }
                } else {//ext只返回数据的类型
                    resolve(res);
                }
            })
            .catch(err => {
                Axios.defaults.withCredentials = true;
                console.log(err.msg);
                if(err.request && err.request.status == 0){
                    Notify({ type: 'warning', message: '网络连接失败' });
                }else{
                    reject(err);
                }
            })
    })
}
/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}, config = {}) {
    Axios.defaults.withCredentials = false;
    return new Promise((resolve, reject) => {
        // if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
        //     vm.$router.push({
        //         path: '/Sign'
        //     });
        //     reject('登录失效');
        // }
        Axios.patch(baseUrl + url, data, config)
            .then(response => {
                Axios.defaults.withCredentials = true;
                var res = response.data;
                if (res.code != undefined) {//vue返回code
                    if (res.code == DECODE.CODE_INVALID) {//失效
                        vm.$router.push({
                            path: '/Sign'
                        });
                        console.log(res.msg);
                        reject(res);
                    } else if (res.code == DECODE.CODE_OK) {//成功
                        resolve(res);
                    } else {//其他返回失败
                        console.log(res.msg);
                        reject(res);
                    }
                } else if (res.success != undefined) {//ext返回success
                    if (res.success)
                        resolve(res);
                    else {
                        console.log(res.msg);
                        reject(res);
                    }
                } else {//ext只返回数据的类型
                    resolve(res);
                }
            })
            .catch(err => {
                Axios.defaults.withCredentials = true;
                console.log(err.msg);
                reject(err);
            })
    })
}
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}, config = {}) {
    Axios.defaults.withCredentials = false;
    return new Promise((resolve, reject) => {
        // if (Cookies.get("cid") && sessionStorage.getItem("_userId") && sessionStorage.getItem("_userId") != Cookies.get("cid")) {
        //     vm.$router.push({
        //         path: '/Sign'
        //     });
        //     reject('登录失效');
        // }
        Axios.put(baseUrl + url, data, config)
            .then(response => {
                Axios.defaults.withCredentials = true;
                var res = response.data;
                if (res.code != undefined) {//vue返回code
                    if (res.code == DECODE.CODE_INVALID) {//失效
                        vm.$router.push({
                            path: '/Sign'
                        });
                        console.log(res.msg);
                        reject(res);
                    } else if (res.code == DECODE.CODE_OK) {//成功
                        resolve(res);
                    } else {//其他返回失败
                        console.log(res.msg);
                        reject(res);
                    }
                } else if (res.success != undefined) {//ext返回success
                    if (res.success)
                        resolve(res);
                    else {
                        console.log(res.msg);
                        reject(res);
                    }
                } else {//ext只返回数据的类型
                    resolve(res);
                }
            }, err => {
                Axios.defaults.withCredentials = true;
                console.log(err);
                reject(err)
            })
    })
}