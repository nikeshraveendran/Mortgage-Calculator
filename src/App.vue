<script setup>
import linkShortner from './components/linkShortner.vue'
import mortgageCalculator from './components/mortgageCalculator.vue'
</script>

<template>

  <main>
    <linkShortner />
    <mortgageCalculator />
  </main>
</template>

<style>
.heading {
    text-align: center;
}

.heading h2 {
    margin-bottom: 10px;
    font-weight: 600;
}
</style>
