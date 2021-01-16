import request from '@/utils/request'

export function saveFapiaoManagement(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/save.json',
        method: 'post',
        data
    })
}

export function deleteFapiaoManagement(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/delete.json',
        method: 'post',
        data
    })
}

export function batchDeleteFapiaoManagement(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/batchDelete.json',
        method: 'post',
        data
    })
}

export function updateFapiaoManagement(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/edit.json',
        method: 'post',
        data
    })
}
export function getFapiaoManagement(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/get.json',
        method: 'post',
        data
    })
}
export function listFapiaoManagement(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/list.json',
        method: 'post',
        data
    })
}

export function saveFapiao4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/save4Me.json',
        method: 'post',
        data
    })
}

export function deleteFapiao4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/delete4Me.json',
        method: 'post',
        data
    })
}

export function batchDeleteFapiao4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/batchDelete4Me.json',
        method: 'post',
        data
    })
}

export function updateFapiao4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/edit4Me.json',
        method: 'post',
        data
    })
}
export function getFapiao4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/get.json',
        method: 'post',
        data
    })
}
export function listFapiao4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/list4Me.json',
        method: 'post',
        data
    })
}