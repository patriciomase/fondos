const { parse } = require('url');
const fetch = require('fetch');

module.exports = (req, res) => {
  const { query } = parse(req.url, true);
  const { name = 'World' } = query;
  res.end(`Hello ${name}!`);
}
