const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

module.exports = app;

const PORT = 3000;

// Middleware for logging
app.use(morgan('short'));

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Test Server
app.get('/', (req, res, next) => {
    res.status(200).send("Hello World");
})

//// Error Handling Middle Ware 
const errorHandler = (err, req, res, next) => {
    if (!err.status) {
      err.status = 500;
    }
    res.status(err.status).send(err.message);
};
app.use(errorHandler);


// Server starting
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});