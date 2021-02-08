const services = require('../services');

class QuotesController {
  async getQuotes(req, res) {
    try {
      const isBad = req.query.isbad;
      let quotes;
      if (isBad !== undefined) {
        quotes = await services.getAllBadOrNotQuotes(isBad);
      } else {
        quotes = await services.getAllQuotes();
      }

      res.send(quotes);
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  }
}

module.exports = new QuotesController();
