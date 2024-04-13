import express from 'express';
import puppeteer from 'puppeteer';
const app = express();
const port = process.env.PORT || 5050;

const mins = 1;
const interval = mins * 60 * 1000;
let intervalCount = 0;

getScores();

setInterval(() => {
  getScores();

  intervalCount++;
  console.log('intervalCount:', intervalCount);
}, interval);

async function getScores() {
  try {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    // Navigate the page to a URL
    await page.goto('https://www.cbssports.com/golf/leaderboard/pga-tour/');

    const scores = await page.$$eval(
      '.TableBase-bodyTd.TableBase-bodyTd--number.GolfLeaderboardTable-bodyTd--today',
      els => els.map((el) => el.innerText)
    )

    // let scores_1 = await page.$$eval(
    //   '.TableBase-bodyTr.GolfLeaderboard-bodyTr.GolfLeaderboard-toggleScorecard--open .TableBase-bodyTd.TableBase-bodyTd--number',
    //   els => els.map((el) => el.innerText)
    // )

    // console.log(scores_1);

    // let scores = [];
    // let startCount = 0;
    // let intervalCount = 0;
    // scores_1.forEach((item, i) => {
    //   if (startCount === 2) {
    //     scores.push(item);
    //   }
    //   if (startCount >= 2) {
    //     intervalCount++;
    //   }
    //   if (intervalCount === 7) {
    //     scores.push(item);
    //     intervalCount = 1;
    //   }
    //   startCount++;
    // });

    const players = await page.$$eval(
      '.TableBase-bodyTd.GolfLeaderboardTable-bodyTd--playerName .CellPlayerName--long a',
      els => els.map((el) => el.innerText)
    )

    let stats = [];

    // console.log('scores', scores);

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
      if (item.player === 'Bryson DeChambeau') caseyStats.push(stats[i]);
      if (item.player === 'Tom Kim') caseyStats.push(stats[i]);
      if (item.player === 'Collin Morikawa') caseyStats.push(stats[i]);
      // if (item.player === 'Wyndham Clark') caseyStats.push(stats[i]);
      // if (item.player === 'Sam Burns') caseyStats.push(stats[i]);

      // JOHN
      if (item.player === 'Rory McIlroy') johnStats.push(stats[i]);
      if (item.player === 'Keegan Bradley') johnStats.push(stats[i]);
      if (item.player === 'Tony Finau') johnStats.push(stats[i]);
      if (item.player === 'Matt Fitzpatrick') johnStats.push(stats[i]);
      if (item.player === 'Rickie Fowler') johnStats.push(stats[i]);
      // if (item.player === 'Jordan Spieth') johnStats.push(stats[i]);

      // CJ
      if (item.player === 'Max Homa') chrisStats.push(stats[i]);
      if (item.player === 'Ludvig Aberg') chrisStats.push(stats[i]);
      if (item.player === 'Tommy Fleetwood') chrisStats.push(stats[i]);
      if (item.player === 'Patrick Cantlay') chrisStats.push(stats[i]);
      if (item.player === 'Will Zalatoris') chrisStats.push(stats[i]);
      // if (item.player === 'Viktor Hovland') chrisStats.push(stats[i]);

      // MAX
      if (item.player === 'Brooks Koepka') maxStats.push(stats[i]);
      if (item.player === 'Xander Schauffele') maxStats.push(stats[i]);
      if (item.player === 'Cameron Smith') maxStats.push(stats[i]);
      if (item.player === 'Jason Day') maxStats.push(stats[i]);
      // if (item.player === 'Justin Thomas') maxStats.push(stats[i]);
      // if (item.player === 'Adam Scott') maxStats.push(stats[i]);

      // ALEX
      if (item.player === 'Tiger Woods') alexStats.push(stats[i]);
      if (item.player === 'Jon Rahm') alexStats.push(stats[i]);
      if (item.player === 'Joaquin Niemann') alexStats.push(stats[i]);
      if (item.player === 'Hideki Matsuyama') alexStats.push(stats[i]);
      // if (item.player === 'Nick Dunlap') alexStats.push(stats[i]);
      // if (item.player === 'Dustin Johnson') alexStats.push(stats[i]);
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
        casey: 8,
        john: 7,
        chris: -2,
        max: 2,
        alex: 12,
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

    // console.log(stats);

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
        console.log(y, j);
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
      if (stats[i].length > 4) {
        stats[i].splice(highScoreIndex, 1);
      }
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
        name: 'CJ',
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
        name: 'CJ',
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
    console.log('ROUND 3:');
    console.log('-------');
    console.log('CJ:', stats[2]);
    console.log('Max:', stats[3]);
    console.log('John:', stats[1]);
    console.log('Casey:', stats[0]);
    console.log('Alex:', stats[4]);
    console.log('\n');

    sortLowToHigh(roundTotals);
    sortLowToHigh(grandTotals);

    let previousRoundScore = 0;
    let previousRoundIndex = 0;
    let previousOverallScore = 0;
    let previousOverallIndex = 0;

    console.log('———————————————');
    console.log('ROUND 3 SCORES:');

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

    // console.log('stats:', stats);

    // app.get('/', async (req, res) => {
    //   await res.send('hello?');
    // });
    app.get('/', (req, res) => {
      res.send('Golf scores tracker')
    })
    app.get('/stats', (req, res) => {
      res.send(stats);
    });

    await browser.close();

  } catch (err) {
    console.error(err);
    process.exit();
  }
};
// })();

// app.get('/', (req, res) => {
//   res.send('Golf scores tracker')
// })

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
