const express = require('express');
const fs = require('fs');
const router = express.Router();

const localParks = JSON.parse(fs.readFileSync('./data/parks-local.json', 'utf-8'));

router.get('/json', (req, res) => {
  res.json(localParks);
});

module.exports = router;