const server = require("./app");
const dotenv = require('dotenv');
dotenv.config({path:"config/config.env"})
require("./database/conn");
const port = process.env.PORT || 5000;

server.listen(port,()=>{
    console.log(`Server is up and running at port : ${port}`);
})