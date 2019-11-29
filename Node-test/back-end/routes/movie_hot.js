var express = require('express')
var router = express.Router()
let movieHot = require('../controllers/movie_hot')
let uploadMiddleware =require('../middlewares/upload')
router.route('/')
    .get(movieHot.findAll)
    .post(movieHot.save)
    // .patch(uploadMiddleware,movieHot.updata)
    .delete(movieHot.remove)
router.get('/findOne', movieHot.findOne)
router.post('/search', movieHot.search)
router.post('/updata',uploadMiddleware,movieHot.updata)
router.post('/upload',uploadMiddleware)
module.exports = router