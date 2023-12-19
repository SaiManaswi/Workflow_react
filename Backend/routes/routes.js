
const express = require('express');
const router = express.Router();
 
const { user } = require('../API/user.js');
 
// router.get('/',(req,res)=>{
//     res.send({message:"okay api is workimg"});
// })
router.post('/addUser', user.addUser)
 
 
module.exports = router;