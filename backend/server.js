const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: "sfafsaf", resave: false, saveUninitialized: true }));

const PORT = 3000;

const api = require("./routes/api");
app.use("/api", api);
app.get("/", (req, res) => res.send("Hello from server"));

app.listen(PORT, () => console.log("Server listening on locahost: " + PORT));
