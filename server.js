//Modules
var express = require('express'); //allows us to use the functions and commands from the express module in our server.js file
var app = express();
var mongojs = require('mongojs');
var db = mongojs('inventory', ['inventory']); // tells us which mongo db and collection to use
var bodyParser = require('body-parser');

// app.get('/', function(req, res){
//   res.send("Hello world from server.js")
//
// });

app.use(express.static(__dirname + "/public")); //telling app where to find css/html files
app.use(bodyParser.json()); //server can parse the data it receives

app.get('/inventory', function(req, res) { // response and request, server is listening for GET request
    console.log("I received a GET request")

    db.inventory.find(function(err, docs) {
        console.log(docs) // logs the object found
        res.json(docs); // sends docs to the controller

    })

    app.post('/inventory', function(req, res) {
        console.log(req.body); // print the data we receive, need to parse the body first
        db.inventory.insert(req.body, function(err, doc) {
            res.json(doc); // send response to controller
        }) // insert the body requested that has been parsed

    });

});

app.delete('/inventory/:id', function(req, res) {
    var id = req.params.id; // get the value of the id from the url
    console.log(id);
    db.inventory.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    })
});

app.get('/inventory/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.inventory.findOne({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
});

app.put('/inventory/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.inventory.findAndModify({
        query: {
            _id: mongojs.ObjectId(id)
        },
        update: {
            $set: {
                manufacturer: req.body.name,
                product: req.body.email,
                amount: req.body.number
            }
        },
        new: true
    }, function(err, doc) {
        res.json(doc);
    })
})

app.listen(3000);
console.log("Server running on port 3000")
