import request from '@/utils/request'
// 工单列表
export function apiOrderList(data) {
  return request({
    url: '/api/joke',
    method: 'GET',
    data,
  })
}