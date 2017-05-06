import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '@/components/LandingPage'
import Stats from '@/components/Stats'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    }
  ]
})
