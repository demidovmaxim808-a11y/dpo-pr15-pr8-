<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="bi bi-speedometer2 me-2"></i>CarCostMaster
      </router-link>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-for="item in navItems" :key="item.path">
            <router-link 
              class="nav-link" 
              :to="item.path"
              :class="{ active: $route.path === item.path }"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const $route = useRoute()
const navItems = [
  { path: '/', name: 'Главная' },
  { path: '/about', name: 'О проекте' },
  { path: '/expenses', name: 'Расходы' },
  { path: '/mileage', name: 'Пробег' },
  { path: '/cars', name: 'Мои автомобили' },
  { path: '/account', name: 'Личный кабинет' },
  { path: '/faq', name: 'FAQ' },
  { path: '/contacts', name: 'Контакты' }
]
</script>