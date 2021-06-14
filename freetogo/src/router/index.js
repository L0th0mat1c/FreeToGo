import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import QuickSearch from '../views/QuickSearch.vue'
import Login from '../views/Login.vue'
import Manage from '../views/Manage.vue'
import Profil from '../views/Profil.vue'
import Token from '../views/Token.vue'
import Register from '../views/Register.vue'
import passwordReset from '../views/passwordReset.vue'
import requestPasswordReset from '../views/requestPasswordReset.vue'
import Recipe from '../views/Recipe.vue'
import StockSearch from '../views/StockSearch.vue'
import FilterSearch from '../views/FilterSearch.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin/:token',
    name: 'Token',
    component: Token
  },
  {
    path: '/QuickSearch',
    name: 'QuickSearch',
    component: QuickSearch
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {

    path: '/Manage',
    name: 'Manage',
    component: Manage
  },
  {
    path: '/Profil/:userId',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/passwordReset/:token',
    name: 'passwordReset',
    component: passwordReset

  },
  {
    path: '/requestPasswordReset',
    name: 'requestPasswordReset',
    component: requestPasswordReset

  },
  {
    path: '/Recipe/:id/:data',
    name: 'Recipe',
    component: Recipe
  },
  {
    path: '/StockSearch/:stock',
    name: 'StockSearch',
    component: StockSearch

  },

  {
    path: '/FilterSearch',
    name: 'FilterSearch',
    component: FilterSearch

  },



]

const router = new VueRouter({
  routes
})

export default router
