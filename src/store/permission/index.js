import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles, route) {
  if (roles.some(role => route.meta.roles.indexOf(role) >= 0)) {
    return true
  } else {
    return false
  }
}

function filterAsyncRoutes(asyncRouterMap, roles) {
  var res =[]
  asyncRouterMap.forEach(route => {
    if (hasPermission(roles, route)) {
      res.push(route)
    }
  })
  return res
}

function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j].meta.level > arr[j+1].meta.level) {
        var temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

function combineRoutes(accessedRoutes, constantRouterMap) {
  var res = []
  var reshidden = []
  constantRouterMap.forEach(consRoute => {
    if (!consRoute.children) {
      reshidden.push(consRoute)
    } else {
       var tmp = consRoute
       var tmpAccessedRoute = []
      accessedRoutes.forEach(accessedRoute => {
        if (tmp.path === accessedRoute.path) {
        tmp.children =  tmp.children.concat(accessedRoute.children)
        tmpAccessedRoute.push[accessedRoute]
        } else {
          if(!tmpAccessedRoute.includes(accessedRoute)) {
            res.push(accessedRoute)
          }
        }
      })
      res.push(tmp)
    }
  })
  bubbleSort(res)
  res = res.concat(reshidden)
  return res
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    },
    SET_ADDROUTES: (state, addRoutes) => {
      state.addRoutes = addRoutes
    }
  },
  actions: {
    GenerateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes = []
        if (roles.includes('S')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ADDROUTES', accessedRoutes)
        let userRoutes = []
        userRoutes = combineRoutes(accessedRoutes, constantRoutes)
        commit('SET_ROUTES', userRoutes)

        resolve(userRoutes)
      })
    }
  }
}


export default permission
