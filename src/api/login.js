import request from '@/utils/request'
// 用户登录
export function loginBtn(data) {
  return request({
    url: '/register.shtml',
    method: 'POST',
    data,
  })
}

// 获取验证码
export function apiGetCode(data) {
  return request({
    url: '/getYzm.shtml',
    method: 'POST',
    data,
  })
}



