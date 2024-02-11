const UserCreateService = require('../Users/UserCreateService')
const NoteCreateService = require('./NoteCreateService')
const UserRepositoryInMemory = require('../../repositories/UserRepositoryInMemory')
const NoteRepositoryInMemory = require('../../repositories/NoteRepositoryInMemory')
const LinkRepositoryInMemory = require('../../repositories/LinkRepositoryInMemory')
const TagRepositoryInMemory = require('../../repositories/TagRepositoryInMemory')

describe("NoteCreateService", () => {
  let userCreateService = null
  let noteCreateService = null
  let userRepositoryInMemory = null
  let noteRepositoryInMemory = null
  let linkRepositoryInMemory = null
  let tagRepositoryInMemory = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    noteRepositoryInMemory = new NoteRepositoryInMemory()
    linkRepositoryInMemory = new LinkRepositoryInMemory()
    tagRepositoryInMemory = new TagRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
    noteCreateService = new NoteCreateService(
      noteRepositoryInMemory,
      linkRepositoryInMemory,
      tagRepositoryInMemory
    )
  })

  it("note should be create", async() => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
    const userCreated = await userCreateService.execute(user)

    const note = {
      title: "Matematica Aplicada",
      description: "Essa é uma nota de Matematica Aplicada",
      tags: ["soma","diminuir", "multiplicar"],
      links: ["link1","link2"],
      user_id: userCreated.id
    }

    const noteCreated = await noteCreateService.execute(note)
    expect(noteCreated).toHaveProperty("id")
  })
})