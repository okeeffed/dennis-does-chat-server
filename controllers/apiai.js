// api.ai stuff
const apiai = require('apiai');
const async = require('async');

const app = apiai(process.env.API_AI_ACCESS_KEY);
const options = {
	sessionId: '<unique session id>'
};

function textRequest(text, sender = 'chat', contexts = null) {
	return new Promise((resolve, reject) => {
		let config = {
			sessionId: sender
		};

		if (contexts !== null) config.contexts = contexts;
		let request = app.textRequest(text, config);

		request.on('response', function(data) {
			data.res = data.result.fulfillment.messages;
			resolve(data);
		});
		request.on('error', function(error) {
			reject(error);
			return;
		});
		request.end();
	});
}

function eventRequest(event, sender, contexts = null) {
	return new Promise((resolve, reject) => {
		let config = {
			sessionId: sender
		};

		if (contexts !== null) config.contexts = contexts;
		let request = app.eventRequest(event, config);

		request.on('response', function(data) {
			data.res = data.result.fulfillment.messages;
			resolve(data);
		});
		request.on('error', function(error) {
			reject(error);
		});
		request.end();
	});
}

module.exports = {
	textRequest,
	eventRequest
}
