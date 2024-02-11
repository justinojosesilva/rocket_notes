const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/Users/UserCreateService")
const UserUpdateService = require("../services/Users/UserUpdateService")

class UsersController {
/**
 * index - GET para listar vários registros.
 * show - GET para exibir um registro especifico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */
  async create(request, response) {
    const {name, email, password} = request.body
    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)
    await userCreateService.execute({ name, email, password })
    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id 

    const userRepository = new UserRepository()
    const userUpdateService = new UserUpdateService(userRepository)
    const user = await userUpdateService.execute({name, email, password, old_password, user_id })
    return response.status(200).json(user)

  }
  
}

module.exports = UsersController