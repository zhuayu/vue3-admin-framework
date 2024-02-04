export function formatRoutes(routes, permissions) {
  return filterNavRoutes(filterPermissionRoutes(routes, permissions))
}

export function filterPermissionRoutes(routes, permissions) {
  const filterRoutes = []
  routes.forEach((data) => {
    const route = { ...data }
    const notPermission = !route.meta || !route.meta.permission
    const hasPermission =
      !notPermission && route.meta.permission.split(',').some((item) => permissions.includes(item))
    const passPermission = notPermission || hasPermission
    let hasPath = true
    if (route.children) {
      route.children = filterPermissionRoutes(data.children, permissions)
      if (route.children.length === 0) {
        hasPath = false
      }
    }
    if (passPermission && hasPath) {
      filterRoutes.push(route)
    }
  })
  return filterRoutes
}

export function filterNavRoutes(routes) {
  let result = []
  routes.forEach((data) => {
    if (data.meta && data.meta.nav) {
      let item = {
        name: data.name,
        meta: data.meta
      }
      if (data.children) {
        item.children = filterNavRoutes(data.children)
      }
      result.push(item)
    } else if (data.children) {
      filterNavRoutes(data.children).forEach((item) => {
        result.push(item)
      })
    }
  })
  return result
}
