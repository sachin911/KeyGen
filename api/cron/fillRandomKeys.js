const cron = require('node-cron');
const keyController = require('../controllers/randomKeyController');


module.exports = cron.schedule('*/1 * * * *', () => {
  console.log('running a task every two minutes');
  keyController.get_count_of_key()
  .then(count => {
      if(count < 5) {
        keyController.hydrate_random_keys();
      }
  });

});