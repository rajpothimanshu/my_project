const express = require("express");
const app = express();
const cors = require("cors");
const connectdb = require("./dbConnection");



app.use(cors());
app.use(express.json());

connectdb();

app.get("/", (req, res) => {
  res.send("Hello Himanshu Rajput, welcome back");
});

app.use("/api", require("./routes"));

app.listen(8080, () => {
  console.log("App is listening");
});
