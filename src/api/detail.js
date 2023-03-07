import request from '@/utils/request'


// 详情页
export function apiOrderDetail(data) {
    return request({
      url: '/order_detail.shtml',
      method: 'POST',
      data,
    })
  }


  // 地址
export function apiAddress(data) {
    return request({
      url: '/order_back.shtml',
      method: 'POST',
      data,
    })
  }


    // 确认收获
export function apiReceipt(data) {
    return request({
      url: '/order_confirm.shtml',
      method: 'POST',
      data,
    })
  }

      // 修改收获地址
export function apiChangeReceipt(data) {
    return request({
      url: '/order_modi_address.shtml',
      method: 'POST',
      data,
    })
  }