<template>
  <header class="bg-light py-5 mt-5">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center">Личный кабинет</h1>
    </div>
  </header>

  <main class="container py-5">
    <div class="row justify-content-center">
      <!-- Форма входа -->
      <div class="col-md-6 col-lg-5 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary text-white text-center">
            <h4 class="mb-0"><i class="bi bi-box-arrow-in-right me-2"></i>Вход</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input 
                  type="email" 
                  class="form-control" 
                  v-model="loginForm.email"
                  placeholder="example@email.com"
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Пароль</label>
                <input 
                  type="password" 
                  class="form-control" 
                  v-model="loginForm.password"
                  placeholder="••••••••"
                  required
                >
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember" v-model="loginForm.remember">
                <label class="form-check-label" for="remember">Запомнить меня</label>
              </div>
              <button type="submit" class="btn btn-primary w-100">Войти</button>
              <div class="text-center mt-3">
                <a href="#" class="text-decoration-none small">Забыли пароль?</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Форма регистрации -->
      <div class="col-md-6 col-lg-5 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-header bg-success text-white text-center">
            <h4 class="mb-0"><i class="bi bi-person-plus me-2"></i>Регистрация</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label">Имя</label>
                <input type="text" class="form-control" v-model="registerForm.name" placeholder="Иван" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="registerForm.email" placeholder="example@email.com" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Пароль</label>
                <input type="password" class="form-control" v-model="registerForm.password" placeholder="Не менее 6 символов" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Подтверждение пароля</label>
                <input type="password" class="form-control" v-model="registerForm.confirmPassword" placeholder="••••••••" required>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="agree" v-model="registerForm.agree" required>
                <label class="form-check-label" for="agree">Согласие на обработку данных</label>
              </div>
              <button type="submit" class="btn btn-success w-100">Зарегистрироваться</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue'

const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const handleLogin = () => {
  console.log('Login attempt:', loginForm)
  alert('Демо-режим: вход в разработке')
}

const handleRegister = () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('Пароли не совпадают')
    return
  }
  console.log('Register attempt:', registerForm)
  alert('Демо-режим: регистрация в разработке')
}
</script>