const AppError = require("../utils/appError")
const knex = require("../dataBase/knex/index.js")

class TagsController {

    async indexMoviesTags(request, response){
        
        const {user_id} = request.params
        const listMovieTags = await knex("movie_tags").where("user_id", user_id).orderBy("id")
        
        response.json(listMovieTags)
    }
}

module.exports = new TagsController