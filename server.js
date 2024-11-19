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

app.use(cors());


//logging middleware
app.use(function(request, response, next) {
  console.log("New request: ", request.url);
  next();
});

//where the html is located
//app.use(express.static('public'));


//don't forget POST PUT DELETE requests !!!!!!
app.get("/", function (req, res) {
  res.send("if this shows it works, GET");
});

app.get("/lessons", function (req, res) {
  res.send("if this shows it works, GET /lessons");
});



app.use(function(req, res) {
  res.status(404).send("Page not found");
});


//listen at port 3000
http.createServer(app).listen(3000, "0.0.0.0", function() {
  console.log("Server is running at port 3000");
});
