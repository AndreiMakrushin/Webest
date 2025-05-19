<template>
  <div class="tender-skeleton">
    <div class="skeleton-header"></div>
    <div class="skeleton-line w-3/4"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line w-5/6"></div>
    <div class="skeleton-line w-2/3"></div>
    <div class="skeleton-footer"></div>
  </div>
</template>

<style scoped lang="scss">
.tender-skeleton {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.skeleton-header {
  height: 2.5rem;
  background: #f3f4f6;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  max-width: 80%;
}

.skeleton-line {
  height: 1rem;
  background: #f3f4f6;
  border-radius: 4px;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: shimmer 1.5s infinite;
  }
}

.skeleton-footer {
  height: 2rem;
  background: #f3f4f6;
  border-radius: 6px;
  margin-top: 2rem;
  max-width: 50%;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
