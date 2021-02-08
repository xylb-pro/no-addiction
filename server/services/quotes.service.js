const db = require('../db');

const getAllQuotes = async () => {
  try {
    const quotes = await db.getAllQuotes();

    return quotes.rows;
  } catch (error) {
    throw new Error('Error with get all quotes');
  }
};

async function getAllBadOrNotQuotes(isBad) {
  try {
    const quotes = await db.getAllBadOrNotQuotes(isBad);

    return quotes.rows[0];
  } catch (error) {
    throw new Error(`Error with get all isBad=${isBad} quotes`);
  }
}

module.exports = { getAllQuotes, getAllBadOrNotQuotes };
