<template>
  <header class="bg-light py-5 mt-5">
    <div class="container py-5">
      <h1 class="display-4 fw-bold text-center">Управление расходами</h1>
    </div>
  </header>

  <main class="container py-5">
    <div class="card shadow-sm mb-5">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0"><i class="bi bi-plus-circle me-2"></i>Добавить новый расход</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Категория</label>
            <select class="form-select" v-model="newExpense.category">
              <option value="" disabled>Выберите категорию</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Автомобиль</label>
            <select class="form-select" v-model="newExpense.carId">
              <option value="" disabled>Выберите автомобиль</option>
              <option v-if="cars.length === 0" disabled>Нет добавленных автомобилей</option>
              <option v-for="car in cars" :key="car.id" :value="car.id">
                {{ car.brand }} {{ car.model }}
              </option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Сумма (₽)</label>
            <input type="number" class="form-control" v-model="newExpense.amount" placeholder="0.00">
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Дата</label>
            <input type="date" class="form-control" v-model="newExpense.date">
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Пробег (км)</label>
            <input type="number" class="form-control" v-model="newExpense.mileage" placeholder="Например: 45230">
          </div>
          <div class="col-12 mb-3">
            <label class="form-label">Комментарий</label>
            <textarea class="form-control" rows="2" v-model="newExpense.comment" placeholder="Дополнительная информация..."></textarea>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" @click="addExpense">
              <i class="bi bi-save me-2"></i>Сохранить расход
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm mb-5">
      <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0"><i class="bi bi-list-ul me-2"></i>Все расходы</h4>
        <div>
          <select class="form-select form-select-sm bg-success text-white border-light" style="width: auto;" v-model="categoryFilter">
            <option value="">Все категории</option>
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
        </div>
      </div>
      <div class="card-body">
        <div v-if="filteredExpenses.length === 0" class="text-center py-5">
          <i class="bi bi-inbox fs-1 text-muted mb-3"></i>
          <p class="text-muted">У вас пока нет добавленных расходов</p>
          <p class="text-muted small">Добавьте первый расход, используя форму выше</p>
        </div>
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Категория</th>
                <th>Автомобиль</th>
                <th>Сумма</th>
                <th>Пробег</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expense in filteredExpenses" :key="expense.id">
                <td>{{ formatDate(expense.date) }}</td>
                <td><span class="badge bg-info">{{ expense.category }}</span></td>
                <td>{{ getCarName(expense.carId) }}</td>
                <td class="fw-bold">{{ expense.amount }} ₽</td>
                <td>{{ expense.mileage || '—' }} км</td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="deleteExpense(expense.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="filteredExpenses.length > 0">
              <tr class="table-secondary">
                <td colspan="3" class="text-end fw-bold">Итого:</td>
                <td class="fw-bold">{{ totalAmount }} ₽</td>
                <td colspan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-header bg-info text-white">
        <h4 class="mb-0"><i class="bi bi-bar-chart me-2"></i>Аналитика расходов</h4>
      </div>
      <div class="card-body">
        <div v-if="expenses.length === 0" class="text-center py-5">
          <i class="bi bi-pie-chart fs-1 text-muted mb-3"></i>
          <p class="text-muted">Недостаточно данных для отображения аналитики</p>
          <p class="text-muted small">Добавьте хотя бы один расход, чтобы увидеть статистику</p>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-md-6 mb-4">
              <h5>По категориям</h5>
              <div v-for="(amount, cat) in categoryStats" :key="cat" class="mb-2">
                <div class="d-flex justify-content-between">
                  <span>{{ cat }}</span>
                  <span class="fw-bold">{{ amount }} ₽</span>
                </div>
                <div class="progress">
                  <div 
                    class="progress-bar bg-success" 
                    :style="{ width: (amount / Math.max(...Object.values(categoryStats)) * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <h5>Общая статистика</h5>
              <p>Всего расходов: <span class="fw-bold">{{ expenses.length }}</span></p>
              <p>Общая сумма: <span class="fw-bold">{{ totalAmount }} ₽</span></p>
              <p>Средний расход: <span class="fw-bold">{{ Math.round(totalAmount / expenses.length) }} ₽</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const categories = ['Топливо', 'Техобслуживание', 'Страховка', 'Мойка', 'Шиномонтаж', 'Парковка', 'Штрафы', 'Другое']

const cars = ref([])
const expenses = ref([])
const categoryFilter = ref('')

const newExpense = ref({
  category: '',
  carId: '',
  amount: '',
  date: new Date().toISOString().slice(0, 10),
  mileage: '',
  comment: ''
})

onMounted(() => {
  const savedCars = localStorage.getItem('cars')
  if (savedCars) {
    cars.value = JSON.parse(savedCars)
  }
  
  const savedExpenses = localStorage.getItem('expenses')
  if (savedExpenses) {
    expenses.value = JSON.parse(savedExpenses)
  }
})

const filteredExpenses = computed(() => {
  if (!categoryFilter.value) return expenses.value
  return expenses.value.filter(e => e.category === categoryFilter.value)
})

const totalAmount = computed(() => {
  return filteredExpenses.value.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
})

const categoryStats = computed(() => {
  const stats = {}
  expenses.value.forEach(e => {
    if (e.category) {
      stats[e.category] = (stats[e.category] || 0) + (Number(e.amount) || 0)
    }
  })
  return stats
})

const getCarName = (carId) => {
  const car = cars.value.find(c => c.id === carId)
  return car ? `${car.brand} ${car.model}` : 'Неизвестно'
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ru-RU')
}

const addExpense = () => {
  if (!newExpense.value.category || !newExpense.value.carId || !newExpense.value.amount) {
    alert('Заполните обязательные поля')
    return
  }
  
  expenses.value.push({
    id: Date.now(),
    ...newExpense.value,
    amount: Number(newExpense.value.amount)
  })
  
  localStorage.setItem('expenses', JSON.stringify(expenses.value))
  
  newExpense.value = {
    category: '',
    carId: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    mileage: '',
    comment: ''
  }
}

const deleteExpense = (id) => {
  if (confirm('Удалить расход?')) {
    expenses.value = expenses.value.filter(e => e.id !== id)
    localStorage.setItem('expenses', JSON.stringify(expenses.value))
  }
}
</script>