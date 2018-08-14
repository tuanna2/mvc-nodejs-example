var express = require('express');
var bodyParser = require('body-parser')

var app = express();

const RootRouter = require('./app/routers/root_router');
const ApiRouter = require('./app/routers/api_router');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('assets'))

app.use('/', new RootRouter().getRouter());
app.use('/api', new ApiRouter().getRouter());

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})