const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models');

const app = express();

// var corsOptions = {
//     origin: 'http://localhost:3001'
// }

app.use(cors());

db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to Database")
}).catch(err => {
    console.log("Cannot Connect on the database!", err);
    process.exit();
})

// parse request content-type - application/json
app.use(bodyParser.json());

// parse request content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to sample application for mongodb." });
});

require("./app/routes/expense.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});