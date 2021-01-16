import request from '@/utils/request'

export function listCompany4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/company/list4Me.json',
        method: 'post',
        data
    })
}

export function saveCompany4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/company/save4Me.json',
        method: 'post',
        data
    })
}

export function updateCompany4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/company/edit4Me.json',
        method: 'post',
        data
    })
}

export function deleteCompany4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/company/delete4Me.json',
        method: 'post',
        data
    })
}

export function batchDeleteCompany4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/company/batchDelete4Me.json',
        method: 'post',
        data
    })
}

export function getCompany4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/company/get4Me.json',
        method: 'post',
        data
    })
}

export function listAll4Me(data) {
    return request({
        url: '/wuyi_fapiao/v1/company/listAll4Me.json',
        method: 'post',
        data
    })
}