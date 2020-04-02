'use strict';

module.exports = function(app) {
  const keyController = require('../controllers/randomKeyController');

  // randomKey Routes
  app
    .route('/api/v1/key')
    .get(keyController.get_one_key)
    .post(keyController.add_one_key);
};
