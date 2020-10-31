const Actor = require("../models/actor.module");
const Movie = require("../models/movie.model");

//create movie
exports.create = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    //validate request
    if(!req.body){
        res.status(400).send({
            message: "Content is empty"
        });
    }

    // create the movie object
    const movie = new Movie({
        name: req.body.name,
        duration: req.body.duration,
        genre: req.body.genre,
        sinopsis: req.body.sinopsis,
        actors: req.body.actors
    });

    //save in the DB
    Movie.create(movie, (err, data) => {
        if(err){
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Actor."
            });
        } else {
            res.send(data);
            Movie.createMovieActor(data);
        }  
    });
};

//find movies
exports.findAll = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    Movie.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving Movie."
            });
        } else {
            res.send(data);
        }
    });
};

//find movie by id
exports.findOne = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    const {movieId} = req.params;
    Movie.findById(movieId, (err, data) => {
        if(err){
            if(err.kind === "not found"){
                res.status(404).send({
                    message: `Not found Movie with id ${movieId}.`
                  });
            } else {
                res.status(500).send({
                    message: "Error retrieving Movie with id " + movieId
                  });
            }
        } else {
            
            Movie.getActorByMovie(movieId, (err, dataAct) => {
                if(!err){
                    res.send(data={
                        ...data,
                        actors: dataAct
                    });
                }
            });
            
        }
    });
};

exports.update = (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    //validate request
    if(!req.body){
        res.status(400).send({
            message: "Content is empty"
        });
    }
    const {movieId} = req.params;
    Movie.updateById(movieId, new Movie(req.body), (err, data) => {
        if(err){
            if (err.kind === "not found") {
                res.status(404).send({
                  message: `Not found Movie with id ${movieId}.`
                });
              } else {
                res.status(500).send({
                  message: "Error updating Customer with id " + movieId
                });
              }
        } else {
            res.send(data);
        }
    });
}