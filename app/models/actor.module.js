const sql = require("./db.js");

//contructor
const Actor = function(actor){
    this.name = actor.name;
    this.age = actor.age;
    this.image = actor.image;
};

Actor.create = (newActor, result) => {
    sql.query("INSERT INTO actor SET ?", newActor, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created actor", {id:res.insertID, ...newActor});
        result(null, {id:res.insertId, ...newActor});
    });
};

Actor.findById = (actorId, result) => {
    sql.query(`SELECT * FROM actor WHERE id_actor = ${actorId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found actor: ", res[0]);
            result(null, res[0]);
            return;
        }

        //not found
        result({kind: "not found"}, null);
    });
};

Actor.getAll = result => {
    sql.query("SELECT * FROM actor", (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("actors: ", res);
        result(null, res);
    });
};

Actor.updateById = (id, actor, result) => {
    sql.query("UPDATE actor SET name = ?, age = ?, image = ? WHERE id_actor = ?", 
    [actor.name, actor.age, actor.image, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated actor: ", { id: id, ...actor });
        result(null, { id: id, ...actor });
    });
};

module.exports = Actor;