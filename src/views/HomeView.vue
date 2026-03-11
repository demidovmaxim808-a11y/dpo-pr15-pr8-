<template>
  <header class="bg-light py-5 mt-5">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center">CarCostMaster</h1>
      <p class="lead text-center text-muted">Контроль расходов на автомобиль</p>
    </div>
  </header>

  <main class="container py-5">
    <div class="row mb-5">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0"><i class="bi bi-car-front me-2"></i>Мои автомобили</h4>
            <router-link to="/cars" class="btn btn-light btn-sm">Управление</router-link>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 mb-3">
                <div class="card h-100">
                  <div class="card-body text-center">
                    <i class="bi bi-plus-circle fs-1 text-secondary mb-3"></i>
                    <h5>Нет автомобилей</h5>
                    <p class="text-muted small">Добавьте первый автомобиль для учёта расходов</p>
                    <router-link to="/cars" class="btn btn-outline-primary btn-sm">Добавить</router-link>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="card h-100">
                  <div class="card-body text-center">
                    <i class="bi bi-info-circle fs-1 text-info mb-3"></i>
                    <h5>Статистика</h5>
                    <p class="text-muted small">Нет данных для отображения</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-success text-white">
            <h4 class="mb-0"><i class="bi bi-cash-stack me-2"></i>Последние расходы</h4>
          </div>
          <div class="card-body text-center py-5">
            <i class="bi bi-inbox fs-1 text-muted mb-3"></i>
            <p class="text-muted">У вас пока нет добавленных расходов</p>
            <router-link to="/expenses" class="btn btn-outline-success">Добавить расход</router-link>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-warning text-dark">
            <h4 class="mb-0"><i class="bi bi-speedometer me-2"></i>Текущий пробег</h4>
          </div>
          <div class="card-body text-center py-4">
            <i class="bi bi-tachometer fs-1 text-muted mb-3"></i>
            <p class="text-muted">Пробег не добавлен</p>
            <router-link to="/mileage" class="btn btn-outline-warning">Добавить пробег</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-header bg-info text-white">
        <h4 class="mb-0"><i class="bi bi-pie-chart me-2"></i>Аналитика расходов</h4>
      </div>
      <div class="card-body text-center py-5">
        <i class="bi bi-bar-chart fs-1 text-muted mb-3"></i>
        <p class="text-muted">Добавьте расходы для просмотра аналитики</p>
      </div>
    </div>
  </main>
</template>