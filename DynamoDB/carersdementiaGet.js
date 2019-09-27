'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	// Bring in the documentClient library
	const documentClient = new AWS.DynamoDB.DocumentClient(); // instanialize 
	
	let responseBody = "";
	let statusCode = 0;
	
	const params = {
		TableName: "Dementia_Record"
	};
	
	try {
		const data = await documentClient.scan(params).promise(); // iterate all records in db and return the records
		responseBody = JSON.stringify(data.Items); // hold the response in a string type, more than one data is retrieved
		statusCode = 200;
	} catch (err) {
		responseBody = `Unable to get record: ${err}`;
		statusCode = 403;
	}
	
	const response = {
		statusCode: statusCode,
		headers: {
			"Content-Type" : " application/json"
		},
		body: responseBody //send back the responseBody
	};
	
	// return the response
	return response;
};