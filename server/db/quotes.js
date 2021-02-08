const connection = require('./connect');

const getAllQuotes = async () => {
  const query = await connection.query(`SELECT quotes._id, quote, author, is_bad, name as category_name FROM "NoAddiction".quotes
  JOIN "NoAddiction".categories ON quotes.category_id = categories._id`);

  return query;
};

async function getAllBadOrNotQuotes(isBad) {
  const query = await connection.query(
    `SELECT quote, author, name as category_name FROM "NoAddiction".quotes
  JOIN "NoAddiction".categories ON quotes.category_id = categories._id
  WHERE quotes.is_bad = $1
  ORDER BY RANDOM()
  LIMIT 1`,
    [isBad],
  );

  return query;
}

module.exports = { getAllQuotes, getAllBadOrNotQuotes };
