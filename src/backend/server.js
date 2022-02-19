let express = require('express'),
   http = require("http")
   createError = require('http-errors')
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connect: ' + error)
   }
)

// Setting up port with express js
const userRoute = require('../backend/routes/user.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

var corsOptions = {
   origin: 'http://localhost:4200',
   methods: ["GET", "POST"],
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }

app.use(cors(corsOptions)); 
app.use(express.static(path.join(__dirname, 'dist/sweater-app')));
app.use('/', express.static(path.join(__dirname, 'dist/sweater-app')));
app.use('/api', userRoute)

// Create port
const port = process.env.PORT || 4000;
const server = http.createServer(app)

server.listen(port, () => {
   console.log('Connected to port ' + port)
});


// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

var io = require('socket.io')(server, { cors: {
   origin: 'http://localhost:4200',
   methods: ['GET', 'POST']
}});

io.on('connection', (socket) => {
   console.log('a user connected');

   socket.on('message', (msg) => {
      console.log('received a message');
     console.log(msg);
     socket.broadcast.emit('message-broadcast', msg);
  });
 });
