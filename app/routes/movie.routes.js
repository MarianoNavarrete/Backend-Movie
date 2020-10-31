module.exports = app => {
    const movies = require("../controllers/movie.controller");

    //create movie
    app.post("/movie", movies.create);

    //find all movies
    app.get("/movie", movies.findAll);

    //find movie by id
    app.get("/movie/:movieId", movies.findOne);

    //update movie
    app.put("/movie/:movieId", movies.update);
}