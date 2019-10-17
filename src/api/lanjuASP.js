import { get, post, patch, put } from './httpASP'

//获取该用户的兰居设计申请记录
export function GetAllDataForApp(data, config = {}) {
    return post('/Lanju/GetAllDataForApp', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}