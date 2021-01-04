import request from '@/utils/request'

export function saveVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/voucherType/save.json',
        method: 'post',
        data
    })
}

export function deleteVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/voucherType/delete.json',
        method: 'post',
        data
    })
}

export function batchDeleteVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/voucherType/batchDelete.json',
        method: 'post',
        data
    })
}

export function updateVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/voucherType/edit.json',
        method: 'post',
        data
    })
}
export function getVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/voucherType/get.json',
        method: 'post',
        data
    })
}
export function listVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/voucherType/list.json',
        method: 'post',
        data
    })
}