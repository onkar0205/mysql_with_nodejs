import mysql from 'mysql2'
import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const config = {
    host: "localhost",
    user: "root",
    password: "Onkar@0205",
    database: "employee_data"
}
var db = mysql.createConnection(config);
db.connect((err) => {
    if (err) console.log(err)
    else
        console.log("Connected to mysql!");
});

app.use(bodyParser.json())
//GET all employees
app.get('/', (req, res) => {
    var query = `SELECT * FROM employees `;
    console.log("Query :", query)
    db.query(query, (err, resp) => {
        if (err) throw err
        res.send(resp)
        console.log(resp)
    })
})
//GET by id
app.get('/get_by_id', (req, res) => {
    var query = `SELECT * FROM employees WHERE id=${req.body.id}`;
    console.log("Query :", query)
    db.query(query, (err, resp) => {
        if (err) throw err
        res.send(resp)
        console.log(resp)
    })
})
// POST 
app.post('/add_employee', (req, res) => {
    var query = `INSERT INTO employees (firstName, lastName,salary) VALUES ("${req.body.firstName}", "${req.body.lastName}","${req.body.salary}")`;
    console.log("Query :", query)
    db.query(query, (err, resp) => {
        if (err) console.log(err)
        else {
            console.log("res :", resp)
            res.send("employee added succefully!")
        }
    })
})
//DELETE by id
app.delete('/delete_employee_byid', (req, res) => {
    var query = `DELETE FROM employees WHERE id = "${req.body.id}"`;
    console.log("Query :", query)
    db.query(query, (err, resp) => {
        if (err) console.log(err)
        else {
            console.log("deleted !")
            res.send(`employee deleted succefully with id = '${req.body.id}'`)
        }
    })
})
// PUT by id
app.put('/Update_employee_byid', (req, res) => {
    var query = `UPDATE employees SET firstName="${req.body.firstName}",lastName = "${req.body.lastName}",salary="${req.body.salary}" WHERE id = "${req.body.id}"`;
    console.log("Query :", query)
    db.query(query, (err, resp) => {
        if (err) console.log(err)
        else {
            console.log("Updated by id!")
            res.send(`updated employee succefully with id = '${req.body.id}'`)
        }
    })
})

app.listen(3000, (err) => {
    if (err) console.log(err)
    console.log("App is running on port 8081");

})