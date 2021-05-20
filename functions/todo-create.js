const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

const handler = async (event) => {
  try {
    const eventBody = await JSON.parse(event.body);
    console.log("Function `todo-create` invoked", eventBody);
    const result = await client.query(
      q.Create(q.Collection("todos"), { data: { title: eventBody } })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ messageId: result.ref.id }),
    };
  } catch (error) {
    console.log(`Something wrong in Function "todo-create"!`);
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
