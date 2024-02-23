const RoleIndex = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleIndex.vue')
const RoleEdit = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleEdit.vue')
const RoleShow = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleShow.vue')
const ManagerIndex = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/ManagerIndex.vue')

export default [
  {
    path: '/permission',
    name: 'Permission',
    redirect: { name: 'RoleIndex' },
    meta: {
      permission: 'role-index',
      nav: {
        icon: 'icon-setting',
        title: '权限设置'
      },
      breadcrumb: {
        name: '权限'
      }
    },
    children: [
      {
        path: 'role',
        name: 'RoleIndex',
        component: RoleIndex,
        meta: {
          permission: 'role-index',
          nav: {
            title: '角色列表'
          },
          breadcrumb: {
            name: '角色列表'
          }
        }
      },
      {
        path: 'role/:id',
        name: 'RoleShow',
        component: RoleShow
      },
      {
        path: 'role/:id/edit',
        name: 'RoleEdit',
        component: RoleEdit
      },
      {
        path: 'manager',
        name: 'ManagerIndex',
        component: ManagerIndex,
        meta: {
          permission: 'manager-index',
          nav: {
            title: '管理员'
          },
          breadcrumb: {
            name: '管理员'
          }
        }
      }
    ]
  }
]
