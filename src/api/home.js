import request from '@/utils/request'


// 工单列表
// export function apiOrderList(data) {
//   return request({
//     url: '/products.shtml',
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

// 产品列表
export function apiProList(data) {
  return request({
    url: '/products.shtml',
    method: 'POST',
    data,
  })
}
