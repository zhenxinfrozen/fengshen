import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Wiki from '../pages/wiki/Wiki.vue'
import WikiRequirements from '../pages/stories/Requirements.vue'
import Stories from '../pages/stories/Stories.vue'
import Characters from '../pages/characters/Characters.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/wiki', name: 'Wiki', component: Wiki },
  { path: '/wiki/requirements', component: WikiRequirements },
  { path: '/stories', name: 'Stories', component: Stories },
  { path: '/characters', name: 'Characters', component: Characters }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If navigating to a hash, smooth scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // savedPosition for back/forward
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
