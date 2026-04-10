<template>
  <div>
    <h1>Golf Scores Tracker</h1>
    <h2 v-if="isLoading">Loading...</h2>
    <div v-if="error">
      <h2>⚠️ Error</h2>
      <p style="color: red;">{{ errorMsg }}</p>
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
  color: green;
  &.under-par {
    color: red;
  }
}
</style>

<script>
// (async () => {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   // await page.goto('https://developer.chrome.com/');
//   // await page.goto('https://www.masters.com/en_US/scores/index.html');
//   await page.goto('https://www.cbssports.com/golf/leaderboard/pga-tour/');

//   // const scoringTypeBtn = '#leaderboardHeader .select-menu-primary button';
//   // await page.waitForSelector(scoringTypeBtn);
//   // await page.click(scoringTypeBtn);

//   const scores = await page.$$eval(
//     '.TableBase-bodyTd.TableBase-bodyTd--number.GolfLeaderboardTable-bodyTd--today',
//     els => els.map((el) => el.innerText)
//   )

//   const players = await page.$$eval(
//     '.TableBase-bodyTd.GolfLeaderboardTable-bodyTd--playerName .CellPlayerName--long a',
//     els => els.map((el) => el.innerText)
//   )

//   let stats = [];

//   players.forEach(item => {
//     stats.push({ player: item })
//   });
//   scores.forEach((item, i) => {
//     stats[i].score = item;
//   });

//   console.log('STATS:', stats);

//   let caseyStats = [];
//   let johnStats = [];
//   let chrisStats = [];
//   let maxStats = [];
//   let alexStats = [];

//   stats.filter((item, i) => {
//     if (item.player === 'Scottie Scheffler') caseyStats.push(stats[i]);
//     if (item.player === 'Wyndham Clark') caseyStats.push(stats[i]);
//     if (item.player === 'Collin Morikawa') caseyStats.push(stats[i]);
//     if (item.player === 'Tom Kim') caseyStats.push(stats[i]);
//     if (item.player === 'Sam Burns') caseyStats.push(stats[i]);

//     if (item.player === 'Rory McIlroy') johnStats.push(stats[i]);
//     if (item.player === 'Jordan Spieth') johnStats.push(stats[i]);
//     if (item.player === 'Keegan Bradley') johnStats.push(stats[i]);
//     if (item.player === 'Tony Finau') johnStats.push(stats[i]);
//     if (item.player === 'Matt Fitzpatrick') johnStats.push(stats[i]);

//     if (item.player === 'Viktor Hovland') chrisStats.push(stats[i]);
//     if (item.player === 'Max Homa') chrisStats.push(stats[i]);
//     if (item.player === 'Ludvig Aberg') chrisStats.push(stats[i]);
//     if (item.player === 'Tommy Fleetwood') chrisStats.push(stats[i]);
//     if (item.player === 'Patrick Cantlay') chrisStats.push(stats[i]);

//     if (item.player === 'Brooks Koepka') maxStats.push(stats[i]);
//     if (item.player === 'Xander Schauffele') maxStats.push(stats[i]);
//     if (item.player === 'Cameron Smith') maxStats.push(stats[i]);
//     if (item.player === 'Jason Day') maxStats.push(stats[i]);
//     if (item.player === 'Adam Scott') maxStats.push(stats[i]);

//     if (item.player === 'Jon Rahm') alexStats.push(stats[i]);
//     if (item.player === 'Hideki Matsuyama') alexStats.push(stats[i]);
//     if (item.player === 'Nick Dunlap') alexStats.push(stats[i]);
//     if (item.player === 'Joaquin Niemann') alexStats.push(stats[i]);
//     if (item.player === 'Dustin Johnson') alexStats.push(stats[i]);
//   });

//   console.log('caseyStats:', caseyStats);
//   console.log('johnStats:', johnStats);
//   console.log('chrisStats:', chrisStats);
//   console.log('maxStats:', maxStats);
//   console.log('alexStats:', alexStats);

//   let caseyTotal = 0;
//   let johnTotal = 0;
//   let chrisTotal = 0;
//   let maxTotal = 0;
//   let alexTotal = 0;

//   function calculateTotalScore(nameStats, nameTotal) {
//     nameStats.forEach((item, i) => {
//       if (item.score === 'E') {
//         item.score = 0;
//         console.log(item.score);
//       } else {
//         item.score = Number(item.score);
//         console.log(Number(item.score));
//       }
//       nameTotal += item.score;
//     });
//   }

//   console.log('caseyTotal', caseyTotal);

//   stats = [
//     caseyStats,
//     johnStats,
//     chrisStats,
//     maxStats,
//     alexStats,
//   ];

//   stats.forEach((x, i) => {
//     x[0].forEach((y, j) => {

//     });
//   });

//   // router.get('/stats', async (req, res) => {
//   app.get('/stats', async (req, res) => {
//     await res.send(stats);
//   });

//   await browser.close();
// })();
</script>
