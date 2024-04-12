import express from 'express';
// import serverless from 'serverless-http';
import puppeteer from 'puppeteer';
const app = express();
// const router = express.Router();
const port = 8080;

const mins = 1;
const interval = mins * 60 * 1000;
let intervalCount = 0;

getScores();

setInterval(() => {
  getScores();

  intervalCount++;
  console.log('intervalCount:', intervalCount);
}, interval)

async function getScores() {
  try {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    // Navigate the page to a URL
    // await page.goto('https://developer.chrome.com/');
    // await page.goto('https://www.masters.com/en_US/scores/index.html');
    await page.goto('https://www.cbssports.com/golf/leaderboard/pga-tour/');

    // const scoringTypeBtn = '#leaderboardHeader .select-menu-primary button';
    // await page.waitForSelector(scoringTypeBtn);
    // await page.click(scoringTypeBtn);


    const scores = await page.$$eval(
      '.TableBase-bodyTd.TableBase-bodyTd--number.GolfLeaderboardTable-bodyTd--today',
      els => els.map((el) => el.innerText)
    )
    // const scores = await page.$$eval(
    //   '.TableBase-bodyTd.TableBase-bodyTd--number.GolfLeaderboardTable-bodyTd--round1',
    //   els => els.map((el) => el.innerText)
    // )

    const players = await page.$$eval(
      '.TableBase-bodyTd.GolfLeaderboardTable-bodyTd--playerName .CellPlayerName--long a',
      els => els.map((el) => el.innerText)
    )

    let stats = [];

    players.forEach(item => {
      stats.push({player: item});
    });
    scores.forEach((item, i) => {
      stats[i].score = item;
    });

    // console.log('STATS:', stats);

    let caseyStats = [];
    let johnStats = [];
    let chrisStats = [];
    let maxStats = [];
    let alexStats = [];

    stats.filter((item, i) => {
      // CASEY
      if (item.player === 'Scottie Scheffler') caseyStats.push(stats[i]);
      if (item.player === 'Wyndham Clark') caseyStats.push(stats[i]);
      if (item.player === 'Bryson DeChambeau') caseyStats.push(stats[i]);
      if (item.player === 'Tom Kim') caseyStats.push(stats[i]);
      if (item.player === 'Sam Burns') caseyStats.push(stats[i]);
      // if (item.player === 'Collin Morikawa') caseyStats.push(stats[i]);

      // JOHN
      if (item.player === 'Rory McIlroy') johnStats.push(stats[i]);
      if (item.player === 'Jordan Spieth') johnStats.push(stats[i]);
      if (item.player === 'Keegan Bradley') johnStats.push(stats[i]);
      if (item.player === 'Tony Finau') johnStats.push(stats[i]);
      if (item.player === 'Matt Fitzpatrick') johnStats.push(stats[i]);

      // CHRIS
      if (item.player === 'Viktor Hovland') chrisStats.push(stats[i]);
      if (item.player === 'Max Homa') chrisStats.push(stats[i]);
      if (item.player === 'Ludvig Aberg') chrisStats.push(stats[i]);
      if (item.player === 'Tommy Fleetwood') chrisStats.push(stats[i]);
      if (item.player === 'Patrick Cantlay') chrisStats.push(stats[i]);

      // MAX
      if (item.player === 'Brooks Koepka') maxStats.push(stats[i]);
      if (item.player === 'Xander Schauffele') maxStats.push(stats[i]);
      if (item.player === 'Cameron Smith') maxStats.push(stats[i]);
      if (item.player === 'Jason Day') maxStats.push(stats[i]);
      if (item.player === 'Justin Thomas') maxStats.push(stats[i]);
      // if (item.player === 'Adam Scott') maxStats.push(stats[i]);

      // ALEX
      if (item.player === 'Jon Rahm') alexStats.push(stats[i]);
      if (item.player === 'Tiger Woods') alexStats.push(stats[i]);
      if (item.player === 'Nick Dunlap') alexStats.push(stats[i]);
      if (item.player === 'Joaquin Niemann') alexStats.push(stats[i]);
      if (item.player === 'Dustin Johnson') alexStats.push(stats[i]);
      // if (item.player === 'Hideki Matsuyama') alexStats.push(stats[i]);
    });

    const totalScores = [
      { // Round 1
        casey: -6,
        john: 3,
        chris: -7,
        max: 3,
        alex: 8,
      },
      { // Round 2
        casey: 0,
        john: 0,
        chris: 0,
        max: 0,
        alex: 0,
      },
      { // Round 3
        casey: 0,
        john: 0,
        chris: 0,
        max: 0,
        alex: 0,
      },
      { // Round 4
        casey: 0,
        john: 0,
        chris: 0,
        max: 0,
        alex: 0,
      },
    ];

    stats = [
      caseyStats,
      johnStats,
      chrisStats,
      maxStats,
      alexStats,
    ];

    console.log(stats);

    // console.log('caseyStats:', caseyStats);
    // console.log('johnStats:', johnStats);
    // console.log('chrisStats:', chrisStats);
    // console.log('maxStats:', maxStats);
    // console.log('alexStats:', alexStats);

    let caseyTotal = 0;
    let johnTotal = 0;
    let chrisTotal = 0;
    let maxTotal = 0;
    let alexTotal = 0;

    let caseyTotal_rd = 0;
    let johnTotal_rd = 0;
    let chrisTotal_rd = 0;
    let maxTotal_rd = 0;
    let alexTotal_rd = 0;

    function isNumeric(str) {
      if (typeof str != "string") return false // we only process strings!
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    stats.forEach((x, i) => {
      // console.log('x', x, i);
      console.log('———————————');
      let highScoreIndex = 0;
      let prevHighScore = 0;
      x.forEach((y, j) => {
        console.log('y', y, j);
        if (y.score > 40) {
          // console.log(1, y.player, y.score);
          y.score = y.score - 72;
        } else if (isNumeric(y.score)) {
          // console.log(2, y.player, y.score);
          y.score = Number(y.score);
        } else {
          // console.log(3, y.player, y.score);
          y.score = 0;
        }

        if (y.score > stats[i][highScoreIndex].score) {
          highScoreIndex = j;
        }
        prevHighScore = y.score;
        console.log('highScoreIndex:', highScoreIndex, 'prevHighScore:', prevHighScore);
      });
      // Remove high score
      stats[i].splice(highScoreIndex, 1);
      sortLowToHigh(x);
    });

    // console.log('stats — high score removed:', stats);

    stats.forEach((x, i) => {
      x.forEach((y, j) => {
        if (i === 0) {
          caseyTotal_rd += y.score;
          totalScores[1].casey += y.score;
        } else if (i === 1) {
          johnTotal_rd += y.score;
          totalScores[1].john += y.score;
        } else if (i === 2) {
          chrisTotal_rd += y.score;
          totalScores[1].chris += y.score;
        } else if (i === 3) {
          maxTotal_rd += y.score;
          totalScores[1].max += y.score;
        } else if (i === 4) {
          alexTotal_rd += y.score;
          totalScores[1].alex += y.score;
        }
      });
    });

    totalScores.forEach((item, i) => {
      caseyTotal += item.casey;
      johnTotal += item.john;
      chrisTotal += item.chris;
      maxTotal += item.max;
      alexTotal += item.alex;
    });

    function sortLowToHigh(array) {
      return array.sort((a, b) => a.score - b.score);
    }

    const roundTotals = [
      {
        name: 'Casey',
        score: caseyTotal_rd,
      },
      {
        name: 'John',
        score: johnTotal_rd,
      },
      {
        name: 'Chris',
        score: chrisTotal_rd,
      },
      {
        name: 'Max',
        score: maxTotal_rd,
      },
      {
        name: 'Alex',
        score: alexTotal_rd,
      },
    ];

    const grandTotals = [
      {
        name: 'Casey',
        score: caseyTotal,
      },
      {
        name: 'John',
        score: johnTotal,
      },
      {
        name: 'Chris',
        score: chrisTotal,
      },
      {
        name: 'Max',
        score: maxTotal,
      },
      {
        name: 'Alex',
        score: alexTotal,
      },
    ];

    console.log('\n');
    console.log('Casey:', stats[0]);
    console.log('John:', stats[1]);
    console.log('Chris:', stats[2]);
    console.log('Max:', stats[3]);
    console.log('Alex:', stats[4]);
    console.log('\n');

    sortLowToHigh(roundTotals);
    sortLowToHigh(grandTotals);

    let previousRoundScore = 0;
    let previousRoundIndex = 0;
    let previousOverallScore = 0;
    let previousOverallIndex = 0;

    console.log('———————————————');
    console.log('ROUND SCORES:');

    // function logScores(prevScore, prevIndex, item, i) {
    //   let rank = i + 1;
    //   if (prevScore === item.score) {
    //     rank = prevIndex + 1;
    //   } else {
    //     prevIndex = i;
    //   }
    //   prevScore = item.score;
    //   console.log(`(${rank}) ${item.name}:`, item.score);
    // }

    roundTotals.forEach((item, i) => {
      // logScores(previousRoundScore, previousRoundIndex, item, i);
      let rank = i + 1;
      if (previousRoundScore === item.score) {
        rank = previousRoundIndex + 1;
      } else {
        previousRoundIndex = i;
      }
      previousRoundScore = item.score;
      console.log(`(${rank}) ${item.name}:`, item.score);
    });

    console.log('———————————————');
    console.log('OVERALL SCORES:');

    grandTotals.forEach((item, i) => {
      // logScores(previousOverallScore, previousOverallIndex, item, i);
      let rank = i + 1;
      if (previousOverallScore === item.score) {
        rank = previousOverallIndex + 1;
      } else {
        previousOverallIndex = i;
      }
      previousOverallScore = item.score;
      console.log(`(${rank}) ${item.name}:`, item.score);
    });

    console.log('———————————————\n\n');


    // console.log('Casey:', stats[0]);
    // console.log('John:', stats[1]);
    // console.log('Chris:', stats[2]);
    // console.log('Max:', stats[3]);
    // console.log('Alex', stats[4]);

    // router.get('/stats', async (req, res) => {
    // app.get('/stats', async (req, res) => {
    //   await res.send(stats);
    // });

    await browser.close();

  } catch (err) {
    error.log(err);
    process.exit();
  }
};
// })();

// app.use('/.netlify/functions/app', router);


app.get('/stats', (req, res) => {
  res.send('stats');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// module.exports.handler = serverless(app);
