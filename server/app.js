import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 8888;

// app.use(cors());
app.use(cors({
  origin: [
    'http://golf-scores-tracker.chrisstack.co',
    'https://golf-scores-tracker.chrisstack.co',
    'http://localhost:8888',
  ]
}));

const mins = 1;
const interval = mins * 60 * 1000;
let intervalCount = 0;

let stats = [];
let roundScores = [];
let overallScores = [];
let isInPlay = false;

getScores();

setInterval(() => {
  getScores();

  intervalCount++;
  console.log('intervalCount:', intervalCount);
}, interval);

async function getScores() {
  try {

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-features=FedCm',
      ],
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    // Navigate the page to a URL
    await page.goto('https://www.cbssports.com/golf/leaderboard/pga-tour/');

    const scores = await page.$$eval(
      '.TableBase-bodyTd.TableBase-bodyTd--number.GolfLeaderboardTable-bodyTd--today',
      els => els.map((el) => el.innerText)
    )

    isInPlay = scores.length ? true : false;
    console.log('isInPlay:', isInPlay);

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

    // let stats = [];

    // console.log('scores:', scores);
    // console.log('players:', players);

    players.forEach(item => {
      stats.push({ player: item });
    });
    scores.forEach((item, i) => {
      stats[i].score = item;
    });

    // console.log('STATS:', stats);

    let johnStats = [];
    let chrisStats = [];
    let maxStats = [];
    let alexStats = [];

    stats.filter((item, i) => {
      // JOHN
      if (item.player === 'Scottie Scheffler') johnStats.push(stats[i]);
      if (item.player === 'Justin Rose') johnStats.push(stats[i]);
      if (item.player === 'Cameron Young') johnStats.push(stats[i]);
      if (item.player === 'Akshay Bhatia') johnStats.push(stats[i]);
      // if (item.player === 'Justin Thomas') johnStats.push(stats[i]);
      if (item.player === 'Patrick Reed') johnStats.push(stats[i]);

      // ALEX
      if (item.player === 'Jon Rahm') alexStats.push(stats[i]);
      if (item.player === 'Tommy Fleetwood') alexStats.push(stats[i]);
      if (item.player === 'Matt Fitzpatrick') alexStats.push(stats[i]);
      if (item.player === 'Jordan Spieth') alexStats.push(stats[i]);
      // if (item.player === 'Min Woo Lee') alexStats.push(stats[i]);
      if (item.player === 'Robert MacIntyre') alexStats.push(stats[i]);

      // MAX
      if (item.player === 'Bryson DeChambeau') maxStats.push(stats[i]);
      if (item.player === 'Xander Schauffele') maxStats.push(stats[i]);
      if (item.player === 'Brooks Koepka') maxStats.push(stats[i]);
      if (item.player === 'Collin Morikawa') maxStats.push(stats[i]);
      if (item.player === 'Adam Scott') maxStats.push(stats[i]);
      // if (item.player === 'Gary Woodland') maxStats.push(stats[i]);

      // CJ
      if (item.player === 'Rory McIlroy') chrisStats.push(stats[i]);
      if (item.player === 'Ludvig Åberg') chrisStats.push(stats[i]);
      if (item.player === 'Hideki Matsuyama') chrisStats.push(stats[i]);
      if (item.player === 'Viktor Hovland') chrisStats.push(stats[i]);
      // if (item.player === 'Chris Gotterup') chrisStats.push(stats[i]);
      if (item.player === 'J.J. Spaun') chrisStats.push(stats[i]);
    });

    const totalScores = [
      { // Round 1
        john: -6,
        chris: -1,
        max: 0,
        alex: 7,
      },
      { // Round 2
        john: 0,
        chris: 0,
        max: 0,
        alex: 0,
      },
      { // Round 3
        john: 0,
        chris: 0,
        max: 0,
        alex: 0,
      },
      { // Round 4
        john: 0,
        chris: 0,
        max: 0,
        alex: 0,
      },
    ];

    stats = [
      johnStats,
      alexStats,
      maxStats,
      chrisStats,
    ];

    // console.log(stats);

    // console.log('johnStats:', johnStats);
    // console.log('chrisStats:', chrisStats);
    // console.log('maxStats:', maxStats);
    // console.log('alexStats:', alexStats);

    let johnTotal = 0;
    let chrisTotal = 0;
    let maxTotal = 0;
    let alexTotal = 0;

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
      if (i === 0) {
        console.log('JOHN:');
      } else if (i === 1) {
        console.log('ALEX:');
      } else if (i === 2) {
        console.log('MAX:');
      } else if (i === 3) {
        console.log('CHRIS:');
      }
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

    const roundIndex = 0; // round 1 = 0, round 2 = 1, etc.

    stats.forEach((x, i) => {
      x.forEach((y, j) => {
        if (i === 0) {
          johnTotal_rd += y.score;
          totalScores[roundIndex].john += y.score;
        } else if (i === 1) {
          alexTotal_rd += y.score;
          totalScores[roundIndex].alex += y.score;
        } else if (i === 2) {
          maxTotal_rd += y.score;
          totalScores[roundIndex].max += y.score;
        } else if (i === 3) {
          chrisTotal_rd += y.score;
          totalScores[roundIndex].chris += y.score;
        }
      });
    });

    totalScores.forEach((item, i) => {
      johnTotal += item.john;
      alexTotal += item.alex;
      maxTotal += item.max;
      chrisTotal += item.chris;
    });


    function sortLowToHigh(array) {
      return array.sort((a, b) => a.score - b.score);
    }

    const roundTotals = [
      {
        name: 'John',
        score: johnTotal_rd,
      },
      {
        name: 'Alex',
        score: alexTotal_rd,
      },
      {
        name: 'Max',
        score: maxTotal_rd,
      },
      {
        name: 'CJ',
        score: chrisTotal_rd,
      },
    ];

    const grandTotals = [
      {
        name: 'John',
        score: johnTotal,
      },
      {
        name: 'Alex',
        score: alexTotal,
      },
      {
        name: 'Max',
        score: maxTotal,
      },
      {
        name: 'CJ',
        score: chrisTotal,
      },
    ];

    console.log('\n');
    console.log('ROUND 1:');
    console.log('———————');
    console.log('John:', stats[0]);
    console.log('Alex:', stats[1]);
    console.log('Max:', stats[2]);
    console.log('CJ:', stats[3]);
    console.log('\n');

    sortLowToHigh(roundTotals);
    sortLowToHigh(grandTotals);

    let previousRoundScore = 0;
    let previousRoundIndex = 0;
    let previousOverallScore = 0;
    let previousOverallIndex = 0;

    console.log('———————————————');
    console.log('ROUND 1 SCORES:');

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

    roundScores = [];
    overallScores = [];

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
      roundScores.push({
        rank,
        name: item.name,
        score: item.score,
        class: item.score < 0 ? 'under-par' : '',
      });
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
      overallScores.push({
        rank,
        name: item.name,
        score: item.score,
        class: item.score < 0 ? 'under-par' : '',
      })
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
    // app.get('/', (req, res) => {
    //   res.send('Golf scores tracker')
    // })
    // app.get('/stats', (req, res) => {
    //   res.send(stats);
    // });

    await browser.close();

  } catch (err) {
    console.error(err);
    process.exit();
  }
};
// })();

// app.get('/', (req, res) => {
//   res.send('Golf scores tracker')
// });

app.get('/stats', (req, res) => {
  res.send(stats);
});

app.get('/scores', (req, res) => {
  res.send([roundScores, overallScores, isInPlay]);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}\nhttp://localhost:${port}`);
});
