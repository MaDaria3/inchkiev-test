<script setup>
import { ref, onMounted, reactive, computed } from 'vue';

import RadioButton from 'primevue/radiobutton';
import InfoBlock from './InfoBlock.vue';

const state = reactive({
  sort: 'textchess',
});

const infoBlocks = ref([]);

onMounted(async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/discover/movie?api_key=3685d3eb8695f087227e0ee980f3ae4d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1',
  );
  const data = await response.json();
  infoBlocks.value = data.results.slice(0, 5);
});

const infoBlocksSorted = computed(() => {
  if (state.sort === 'alphabetic') {
    return infoBlocks.value.toSorted((a, b) => a.title.localeCompare(b.title));
  }
  return infoBlocks.value;
});
</script>

<template>
  <div class="wrapper">
    <div class="sorting">
      <div class="radio">
        <RadioButton
          class="radiobutton"
          v-model="state.sort"
          inputId="sort1"
          name="sort"
          value="alphabetic"
        />
        <label for="sort1"> Відсортувати за заголовком відповідно до алфавітного порядку </label>
      </div>
      <div class="radio">
        <RadioButton
          class="radiobutton"
          v-model="state.sort"
          inputId="sort2"
          name="sort"
          value="textright"
        />
        <label for="sort2"> Вивести блоки у форматі "зображення - зліва, текст - справа </label>
      </div>
      <div class="radio">
        <RadioButton
          class="radiobutton"
          v-model="state.sort"
          inputId="sort3"
          name="sort"
          value="textchess"
        />
        <label for="sort3">
          Вивести блоки у форматі "зображення - зліва, текст - справа" і навпаки в шаховому порядку
        </label>
      </div>
    </div>
    <div class="block" :class="[state.sort]">
      <InfoBlock v-for="item in infoBlocksSorted" :key="item.id" :info="item" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  margin-block: 32px;
  width: 100%;

  margin-inline: auto;
  max-width: 1020px;
  gap: 24px;
  padding-inline: 16px;
}
/* SORTING BUTTONS */
.sorting {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-inline: auto;
}
.radio {
  display: flex;
  align-items: center;
  gap: 24px;
}
.radiobutton {
  display: flex;
}
label {
  font-size: 14px;
}
/* MOVIES */
.block {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
@media (width > 768px) {
  .wrapper {
    padding-inline: 20px;
    gap: 42px;
  }
  .block {
    gap: 40px;
  }
  .textchess .card:nth-child(even) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
}
</style>
