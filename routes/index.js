const async 		= require('async');
const Apiai 		= require('../controllers/apiai');
const Bot 			= require('../controllers/bot');

/* GET home page. */
module.exports = function(app) {
	app.get('/', function(req, res) {
		res.send('Server is healthy');
	});

	app.post('/', function(req, res) {
		res.send('Post requests are healthy');
	});

	app.post('/webhook', (req, res) => {
		Bot.process(res, req)
			.then(data => {
				console.log(data);
				res.status(200).json(data);
			})
			.catch(err => {
				console.log(err.message);
				return res.status(400).json({
					status: "error"
				});
			});
	});


	app.get('/apiai', function(req, res) {
		async.waterfall(
			[
				(callback) => {
					Apiai.textRequest('Bot is healthy').then((response) => {
						callback(null, response);
					});
				},
				(response, callback) => {
					const message = response.result.fulfillment.speech
					res.send(message);
				}
			],
			(err, result) => {
				if (err) console.log(err);
			}
		);
	});

}
