import { get, post, patch, put } from './httpASP'

//获取最新公告
export function getNewNotification(data, config = {}) {
    return post('/NOTIFICATION/GetNewNotification', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

export function getPageDataTable(data, config = {}) {
    return post('/NOTIFICATION/GetPageDataTable', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//根据ID获取公告
export function GetById(ID) {
    return post('/NOTIFICATION/GetById', {ID:ID}, {}).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//插入已读公告记录
export function InserFlag(data, config = {}) {
    return post('/NOTIFICATION_READ_FLAG/InserFlag', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}