const sql = require("./db");

//movie constructor
const Movie = function(movie) {
    this.name = movie.name,
    this.duration = movie.duration,
    this.genre = movie.genre,
    this.sinopsis = movie.sinopsis,
    this.actors = movie.actors
};



//create movie Actor
Movie.createMovieActor = (newMovieActor, result) => {    
    let setActors = new Set();
    newMovieActor.actors.map(function(idActor){
        setActors.add(idActor);
    });
    setActors.forEach((idActor) => {
        sql.query("INSERT INTO movie_actor SET id_movie = ?, id_actor = ?", 
        [newMovieActor.id, idActor], (err, res) => {
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }
        });
    });  
};

Movie.create = (newMovie, result) => {
    var idMovie=0;
    sql.query("INSERT INTO movie SET name = ?, duration = ?, genre = ?, sinopsis = ?", 
    [newMovie.name, newMovie.duration, newMovie.genre, newMovie.sinopsis], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        idMovie = res.insertId;
        result(null, {id:res.insertId, ...newMovie}); 
    });
};

Movie.findById = (movieId, result) => {
    sql.query(`SELECT * FROM movie WHERE id_movie = ${movieId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found movie: ", res[0]);
            result(null, res[0]);
            return;
        }
        //not found
        result({kind: "not found"}, null);
    });
    console.log(result.id_movie);
};

Movie.getActorByMovie = (movieId, result) => {
    sql.query(`SELECT * 
    FROM actor 
    JOIN movie_actor ON movie_actor.id_actor = actor.id_actor
    WHERE movie_actor.ID_MOVIE = ${movieId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
};

Movie.getAll = result => {
    sql.query ("SELECT * FROM movie", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("movies: ", res);
        result(null, res);
    });
    
};

Movie.updateById = (id, movie, result) => {
    sql.query("UPDATE movie SET name = ?, duration = ?, genre = ?, sinopsis = ? WHERE id_movie = ?",
    [movie.name, movie.duration, movie.genre, movie.sinopsis, id], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found id
            result({ kind: "not found" }, null);
            return;
        }

        console.log("updated movie: ", {id: id, ...movie});
        result(null, {id: id, ...movie });
    });
};

module.exports = Movie;