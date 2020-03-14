require('dotenv').config()
const jsonObj = require('../data/movies.json')
const { Pool } = require('pg')
const pool = new Pool()
pool.connect();
      for (let i = 0; i < jsonObj.length; i++) {
      pool.query('INSERT INTO  movies VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
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