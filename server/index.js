

const jsonObj = require('../data/movies.json')
const { Client } = require("pg");
//const client = new Client()
const client = new Client({
  user: "shubham",
  host: "localhost",
  database: "moviesdata",
  password: "shubham@123",
  port: 5432
});
client.connect();
      for (let i = 0; i < jsonObj.length; i++) {
      client.query('INSERT INTO  movies VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
        Object.values(jsonObj[i]),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("inserted table");
          }
        }
      );
    }