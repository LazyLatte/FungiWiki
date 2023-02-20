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
/*

router.post('/questions', function(req, res, next) {
    const { subject, content, answer, isMultipleChoice, choice} = req.body;
    questionModel.create(subject, content, answer, isMultipleChoice, choice).then(questions => {
        res.json(questions);
    }).catch(next);
});

router.patch('/questions', function(req, res, next) {
    const { id, subject, content, answer, isMultipleChoice, choice, isAssign} = req.body;
    questionModel.update(id, subject, content, answer, isMultipleChoice, choice, isAssign).then(questions => {
        res.json(questions);
    }).catch(next);
});
router.delete('/questions', function(req, res, next) {
    const { id } = req.query;
    questionModel.del(id).then(questions => {
        res.json(questions);
    }).catch(next);
});
// Vote
router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res, next) {
    const {id, mood} = req.params;
    if (!id || !mood) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    voteModel.create(id, mood).then(post => {

        res.json(post);
    }).catch(next);
});
*/
module.exports = router;
