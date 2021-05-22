const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

const handler = async (event, context, callback) => {
  console.log(`event.body`, await JSON.parse(event.body));
  try {
    const todoId = await JSON.parse(event.body);
    console.log("Function `todo-delete` invoked", todoId);
    const result = await client.query(
      q.Delete(q.Ref(q.Collection("todos"), todoId))
    );
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ id: todoId }),
    });
  } catch (error) {
    console.log(`Something wrong in Function "todo-delete"!`);
    return callback(null, { statusCode: 500, body: error.toString() });
  }
};

module.exports = { handler };
