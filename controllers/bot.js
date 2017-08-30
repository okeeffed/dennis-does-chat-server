const async 		= require('async');
const flatten 		= require('lodash.flattendeep');

// Controllers
const Apiai 		= require('./apiai');
const Format 		= require('./format');
// const Directives	= require('../directives');
const util 			= require('util');

async function process(res, req) {
	try {
		const recieved = req.body.message;

		// Check for contexts
		// const contexts = await Directives.contexts(recieved);
		// ! Still should considered contextless EventReqs
		// const data = recieved.type === Facebook.PAYLOAD && contexts !== null ?
		// 		await Apiai.eventRequest({ name: recieved.payload} , sender, contexts) :
		// 		await Apiai.textRequest(recieved.payload, sender, contexts);

		const sender = 'chat';
		const contexts = null;

		const data = await Apiai.textRequest(recieved, sender, contexts);
		// data.sender = sender;
		let responses = [];
		const response = Format.textObject(data.res);
		responses.push(response);

		// const messages = await Directives.resolve(data, responses);

		const responseArr = flatten(responses);
		return responseArr;
	} catch(err) {
		throw err;
	}
}

module.exports = {
	process
}
