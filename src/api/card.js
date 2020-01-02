import { get, post, patch, put } from './httpASP'

export function UpdateState(data, config = {}) {
    return post('/CUSTOMERINFOCARD/UpdateState', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetCardByCustomer(data, config = {}) {
    return post('/CUSTOMERINFOCARD/GetCardByCustomer', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function GetYlContractByCustomer(data, config = {}) {
    return post('/YLCONTRACTENTRY/GetYlContractByCustomer', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
export function UpdateContractState(data, config = {}) {
    return post('/YLCONTRACTENTRY/UpdateContractState', data, config).then((res) => {
        return Promise.resolve(res);
    }).catch((err) => {
        return Promise.reject(err);
    })
}