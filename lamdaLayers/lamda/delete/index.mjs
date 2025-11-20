import { createResponse, DeleteCommand, docClient } from "../../nodejs/utils.mjs";

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