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