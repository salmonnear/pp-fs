const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Factory = require('../models/factory');

router.get('/check', (req, res, next) => {
    res.send('hello');
});


router.get('/', (req, res, next) => {
    Factory.find()
        .select('name upperBound lowerBound childNodes _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                factories: docs.map(doc => {
                    return {
                        name: doc.name,
                        upperBound: doc.upperBound,
                        lowerBound: doc.lowerBound,
                        childNodes: doc.childNodes,   // need to use map here?
                        numberOfNodes: doc.numberOfNodes,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: 'http://localhost:3005/factories/' + doc._id
                        }}
                })
            }
            console.log(response);
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});




router.post('/', (req, res, next) => {
    const factory = new Factory({
        name: req.body.name,
        upperBound: req.body.upperBound,
        lowerBound: req.body.lowerBound,
        childNodes: req.body.childNodes,
        numberOfNodes: req.body.numberOfNodes,
        _id: new mongoose.Types.ObjectId()
    });
    factory
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Factory successfully created',
                createdFactory: {
                    name: result.name,
                    upperBound: result.upperBound,
                    lowerBound: result.lowerBound,
                    childNodes: result.childNodes,
                    numberOfNodes: result.numberOfNodes,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3005/factories/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Factory.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({eror: err});
        });
});


router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Factory.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result)/
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});



router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Factory.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;