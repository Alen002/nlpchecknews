const dotenv = require('dotenv')
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const morgan = require('morgan');
const aylienTextAPI = require('aylien_textapi')
const bodyParser = require('body-parser');
const cors = require('cors');


// Initialize the Aylien API and make a request
var textapi = new aylienTextAPI({
    application_id: process.env.api_id,  // keys are from the .env file
    application_key: process.env.api_key // keys are from the .env file
  });

const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan('short'));  // short or combines can be used as attributes
app.use(express.static('dist'));

// middleware - body-parser
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

console.log(__dirname)
app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
});

// The POST request for the API data
app.post('/api', (req, res) => {  
  textapi.sentiment(
    req.body, // json file is received as {"text": "Your text"} -> testing via postman
    function(error, response) {
    if (error === null) {
      res.send(response); // response is the output data of the API 
      console.log(response); // Display the response on the server
    } else console.log('API is not working');
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
});



/* app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
}) */

// designates which port the app will listen to for incoming requests


