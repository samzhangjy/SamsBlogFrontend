/* Defines Vue router routes */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import NewPostPage from '../views/NewPostPage.vue'
import About from '../views/About.vue'
import ViewPostPage from '../views/ViewPostPage.vue'
import EditPostPage from '../views/EditPostPage.vue'
import TagsPage from '../views/TagsPage.vue'
import ViewTagPage from '../views/ViewTagPage.vue'
import ViewLinksPage from '../views/LinksPage.vue'
import AddLinkPage from '../views/AddLinkPage.vue'
import EditLinkPage from '../views/EditLinkPage.vue'
import ArchivePage from '../views/ArchivePage.vue'
import SettingsPage from '../views/SettingsPage.vue'

Vue.use(VueRouter)

const routes = [
  // Homepage
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: false
    }
  },
  // Login page
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      title: '登录',
      login: false
    }
  },
  // New post page
  {
    path: '/post/new',
    name: 'NewPost',
    component: NewPostPage,
    meta: {
      title: '写文章',
      login: true
    }
  },
  // View post page
  {
    path: '/post/:postId',
    name: 'ViewPost',
    component: ViewPostPage,
    meta: {
      title: '查看博客',
      login: false
    }
  },
  // Edit post page
  {
    path: '/post/edit/:postId',
    name: 'EditPost',
    component: EditPostPage,
    meta: {
      title: '编辑文章',
      login: true
    }
  },
  // Tags page
  {
    path: '/tags/all',
    name: 'Tags',
    component: TagsPage,
    meta: {
      title: '标签',
      login: false
    }
  },
  // View tag page
  {
    path: '/tags/:tagName',
    name: 'ViewTag',
    component: ViewTagPage,
    meta: {
      title: '标签',
      login: false
    }
  },
  // View links page
  {
    path: '/links',
    name: 'ViewLinks',
    component: ViewLinksPage,
    meta: {
      title: '友情链接',
      login: false
    }
  },
  // Edit link page
  {
    path: '/links/edit/:linkId',
    name: 'EditLink',
    component: EditLinkPage,
    meta: {
      title: '编辑友链',
      login: true
    }
  },
  // Add link page
  {
    path: '/links/add',
    name: 'AddLink',
    component: AddLinkPage,
    meta: {
      title: '添加友链',
      login: true
    }
  },
  // Archive page
  {
    path: '/archive',
    name: 'Archive',
    component: ArchivePage,
    meta: {
      title: '归档',
      login: false
    }
  },
  // Settings page
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
    meta: {
      title: '设置',
      login: true
    }
  },
  // About page
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于',
      login: false
    }
  },
  // 404 page
  {
    path: '*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      title: '404',
      login: false
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
