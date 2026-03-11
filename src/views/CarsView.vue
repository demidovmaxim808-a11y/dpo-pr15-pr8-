<template>
  <header class="bg-light py-5 mt-5">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center">Мои автомобили</h1>
      <p class="lead text-center text-muted">Добавляйте и управляйте автомобилями</p>
    </div>
  </header>

  <main class="container py-5">
    <div class="row">
      <!-- Форма добавления -->
      <div class="col-lg-5 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0"><i class="bi bi-plus-circle me-2"></i>Добавить автомобиль</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="addCar">
              <div class="mb-3">
                <label class="form-label fw-semibold">Марка <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="newCar.brand" 
                  placeholder="Например: Toyota"
                  required
                >
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-semibold">Модель <span class="text-danger">*</span></label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="newCar.model" 
                  placeholder="Например: Camry"
                  required
                >
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-semibold">Год выпуска</label>
                <input 
                  type="number" 
                  class="form-control" 
                  v-model="newCar.year" 
                  placeholder="2022"
                  min="1900"
                  :max="new Date().getFullYear()"
                >
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-semibold">Госномер</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="newCar.plate" 
                  placeholder="А123БВ777"
                >
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-semibold">VIN номер</label>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="newCar.vin" 
                  placeholder="JTDBE32K603012345"
                >
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-semibold">Описание</label>
                <textarea 
                  class="form-control" 
                  v-model="newCar.description" 
                  rows="2" 
                  placeholder="Краткое описание, особенности..."
                ></textarea>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-semibold">URL фото</label>
                <input 
                  type="url" 
                  class="form-control" 
                  v-model="newCar.photoUrl" 
                  placeholder="https://example.com/car.jpg"
                >
                <small class="text-muted">Вставьте ссылку на изображение автомобиля</small>
              </div>
              
              <div class="mb-4">
                <label class="form-label fw-semibold">Тип двигателя</label>
                <select class="form-select" v-model="newCar.engine">
                  <option value="">Выберите тип</option>
                  <option>Бензин</option>
                  <option>Дизель</option>
                  <option>Гибрид</option>
                  <option>Электро</option>
                  <option>Газ</option>
                </select>
              </div>
              
              <button type="submit" class="btn btn-primary w-100 py-2">
                <i class="bi bi-save me-2"></i>Добавить автомобиль
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Список автомобилей -->
      <div class="col-lg-7 mb-4">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white d-flex justify-content-between align-items-center flex-wrap">
            <h4 class="mb-0"><i class="bi bi-car-front me-2"></i>Мои автомобили</h4>
            <div class="d-flex gap-2 mt-2 mt-sm-0">
              <span class="badge bg-light text-dark">{{ cars.length }} шт.</span>
              
              <!-- Сортировка -->
              <select class="form-select form-select-sm bg-success text-white border-light" style="width: auto;" v-model="sortBy">
                <option value="dateDesc">Сначала новые</option>
                <option value="dateAsc">Сначала старые</option>
                <option value="nameAsc">По марке А-Я</option>
                <option value="nameDesc">По марке Я-А</option>
                <option value="yearDesc">По году (новые)</option>
                <option value="yearAsc">По году (старые)</option>
              </select>
            </div>
          </div>

          <div class="card-body">
            <!-- Пустой список -->
            <div v-if="sortedCars.length === 0" class="text-center py-5">
              <i class="bi bi-inbox fs-1 text-muted mb-3"></i>
              <h5 class="text-muted mb-3">У вас пока нет добавленных автомобилей</h5>
              <p class="text-muted mb-4">Добавьте первый автомобиль, используя форму слева</p>
              <i class="bi bi-arrow-left-circle fs-4 text-primary d-block d-lg-none mt-3"></i>
              <span class="text-muted small d-none d-lg-block">← Заполните форму и нажмите "Добавить"</span>
            </div>

            <!-- Сетка автомобилей -->
            <div v-else class="row">
              <div v-for="car in sortedCars" :key="car.id" class="col-md-6 mb-4">
                <div class="card h-100 shadow-sm">
                  <!-- Фото -->
                  <img 
                    :src="car.photoUrl || 'https://via.placeholder.com/300x200?text=No+Image'" 
                    class="card-img-top" 
                    style="height: 180px; object-fit: cover;"
                    :alt="`${car.brand} ${car.model}`"
                    @error="handleImageError"
                  >
                  
                  <div class="card-body">
                    <h5 class="card-title fw-bold">{{ car.brand }} {{ car.model }}</h5>
                    
                    <!-- Детали -->
                    <div class="mb-2">
                      <span v-if="car.year" class="badge bg-secondary me-1">
                        <i class="bi bi-calendar3 me-1"></i>{{ car.year }}
                      </span>
                      <span v-if="car.engine" class="badge bg-info me-1">
                        <i class="bi bi-fuel-pump me-1"></i>{{ car.engine }}
                      </span>
                      <span v-if="car.plate" class="badge bg-warning text-dark">
                        <i class="bi bi-upc-scan me-1"></i>{{ car.plate }}
                      </span>
                    </div>
                    
                    <!-- Описание -->
                    <p v-if="car.description" class="card-text text-muted small">
                      {{ car.description }}
                    </p>
                    <p v-else class="card-text text-muted small fst-italic">
                      Нет описания
                    </p>
                    
                    <!-- VIN если есть -->
                    <p v-if="car.vin" class="text-muted small mb-2">
                      <i class="bi bi-upc-scan me-1"></i>VIN: {{ car.vin }}
                    </p>
                    
                    <!-- Дата добавления -->
                    <p class="text-muted small mb-2">
                      <i class="bi bi-clock me-1"></i>
                      Добавлен: {{ formatDate(car.date) }}
                    </p>
                    
                    <!-- Кнопки действий -->
                    <div class="d-flex justify-content-between align-items-center mt-3">
                      <button class="btn btn-sm btn-outline-primary" @click="editCar(car)">
                        <i class="bi bi-pencil me-1"></i>Ред.
                      </button>
                      <button class="btn btn-sm btn-danger" @click="removeCar(car.id)">
                        <i class="bi bi-trash me-1"></i>Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Информационный блок -->
        <div class="card shadow-sm mt-4">
          <div class="card-header bg-info text-white">
            <h4 class="mb-0"><i class="bi bi-info-circle me-2"></i>Как добавить автомобиль?</h4>
          </div>
          <div class="card-body">
            <ol class="mb-0">
              <li class="mb-2">Заполните поля "Марка" и "Модель" (обязательно)</li>
              <li class="mb-2">Добавьте год выпуска и госномер (необязательно)</li>
              <li class="mb-2">Вставьте ссылку на фото автомобиля</li>
              <li class="mb-2">Укажите тип двигателя для статистики</li>
              <li class="mb-2">Нажмите кнопку "Добавить автомобиль"</li>
              <li class="mt-3 text-success">
                <i class="bi bi-star-fill me-1"></i>
                Автомобили можно сортировать по дате, марке и году
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const cars = ref([])
const sortBy = ref('dateDesc')

const newCar = ref({
  brand: '',
  model: '',
  year: '',
  plate: '',
  vin: '',
  description: '',
  photoUrl: '',
  engine: ''
})

// Загрузка из localStorage при монтировании
onMounted(() => {
  const savedCars = localStorage.getItem('cars')
  if (savedCars) {
    cars.value = JSON.parse(savedCars)
  }
})

// Сохранение в localStorage
const saveToStorage = () => {
  localStorage.setItem('cars', JSON.stringify(cars.value))
}

// Добавление автомобиля
const addCar = () => {
  if (!newCar.value.brand || !newCar.value.model) return

  cars.value.push({
    id: Date.now(),
    ...newCar.value,
    date: new Date().toISOString()
  })
  
  saveToStorage()
  
  // Очистка формы
  newCar.value = {
    brand: '',
    model: '',
    year: '',
    plate: '',
    vin: '',
    description: '',
    photoUrl: '',
    engine: ''
  }
}

// Удаление автомобиля
const removeCar = (id) => {
  if (confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
    cars.value = cars.value.filter(car => car.id !== id)
    saveToStorage()
  }
}

// Редактирование (заглушка - можно реализовать позже)
const editCar = (car) => {
  alert(`Редактирование ${car.brand} ${car.model} будет доступно в следующей версии`)
}

// Обработка ошибки загрузки изображения
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
}

// Форматирование даты
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ru-RU')
}

// Сортировка автомобилей
const sortedCars = computed(() => {
  const sorted = [...cars.value]
  
  switch (sortBy.value) {
    case 'nameAsc':
      return sorted.sort((a, b) => 
        (a.brand + a.model).localeCompare(b.brand + b.model)
      )
    case 'nameDesc':
      return sorted.sort((a, b) => 
        (b.brand + b.model).localeCompare(a.brand + a.model)
      )
    case 'yearAsc':
      return sorted.sort((a, b) => (a.year || 0) - (b.year || 0))
    case 'yearDesc':
      return sorted.sort((a, b) => (b.year || 0) - (a.year || 0))
    case 'dateAsc':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
    case 'dateDesc':
    default:
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})
</script>