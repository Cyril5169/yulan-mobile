import { get, post, patch, put } from './httpASP'

//获取该用户的兰居设计申请记录
export function GetAllData(data, config = {}) {
    return post('/Lanju/GetAllData', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

//查看兰居软装设计单详情
export function CheckDetailByID(data, config = {}) {
    return post('/Lanju/CheckDetailByID', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}