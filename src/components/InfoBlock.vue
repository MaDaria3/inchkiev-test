<script setup>
import { defineProps } from 'vue';

const props = defineProps(['info']);

const image = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${props.info.poster_path}`;
</script>

<template>
  <div class="card">
    <img :src="image" :alt="props.info.title" />
    <div class="card-info">
      <h2>{{ props.info.title }}</h2>
      <p>{{ props.info.overview }}</p>
    </div>
  </div>
</template>
<style scoped>
.card {
  display: flex;
  align-items: center;
  gap: 100px;
  background-color: #c4c4c4;
  border: 1px solid #000;
  padding: 30px 40px;
}
.card-info {
  display: flex;
  flex-direction: column;
  max-width: 320px;
}
h2 {
  font-family: Roboto;
  font-size: 32px;
  margin-bottom: 18px;
}
p {
  font-size: 16px;
}
@media (width <= 768px) {
  .card {
    flex-direction: column;
    gap: 24px;
  }
  .card-info {
    align-items: center;
  }
  h2 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  p {
    text-align: center;
    font-size: 14px;
  }
}
</style>
