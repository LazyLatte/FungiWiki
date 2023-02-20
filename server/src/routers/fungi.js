const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const fungiModel = require('../model/fungi.js');


const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// List
router.get('/search', function(req, res, next) {

    const {s} = req.query;

    fungiModel.list(s).then(fungi => {
        //console.log(fungi);
        res.json(fungi);
    }).catch(next);
});

router.get('/category', function(req, res, next) {

    const { c } = req.query;

    fungiModel.listByCategory(c).then(fungi => {
        //console.log(fungi);
        res.json(fungi);
    }).catch(next);
});
router.get('/fungi', function(req, res, next) {

    const { name } = req.query;

    fungiModel.getByName(name).then(fungi => {
        //console.log(fungi);
        res.json(fungi);
    }).catch(next);
});

module.exports = router;
