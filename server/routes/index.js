const express = require('express');
const router  = express.Router();




router.use('/api/auth' ,require('./auth'))
router.use('/api/mail',require('./mail'))
router.use('/api/elements',require('./elements'))

module.exports = router;
