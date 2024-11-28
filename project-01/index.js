const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const port = 8080;

// connecting mongo db with node ...
mongoose
  .connect("mongodb://localhost:27017/practicMongo")
  .then(() => console.log("moongo connected."))
  .catch((err) => console.log("error connecting mongo", err));

// mongo schema..
const schemaMongo = new mongoose.Schema({
  firstName: {
    type: string,
    require: true,
  },
  lastName: {
    type: string,
  },
  email: {
    type: string,
    require: true,
  },
  gender: {
    type: string,
    require: true,
  },
  jobTitle: {
    type: string,
    require: true,
  },
  id: {
    type: string,
    require: true,
    unique: true,
  },
});

// after schema now we create model..
const user = mongoose.model("user", schemaMongo);

// Middleware plugin for encodeling url...........
app.use(express.urlencoded({ extended: false })); // if not applied the post request data in body will be undefined

app.get("/", (req, res) => {
  // lisit of all users...
  html = `${users
    .map((user) => {
      return `<ul> 
        <li>${user.id}</li>
        <li>${user.first_name}</li>
        <li>${user.last_name}</li>
        <li>${user.email}</li>
        <li>${user.gender}</li>
        <li>${user.job_title}</li>        
    </ul>`;
    })
    .join("")}`;
  res.send(html);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  //  const user = users.find((user)=> {

  //     if(user.id === id){
  //         return `<ul>
  //         <li>${user.id}</li>
  //         <li>${user.first_name}</li>
  //         <li>${user.last_name}</li>
  //         <li>${user.email}</li>
  //         <li>${user.gender}</li>
  //         <li>${user.job_title}</li>    --> this through an error join not found and if not applied join, find return json value
  //     </ul>`;
  //     }
  // })

  const user = users.find((user) => user.id === id);
  let html = `<ul> 
       <li>${user.id}</li>
       <li>${user.first_name}</li>
       <li>${user.last_name}</li>
       <li>${user.email}</li>
       <li>${user.gender}</li>
       <li>${user.job_title}</li>   
   </ul>`;
  res.send(html);
});

app.post("/app/users", (req, res) => {
  // TODO : ADD USER
  const body = req.body;
  // users.push(body);
  body.id = users.length + 1;

  users.push(body);
  console.log(body);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success" });
  });
});

app.patch("/app/users", (req, res) => {
  // TODO : EDIT USER
  return res.json({ status: "Pending" });
});

app.delete("/app/users", (req, res) => {
  // TODO : DELETE USER
  return res.json({ status: "Pending" });
});

app.listen(port, () => {
  console.log(`App Listening on Port Number : ${port}`);
});
