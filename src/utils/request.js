import axios from 'axios'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'

// 定义在 cookie 中 jwt 的 token 的 key 名称
const TOKEN_KEY = 'web_token'

// 定义当前应用 ID，nginx 查看 log 的时候知道是来自哪个应用 （ 可选 ）
// 除了 APPID 也可以根据业务的需求场景加上 user_id 等信息
const APPID = import.meta.env.VITE_APP_APPID

// 创建请求单例
const axiosInstance = axios.create()
axiosInstance.defaults.timeout = 20000

// 全局错误处理
const handleErrorRequest = (error) => {
  const { response } = error
  const status = response ? response.status : 408
  const token = Cookies.get(TOKEN_KEY)

  if (response) {
    const { data } = response
    const message = data ? data.msg || data.message : '服务器发送错误，请稍后再试'
    switch (status) {
      case 401:
        // token 过期，跳转到首页重新登录
        ElMessage.error('未登录，请登录重试')
        if (token) {
          Cookies.remove(TOKEN_KEY, {
            path: '/',
            domain: `${import.meta.env.VITE_APP_DOMAIN}`
          })
          window.location.href = `/`
        }
        break
      case 403:
        ElMessage.error('没有权限，联系管理员')
        break
      default:
        ElMessage.error(message)
        break
    }
  } else {
    ElMessage.error('网络超时')
  }
}

// 添加一个请求拦截器（ 放置 token 和 业务参数 )
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.params = {
    ...config.params,
    app_id: APPID
  }
  return config
})

// 添加响应拦截器 ( 格式化返回数据，把 data 拿掉 )
axiosInstance.interceptors.response.use(
  (res) => {
    switch (true) {
      case !!res.data.error_code:
        ElMessage.error(res.data.msg)
        return Promise.reject(res.data)
      default:
        return res.data.data
    }
  },
  (error) => {
    handleErrorRequest(error)
    return Promise.reject(error)
  }
)

/* [请求库] 重新包装，让传递的参数更符合自己的习惯
 ** @params url         { string }   @default => '' [接口地址]
 ** @params data/params { object }   @default => {} [发送数据]
 ** @params config      { object }   配置
 */
export default {
  post(url = '', data = {}, config = {}) {
    return axiosInstance.post(url, data, config)
  },

  put(url = '', data = {}, config = {}) {
    return axiosInstance.put(url, data, config)
  },

  get(url = '', params = {}, config = {}) {
    const OPTIONS = { params, ...config }
    return axiosInstance.get(url, OPTIONS)
  },

  delete(url = '', params = {}, config = {}) {
    const OPTIONS = { params, ...config }
    return axiosInstance.delete(url, OPTIONS)
  }
}
