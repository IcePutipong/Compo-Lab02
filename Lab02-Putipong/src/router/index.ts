// 4.15 problem in line 4 and 22-26
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import CategoryView from '../views/CategoryView.vue'
import AboutView from '../views/AboutView.vue'
import StudentView from '../views/StudentView.vue'
import EventDetailView from '../views/EventDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
    {
      path: '/event/:id',
      name: 'event-datail',
      component: EventDetailView,
      props: true
    }
  ]
})

export default router
