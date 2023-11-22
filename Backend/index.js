const express = require("express");
// const res = require("express/lib/response");
const router = require("./routes/routes");
const cors = require("cors")
const app= express();
app.use(express.json());
app.use(cors())



app.use('/',router)
app.get('/',(req,res)=>{
    res.send("Hello charan");
})




app.listen(9000,()=>{
    console.log('server running  successfully');
})
 