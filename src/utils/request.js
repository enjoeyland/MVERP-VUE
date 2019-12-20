import axios from 'axios';
import qs from 'qs';
import store from '../store';
import { Message,MessageBox} from 'element-ui'
import { getToken} from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_SERVER,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() //
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '20000') {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === '50008' || res.code === '50012' || res.code === '50014') {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default service

export function get(url, params) {
    if (!url) return Promise.resolve();
    url += buildQueries(params);
    return service.get(url).then(resp => {
        console.log('[http-get] access ', url, ' resp: ', resp);
        return Promise.resolve(resp.data);
    }).catch(err => {
        return Promise.reject(err);
    });
}

export function post(url, body) {
    return service.post(url, body).then(resp => {
        console.log('[http-post] access ', url, ' body: ', body,' resp: ', resp);
        return Promise.resolve(resp.data);
    }).catch(err => {
        return Promise.reject(err);
    });
}

function buildQueries(params) {
    if (!params) return '';
    let keys = Object.keys(params);
    if (keys.length === 0) return '';
    return ('?' + keys.map(q => {
        if(params[q] !== undefined) return q + '=' + encodeURIComponent(params[q]);
    }).join('&'));
}
