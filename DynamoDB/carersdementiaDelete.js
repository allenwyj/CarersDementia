'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	// Bring in the documentClient library
	const documentClient = new AWS.DynamoDB.DocumentClient(); // instanialize 
	
	let responseBody = "";
	let statusCode = 0;
	
	// extract variables that we need to use in db
	const { id } = event.pathParameters;
	
	const params = {
		TableName: "Dementia_Record",
		// Delete record by key
		Key: {
			id: id
		}
	};
	
	try {
		const data = await documentClient.delete(params).promise(); // delete data from the db
		responseBody = JSON.stringify(data); // hold the response in a string type
		statusCode = 204;
	} catch (err) {
		responseBody = `Unable to delete record: ${err}`;
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