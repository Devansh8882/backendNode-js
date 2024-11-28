import express from 'express';
import path from 'path';
const app = express();

app.set('view engine','ejs');
app.use('/', (req,res) => {
 res.json("hello devansh");
})

app.use(function(req,res,next){
    console.log(path);
    
})
app.listen(8000,()=>{
    console.log("listening to port 8000");
    
})