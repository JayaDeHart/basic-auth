require("dotenv").config();

const { db } = require("./src/models/index");
const { start } = require("./src/server");

db.sync().then(() => {
    console.log("database up")
    start(process.env.PORT);
}).catch(console.error);

