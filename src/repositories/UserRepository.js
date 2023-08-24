const knex = require("../dataBase/knex/index.js")
const dateAndTimeFormatted = require("../utils/dateAndTimeFormatted.js")

class UserRepository{

    async findByEmail(email){

        const [user] = await knex.select("*").from("users").where("email", email)
        return user
    }

    async create({name, email, password}){

        return await knex("users").insert({
            name,
            email,
            password,
            created_at: dateAndTimeFormatted(),
            updated_at: dateAndTimeFormatted()
        })
    }
}

module.exports = UserRepository