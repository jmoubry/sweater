const express = require('express');
const router = express.Router();
const threads = require('../services/threads');
const chats = require('../services/chats');

/* GET threads listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await threads.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting threads `, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
    try {
      res.json(await threads.getById(req.params.id));
    } catch (err) {
      console.error(`Error while getting thread `, err.message);
      next(err);
    }
  });

router.post('/', async function(req, res, next) {
  try {
    res.json(await threads.create(req.body));
  } catch (err) {
    console.error(`Error while posting threads `, err.message);
    next(err);
  }
});



/* GET chats listing by thread ID. */
router.get('/:id/chats', async function(req, res, next) {
  try {
    res.json(await chats.getMultiple(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting threads `, err.message);
    next(err);
  }
});




module.exports = router;