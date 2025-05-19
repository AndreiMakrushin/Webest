<template>
  <div class="skeleton-grid">
    <div v-for="i in 30" :key="`skeleton-${i}`" class="tender-card skeleton">
      <div class="skeleton-content">
        <div class="skeleton-line title"></div>
        <div class="skeleton-line category"></div>
        <div class="skeleton-line description"></div>
        <div class="skeleton-line description"></div>
        <div class="skeleton-line description short"></div>
        <div class="skeleton-footer">
          <div class="skeleton-line location"></div>
          <div class="skeleton-button"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skeleton-grid {
  display: grid;
  gap: 30px;
  padding: 20px;
  grid-template-columns: repeat(5, 1fr);
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-line {
  background: #f0f0f0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }

  &.title {
    height: 24px;
    width: 80%;
    margin-bottom: 8px;
  }

  &.category {
    height: 20px;
    width: 40%;
  }

  &.description {
    height: 16px;
    width: 100%;

    &.short {
      width: 70%;
    }
  }

  &.location {
    height: 16px;
    width: 60%;
  }
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.skeleton-button {
  width: 80px;
  height: 32px;
  background: #f0f0f0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.5s infinite;
  }
}

.tender-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  min-height: 200px;

  &.skeleton {
    background: #fff;
    overflow: hidden;
  }
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
