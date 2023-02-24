import request from '@/utils/request'
// 用户登录
export function loginBtn(data) {
  return request({
    url: '/api/search',
    method: 'POST',
    data,
  })
}



