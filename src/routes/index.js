const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/partners', (req, res) => {
  res.render('partners');
});
module.exports = router;
