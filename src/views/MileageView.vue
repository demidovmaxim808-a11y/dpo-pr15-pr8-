<template>
  <header class="bg-light py-5 mt-5">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center">Управление пробегом</h1>
    </div>
  </header>

  <main class="container py-5">
    <div class="row">
      <div class="col-lg-4 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0"><i class="bi bi-plus-circle me-2"></i>Добавить пробег</h4>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Автомобиль</label>
              <select class="form-select" v-model="newMileage.carId">
                <option value="" disabled>Выберите автомобиль</option>
                <option v-if="cars.length === 0" disabled>Нет добавленных автомобилей</option>
                <option v-for="car in cars" :key="car.id" :value="car.id">
                  {{ car.brand }} {{ car.model }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Текущий пробег (км)</label>
              <input type="number" class="form-control" v-model="newMileage.mileage" placeholder="Например: 45230">
            </div>
            <div class="mb-3">
              <label class="form-label">Дата фиксации</label>
              <input type="date" class="form-control" v-model="newMileage.date">
            </div>
            <div class="mb-3">
              <label class="form-label">Комментарий</label>
              <textarea class="form-control" rows="2" v-model="newMileage.comment" placeholder="Например: Перед ТО"></textarea>
            </div>
            <button class="btn btn-primary w-100" @click="addMileage">
              <i class="bi bi-save me-2"></i>Сохранить
            </button>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="card shadow-sm mb-4">
          <div class="card-header bg-success text-white">
            <h4 class="mb-0"><i class="bi bi-clock-history me-2"></i>История пробега</h4>
          </div>
          <div class="card-body">
            <div v-if="mileages.length === 0" class="text-center py-5">
              <i class="bi bi-inbox fs-1 text-muted mb-3"></i>
              <p class="text-muted">История пробега пуста</p>
              <p class="text-muted small">Добавьте первую запись о пробеге</p>
            </div>
            <div v-else class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Автомобиль</th>
                    <th>Пробег</th>
                    <th>Комментарий</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="mileage in sortedMileages" :key="mileage.id">
                    <td>{{ formatDate(mileage.date) }}</td>
                    <td>{{ getCarName(mileage.carId) }}</td>
                    <td class="fw-bold">{{ mileage.mileage }} км</td>
                    <td>{{ mileage.comment || '—' }}</td>
                    <td>
                      <button class="btn btn-sm btn-danger" @click="deleteMileage(mileage.id)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="card shadow-sm">
          <div class="card-header bg-info text-white">
            <h4 class="mb-0"><i class="bi bi-graph-up me-2"></i>График пробега</h4>
          </div>
          <div class="card-body">
            <div v-if="mileages.length < 2" class="text-center py-5">
              <i class="bi bi-bar-chart-line fs-1 text-muted mb-3"></i>
              <p class="text-muted">Недостаточно данных для построения графика</p>
              <p class="text-muted small">Добавьте минимум 2 записи о пробеге</p>
            </div>
            <div v-else>
              <div class="mb-3">
                <select class="form-select" v-model="selectedCarForChart">
                  <option value="">Все автомобили</option>
                  <option v-for="car in cars" :key="car.id" :value="car.id">
                    {{ car.brand }} {{ car.model }}
                  </option>
                </select>
              </div>
              <div style="height: 300px; position: relative;">
                <canvas ref="chartCanvas"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const cars = ref([])
const mileages = ref([])
const chartCanvas = ref(null)
let chart = null
const selectedCarForChart = ref('')

const newMileage = ref({
  carId: '',
  mileage: '',
  date: new Date().toISOString().slice(0, 10),
  comment: ''
})

onMounted(() => {
  const savedCars = localStorage.getItem('cars')
  if (savedCars) {
    cars.value = JSON.parse(savedCars)
  }
  
  const savedMileages = localStorage.getItem('mileages')
  if (savedMileages) {
    mileages.value = JSON.parse(savedMileages)
  }
})

watch([mileages, selectedCarForChart], () => {
  updateChart()
}, { deep: true })

const sortedMileages = computed(() => {
  return [...mileages.value].sort((a, b) => new Date(b.date) - new Date(a.date))
})

const getCarName = (carId) => {
  const car = cars.value.find(c => c.id === carId)
  return car ? `${car.brand} ${car.model}` : 'Неизвестно'
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ru-RU')
}

const addMileage = () => {
  if (!newMileage.value.carId || !newMileage.value.mileage) {
    alert('Заполните обязательные поля')
    return
  }
  
  mileages.value.push({
    id: Date.now(),
    ...newMileage.value,
    mileage: Number(newMileage.value.mileage)
  })
  
  localStorage.setItem('mileages', JSON.stringify(mileages.value))
  
  newMileage.value = {
    carId: '',
    mileage: '',
    date: new Date().toISOString().slice(0, 10),
    comment: ''
  }
}

const deleteMileage = (id) => {
  if (confirm('Удалить запись о пробеге?')) {
    mileages.value = mileages.value.filter(m => m.id !== id)
    localStorage.setItem('mileages', JSON.stringify(mileages.value))
  }
}

const updateChart = () => {
  if (!chartCanvas.value) return
  
  let filteredMileages = mileages.value
  if (selectedCarForChart.value) {
    filteredMileages = mileages.value.filter(m => m.carId === selectedCarForChart.value)
  }
  
  const sorted = [...filteredMileages].sort((a, b) => new Date(a.date) - new Date(b.date))
  
  if (chart) {
    chart.destroy()
  }
  
  if (sorted.length < 2) return
  
  chart = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: sorted.map(m => formatDate(m.date)),
      datasets: [{
        label: 'Пробег (км)',
        data: sorted.map(m => m.mileage),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })
}
</script>