const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./app/models");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:8081"
}

// get config vars
dotenv.config();

// Set origin
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Connecting to MongoDB
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Unable to connect to database!", err);
    process.exit();
  })

app.get("/", (req, res) => {
    res.json({ message: "Welcome to NodeJS CRUD using Express and MongoDB" });
})

require("./app/routes/tutorial.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})