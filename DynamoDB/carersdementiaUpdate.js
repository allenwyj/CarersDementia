'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	// Bring in the documentClient library
	const documentClient = new AWS.DynamoDB.DocumentClient(); // instanialize 
	
	let responseBody = "";
	let statusCode = 0;
	
	const params = {
		TableName: "Dementia_Records",
		// contain the details what records will be added into table
		Key: {
			subject_id: '12345'
		},
		UpdateExpression: "set productname = :n", // set which field needs to be updated
		ExpressionAttributeValues: {
			":n" : "Water Pumps"
		},
		ReturnValues: "UPDATED_NEW" 
	};
	
	try {
		const data = await documentClient.update(params).promise(); // update data
		responseBody = JSON.stringify(data); // hold the response in a string type
		statusCode = 204;
	} catch (err) {
		responseBody = `Unable to update record: ${err}`;
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