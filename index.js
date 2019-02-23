var express = require('express');
// ^ allow us to use .listen, .get, and the CRUD stuff
var bodyParser = require('body-parser');
var massive = require('massive');
// ^ this will allow us to talk/connect with a database. 
require('dotenv').config();
// ^ this will allow us to acess the .env file anywhere in the app

var app = express()
app.use(bodyParser.json());
// ^ this sets the data we recive in a formate the computper can read

// Product Tabel Controllers
var cntrl = require('./products_controller')

massive(process.env.CONNECTION_STRING).then((dbInstance) => {
        app.set('db', dbInstance)
        // ^ this sets a new propperty onto our data object (dbInstance) with a title (db)
        console.log('database is connected')
    }).catch((err) => {
        console.log('err')
})
// massive(whatever) is a method that returns a promise and that is why we need the .then. we are sending a req to the data base and we will want somthing back (the promise)
// ^ the lines above basically give us out connection to the database

// Product Table Endpoints
app.get('/api/products', cntrl.getAll)
app.get('/api/products/:id', cntrl.getOne)
app.put('/api/products/:id?desc=...', cntrl.update)
app.post('/api/products', cntrl.creat)
app.delete('/api/products/:id', cntrl.delete)

var Port = process.env.PORT || 3000

app.listen(Port, () => {
    console.log(`Server is listening on Port: ${Port}`)
})