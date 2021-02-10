const services = require('../services');

class QuotesController {
  async getQuotes(req, res) {
    const isBad = req.query.isbad;
    const categoryId = req.query.categoryId;
    let quotes;

    try {
      if (isBad) {
        if (!categoryId) {
          quotes = await services.getOneRundomQuote(isBad);
        } else {
          quotes = await services.getOneBadOrNotQuoteWithCategory(
            isBad,
            categoryId,
          );
        }
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
