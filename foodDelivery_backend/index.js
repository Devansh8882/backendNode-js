import express from 'express';

const app = express();

app.use('/', (req,res) => {
 res.json("hello devansh");
})

app.listen(8000,()=>{
    console.log("listening to port 8000");
    
})