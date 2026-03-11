import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ExpensesView from '../views/ExpensesView.vue'
import MileageView from '../views/MileageView.vue'
import CarsView from '../views/CarsView.vue'
import AccountView from '../views/AccountView.vue'
import FaqView from '../views/FaqView.vue'
import ContactsView from '../views/ContactsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/expenses', name: 'expenses', component: ExpensesView },
    { path: '/mileage', name: 'mileage', component: MileageView },
    { path: '/cars', name: 'cars', component: CarsView },
    { path: '/account', name: 'account', component: AccountView },
    { path: '/faq', name: 'faq', component: FaqView },
    { path: '/contacts', name: 'contacts', component: ContactsView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router