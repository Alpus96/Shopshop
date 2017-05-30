//	Log server start.
console.log('Server starting...');

//	Required modules.
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//	Log modules required.
console.log('Loaded requierd modules.\n');

//	Log start of server framework setup.
console.log( 'Setting up server framework...');
//	Then set server framework.
const server = express();

//	Set server files configuration.
server.set('view engine', 'ejs');
server.set('views', './app/views');
server.use(express.static('./app/views/assets'));
console.log(`Server framework files configuration set.`);

//	Require the router class to handle requests.
const Router =  require('./app/controllers/router');

//	Setup request handlers.
server.use(cookieParser())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.get('*', (request, response) => Router.get(request, response));
server.post('*', (request, response) => Router.post(request, response));
console.log(`Server framework request handlers active.`);

server.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})
//	Listen for requests.
console.log(`\nServer setup done, atempting to listen for requests...\n`);
server.listen(3000, () => {
	console.log(`Server listening on port 3000.\n`);
});
