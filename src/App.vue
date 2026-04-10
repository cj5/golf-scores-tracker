<template>
  <div>
    <h1>Golf Scores Tracker</h1>
    <h2 v-if="isLoading">Loading...</h2>
    <div v-if="error">
      <h2>⚠️ Error</h2>
      <p class="error">{{ errorMsg }}</p>
    </div>
    <div class="scores-wrap">
      <div v-if="scores" class="scores">
        <template v-if="isInPlay">
          <h2>ROUND 1 SCORES:</h2>
          <ul>
            <li>({{ johnRound.rank }}) {{ johnRound.name }}: <span :class="`score ${johnRound.class}`">{{ johnRound.score }}</span></li>
            <li>({{ alexRound.rank }}) {{ alexRound.name }}: <span :class="`score ${alexRound.class}`">{{ alexRound.score }}</span></li>
            <li>({{ maxRound.rank }}) {{ maxRound.name }}: <span :class="`score ${maxRound.class}`">{{ maxRound.score }}</span></li>
            <li>({{ chrisRound.rank }}) {{ chrisRound.name }}: <span :class="`score ${chrisRound.class}`">{{ chrisRound.score }}</span></li>
          </ul>
          <p>————————————————</p>
        </template>
        <h2>OVERALL SCORES:</h2>
        <ul>
          <li>({{ overallFirst.rank }}) {{ overallFirst.name }}: <span :class="`score ${overallFirst.class}`">{{ overallFirst.score }}</span></li>
          <li>({{ overallSecond.rank }}) {{ overallSecond.name }}: <span :class="`score ${overallSecond.class}`">{{ overallSecond.score }}</span></li>
          <li>({{ overallThird.rank }}) {{ overallThird.name }}: <span :class="`score ${overallThird.class}`">{{ overallThird.score }}</span></li>
          <li>({{ overallFourth.rank }}) {{ overallFourth.name }}: <span :class="`score ${overallFourth.class}`">{{ overallFourth.score }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// import * as cheerio from 'cheerio';
// import puppeteer from 'puppeteer';


const data = ref(null);
const isLoading = ref(true);
const error = ref(false);
const errorMsg = ref(null);

const scores = computed(() => data.value);

const johnRound = computed(() => scores.value[0][0]);
const overallFirst = computed(() => scores.value[1][0]);

const alexRound = computed(() => scores.value[0][1]);
const overallSecond = computed(() => scores.value[1][1]);

const maxRound = computed(() => scores.value[0][2]);
const overallThird = computed(() => scores.value[1][2]);

const chrisRound = computed(() => scores.value[0][3]);
const overallFourth = computed(() => scores.value[1][3]);

const isInPlay = computed(() => data[2]);

async function getData() {
  try {
    // const response = await fetch('http://localhost:8888/scores');
    const response = await fetch('https://golf-scores-tracker-efba68d29894.herokuapp.com/scores');
    const result = await response.json();
    data.value = result;
    data.value.forEach((item, i) => {
      console.log('item:', item);
      if (i !== 2) {
        item.forEach((player, j) => {
          console.log('player:', player);
          if (player.score > 0) {
            data.value[i][j].score = `+${player.score}`;
          } else if (player.score === 0) {
            data.value[i][j].score = 'E';
          }
        });
      }
    });
    console.log('Data:', data.value);
  } catch (err) {
    console.error('Fetch failed:', err);
    error.value = true;
    errorMsg.value = err;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
ul {
  margin-right: 0;
  padding-left: 0;
  list-style: none;
}
li {
  font-size: 22px;
}
.scores-wrap {
  display: flex;
  justify-content: center;
  text-align: left;
}
.scores {
  width: max-content;
}
.score {
  font-weight: bold;
  color: rgb(0, 103, 71);
  &.under-par {
    color: rgb(186, 12, 47);
  }
}
.error {
  color: rgb(186, 12, 47);
}
</style>
