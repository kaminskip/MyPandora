var router = require('express').Router();

router.get('/api', function(req, res) {
    res.json({ message: 'Pandora gateway api' });
});

router.use('/api', require('./api'));

module.exports = router;