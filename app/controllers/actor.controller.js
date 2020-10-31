const Actor = require("../models/actor.module");



//create actor
exports.create = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({
            message: "Content is empty"
        });
    }

   
    //create the objets actor
    const actor = new Actor({
        name: req.body.name,
        age: req.body.age,
        image: req.body.image
    });

    //save in the database
    Actor.create(actor, (err, data) => {
        if(err){
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Actor."
            });
        } else {
            res.send(data);
        }
    });
};

// find actors
exports.findAll = (req, res) => {
    Actor.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving Actor."
              });
        } else {
            res.send(data);
        }
    });
};

// find one actor by id
exports.findOne = (req, res) => {
    Actor.findById(req.params.actorId, (err, data) => {
        if(err){
            if (err.kind === "not found") {
                res.status(404).send({
                  message: `Not found Actor with id ${req.params.actorId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error retrieving Actor with id " + req.params.actorId
                });
              } 
        } else {
            res.send(data);
        }
    })
};

// Update an actor
exports.update = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({
            message: "Content is empty"
        });
    }

    Actor.updateById(req.params.actorId, new Actor(req.body), (err, data) => {
        if(err){
            if (err.kind === "not found") {
                res.status(404).send({
                  message: `Not found Actor with id ${req.params.actorId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Customer with id " + req.params.actorId
                });
              }
        } else {
            res.send(data);
        }
    });
};
