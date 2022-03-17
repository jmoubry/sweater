if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
 }

let express = require('express'),
   http = require("http")
   createError = require('http-errors')
   path = require('path'),
   cors = require('cors'),
   bodyParser = require('body-parser')

// Setting up port with express js
const threadRoute = require('./routes/threads.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

var corsOptions = {
   origin: process.env.CLIENT_URL,
   methods: ["GET", "POST"],
   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }

app.use(cors(corsOptions)); 
app.use(express.static(path.join(__dirname, 'dist/sweater-app')));
app.use('/', express.static(path.join(__dirname, 'dist/sweater-app')));
app.use('/threads', threadRoute)
require('./routes/user.route')(app);

const db = require("./models");
db.sequelize.sync();

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

const chatService = require('./services/chats');

io.on('connection', (socket) => {
   console.log('a user connected ' + socket.id);

   socket.on('getChats', async threadId => {
      const room = `thread:${threadId}`;
      console.log(console.log(`Socket ${socket.id} joining room ${room}`))
      socket.join(room, () => console.log(`Socket ${socket.id} joined room thread:${threadId}`));
      const chats = await chatService.getMultiple(threadId);
      io.to(socket.id).emit("chats", chats.data);
   });

   socket.on('chat', async (msg) => {
      const room = `thread:${msg.thread_id}`;
      console.log(`Received message ${msg.message} from ${socket.id} for room ${room}`);

     // Send to room (excluding self)
     socket.to(room).emit('chat-broadcast', msg);

    try {
      await chatService.create(msg.thread_id, msg);
    } catch (err) {
      console.error(`Error while posting chat `, err.message);
      next(err);
    }
  });
 });
 