const { addArtist, getArtists } = require("./Artist");
const { register, login, checkAuth } = require("./auth");
const { addMusic, getMusics } = require("./music");
const { addTransaction, getTransactions, updateTransaction, getTransaction } = require("./transaction");
module.exports = {
  getTransaction,
  checkAuth,
  getMusics,
  addMusic,
  getArtists,
  addArtist,
  updateTransaction,
  getTransactions,
  addTransaction,
  login,
  register,
};
