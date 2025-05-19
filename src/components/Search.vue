<template>
  <div class="search-container">
    <input v-model="model" type="text" placeholder="Поиск по названию..." class="search-input" />
    <span class="search-icon">🔍</span>
  </div>
</template>

<script lang="ts" setup>
const model = defineModel<string>()
</script>

<style scoped lang="scss">
.search-container {
  position: relative;
  min-width: 300px;

  .search-input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #7f8c8d;
  }
}
</style>
