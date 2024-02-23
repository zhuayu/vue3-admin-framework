const ArticleIndex = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleIndex.vue')
const ArticleEdit = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleEdit.vue')
const ArticleShow = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleShow.vue')
const ArticleCreate = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleCreate.vue')
const ArticleClassify = () =>
  import(/* webpackChunkName: "article" */ '@/views/Article/ArticleClassify.vue')

export default [
  {
    path: '/article',
    name: 'Article',
    redirect: { name: 'ArticleIndex' },
    meta: {
      permission: 'article-index',
      nav: {
        icon: 'icon-file',
        title: '文章管理'
      },
      breadcrumb: {
        name: '文章'
      }
    },
    children: [
      {
        path: '',
        name: 'ArticleIndex',
        component: ArticleIndex,
        meta: {
          permission: 'article-index',
          nav: {
            title: '文章列表'
          },
          breadcrumb: {
            name: '文章列表'
          }
        }
      },
      {
        path: ':id',
        name: 'ArticleShow',
        component: ArticleShow
      },
      {
        path: ':id/edit',
        name: 'ArticleEdit',
        component: ArticleEdit
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: ArticleCreate
      },
      {
        path: 'classify',
        name: 'ArticleClassify',
        component: ArticleClassify,
        meta: {
          permission: 'Article-classify',
          nav: {
            icon: 'el-icon-goods',
            title: '文章分类'
          },
          breadcrumb: {
            name: '文章分类'
          }
        }
      }
    ]
  }
]
