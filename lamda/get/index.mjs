import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const createResponse = (statusCode, body) => {
    const responseBody = JSON.stringify(body)
    return{
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    }
}

export const getCoffee = async (event) => {

    const { pathParameters } = event;
    const { id } = pathParameters || {}

    const tableName = "CoffeeShop"
    try {
        let command;
        if (id) {
            command = new GetCommand({
                TableName: tableName,
                Key: {
                    coffeeid: id,
                },
            });
        } else {
            command = new ScanCommand({
                TableName: tableName
            })
        }
        const response = await docClient.send(command);
        console.log(response);
        return createResponse(200, response);
    } catch (error) {
        console.log(error);
        return createResponse(500, { error });
    }


};

