import request from '@/utils/request'


// 工单列表
// export function apiOrderList(data) {
//   return request({
//     url: '/api/wx/gd',
//     method: 'POST',
//     data,
//   })
// }


// 获取用户信息  
export function apiGetUserInfo(data) {
  return request({
    url: '/getUserInfo.shtml',
    method: 'POST',
    data,
  })
}