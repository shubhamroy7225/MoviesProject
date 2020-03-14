const { Pool } = require("pg");
const pool = new Pool();


const getAllDirectors=(req, resp) => {
    pool.connect().then(client => {
      client
        .query("select director_name from director")
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

const getDirectorsId=(req, resp) => {
    const id = req.params.directorId;
    pool.connect().then(client => {
      client
        .query('SELECT director_name,director_id FROM director where director_id = '+ id +'')
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

const addNewDirector=(req, resp) => {
    let obj1 = Object.values(req.body);
    pool.connect().then(client => {
      client
        .query(
            'INSERT INTO Director (Director_id,Director_name) VALUES($1,$2)', obj1
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
  const updateDirector= (req, resp) => {
    let obj1 = Object.values(req.body);
    pool.connect().then(client => {
      client
        .query(
            'UPDATE Director SET  Director_name = $1 WHERE Director_id = $2', obj1
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
  const deleteDirector= (req, resp) => {
    let obj2 = Object.values(req.body);
    pool.connect().then(client => {
      client
        .query(
            'delete from Director WHERE Director_id = $1', obj2
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