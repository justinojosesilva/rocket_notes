const UserRepository = require("../repositories/UserRepository")
const SessionsService = require("../services/Sessions/SessionsService")

class SessionsController {

  async create(request, response) {
    const { email, password } = request.body
    const userRepository = new UserRepository()
    const sessionsService = new SessionsService(userRepository)
    const userToken = await sessionsService.execute({email, password})
    return response.status(201).json(userToken)
  }

}

module.exports = SessionsController