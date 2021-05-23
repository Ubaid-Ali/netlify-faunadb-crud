const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

const handler = async (event) => {
  try {
    console.log("Function `read-all-todos` invoked");

    const result = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all-todos-index") // specify source
          )
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    );

    console.log(`result of all todos`, result);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log(`Something wrong in Function "read all todos"!`);
  }
};

module.exports = { handler };
