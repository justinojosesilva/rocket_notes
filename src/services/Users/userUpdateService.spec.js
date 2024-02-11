const UserUpdateService = require("./UserUpdateService")
const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")
const AppError = require("../../utils/AppError")

describe("UserUpdateService", () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
    userUpdateService = new UserUpdateService(userRepositoryInMemory)
  })

  it("user should be update", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
    const { id } = await userCreateService.execute(user)

    const userUpdated = {
      name: "User Test Alter",
      email: "user@test.com",
      password: "1234",
      old_password: "123",
      user_id: id
    }
    const userReturn = await userUpdateService.execute(userUpdated)

    expect(userReturn).toHaveProperty('id')
  })

  it("user not should be update with not user", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
    const { id } = await userCreateService.execute(user)

    const userUpdated = {
      name: "User Test Alter",
      email: "user@test.com",
      password: "1234",
      old_password: "123",
      user_id: 3
    }

    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(new AppError("Usuário não encontrado"))
  })

  it("user not should be update with email exists", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user1@test.com",
      password: "123"
    }
    await userCreateService.execute(user1)

    const user2 = {
      name: "User Test 2",
      email: "user2@test.com",
      password: "123"
    }
    const { id: idUser2 } = await userCreateService.execute(user2)

    const userUpdated = {
      name: "User Test Alter",
      email: "user1@test.com",
      user_id: idUser2
    }

    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(new AppError("Este e-mail já está em uso."))
  })

  it("user not should be update password without providing the old password", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
    const { id } = await userCreateService.execute(user)

    const userUpdated = {
      name: "User Test Alter",
      email: "user@test.com",
      password: "1234",
      user_id: id
    }
    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(new AppError("Você precisa informar a senha antiga para definir a nova senha."))
  })

  it("user should not update the password by entering the wrong old password", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
    const { id } = await userCreateService.execute(user)

    const userUpdated = {
      name: "User Test Alter",
      email: "user@test.com",
      password: "1234",
      old_password: "12345",
      user_id: id
    }
    await expect(userUpdateService.execute(userUpdated)).rejects.toEqual(new AppError("A senha antiga não confere."))
  })
})