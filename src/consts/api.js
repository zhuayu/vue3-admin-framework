const PREFIX = `${import.meta.env.VITE_APP_HOST}`
const WEB_PREFIX = `${PREFIX}/api/web`
const ADMIN_PREFIX = `${PREFIX}/api/admin`

export default {
  userInfo: `${WEB_PREFIX}/users/user-info`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  permissions: `${ADMIN_PREFIX}/api/permission/permissions`,
}
