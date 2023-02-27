import request from '@/utils/request'


// 工单列表
// export function apiOrderList(data) {
//   return request({
//     url: '/api/wx/gd',
//     method: 'GET',
//     data,
//   })
// }


// code
export function getWxLogin(data) {
  return request({
    url: '/api/wx/gd',
    method: 'GET',
    data,
  })
}