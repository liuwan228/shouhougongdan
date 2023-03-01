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

// 产品类型列表
export function apiProList(data) {
  return request({
    url: '/products.shtml',
    method: 'POST',
    data,
  })
}

// 已登记产品列表
export function apiOrderList(data) {
  return request({
    url: '/products.shtml',
    method: 'POST',
    data,
  })
}

// 登记新购买产品
export function apiOrderPro(data) {
  return request({
    url: '/sell_add.shtml',
    method: 'POST',
    data,
  })
}
