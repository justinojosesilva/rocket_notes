const SessionsService = require("./SessionsService")
const UserCreateService = require("../Users/UserCreateService")
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")
const AppError = require("../../utils/AppError")

describe("SessionsService", () => {
  let userRepositoryInMemory = null
  let sessionsService = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    sessionsService = new SessionsService(userRepositoryInMemory)
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be create session", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
    const userCreated = await userCreateService.execute(user)
    
    const userToken = await sessionsService.execute({
      email: userCreated.email,
      password: "123"
    })

    expect(userToken).toHaveProperty("token")
  })

  it("user should not create a session with an incorrect email", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
    await userCreateService.execute(user)

    const userPassword = {
      email: "user1@test.com",
      password: "123"
    }
    
    await expect(sessionsService.execute(userPassword)).rejects.toEqual(new AppError("E-mail e/ou senha incorreta", 401))
  })

  it("user should not create a session with an incorrect password", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
    await userCreateService.execute(user)

    const userPassword = {
      email: "user@test.com",
      password: "1234"
    }
    
    await expect(sessionsService.execute(userPassword)).rejects.toEqual(new AppError("E-mail e/ou senha incorreta", 401))
  })
})