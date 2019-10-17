import { get, post, patch, put } from './httpASP'


export function getCustomerMustWriteStudy(cid) {
    return post('/STUDY_FORM/GetCustomerMustWriteStudy', {cid: cid}).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

export function getGroupContextOption(sfid) {
    return post('/SF_GROUP/GetGroupContextOption', {sfid: sfid}).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}

export function getCustomerStudy(cid) {
    return post('STUDY_FORM/GetCustomerStudy', {cid: cid}).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//插入开始记录
export function BeginEditStudy(data, config = {}) {
    return post('/STDUYTABLERESULT/BeginEditStudy', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
//提交调查表
export function SubmitStudy(data, config = {}) {
    return post('/STDUYTABLERESULT/SubmitStudy', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
