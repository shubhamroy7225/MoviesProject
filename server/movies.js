const { Pool } = require("pg");
const pool = new Pool();


const getAllMovies=(req, resp) => {
    pool.connect().then(client => {
      client
        .query("select Title from movies1")
        .then(res => {
          client.release();
          console.log("hello from", res.rows);
          resp.send(res.rows);
        })
        .catch(e => {
          client.release();
          console.error("query error", e.message, e.stack);
        });
    });
  }

const getMoviesId=(req, resp) => {
    const id = req.params.directorId;
    pool.connect().then(client => {
      client
        .query('SELECT Title FROM movies1 where movies_id = '+ id +'')
        .then(res => {
          client.release();
          console.log("hello from", res.rows);
          resp.send(res.rows);
        })
        .catch(e => {
          client.release();
          console.error("query error", e.message, e.stack);
        });
    });
  }

const addNewMovies=(req, resp) => {
    let obj1 = Object.values(req.body);
    pool.connect().then(client => {
      client
        .query(
            'INSERT INTO movies1 (movies_id,Title) VALUES($1,$2)', obj1
        )
        .then(res => {
          client.release();
          console.log("Data inserted sucessfully...", res.rows);
          resp.send(res.rows);
        })
        .catch(e => {
          client.release();
          console.error("query error", e.message, e.stack);
        });
    });
  }
  const updateMovies= (req, resp) => {
    let obj1 = Object.values(req.body);
    pool.connect().then(client => {
      client
        .query(
            'UPDATE movies1 SET  Title = $1 WHERE movies_id = $2', obj1
        )
        .then(res => {
          client.release();
          console.log("Data inserted sucessfully...", res.rows);
          resp.send("data updated sucessfully");
        })
        .catch(e => {
          client.release();
          console.error("query error", e.message, e.stack);
        });
    });
  }
  const deleteMovies= (req, resp) => {
    let obj2 = Object.values(req.body);
    pool.connect().then(client => {
      client
        .query(
            'delete from movies1 WHERE movies_id = $1', obj1
        )
        .then(res => {
          client.release();
          resp.send("data deleted sucessfully");
        })
        .catch(e => {
          client.release();
          console.error("query error", e.message, e.stack);
        });
    });
  }
module.exports={
    getAllDirectors,
    getDirectorsId,
    addNewDirector,
    updateDirector,
    deleteDirector
}