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


//http module is required to create a server
var http = require("http");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cors = require("cors");

var app = express();
app.set("json spaces", 2);  //pretty print json
app.use(cors());  //enable CORS to connect to localhost

//where the html is located
//app.use(express.static('public'));

//logging middleware
app.use(function (request, response, next) {
  console.log("New request: ", request.url);
  next();
});


//don't forget POST PUT DELETE requests !!!!!!
//to test in terminal type: curl -X POST http://localhost:3000

app.get("/", function (req, res) {
  res.send("if this shows it works, GET");
});

app.get("/lessons", function (req, res) {
  //res.send("if this shows it works, GET /lessons");

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



app.use(function (req, res) {
  res.status(404).send("Page not found");
});


//listen at port 3000
http.createServer(app).listen(3000, "0.0.0.0", function () {
  console.log("Server is running at port 3000");
});
