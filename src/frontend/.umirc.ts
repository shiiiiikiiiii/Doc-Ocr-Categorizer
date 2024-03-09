import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Doc-Ocr-Categotizeer',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '上传文档',
      path: '/upload',
      component: './UploadDocument',
    },
    {
      name: '搜索文档',
      path: '/search',
      component: './SearchDocument',
    },
    {
      name: '文档分类管理',
      path: '/category',
      component: './CategoryManagement',
    },
    {
      // parameter `name` not set, so will not be shown in the list
      path: '/category/:categoryId',
      component: './CategoryDetail',
    },
    // {
    //   name: '(umi)权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: '(umi)CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
  ],
  npmClient: 'npm',
});

