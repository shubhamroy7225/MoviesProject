const express = require("express");
const app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
const { Client } = require("pg");
const client = new Client()
const client = new Client({
  user: "shubham",
  host: "localhost",
  database: "moviesdata",
  password: "shubham@123",
  port: 5432
});
client.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
app.get('/api/directors',(req,res)=>{
  client.query("SELECT Director FROM movies")
  .then(response =>{
    res.send(response.rows)
  }).catch(err=>{
    console.error("something went wrong")
  })
})

app.get('/api/directors/:directorid',(req,res)=>{
  const id = req.params['directorid']
    client.query('SELECT Director,Rank FROM movies where Rank = '+ id +'')
    .then(response =>{
      res.send(response.rows)
    }).catch(err=>{
      console.error("something went wrong")
    })
})

app.post('/api/directors', function (req, res) {
  let obj1 = Object.values(req.body)
  client.query('INSERT INTO Director (Director_id,Director_name) VALUES($1,$2)', obj1, function (error, results, fields) {
   if (error) throw error;
   res.send("INSERTED DATA");
 })
});

app.put('/api/directors', function (req, res) {
  let obj1 = Object.values(req.body)
  client.query('UPDATE Director SET  Director_name = $1 WHERE Director_id = $2', obj1, function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 })
});

app.delete('/api/directors', function (req, res) {
  let obj1 = Object.values(req.body)
  client.query('delete from Director WHERE Director_id = $1', obj1, function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 })
});

app.get('/api/movies',(req,res)=>{
  client.query("SELECT Title FROM movies1")
  .then(response =>{
    res.send(response.rows)
  }).catch(err=>{
    console.error("something went wrong")
  })
})

app.get('/api/movies/:moviesid',(req,res)=>{
  const id = req.params['moviesid']
    client.query('SELECT Title FROM movies1 where movies_id = '+ id +'')
    .then(response =>{
      res.send(response.rows)
    }).catch(err=>{ 
      console.error("something went wrong")
    })
})

app.post('/api/movies', function (req, res) {
  let obj1 = Object.values(req.body)
  client.query('INSERT INTO movies1 (movies_id,Title) VALUES($1,$2)', obj1, function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 })
});

app.put('/api/movies', function (req, res) {
  let obj1 = Object.values(req.body)
  client.query('UPDATE movies1 SET  Title = $1 WHERE movies_id = $2', obj1, function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 })
});

app.delete('/api/movies', function (req, res) {
  let obj1 = Object.values(req.body)
  client.query('delete from movies1 WHERE movies_id = $1', obj1, function (error, results, fields) {
   if (error) throw error;
   res.send(JSON.stringify(results));
 })
});

var server = app.listen(3000, "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

