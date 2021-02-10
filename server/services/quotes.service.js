const db = require('../db');

const getAllQuotes = async () => {
  try {
    const quotes = await db.getAllQuotes();

    return quotes.rows;
  } catch (error) {
    throw new Error('Error with get all quotes');
  }
};

/**
 * Get one category isBad or not by category
 * If db does not exists this category qoutes return rundom quote
 * @param {Number} isBad
 * @param {Number} categoryId
 */
async function getOneBadOrNotQuoteWithCategory(isBad, categoryId) {
  try {
    let quotes = await db.getAllBadOrNotQuotes(isBad, categoryId);
    if (!quotes.rows.length) quotes = await db.getOneRandomQuote(isBad);

    return quotes.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(
      `Error with get isBad=${isBad} quote, Category: ${categoryId}`,
    );
  }
}

async function getOneRundomQuote(isBad) {
  try {
    const quotes = await db.getOneRandomQuote(isBad);

    return quotes.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(`Error with get isBad=${isBad} quote`);
  }
}

module.exports = {
  getAllQuotes,
  getOneBadOrNotQuoteWithCategory,
  getOneRundomQuote,
};
