const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/signup");
const sequelize = require("./utils/dataBase");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"))

app.use(router);

sequelize.sync().then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err)
})
