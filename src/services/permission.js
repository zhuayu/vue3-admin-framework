import request from '@/utils/request.js'
import API from '@/consts/api.js'

const permissionService = {
  permissions: () => {
    return request.get(API.permissions)
  }
}

export default permissionService
