<template>
  <header class="bg-light py-5 mt-5">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center">О проекте CarCostMaster</h1>
      <p class="lead text-center text-muted">Умный учёт расходов на автомобиль</p>
    </div>
  </header>

  <main class="container py-5">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="card shadow-sm">
          <div class="card-body p-5">
            <div class="text-center mb-5">
              <i class="bi bi-speedometer2 display-1 text-primary"></i>
            </div>
            
            <h2 class="fw-bold mb-4">Что такое CarCostMaster?</h2>
            <p class="fs-5 mb-4">CarCostMaster — это современный веб-сервис для учёта расходов на автомобиль. Мы создали инструмент, который помогает автовладельцам контролировать бюджет, планировать техническое обслуживание и принимать взвешенные финансовые решения.</p>
            
            <h3 class="fw-bold mb-3 mt-5">Наша миссия</h3>
            <p class="mb-4">Сделать учёт автомобильных расходов простым, удобным и доступным каждому. Мы верим, что контроль финансов начинается с понимания, куда уходят деньги. CarCostMaster даёт полную прозрачность затрат на автомобиль.</p>
            
            <div class="row mt-5">
              <div class="col-md-4 text-center mb-4">
                <div class="bg-light rounded-circle p-3 d-inline-block mb-3">
                  <i class="bi bi-graph-up-arrow fs-1 text-primary"></i>
                </div>
                <h5 class="fw-bold">Аналитика</h5>
                <p class="text-muted">Наглядные отчёты и графики по всем категориям расходов</p>
              </div>
              <div class="col-md-4 text-center mb-4">
                <div class="bg-light rounded-circle p-3 d-inline-block mb-3">
                  <i class="bi bi-cloud-check fs-1 text-primary"></i>
                </div>
                <h5 class="fw-bold">Синхронизация</h5>
                <p class="text-muted">Доступ с любого устройства через облако</p>
              </div>
              <div class="col-md-4 text-center mb-4">
                <div class="bg-light rounded-circle p-3 d-inline-block mb-3">
                  <i class="bi bi-shield-check fs-1 text-primary"></i>
                </div>
                <h5 class="fw-bold">Безопасность</h5>
                <p class="text-muted">Ваши данные надёжно защищены</p>
              </div>
            </div>

            <div class="mt-5 p-4 bg-light rounded-3">
              <h4 class="fw-bold mb-3">Преимущества сервиса</h4>
              <ul class="list-unstyled">
                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Бесплатный базовый тариф с полным функционалом</li>
                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Интуитивно понятный интерфейс</li>
                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Учёт нескольких автомобилей</li>
                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> Детализация по категориям расходов</li>
                <li class="mb-3"><i class="bi bi-check-circle-fill text-success me-2"></i> История пробега и технического обслуживания</li>
              </ul>
            </div>

            <div class="text-center mt-5">
              <router-link to="/contacts" class="btn btn-primary btn-lg px-5">Связаться с нами</router-link>
              <router-link to="/faq" class="btn btn-outline-primary btn-lg px-5 ms-3">Частые вопросы</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>