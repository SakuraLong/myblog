export default {
  path: '/manage',
  name: 'manage',
  component: () => import('@/views/Manage'),
  redirect: '/manage/home',
  children: [
    {
      path: 'home',
      name: 'manageHome',
      component: () => import('@/views/Manage/views/Home')
    },
    {
      path: 'editor/:pathMatch(.*)*',
      name: 'manageEditor',
      component: () => import('@/views/Manage/views/Editor')
    },
    {
      path: 'categories',
      name: 'manageCategories',
      component: () => import('@/views/Manage/views/Categories')
    }
  ]
}
