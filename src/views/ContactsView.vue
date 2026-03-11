<template>
  <header class="bg-light py-5 mt-5">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center">Контакты</h1>
    </div>
  </header>

  <main class="container py-5">
    <div class="row">
      <!-- Форма обратной связи -->
      <div class="col-lg-6 mb-5">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0"><i class="bi bi-chat-dots me-2"></i>Обратная связь</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <!-- Имя -->
              <div class="mb-3">
                <label class="form-label">Имя <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.name }"
                  v-model="form.name"
                  placeholder="Введите ваше имя"
                >
                <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label class="form-label">Email <span class="text-danger">*</span></label>
                <input 
                  type="email" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.email }"
                  v-model="form.email"
                  placeholder="example@email.com"
                >
                <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
              </div>

              <!-- Тема -->
              <div class="mb-3">
                <label class="form-label">Тема <span class="text-danger">*</span></label>
                <select 
                  class="form-select" 
                  :class="{ 'is-invalid': errors.topic }"
                  v-model="form.topic"
                >
                  <option value="" disabled>Выберите тему</option>
                  <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
                </select>
                <div v-if="errors.topic" class="invalid-feedback">{{ errors.topic }}</div>
              </div>

              <!-- Сообщение -->
              <div class="mb-3">
                <label class="form-label">Сообщение</label>
                <textarea 
                  class="form-control" 
                  rows="5" 
                  v-model="form.message"
                  placeholder="Введите ваше сообщение..."
                ></textarea>
              </div>

              <!-- Согласие -->
              <div class="mb-4">
                <div class="form-check">
                  <input 
                    type="checkbox" 
                    class="form-check-input" 
                    :class="{ 'is-invalid': errors.consent }"
                    id="consent"
                    v-model="form.consent"
                  >
                  <label class="form-check-label" for="consent">
                    Я согласен на обработку персональных данных <span class="text-danger">*</span>
                  </label>
                  <div v-if="errors.consent" class="invalid-feedback">{{ errors.consent }}</div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary px-5">Отправить</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Контактная информация -->
      <div class="col-lg-6 mb-5">
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-success text-white">
            <h4 class="mb-0"><i class="bi bi-info-circle me-2"></i>Контактная информация</h4>
          </div>
          <div class="card-body">
            <!-- Email -->
            <div class="d-flex mb-4">
              <div class="bg-light p-3 rounded me-3">
                <i class="bi bi-envelope-fill text-success fs-4"></i>
              </div>
              <div>
                <h6 class="fw-bold">Email</h6>
                <p class="text-muted mb-0">demidovmaxim808@gmail.com</p>
              </div>
            </div>

            <!-- Телефон -->
            <div class="d-flex mb-4">
              <div class="bg-light p-3 rounded me-3">
                <i class="bi bi-telephone-fill text-success fs-4"></i>
              </div>
              <div>
                <h6 class="fw-bold">Телефон</h6>
                <p class="text-muted mb-0">+7 (999) 000-00-00</p>
              </div>
            </div>

            <!-- Адрес -->
            <div class="d-flex">
              <div class="bg-light p-3 rounded me-3">
                <i class="bi bi-geo-alt-fill text-success fs-4"></i>
              </div>
              <div>
                <h6 class="fw-bold">Адрес</h6>
                <p class="text-muted mb-0">г. Москва, пр. Вернадского, 78</p>
                <p class="text-muted">РТУ МИРЭА</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Карта -->
        <div class="card shadow-sm">
          <div class="card-header bg-info text-white">
            <h4 class="mb-0"><i class="bi bi-map me-2"></i>Мы на карте</h4>
          </div>
          <div class="card-body p-0">
            <div style="position:relative;overflow:hidden;height:300px;border-radius:0 0 10px 10px;">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=37.481624%2C55.670005&z=17&pt=37.481624%2C55.670005,pm2rdm&l=map" 
                width="100%" 
                height="300" 
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="card-footer bg-light text-center">
            <small class="text-muted">пр. Вернадского, 78, Москва</small>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'

const topics = [
  'Вопрос о сервисе',
  'Предложение по улучшению',
  'Сообщить об ошибке',
  'Сотрудничество',
  'Другое'
]

const form = reactive({
  name: '',
  email: '',
  topic: '',
  message: '',
  consent: false
})

const errors = ref({})

const validateForm = () => {
  const newErrors = {}

  // Валидация имени (минимум 2 слова)
  if (!form.name.trim()) {
    newErrors.name = 'Введите ваше имя'
  } else {
    const words = form.name.trim().split(/\s+/)
    if (words.length < 2) {
      newErrors.name = 'Введите имя и фамилию'
    }
  }

  // Валидация email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    newErrors.email = 'Введите email'
  } else if (!emailPattern.test(form.email)) {
    newErrors.email = 'Введите корректный email (например: name@domain.com)'
  }

  // Валидация темы
  if (!form.topic) {
    newErrors.topic = 'Выберите тему сообщения'
  }

  // Валидация согласия
  if (!form.consent) {
    newErrors.consent = 'Необходимо согласие на обработку данных'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    const formData = {
      name: form.name.trim(),
      email: form.email.trim(),
      topic: form.topic,
      message: form.message.trim() || '(не заполнено)',
      consent: form.consent ? 'Да' : 'Нет',
      timestamp: new Date().toLocaleString()
    }

    // Логирование в консоль
    console.clear()
    console.log('%c📬 НОВОЕ СООБЩЕНИЕ С ФОРМЫ', 'color: #0d6efd; font-size: 16px; font-weight: bold;')
    console.log('%c════════════════════════════════', 'color: #6c757d')
    console.log('%c👤 Имя:', 'color: #198754; font-weight: bold;', formData.name)
    console.log('%c📧 Email:', 'color: #198754; font-weight: bold;', formData.email)
    console.log('%c📋 Тема:', 'color: #198754; font-weight: bold;', formData.topic)
    console.log('%c💬 Сообщение:', 'color: #198754; font-weight: bold;', formData.message)
    console.log('%c✅ Согласие:', 'color: #198754; font-weight: bold;', formData.consent)
    console.log('%c════════════════════════════════', 'color: #6c757d')
    console.log('%c⏰ Время отправки:', 'color: #0d6efd;', formData.timestamp)
    console.log('%c📦 Полные данные:', 'color: #6f42c1; font-weight: bold;', formData)

    alert('✓ Форма успешно отправлена! Проверьте консоль (F12) для просмотра данных.')

    // Очистка формы
    form.name = ''
    form.email = ''
    form.topic = ''
    form.message = ''
    form.consent = false
  }
}
</script>