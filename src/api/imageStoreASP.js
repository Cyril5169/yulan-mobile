import { get, post, patch, put } from './httpASP'

//客户申请列表
export function GetImageCustomer(data, config = {}) {
    return post('/IMAGE_STORE/GetImageCustomer', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//审核列表
export function GetAllData(data, config = {}) {
    return post('/IMAGE_STORE/GetAllData', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//新增
export function InsertImageStore(data, config = {}) {
    return post('/IMAGE_STORE/InsertImageStore', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//编辑
export function EditImageStore(data, config = {}) {
    return post('/IMAGE_STORE/EditImageStore', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//删除
export function DeleteImageStore(data, config = {}) {
    return post('/IMAGE_STORE/DeleteImageStore', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//上传文件
export function UploadFiles(data, config = {}) {
    return post('/IMAGE_STORE/UploadFiles', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//市场部审核
export function MarketUpdateStatus(data, config = {}) {
    return post('/IMAGE_STORE/MarketUpdateStatus', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//广美审核
export function GMUpdateStatus(data, config = {}) {
    return post('/IMAGE_STORE/GMUpdateStatus', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}