// 4.15 problem in line 4 and 22-26
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import CategoryView from '../views/CategoryView.vue'
import AboutView from '../views/AboutView.vue'
import StudentView from '../views/StudentView.vue'
import EventDetailView from '@/views/event/EventDetailView.vue'
import EventEditView from '@/views/event/EventEditView.vue'
import EventRegisterView from '@/views/event/EventRegisterView.vue'
import EventLayoutView from '@/views/event/EventLayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      props: (route) => ({page: parseInt(route.query?.page as string || '1')})
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
      name: 'event-layout',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        // <-- put API call here
        const eventStore = useEventStore()
        const id: number = parseInt(to.params.id as string)
        return EventService.getEventById(id)
        .then((response) => {
          //need to set up data for component
          eventStore.setEvent(response.data)
        }).catch((error) =>{
          if(error.response && error.response.status === 404){
            return {
              name: '404-resourse',
              params: { resoures: 'event'}
            }
          }else{
            return {name: 'network-error'}
          }
        })
      },
      children: [
        {
          path: 'detail',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegisterView,
          props: true
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    { 
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top:0 }
    }
  }
})

router.beforeEach(() =>{
  NProgress.start()
})
router.afterEach(() =>{
  NProgress.done()
})

export default router
