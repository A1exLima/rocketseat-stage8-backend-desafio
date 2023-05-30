const AppError = require("../utils/appError")
const knex = require("../dataBase/knex/index.js")

class UsersController {

    async createMoviesNotes(request, response){
        const {user_id} = request.params
        const {title, description, rating, tags} = request.body

        const [user] = await knex("users").where("id", user_id)
        
        if(!user){
            throw new AppError("Usuário não encontrado")
        }

        const ratingRange = rating >= 1 && rating <=5

        if(!ratingRange){
            throw new AppError("Informe o valor de Rating entre 1 e 5")
        }

        const [movie_notes_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        })
        
        const tagsInsert = tags.map(tag => {
            return {
                name: tag,
                movie_notes_id,
                user_id
            }
        })

        await knex("movie_tags").insert(tagsInsert)

        response.json({
            statusCode: 200,
            message: "Nota de filme cadastrada com sucesso"
        })
    }

    async deleteMoviesNotes(request, response){
        const {movie_note_id} = request.params

        await knex("movie_notes").where("id", movie_note_id).delete()
        
        response.json({
            statusCode: 200,
            message: " Nota de filme deletada com sucesso"
        })
    }

    async showMoviesNotes(request, response){
        const {movie_note_id} = request.params

        const movieNote = await knex.select(
            "id",
            "user_id",
            "rating",
            "title",
            "description"
        )
        .from('movie_notes').where('id', movie_note_id).first()
        
        const movieTags = await knex("movie_tags").where("movie_notes_id", movie_note_id).orderBy("id")

        response.json({
            ...movieNote,
            movieTags
        })
    }

    async indexMoviesNotes(request, response){
        const {user_id, title, movieTags} = request.query
        let movieNotes

        if(movieTags){
            const filterMovieTags = movieTags.split(",").map(tag => tag.trim())

            movieNotes = await knex("movie_tags")
            .select(
                "movie_notes.id",
                "movie_notes.user_id",
                "movie_notes.rating",
                "movie_notes.title",
                "movie_notes.description"
            )
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereIn("name", filterMovieTags)
            .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_notes_id")
            .orderBy("movie_notes.title")

        }else{
            movieNotes = await knex("movie_notes")
            .where({user_id})
            .whereLike("title", `%${title}%`)
            .orderBy("title")
        }

        const userMovieTags = await knex("movie_tags").where({user_id})
        const movieNotesWithMovieTags = movieNotes.map( movieNote =>{

            const movieTags = userMovieTags.filter(tag => tag.movie_notes_id === movieNote.id)

            return {
                ...movieNote,
                tags: movieTags
            }
        })

        response.json(movieNotesWithMovieTags)
    }
}

module.exports = new UsersController