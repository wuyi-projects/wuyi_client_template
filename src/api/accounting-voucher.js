import request from '@/utils/request'

export function saveAccountingVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/save.json',
        method: 'post',
        data
    })
}

export function deleteAccountingVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/delete.json',
        method: 'post',
        data
    })
}

export function batchDeleteAccountingVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/batchDelete.json',
        method: 'post',
        data
    })
}

export function updateAccountingVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/edit.json',
        method: 'post',
        data
    })
}

export function listAccountingVoucher(data) {
    return request({
        url: '/wuyi_fapiao/v1/accountingVoucher/list.json',
        method: 'post',
        data
    })
}