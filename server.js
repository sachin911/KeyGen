const express = require('express');
const app = express();
const cors = require("cors");
const config = require('./core/config/config.dev');
// const logger = require('./core/logger/app-logger');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// eslint-disable-next-line no-unused-vars
const RandomKey = require('./api/models/randomKeyModel');
// created model loading here

const bodyParser = require('body-parser');

const fillRandomKeysJob = require('./api/cron/fillRandomKeys')

const port = config.serverPort;
// logger.stream = {
//     write: function(message, encoding){
//         logger.info(message);
//     }
// };

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose
  .connect(config.dbHost, {
    auth: { authdb: 'admin' },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch(err => {
    console.log('Unable to connect', err);
  });

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan("dev", { "stream": logger.stream }));

app.get('/', (req, res) => {
  res.send('Hello');
});

const keyRoutes = require('./api/routes/randomKey');
keyRoutes(app);

app.listen(port, () => {
  console.log('Node.js + MongoDB RESTful API server started on: ' + port);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

fillRandomKeysJob.start();
