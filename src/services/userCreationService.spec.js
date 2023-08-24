const UserCreationService = require ("./userCreationService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")

it("user should be create", async () =>{

    const user = {
        name: "User test",
        email: "test@email.com",
        password: "123",
        confirmPassword: "123"
    }

    const userRepositoryInMemory = new UserRepositoryInMemory()
    const userCreationService = new UserCreationService(userRepositoryInMemory)

    const userCreated = await userCreationService.execute(user)

    expect(userCreated).toHaveProperty("id")


})