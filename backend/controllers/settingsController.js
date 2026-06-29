const { readStore, writeStore } = require('../utils/store');

function getSettings(_req, res) {
  const store = readStore();
  res.json(store.settings);
}

function updateSettings(req, res) {
  const store = readStore();
  store.settings = { ...store.settings, ...req.body };
  writeStore(store);
  res.json(store.settings);
}

module.exports = { getSettings, updateSettings };