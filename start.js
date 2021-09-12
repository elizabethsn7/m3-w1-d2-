require( "dotenv" ).config();
const mongoose = require( "mongoose" );

mongoose.connect( process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} );

mongoose.connection.on( 'open', () =>
{
  console.log( 'Mongoose connection is open' );
} ).on( 'error', ( err ) =>
{
  console.log( `Connection error: ${ err.message }` );
} )

require( './models/Registration' );
const app = require("./app");

const server = app.listen(5000, function () {
  console.log(`Express is running on Port ${server.address().port}`);
});
