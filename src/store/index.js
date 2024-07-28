import { createStore } from 'vuex'

export default createStore({
  state: {
    selectorShow: false,
    error: null,
    searchKey: '',
    navItems: [
      ['/', 'Nav.home', 'HomeFilled', 'home'],
      ['/archive', 'Nav.archive', 'Collection', 'archive'],
      ['/categories', 'Nav.categories', 'Folder', 'categories'],
      ['/tags', 'Nav.tags', 'PriceTag', 'tags'],
      ['/search', 'Nav.search', 'Search', 'search'],
      ['/menu', 'Nav.menu', 'Menu', 'menu']
    ],
    tagSortOrder: true,
    categorySortOrder: true,
    errorMsg: null,
    login: null
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
