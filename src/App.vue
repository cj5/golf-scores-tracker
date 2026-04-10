<template>
  <div>

    <img src="/masters-logo.png" class="logo-img" alt="Masters logo.">

    <h1 class="title">Scores Tracker</h1>

    <p v-if="isLoading" class="loading">Loading...</p>

    <div v-if="error" class="error-wrap">
      <h2 class="heading mb-0">⚠️ Error</h2>
      <p class="error">{{ errorMsg }}</p>
    </div>

    <div class="scores-wrap">
      <div v-if="scores" class="scores">

        <div class="round-overall-scores">

          <template v-if="isInPlay">
            <h2 class="section-heading">Round {{ round }} Scores:</h2>
            <ul>
              <li><span class="rank"><span>{{ roundFirst.rank }}</span></span> {{ roundFirst.name }}:&nbsp;<span :class="`score ${roundFirst.class}`">{{ roundFirst.score }}</span></li>
              <li><span class="rank"><span>{{ roundSecond.rank }}</span></span> {{ roundSecond.name }}:&nbsp;<span :class="`score ${roundSecond.class}`">{{ roundSecond.score }}</span></li>
              <li><span class="rank"><span>{{ roundThird.rank }}</span></span> {{ roundThird.name }}:&nbsp;<span :class="`score ${roundThird.class}`">{{ roundThird.score }}</span></li>
              <li><span class="rank"><span>{{ roundFourth.rank }}</span></span> {{ roundFourth.name }}:&nbsp;<span :class="`score ${roundFourth.class}`">{{ roundFourth.score }}</span></li>
            </ul>
            <hr>
          </template>

          <h2 class="section-heading">Overall Scores:</h2>
          <ul>
            <li><span class="rank"><span>{{ overallFirst.rank }}</span></span> {{ overallFirst.name }}:&nbsp;<span :class="`score ${overallFirst.class}`">{{ overallFirst.score }}</span></li>
            <li><span class="rank"><span>{{ overallSecond.rank }}</span></span> {{ overallSecond.name }}:&nbsp;<span :class="`score ${overallSecond.class}`">{{ overallSecond.score }}</span></li>
            <li><span class="rank"><span>{{ overallThird.rank }}</span></span> {{ overallThird.name }}:&nbsp;<span :class="`score ${overallThird.class}`">{{ overallThird.score }}</span></li>
            <li><span class="rank"><span>{{ overallFourth.rank }}</span></span> {{ overallFourth.name }}:&nbsp;<span :class="`score ${overallFourth.class}`">{{ overallFourth.score }}</span></li>
          </ul>
        </div>

        <template v-if="isInPlay">
          <div class="stats">
            <h2 class="section-heading">Team Round Top 4:</h2>
            <h3 class="subheading">John:</h3>
            <ul>
              <li v-for="(item, index) in johnStats" :key="index"><span class="rank"><span>{{ index+1 }}</span></span> {{ item.player }}:&nbsp;<span class="score" v-html="formatScore(item.score)"></span></li>
            </ul>

            <h3 class="subheading">Alex:</h3>
            <ul>
              <li v-for="(item, index) in alexStats" :key="index"><span class="rank"><span>{{ index+1 }}</span></span> {{ item.player }}:&nbsp;<span class="score" v-html="formatScore(item.score)"></span></li>
            </ul>

            <h3 class="subheading">Max:</h3>
            <ul>
              <li v-for="(item, index) in maxStats" :key="index"><span class="rank"><span>{{ index+1 }}</span></span> {{ item.player }}:&nbsp;<span class="score" v-html="formatScore(item.score)"></span></li>
            </ul>

            <h3 class="subheading">CJ:</h3>
            <ul>
              <li v-for="(item, index) in chrisStats" :key="index"><span class="rank"><span>{{ index+1 }}</span></span> {{ item.player }}:&nbsp;<span class="score" v-html="formatScore(item.score)"></span></li>
            </ul>
          </div>
        </template>

      </div>
    </div>
  </div>
  <p class="last-updated" v-if="lastUpdated"><span class="italic">Last updated:</span> <span class="bold">{{ lastUpdated }}</span></p>
  <p class="stats-from">Stats from: <a href="https://www.cbssports.com/golf/leaderboard/pga-tour" class="link" target="_blank">cbssports.com/golf/leaderboard/pga-tour</a></p>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';


const data = ref(null);
const isLoading = ref(true);
const error = ref(false);
const errorMsg = ref(null);
const lastUpdated = ref(null);

const scores = computed(() => data.value || []);

const stats = computed(() => data.value?.[2] || []);

const roundFirst = computed(() => scores.value?.[0]?.[0] || {});
const overallFirst = computed(() => scores.value?.[1]?.[0] || {});

const roundSecond = computed(() => scores.value?.[0]?.[1] || {});
const overallSecond = computed(() => scores.value?.[1]?.[1] || {});

const roundThird = computed(() => scores.value?.[0]?.[2] || {});
const overallThird = computed(() => scores.value?.[1]?.[2] || {});

const roundFourth = computed(() => scores.value?.[0]?.[3] || {});
const overallFourth = computed(() => scores.value?.[1]?.[3] || {});

const johnStats = computed(() => stats.value?.[0] || []);
const alexStats = computed(() => stats.value?.[1] || []);
const maxStats = computed(() => stats.value?.[2] || []);
const chrisStats = computed(() => stats.value?.[3] || []);

const isInPlay = computed(() => data.value?.[3] || false);
// const isInPlay = computed(() => true);

const round = ref(null);

function setRound() {
  const month = dayjs().format('M')
  const day = dayjs().format('D')
  if (month == 4) {
    if (day == 9) {
      round.value = 1;
    } else if (day == 10) {
      round.value = 2;
    } else if (day == 11) {
      round.value = 3;
    } else if (day == 12) {
      round.value = 4;
    }
  }
}

function formatScore(score) {
  if (score < 0) {
    return `<span class="under-par">${score}</span>`;
  } if (score === 0) {
    return 'E';
  } else if (score > 0) {
    return `+${score}`;
  }
}

async function getData() {
  try {
    // const response = await fetch('http://localhost:8888/scores');
    const response = await fetch('https://golf-scores-tracker-efba68d29894.herokuapp.com/scores');
    const result = await response.json();

    // Create a deep copy to avoid mutating the original response
    data.value = JSON.parse(JSON.stringify(result));

    data.value.forEach((item, i) => {
      console.log('item:', item);
      if (i !== 2 && i !== 3) {
        item.forEach((player, j) => {
          console.log('player:', player);
          if (player.score > 0) {
            data.value[i][j].score = `+${player.score}`;
          } else if (player.score === 0) {
            data.value[i][j].score = 'E';
          }
        });
      }
      const currentTime = dayjs().format('h:mm:ss A');
      lastUpdated.value = currentTime;
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
  setRound();

  setInterval(() => {
    getData();
    setRound();
  }, 60000);
});
</script>

<style lang="scss" scoped>
@use "sass:color";

$color-red: rgb(186, 12, 47);
$color-green: rgb(0, 103, 71);
$color-masters-green: #056948;

.logo-img {
  width: 150px;
}
.title {
  font-size: 1em;
  font-weight: 400;
  font-style: italic;
  color: #32a84a;
  margin-bottom: 60px;
}
.section-heading {
  font-family: 'Work Sans';
  font-weight: 700;
  text-transform: uppercase;
  color: #555;
}
.subheading {
  font-size: 24px;
}
ul {
  margin: 0;
  padding-left: 10px;
  list-style: none;
}
li {
  font-size: 26px;
}
.rank {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: color.scale(#fce300, $lightness: 80%);
  color: $color-masters-green;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 18px;
  font-weight: 600;
}
.link {
  color: #242424;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
}
.last-updated {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 14px;
  margin: 0;
}
.stats-from {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 14px;
  margin: 0 0 0 20px;
  text-align: left;
}
.loading {
  font-size: 20px;
}
.scores-wrap {
  display: flex;
  justify-content: center;
  text-align: left;
}
.scores {
  display: flex;
  width: max-content;
}
.score {
  font-weight: bold;
  color: $color-green;
  &.under-par {
    color: $color-red;
  }
}
.round-overall-scores {
  li {
    display: flex;
    align-items: center;
  }
  hr {
    margin: 40px 0;
  }
}
.stats {
  margin-left: 80px;
  padding-left: 30px;
  border-left: 1px solid gray;
  .section-heading {
    font-size: 18px;
  }
  .subheading {
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
    color: #555;
    margin-bottom: 9px;
    padding-bottom: 3px;
    border-bottom: 1px solid gray;
  }
  .rank {
    width: 15px;
    height: 15px;
    font-size: 12px;
    margin-right: 6px;
  }
  ul {
    margin: 0 0 30px;
  }
  li {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
}
.error-wrap {
  margin-bottom: 50px;
}
.error {
  color: $color-red;
  margin: 0;
}

@media (max-width: 670px) {
  .logo-img {
    margin-top: 30px;
  }
  .scores {
    flex-direction: column;
  }
  .stats {
    margin: 100px 0 0;
    padding: 30px 0 0;
    border-left: none;
    border-top: 1px solid gray;
  }
  .last-updated,
  .stats-from {
    font-size: 12px;
  }
}
</style>
