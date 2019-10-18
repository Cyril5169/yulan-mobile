import { get, post, patch, put } from './httpASP'

//查询满足相应条件的当前用户的投诉信息
export function GetAllComplaint(data, config = {}) {
    return post('/Complaint/GetAllComplaint', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//查看投诉单详情
export function CheckDetailByID(data, config = {}) {
    return post('/Complaint/CheckDetailByID', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}