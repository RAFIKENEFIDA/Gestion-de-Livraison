
/// IMPORT DB
const DB = require('./Config/db.config')

var app = require('./routes');


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});