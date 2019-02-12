const { parse } = require('url');
const fetch = require('node-fetch');

const bloomberg = 'https://www.bloomberg.com/markets2/api/history/{{fund}}%3AAR/PX_LAST?timeframe=1_MONTH&period=daily&volumePeriod=daily';
const validFunds = [
  'FBAHORA',  // Horizonte
  'BFRENTP',  // Renta pesos
  'FBARFPB'   // Renta fija plus
];

module.exports = (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:8999',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
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
        res.writeHead(200, headers);
        res.end(response);
      })
      .catch(err => res.end(JSON.stringify({ error: err.message })));
  }
  else {
    res.writeHead(405, headers);
    res.end(`${req.method} is not allowed for the request.`);
  }
}
