import store from "../store";

//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        store.commit("showLoading");
    }
    needLoadingRequestCount++;
};
export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        store.commit("hideLoading");
    }
};