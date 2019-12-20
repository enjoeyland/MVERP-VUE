import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  const hastoken = getToken()

  if (to.meta.requireAuth) {
    if (hastoken) {
      next()
    } else {
      if (to.path === '/login') {
        next()
      }
    }
  } else {
    next();
  }
})
