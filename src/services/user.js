import request from '@/utils/request.js'
import API from '@/consts/api.js'

const userService = {
  getUserInfo() {
    return request.get(API.userInfo)
  }
}

export default userService
