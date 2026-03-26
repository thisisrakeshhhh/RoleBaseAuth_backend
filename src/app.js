//all the routes are imported here
//all middleware are imported here
//create the server in this
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes); //pre-fixs before the routess
app.use("/api/music", musicRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});


module.exports = app;
