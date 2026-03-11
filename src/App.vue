<template>
  <div id="app">
    <TheHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>