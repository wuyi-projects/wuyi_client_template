import request from '@/utils/request'

/* 查询 */
export function listImportancelog(data) {
    return request({
        url: '/wuyi_uas/v1/permission/list.json',
        method: 'post',
        data
    })
}