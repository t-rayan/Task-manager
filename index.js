const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

const connectDb = require("./src/config/dbConfig");
//connect to db
connectDb();

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api", require("./src/routes/user"));
app.use("/api", require("./src/routes/task"));

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is running"));
