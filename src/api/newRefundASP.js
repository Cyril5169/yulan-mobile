import { get, post, patch, put } from './httpASP'

//获取该用户的退货赔偿记录
export function GetUserCompensation(data, config = {}) {
    return post('/RETURNCOMPENSATIONBILL/GetUserCompensation', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}