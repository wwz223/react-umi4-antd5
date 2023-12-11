import { defineConfig } from '@umijs/max';
import { DEFAULT_Title } from "./src/constants"

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  tailwindcss: {},
  layout: {
    title: DEFAULT_Title,
  },
  define: {
    'process.env': {
      'PUBLIC_API_URL': process.env.PUBLIC_API_URL
    }
  },
  favicons: ['/images/icon.png'],
  routes: [
    {
      path: '/',
      redirect: '/former/list'
    },
    {
      name: '登录',
      layout: false,
      path: '/login',
      component: './login',
    },
    {
      name: '模型管理',
      path: '/former',
      routes: [
        {
          name: '模型列表',
          path: 'list',
          component: './former/list',
        },
        {
          name: '模型分类',
          path: 'classification',
          component: './former/classification/index.tsx',
        },
        {
          name: '模型标签',
          path: 'tags',
          component: './former/tags',
        },
        {
          name: '模型详情',
          path: ':modelId',
          component: './former/list/detail.tsx',
          hideInMenu: true,
        },
      ]
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './table',
    },
  ],
  npmClient: 'pnpm',
});

