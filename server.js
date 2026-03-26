//all the environment variables are imported here and server is started here
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});