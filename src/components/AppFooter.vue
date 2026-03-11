<template>
  <footer class="bg-dark text-white py-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4">
          <h5 class="fw-bold"><i class="bi bi-speedometer2 me-2"></i>CarCostMaster</h5>
          <p class="text-white-50">Умный учёт расходов на автомобиль. Контролируйте затраты, планируйте бюджет, анализируйте данные.</p>
          <div class="mt-3">
            <span class="badge bg-primary me-1">#автоучёт</span>
            <span class="badge bg-success me-1">#расходы</span>
            <span class="badge bg-info">#аналитика</span>
          </div>
        </div>
        
        <div class="col-md-2 mb-4">
          <h5 class="fw-bold">Навигация</h5>
          <ul class="list-unstyled">
            <li class="mb-2" v-for="item in navItems" :key="item.path">
              <router-link :to="item.path" class="text-white-50 text-decoration-none">
                <i class="bi bi-chevron-right me-1 small"></i>{{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="col-md-3 mb-4">
          <h5 class="fw-bold">Контакты</h5>
          <ul class="list-unstyled">
            <li class="mb-2 text-white-50"><i class="bi bi-envelope me-2"></i>CarCostMaster@gmail.com</li>
            <li class="mb-2 text-white-50"><i class="bi bi-telephone me-2"></i>+7 (999) 000-00-00</li>
            <li class="mb-2 text-white-50"><i class="bi bi-geo-alt me-2"></i>г. Москва, пр. Вернадского, 78</li>
          </ul>
        </div>
        
        <div class="col-md-3 mb-4">
          <h5 class="fw-bold">Мы в соцсетях</h5>
          <div class="d-flex gap-3">
            <a href="#" class="btn btn-outline-light btn-sm rounded-circle" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-telegram fs-5"></i>
            </a>
            <a href="#" class="btn btn-outline-light btn-sm rounded-circle" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-vk fs-5"></i>
            </a>
            <a href="#" class="btn btn-outline-light btn-sm rounded-circle" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-youtube fs-5"></i>
            </a>
            <a href="#" class="btn btn-outline-light btn-sm rounded-circle" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-github fs-5"></i>
            </a>
          </div>
          
          <div class="mt-4">
            <h6 class="fw-bold text-white">Подпишитесь на новости</h6>
            <div class="input-group">
              <input type="email" class="form-control form-control-sm bg-dark border-secondary text-white" placeholder="Ваш email">
              <button class="btn btn-sm btn-primary" type="button"><i class="bi bi-send"></i></button>
            </div>
          </div>
        </div>
      </div>
      
      <hr class="bg-white opacity-25 my-4">
      
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
          <p class="mb-0 text-white-50 small">© 2026 CarCostMaster. Все права защищены.</p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <a href="#" class="text-white-50 text-decoration-none small me-3">Политика конфиденциальности</a>
          <a href="#" class="text-white-50 text-decoration-none small">Пользовательское соглашение</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navItems = [
  { path: '/', name: 'Главная' },
  { path: '/about', name: 'О проекте' },
  { path: '/expenses', name: 'Расходы' },
  { path: '/mileage', name: 'Пробег' },
  { path: '/cars', name: 'Автомобили' },
  { path: '/account', name: 'Личный кабинет' },
  { path: '/faq', name: 'FAQ' },
  { path: '/contacts', name: 'Контакты' }
]
</script>