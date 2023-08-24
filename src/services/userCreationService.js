const AppError = require("../utils/appError")
const {hash} = require("bcrypt")

class UserCreationService{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({name, email, password, confirmPassword}){
        const checkUserExists = await this.userRepository.findByEmail(email)
        
        if(checkUserExists){
            throw new AppError("Usuário já cadastrado no sistema",401)
        }

        if(password != confirmPassword){
            throw new AppError("Confirmação de senha invalida", 401)
        }

        const hashedPassword = await hash(password,8)

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword})
   
        return {id: userCreated}
    }

}

module.exports = UserCreationService