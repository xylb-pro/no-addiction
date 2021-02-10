const connection = require('./connect');

const getAllQuotes = async () => {
  const query = await connection.query(`SELECT quotes._id, quote, author, is_bad, name as category_name FROM "NoAddiction".quotes
  JOIN "NoAddiction".categories ON quotes.category_id = categories._id`);

  return query;
};

async function getAllBadOrNotQuotes(isBad, categoryId) {
  const query = await connection.query(
    `SELECT categories._id, quote, author FROM "NoAddiction".quotes
  JOIN "NoAddiction".categories ON quotes.category_id = categories._id
  WHERE quotes.is_bad = $1 AND quotes.category_id = $2
  ORDER BY RANDOM()
  LIMIT 1`,
    [isBad, categoryId],
  );

  return query;
}

async function getOneRandomQuote(isBad) {
  const query = await connection.query(
    `SELECT quote, author FROM "NoAddiction".quotes
  JOIN "NoAddiction".categories ON quotes.category_id = categories._id
  WHERE quotes.is_bad = $1
  ORDER BY RANDOM()
  LIMIT 1`,
    [isBad],
  );

  return query;
}

async function getAvailableCategoriesIds() {
  const queryResult = await connection.query(
    `SELECT distinct category_id  FROM "NoAddiction"."quotes" ORDER BY category_id`,
  );

  return queryResult;
}

module.exports = {
  getAllQuotes,
  getAllBadOrNotQuotes,
  getOneRandomQuote,
  getAvailableCategoriesIds,
};
