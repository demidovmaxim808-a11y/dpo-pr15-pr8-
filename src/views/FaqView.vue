<template>
  <header class="bg-light py-5 mt-5">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center">Часто задаваемые вопросы</h1>
    </div>
  </header>

  <main class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="accordion shadow-sm" id="faqAccordion">
          <div v-for="(item, index) in faqItems" :key="index" class="accordion-item">
            <h2 class="accordion-header" :id="'heading' + index">
              <button 
                class="accordion-button" 
                :class="{ collapsed: index !== 0 }" 
                type="button" 
                data-bs-toggle="collapse" 
                :data-bs-target="'#collapse' + index"
                :aria-expanded="index === 0 ? 'true' : 'false'"
                :aria-controls="'collapse' + index"
              >
                <i :class="item.icon + ' text-primary me-3'"></i>
                {{ item.question }}
              </button>
            </h2>
            <div 
              :id="'collapse' + index" 
              class="accordion-collapse collapse" 
              :class="{ show: index === 0 }" 
              :aria-labelledby="'heading' + index"
              data-bs-parent="#faqAccordion"
            >
              <div class="accordion-body">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mt-5 bg-primary text-white">
          <div class="card-body text-center p-5">
            <i class="bi bi-chat-dots fs-1 mb-3"></i>
            <h4>Не нашли ответ?</h4>
            <p class="mb-4">Напишите нам, мы ответим в течение часа</p>
            <router-link to="/contacts" class="btn btn-light">Связаться с нами</router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const faqItems = [
  {
    icon: 'bi bi-question-circle-fill',
    question: 'Как зарегистрироваться в сервисе?',
    answer: 'Для регистрации перейдите на страницу "Личный кабинет", заполните форму регистрации и подтвердите email. Регистрация бесплатна и занимает 2 минуты.'
  },
  {
    icon: 'bi bi-currency-ruble',
    question: 'Сколько стоит использование?',
    answer: 'Базовый тариф — бесплатный. Premium тариф открывает расширенную аналитику и экспорт данных — 299₽/мес.'
  },
  {
    icon: 'bi bi-car-front-fill',
    question: 'Сколько автомобилей можно добавить?',
    answer: 'В бесплатном тарифе — до 2 автомобилей. В Premium — до 10 автомобилей.'
  },
  {
    icon: 'bi bi-fuel-pump',
    question: 'Как добавить расход на топливо?',
    answer: 'На странице "Расходы" нажмите "Добавить расход", выберите категорию "Топливо", укажите литры, сумму и пробег.'
  },
  {
    icon: 'bi bi-cloud-arrow-up',
    question: 'Как экспортировать данные?',
    answer: 'Экспорт в Excel и PDF доступен в Premium тарифе в разделе "Настройки".'
  },
  {
    icon: 'bi bi-shield-lock',
    question: 'Безопасны ли мои данные?',
    answer: 'Да, все данные передаются по HTTPS, пароли шифруются. Мы не передаём данные третьим лицам.'
  },
  {
    icon: 'bi bi-arrow-repeat',
    question: 'Есть синхронизация между устройствами?',
    answer: 'Да, все данные автоматически синхронизируются через облако. Достаточно войти в аккаунт на любом устройстве.'
  }
]
</script>