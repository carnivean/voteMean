/**
 * Created by Erik Kynast on 24.09.2015.
 */
'use strict';

var express = require('express');
var controller = require('./poll.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.showById);
router.get('/:user/:pollname', controller.showByNameAndID);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
