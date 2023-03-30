const express = require('express');
const router = express.Router();
const endpointV1Routes = require('./v1');

/* GET home page. */
router.get('/', function (req, res) {
    res.status(200).json({ message: 'API GorryWell s' });
});

router.use('/api/v1', endpointV1Routes);
module.exports = router;
