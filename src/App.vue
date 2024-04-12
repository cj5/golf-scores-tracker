<template>
  <div>
    <h1>Golf Scores Tracker</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';



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






onMounted(() => {
  console.clear();






  // async function getStats() {
  //   const response = await fetch('http://golf-scores-tracker.chrisstack.co/stats');
  //   const stats = await response.json();
  //   console.log('Client — Stats:', stats);
  // }

  // getStats();

});
</script>

<style lang="scss" scoped></style>
