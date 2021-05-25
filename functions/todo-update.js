const faunadb = require("faunadb");

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

const handler = async (event, context, callback) => {
  // console.log(`event`, await JSON.parse(event.body));
  try {
    const body = await JSON.parse(event.body);
    console.log("Function `todo-update` invoked", body);
    const result = await client.query(
      q.Update(q.Ref(q.Collection("todos"), body.id), {
        data: { title: body.todo.title, completed: body.todo.completed },
      })
    );
    console.log(`Todo Updated Sucessfully!`, result.ref.id);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({id: result.ref.id}),
    });
  } catch (error) {
    console.log(`Something wrong in Function "todo-update"!`, error);
    return callback(null, { statusCode: 500, body: error.toString() });
  }
};

module.exports = { handler };
