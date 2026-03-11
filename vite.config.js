import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/dpo-pr15-pr8-/', // Вот сюда вставляем название вашего репозитория
  server: {
    port: 3000,
    open: true
  }
})