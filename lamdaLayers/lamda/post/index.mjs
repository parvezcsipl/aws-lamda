import { createResponse, docClient, PutCommand } from "../../nodejs/utils.mjs";

export const createCoffee = async (event) => {

    const { body } = event;
    const { coffeeid, name, price, available } = JSON.parse(body || "{}")

    if (!coffeeid || !name || !price || !available) {
        return createResponse(409, { error: "Missing Fields" })
    }

    const tableName = "CoffeeShop"

    const item = {
        coffeeid,
        name,
        available,
        price,
    };

    // Define the parameters for the PutCommand
    const params = {
        TableName: tableName,
        Item: item,
        ConditionExpression: "attribute_not_exists(coffeeId)"
    };
    const command = new PutCommand(params);

    try {
        const response = await docClient.send(command);
        console.log(response);
        return createResponse(200, response);
    } catch (error) {
         if (err.message === "The conditional request failed")
            return createResponse(409, { error: "Item already exists!" });
        else
            return createResponse(500, {
                error: "Internal Server Error!",
                message: err.message,
            });
    }
};