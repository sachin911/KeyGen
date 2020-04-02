'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');

const RandomKey = mongoose.model('RandomKey');

exports.get_one_key = function(req, res) {
  RandomKey.findOne({
    "is_used": false
  }, {}, { sort: { 'gen_date' : -1 } })
  .then((data) => {
    RandomKey.findOneAndUpdate({
      "_id": data.id,
    }, {
      "is_used": true,
    }, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.json(doc);
    });
  })
};

exports.add_one_key = function(req, res) {
  const newTask = new RandomKey(req.body);
  newTask.save(function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.get_count_of_key = async function() {
  const count = await RandomKey.countDocuments({
    is_used: false
  });
  return count;
}

exports.hydrate_random_keys = async function() {
  let count = 5;
  let keyArr = [];
  while (count > 0) {
    const buf = crypto.randomBytes(8);
    const key = buf.toString('base64');
    const dbKey = await RandomKey.findOne({
      random_key: key
    });
    if((!dbKey || dbKey.random_key !== key) && !keyArr.includes(key)) {
      count--;
      keyArr.push({
        random_key: key
      });
    }
  }
  RandomKey.insertMany(keyArr, function(error, docs) {
    if (error) {
      console.log('something went wrong here');
    }
  });
}
