const { Router } = require('express');
const router = Router();


const profileRoutes = require('./api/profiles/index');


router.use('/profiles', profileRoutes);


module.exports = router;