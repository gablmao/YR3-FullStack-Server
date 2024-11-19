// ----------------------- MONGODB Connection ----------------------- 
const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require("mongodb");
const uri = "mongodb+srv://WebstoreAdmin:admin@webstorecluster.si7uv.mongodb.net/?retryWrites=true&w=majority&appName=WebstoreCluster";

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1
});
// ----------------------- MONGODB Connection ----------------------- 




// ----------------------- EXPRESS/MIDDLEWARE -----------------------

//http module is required to create a server
var http = require("http");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cors = require("cors");

//initialize express
var app = express();

//logging middleware
//use next to pass control to the next middleware
app.use(function (request, response, next) {
  console.log("New request: ", request.url);
  next();
});


app.use(cors());
//where the html is located
app.use(express.static('public'));

app.set('json spaces', 2);

app.get("/", function (req, res) {
  res.send("if this shows it works, GET");
});
app.post("/", function (req, res) {
  res.send("if this shows it works, POST");
});
app.put("/", function (req, res) {
  res.send("if this shows it works, PUT");
});
app.delete("/", function (req, res) {
  res.send("if this shows it works, DELETE");
});



app.get("/lessons", function (req, res) {
  let products = [{
    id: 1001,
    name: "Math",
    place: "London",
    image: "images/placeholder.jpg",
    slots: 5,
    price: 10,
  }, {
    id: 1002,
    name: "English Literature",
    place: "York",
    image: "images/placeholder.jpg",
    slots: 3,
    price: 7,
  }, {
    id: 1003,
    name: "Geography",
    place: "London",
    image: "images/placeholder.jpg",
    slots: 7,
    price: 8,
  }];

  res.json(products);
});




//listen at port 3000
http.createServer(app).listen(3000, "0.0.0.0", function () {
  console.log("Server is running at port 3000");
});