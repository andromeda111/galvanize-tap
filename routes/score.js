var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET score listing. */
router.get('/', function(req, res, next) {
console.log('GET!!!');
db('scores').orderBy('score', 'desc').limit(10).then(data => {
  console.log('DATA RECEIVED');
  res.json(data);
})
});

/* Post score listing. */
router.post('/', function(req, res, next) {
console.log('POST!!!');
var scoreInfo = req.body
db('scores').insert(scoreInfo).returning('*').then(playerScore => {
  res.json(playerScore);
})
});

module.exports = router;
