/**
 * Created by Erik Kynast on 24.09.2015.
 */
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of things
exports.index = function (req, res) {
  Poll.find(function (err, polls) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(polls);
  });
};

// Get a single thing
exports.showById = function (req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    return res.json(poll);
  });
};

exports.showByUser = function (req, res) {
  var usr = req.params.username;
  Poll.find({'userName': usr}, function (err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    return res.json(poll);
  });
};

// Get Poll by name and id
exports.showByNameAndID = function (req, res) {
  var usr = req.params.username;
  var name = req.params.question;
  Poll.findOne({'userName': usr, 'question': name}, function (err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    return res.json(poll);
  });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
  Poll.create(req.body, function (err, poll) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(poll);
  });
};

exports.incByNameAndID = function (req, res) {
  var usr = req.params.username;
  var name = req.params.question;
  var index = req.params.poll_option;
  console.log('usr:' + usr + ' name:' + name + " index:" + index);

  Poll.findOne({
    'userName': usr,
    'question': name
  }, function (err, doc) {
    if (!doc) {
      return res.status(404).send('Not Found');
    }
    // console.log(doc);
    console.log(doc.poll_results[index]);
    doc.poll_results[index]++;
    doc.markModified('poll_results');
    doc.save();
    return res.json(doc);
  });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    var updated = _.extend(poll, req.body);
    updated.save(function (err) {
      console.log("saving updated doc... I hope so...");
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if (err) {
      return handleError(res, err);
    }
    if (!poll) {
      return res.status(404).send('Not Found');
    }
    console.log(poll);
    console.log(req.params.id);
    poll.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
