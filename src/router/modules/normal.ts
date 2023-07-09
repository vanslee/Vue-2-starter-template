import type { RouteConfig } from 'vue-router/types/router'
import Layout from '@/layout/inde.vue'
export const normalRoute: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/',
    meta: {
      hidden: true,
    },
    children: [
      {
        meta: {
          title: '文章列表',
          icon: 'user',
        },
        path: '/',
        name: 'Index',
        // component: () => import('@/layout/main/index.vue'),
        components: {
          main: () => import('@/views/article/ArticleListCard.vue'),
          left: () => import('@/views/article/ArticleLeftAside.vue'),
        },
      },
    ],
  },
  {
    path: '/article/:id',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '',
        name: 'ArticleDetails',
        meta: {
          title: '文章详情',
          icon: 'user',
          permissions: ['admin'],
        },
        components: {
          main: () => import('@/views/article/ArticleDetails.vue'),
          // left_aside: () =>
          //   import('@/layout/components/Sidebar/DetailsLeftAside.vue'),
          // right_aside: () =>
          //   import('@/layout/components/Sidebar/DetailsRightAside.vue'),
        },
      },
    ],
  },
  {
    path: '/write',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '',
        name: 'Write',
        meta: {
          icon: 'user',
          title: '发布文章',
          permissions: ['admin'],
        },
        components: {
          main: () => import('@/views/article/ArticleWrite.vue'),
          left: () => import('@/views/article/ArticleLeftAside.vue'),
          // left_aside: () =>
          //   import('@/layout/components/Sidebar/WriteLeftAside.vue'),
        },
      },
    ],
  },
  {
    path: '/article/category/:cid',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/',
        name: 'Article',
        meta: {
          title: '文章类别',
          permissions: ['admin'],
        },
        components: {
          main: () => import('@/views/article/ArticleListCard.vue'),
          // left_aside: () => import('@/layout/components/Sidebar/BlogLeftAside.vue'),
        },
      },
    ],
  },
  {
    path: '/categories',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/',
        name: 'Categories',
        meta: {
          icon: 'user',
          title: '文章分类',
          permissions: ['admin'],
        },
        components: {
          main: () => import('@/views/article/ArticleCategories.vue'),
          // left_aside: () => import('@/layout/components/Sidebar/BlogLeftAside.vue'),
        },
      },
    ],
  },
  {
    path: '/tags',
    component: Layout,
    meta: {
      hidden: true,
      title: '文章标签',
    },
    children: [
      {
        path: '/',
        name: 'Tags',
        meta: {
          icon: 'user',
          title: '文章标签',
          permissions: ['admin'],
        },
        components: {
          // main: () => import('@/layout/components/Mains/ArticleTags.vue'),
          // left_aside: () => import('@/layout/components/Sidebar/BlogLeftAside.vue'),
        },
      },
    ],
  },

]
