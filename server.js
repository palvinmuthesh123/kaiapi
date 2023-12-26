require('rootpath')();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const socketManage = require('./app/chat/socketManage')(io);

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

app.use((req,res,next) => {
    console.log(req.path," <---> ", req.body);
    next();
});

//static
app.use('/static', express.static(path.join(__dirname, 'static')));
// api routes
app.use('/user', require('./app/users/users.controller'));
app.use('/home', require('./app/home/home.controller'));
app.use('/posts', require('./app/posts/posts.controller'));
app.use('/cms', require('./app/cms/cms.controller'));
app.use('/games', require('./app/games/games.controller'));
io.on('connection', socketManage );
// app.use('/admin', require('./admin/admin.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
server.listen(port, function () {
    console.log('Server listening on port ' + port);
});
