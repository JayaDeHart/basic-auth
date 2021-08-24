const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")
const notFound = require("./errorHandlers/404");
const generalError = require("./errorHandlers/500");


//import and use routes
function start(port) {
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}


app.use(express.json())
app.use(userRoutes)



app.use(generalError);
app.use("*", notFound);


module.exports = {
    start,
    app
}