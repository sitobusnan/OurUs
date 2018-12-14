const express = require('express');
const router  = express.Router();




router.use('/api/auth' ,require('./auth'))
router.use('/mail',require('./mail'))
router.use('/elements',require('./elements'))

module.exports = router;
