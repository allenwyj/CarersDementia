'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	// Bring in the documentClient library
	const documentClient = new AWS.DynamoDB.DocumentClient(); // instanialize 
	
	let responseBody = "";
	let statusCode = 0;
	
	// extract variables that we need to use in db
	// const { country, visits } = JSON.parse(event.body);
	
	const params = {
		TableName: "age_distribution"
	};
	
	try {
		const data = await documentClient.scan(params).promise(); // add data into the db
		responseBody = JSON.stringify(data.Items); // hold the response in a string type
		statusCode = 200;
	} catch (err) {
		responseBody = `Unable to get record: ${err}`;
		statusCode = 403;
	}
	
	const response = {
		statusCode: statusCode,
		headers: {
			"Content-Type" : " application/json",
			"access-control-allow-origin" : "*"
		},
		body: responseBody //send back the responseBody
	};
	
	// return the response
	return response;
}; 