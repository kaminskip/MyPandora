var router = require('express').Router();

router.use('/', require('./temp'));
router.use('/', require('./lamp'));

module.exports = router;