'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	// Bring in the documentClient library
	const documentClient = new AWS.DynamoDB.DocumentClient(); // instanialize 
	
	let responseBody = "";
	let statusCode = 0;
	
	// extract variables that we need to use in db
	const { gender, children } = JSON.parse(event.body);
	
	const params = {
		TableName: "sunburst",
		// contain the details what records will be added into table
		Item: {
			gender: gender,
			children: children
		}
	};
	
	try {
		const data = await documentClient.put(params).promise(); // add data into the db
		responseBody = JSON.stringify(data); // hold the response in a string type
		statusCode = 201;
	} catch (err) {
		responseBody = `Unable to put record: ${err}`;
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
