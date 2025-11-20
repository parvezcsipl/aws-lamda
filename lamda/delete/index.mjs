import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.tableName || "CoffeeShop";

const createResponse = (statusCode, body) => {
    const responseBody = JSON.stringify(body);
    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: responseBody,
    };
};

export const deleteCoffee = async (event) => {

    const { pathParameters } = event;
    const { id } = pathParameters || {}

    const command = new DeleteCommand({
        TableName: tableName,
        Key: {
            coffeeid: id,
        },
    });

    try {
        const response = await docClient.send(command);
        console.log(response);
        return createResponse(200, {...response, msg: "Item Deleted"});
    } catch (err) {
        if (err.message === "The conditional request failed")
            return createResponse(404, { error: "Item does not exists!" });
        return createResponse(500, {
            error: "Internal Server Error!",
            message: err.message,
        });
    }

};

