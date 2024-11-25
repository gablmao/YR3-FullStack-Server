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

//connect to the database
let db = client.db("Webstore");
// ----------------------- MONGODB Connection ----------------------- 


// ----------------------- Express Server -----------------------
var express = require("express");
var cors = require("cors");

var app = express();
app.set("json spaces", 2); //pretty print json
app.use(cors()); //enable CORS to connect to localhost

//logging middleware (can use morgan too!)
app.use(function (request, response, next) {
  console.log("New request: ", request.url);
  next();
});

//don't forget POST PUT DELETE requests !!!!!!
//to test in terminal type: curl -X POST http://localhost:3000 etc.


//manage data to and from as JSON format
app.use(express.json());

app.param("collectionName", function (req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  return next();
});


app.get("/", function (req, res) {
  res.send("select a collection (/collections/lessons or collections/orders)");
});

//"/collections/lessons" endpoint
app.get("/collections/:collectionName", function (req, res, next) {
  req.collection.find({}).toArray(function (err, results) {
    if (err) {
      return next(err);
    }
    res.send(results);
  });

});


//updates order collection after a submitted order
app.post("/collections/:collectionName", function (req, res, next) {
  req.collection.insertOne(req.body, function (err, results) {
    if (err) {
      return next(err);
    }
    res.insertOne(results);
  });

});


//updates lesson(s) spaces after a submitted order
app.put("/collections/:collectionName/:id", function (req, res, next) {
  req.collection.updateOne({_id: new ObjectId(req.params.id)},
    {$set: {space: req.params.space}},
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.send((results.matchedCount === 1) ? {msg: "success"} : {msg: "error"});
    });
});

app.use(function (req, res) {
  res.status(404).send("Page not found");
});


//listen at port 3000
app.listen(3000, "0.0.0.0", function () {
  console.log("Server is running at port 3000");
});
