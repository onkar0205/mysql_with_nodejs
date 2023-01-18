const bodyParser = require('body-parser');
const { Console } = require('console');
const express = require('express')
const MongoCliant = require('mongodb').MongoClient
const app = express()
var database;

app.use(bodyParser.json())
//GET
app.get('/', (req, resp) => {
    console.log("get request")
    resp.send("Welcome to mongodb API!")
})
app.get('/databaseof_laptop/laptop_store', (req, resp) => {
    database.collection('laptop_store').find({}).toArray((err, result) => {
        if (err) throw err
        resp.send(result)
    })
})
// POST 
app.post('/databaseof_laptop/add_element', (req, resp) => {
    database.collection('laptop_store').find({}).toArray((err, result) => {
        if (err) throw err
        let element = {
            product: req.body.product,
            price: req.body.price
        }
        database.collection('laptop_store').insertOne(element, (err, result) => {
            if (err) resp.status(500).send(err)
            console.log("element added")
            resp.send("element added succesfully !")
        });
    })
})
// PUT
// UPDATE by price
app.put('/databaseof_laptop/update_byprice/:price', (req, resp) => {
    let query = { price: parseInt(req.params.price) }
    let data = {
        product: req.body.product,
        price: parseInt(req.params.price)
    }
    let dataset = {
        $set: data
    }
    database.collection('laptop_store').updateOne(query, dataset, (err, result) => {
        if (err) throw err
        resp.send(data)
    })
})

// UPDATE by product
app.put('/databaseof_laptop/update_byproduct/:product', (req, resp) => {
    let query = { product: req.params.product }
    let data = {
        price: req.body.price,
        product: req.params.product
    }
    let dataset = {
        $set: data
    }
    database.collection('laptop_store').updateOne(query, dataset, (err, result) => {
        if (err) throw err
        resp.send(data)
    })
})
// DETELE by price
app.delete('/databaseof_laptop/delete_byprice/:price', (req, resp) => {

    database.collection('laptop_store').deleteOne({ price: parseInt(req.params.price) }, (err, result) => {
        if (err) throw err
        resp.send("element is deleted")
    })
})
// DETELE by product
app.delete('/databaseof_laptop/delete_byproduct/:product', (req, resp) => {
    database.collection('laptop_store').deleteOne({ product: req.params.product }, (err, result) => {
        if (err) throw err
        resp.send("element is deleted")
    })
})
app.listen(8081, (err) => {
    if (err) console.log(err)
    console.log("App is running on port 8081");
    // MongoCliant.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, (error, result) => {
    //     if (error) throw error
    //     database = result.db('databaseof_laptop')
    //     console.log('connection succesful !')
    // })
})