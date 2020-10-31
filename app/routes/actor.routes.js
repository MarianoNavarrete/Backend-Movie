module.exports = app => {
    const actors = require("../controllers/actor.controller");
    
    //create actor
    app.post("/actor", actors.create);

    //find all actors
    app.get("/actor", actors.findAll);

    //find actor by id
    app.get("/actor/:actorId", actors.findOne);

    //update actor
    app.put("/actor/:actorId", actors.update);
    
};