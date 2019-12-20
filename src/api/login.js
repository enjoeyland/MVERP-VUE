import request from '@/utils/request'
import qs from 'qs';

export function login(username, password) {
  return request({
    url: '/erp/user/auth/login',
    method: 'post',
    data: qs.stringify({
      username,
      password
    })
  })
}

export function getInfo(token) {
  return request({
    url: '/erp/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/erp/user/logout',
    method: 'post'
  })
}
