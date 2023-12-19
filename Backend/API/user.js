
const { PrismaClient } =require('@prisma/client');
const prisma = new PrismaClient();
const addUser = async (req, res)=>{
 
 
 
   // res.send("Hellooo It is Add");
    try {
            // let name = req.body.name;
           
             const allUsers = await prisma.Workflow.create({
                  data: {
                      name : "Abhiram",
                      email:"charan@gmail.com"
                  }
             });
             res.send(allUsers);
    }
    catch(e){
      console.log(e)
          res.send(e)
    }
   
    }
 
    module.exports.user ={addUser};