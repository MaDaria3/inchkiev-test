<script setup>
import { onMounted, ref } from 'vue';

import heroImage from '@/assets/hero.png';

const slides = [
  {
    title1: 'Lorem ipsum',
    title2: 'Lorem ipsum dolor —',
    title3: 'Lorem',
    title4: 'ipsum!',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    img: heroImage,
    background: '#027D84',
  },
  {
    title1: 'Lorem ipsum',
    title2: 'Lorem ipsum dolor —',
    title3: 'Lorem',
    title4: 'ipsum!',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    img: heroImage,
    background: '#4A989A',
  },
  {
    title1: 'Lorem ipsum',
    title2: 'Lorem ipsum dolor —',
    title3: 'Lorem',
    title4: 'ipsum!',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    img: heroImage,
    background: '#AFB3B4',
  },
];

const current = ref(0);
const slider = ref(null);

onMounted(() => {
  const cards = slider.value.querySelectorAll('.slide');

  const zIndexValues = Array.from({ length: cards.length }, (v, k) => cards.length - k);
  const transformValues = Array.from(
    { length: cards.length },
    (v, k) => (k / (cards.length - 1)) * 0.1 * window.innerWidth + 'px',
  );

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (current.value !== index) {
        const previous = current.value;

        cards.forEach((card) => {
          card.classList.remove('slide--current', 'slide--out');
        });

        cards[current.value].classList.add('slide--out');

        current.value = (current.value + 1) % cards.length;
        cards[current.value].classList.add('slide--current');

        zIndexValues.unshift(zIndexValues.pop());
        transformValues.unshift(transformValues.pop());

        cards.forEach((card, index) => {
          if (previous === index) {
            card.style['z-index'] = cards.length + 1;

            setTimeout(() => {
              card.style.setProperty('--slide-transform', transformValues[index]);
              card.style['z-index'] = zIndexValues[index];
            }, 300);
          } else {
            card.style.setProperty('--slide-transform', transformValues[index]);
            card.style['z-index'] = zIndexValues[index];
          }
        });
      }
    });
  });

  cards.forEach((card, index) => {
    card.style.setProperty('--slide-transform', transformValues[index]);
    card.style['z-index'] = zIndexValues[index];
  });
  cards[current.value].classList.add('slide--current');
});
</script>

<template>
  <div class="wrapper" ref="slider">
    <div
      class="slide"
      v-for="slide in slides"
      :key="slide.title"
      :style="{ '--slide-background': slide.background }"
    >
      <div class="ellipse-wrapper">
        <img class="ellipse" src="@/assets/ellipse.svg" alt="ellipse" />
        <p class="ellipse-text">Lorem ipsum dolor sit amet</p>
      </div>
      <div class="banner">
        <h1>
          <span class="title1">{{ slide.title1 }}</span>
          <span class="title2">{{ slide.title2 }}</span>
          <span class="title3">{{ slide.title3 }}</span>
          <span class="title4">{{ slide.title4 }}</span>
        </h1>
        <p class="description">{{ slide.subtitle }}</p>
        <img :src="slide.img" alt="hero image" />
      </div>
      <img class="snowflake" src="@/assets/snowflake.svg" alt="snowflake" />
      <button class="arrow-button">
        <img src="@/assets/arrow-right.svg" alt="next" />
      </button>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  aspect-ratio: 2/1;
  position: relative;
  width: 100%;
}
.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(var(--slide-transform, 0));
  transition: transform 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8) 0.1s;
  user-select: none;
  height: 100%;
  width: 90%;

  background-color: var(--slide-background);
  border: 1px solid #000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 90px 90px 0px;
  padding-bottom: 20%;
  color: #fff;
}
.slide:not(.slide--current) {
  cursor: pointer;
}
.slide--out {
  animation: slide-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}

@keyframes slide-out {
  50% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(var(--slide-transform, 0));
  }
}
/* ellipse */
.ellipse-wrapper {
  position: absolute;
  top: 0;
  left: 20%;
  max-width: 60%;
}
.ellipse {
  max-width: 100%;
}
.ellipse-text {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 500;
  text-transform: uppercase;

  position: absolute;
  left: 50%;
  top: 0;
  font-size: 14px;
  transform: translateX(-50%);
  white-space: nowrap;
}
/* Snowflake */
.snowflake {
  position: absolute;
  left: 1%;
  bottom: 20%;
}
.banner {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1040px;
}
.banner img {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 10%;
}
h1 {
  font-family: Roboto;
  font-size: 60px;
  font-weight: 400;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 1;
}
.title1 {
  font-weight: 700;
}
.title2 {
  margin-left: 40px;
  text-shadow:
    0px 0px 1px rgb(0 0 0),
    0px 0px 2px rgb(0 0 0),
    0px 0px 3px rgb(0 0 0),
    0px 4px 4px rgba(0, 0, 0, 0.25);
}
.title3 {
  text-align: center;
}
.title4 {
  position: absolute;
  right: 60%;
  top: 100%;
}
.description {
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;

  position: absolute;
  top: 90%;
  right: 50%;
  max-width: 280px;
  width: 100%;
}
.arrow-button {
  background-color: transparent;
  border: none;
  cursor: pointer;

  position: absolute;
  right: 4%;
  top: 30%;
}

@media (width <= 1280px) {
  h1 {
    font-size: 40px;
    left: 20px;
    top: 20%;
  }
  .snowflake {
    width: 10%;
  }
  .description {
    top: 80%;
  }
}
@media (width < 1024px) {
  .wrapper {
    aspect-ratio: 4 / 5;
  }
  .banner {
    flex-direction: column;
  }
  .banner img {
    position: relative;
    left: initial;
    width: 70%;
    top: 30%;
  }
  .snowflake {
    left: -8%;
    bottom: initial;
    width: 20%;
  }
  h1 {
    top: 18%;
    left: 60px;
  }
  .description {
    top: 47%;
    right: 10%;
  }
}
@media (width <= 768px) {
  h1 {
    font-size: 30px;
    left: 0px;
    width: 80%;
  }
  .banner img {
    top: 35%;
  }
}
@media (width <= 540px) {
  .description {
    top: 57%;
  }
}
@media (width <= 440px) {
  .description {
    top: 63%;
  }
}
@media (width > 768px) {
  .ellipse-wrapper {
    left: 10%;
  }
  .ellipse-text {
    font-size: 18px;
  }
}
</style>
