
const { DB } = require('../db');

exports.route = (app) => {
  app.get('/leaderboard/market/cancel/add', async (req, res) => {

    const { hash, accountAddress, nftAddress, nftId, gas } = req.query;
    if(!hash || !accountAddress || !nftAddress || !nftId) {
      return res.status(400).json({ error: 'Invalid query. Must pass hash, accountAddress, nftAddress, nftId.' });
    }

    try {
      await DB.$marketcancels.replaceOne({ hash }, { hash, accountAddress, nftAddress, nftId, gas }, { upsert: true });
    } catch(error) {
      return res.status(500).json({ error })
    }

    res.json({ added: true });
    
  });
}
