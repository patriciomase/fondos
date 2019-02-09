const { parse } = require('url');
const fetch = require('node-fetch');

const bloomberg = 'https://www.bloomberg.com/markets2/api/history/{{fund}}%3AAR/PX_LAST?timeframe=1_MONTH&period=daily&volumePeriod=daily';
const validFunds = [
  'FBAHORA',  // Horizonte
  'BFRENTP',  // Renta pesos
  'FBARFPB'   // Renta fija plus
];

module.exports = (req, res) => {
  const queryParams = parse(req.url, true).query;

  if (!validFunds.find(elem => elem == queryParams.fund)) {
    return res.end(JSON.stringify({ error: 'Fund not allowed' }));
  }

  fetch(bloomberg.replace('{{fund}}', queryParams.fund), {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
    }
  })
    .then(response => response.text())
    .then(response => {
      console.log(response);
      res.end(response);
    })
    .catch(err => res.end(JSON.stringify({ error: err.message })));
}
