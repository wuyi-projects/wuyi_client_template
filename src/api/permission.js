import request from '@/utils/request'

export function listPermission(data) {
  return request({
    url: '/wuyi_uas/v1/permission/list.json',
    method: 'post',
    data
  })
}

export function listRole(data) {
  return request({
    url: '/wuyi_uas/v1/role/list.json',
    method: 'post',
    data
  })
}

export function listAllPermission4Role(data) {
  return request({
    url: '/wuyi_uas/v1/rolePermission/listAll4Role.json',
    method: 'post',
    data
  })
}

export function listAllPermissionGroupInfo() {
  return request({
    url: '/wuyi_uas/v1/permissionGroupInfo/listAll.json',
    method: 'post'
  })
}

/** 新增权限 */
export function savePermission(data) {
  return request({
    url: '/wuyi_uas/v1/permission/save.json',
    method: 'post',
    data
  })
}

/** 编辑权限 */
export function updatePermission(data) {
  return request({
    url: '/wuyi_uas/v1/permission/edit.json',
    method: 'post',
    data
  })
}

/** 新增角色 */
export function saveRole(data) {
  return request({
    url: '/wuyi_uas/v1/role/save.json',
    method: 'post',
    data
  })
}

/** 删除角色 */
export function deleteRole(data) {
  return request({
    url: '/wuyi_uas/v1/role/delete.json',
    method: 'post',
    data
  })
}

/** 修改角色 */
export function updateRole(data) {
  return request({
    url: '/wuyi_uas/v1/role/edit.json',
    method: 'post',
    data
  })
}

export function savePermissionGroupInfo(data) {
  return request({
    url: '/wuyi_uas/v1/permissionGroupInfo/save.json',
    method: 'post',
    data
  })
}

export function deletePermissionGroupInfo(data) {
  return request({
    url: '/wuyi_uas/v1/permissionGroupInfo/delete.json',
    method: 'post',
    data
  })
}

export function deletePermission(data) {
  return request({
    url: '/wuyi_uas/v1/permission/delete.json',
    method: 'post',
    data
  })
}

/** 批量删除权限 */
export function batchDeletePermission(data) {
  return request({
    url: '/wuyi_uas/v1/permission/batchDelete.json',
    method: 'post',
    data
  })
}

export function batchDeletePermissionGroupInfo(data) {
  return request({
    url: '/wuyi_uas/v1/permissionGroupInfo/batchDelete.json',
    method: 'post',
    data
  })
}

export function updatePermissionGroupInfo(data) {
  return request({
    url: '/wuyi_uas/v1/permissionGroupInfo/edit.json',
    method: 'post',
    data
  })
}

export function listPermissionGroupInfoByPage(data) {
  return request({
    url: '/wuyi_uas/v1/permissionGroupInfo/list.json',
    method: 'post',
    data
  })
}

export function listRolePermission(data) {
  return request({
    url: '/wuyi_uas/v1/rolePermission/list.json',
    method: 'post',
    data
  })
}

/** 分页查询全部未分组权限(条件) */
export function listPermissions4UngroupedWithPage(data) {
  return request({
    url: '/wuyi_uas/v1/permission/listPermissions4UngroupedWithPage.json',
    method: 'post',
    data
  })
}

/** 查询指定分组全部权限信息 */
export function listAllPermissions4Group(data) {
  return request({
    url: '/wuyi_uas/v1/permission/listAllPermissions4Group.json',
    method: 'post',
    data
  })
}

/** 指定权限加入分组信息 */
export function setGroupInfo4Permission(data) {
  return request({
    url: '/wuyi_uas/v1/permission/setGroupInfo4Permission.json',
    method: 'post',
    data
  })
}

/** 批量指定权限加入分组信息 */
export function setGroupInfo4Permissions(data) {
  return request({
    url: '/wuyi_uas/v1/permission/setGroupInfo4Permissions.json',
    method: 'post',
    data
  })
}

/** 清除指定分组下全部权限分组信息 */
export function clearGroupInfo4AllPermissions(data) {
  return request({
    url: '/wuyi_uas/v1/permission/clearGroupInfo4AllPermissions.json',
    method: 'post',
    data
  })
}

/** 清除指定权限分组信息 */
export function clearGroupInfo4Permission(data) {
  return request({
    url: '/wuyi_uas/v1/permission/clearGroupInfo4Permission.json',
    method: 'post',
    data
  })
}

/** 查询全部分组及权限信息 */
export function listAllPermissionsAndGroupInfo(data) {
  return request({
    url: '/wuyi_uas/v1/permission/listAllPermissionsAndGroupInfo.json',
    method: 'post',
    data
  })
}

/** grantAndRevoke */
export function grantAndRevoke(data) {
  return request({
    url: '/wuyi_uas/v1/rolePermission/grantAndRevoke.json',
    method: 'post',
    data
  })
}

export function listAllRole4Post(data) {
  return request({
    url: '/wuyi_oa/v1/postRole/listAllRole4Post.json',
    method: 'post',
    data
  })
}

export function listAllRole() {
  return request({
    url: '/wuyi_uas/v1/role/listAll.json',
    method: 'post'
  })
}

export function allocationRole4Post(data) {
  return request({
    url: '/wuyi_oa/v1/postRole/allocationRole4Post.json',
    method: 'post',
    data
  })
}
