const NoteRepository = require('../repositories/NoteRepository')
const LinkRepository = require('../repositories/LinkRepository')
const TagRepository = require('../repositories/TagRepository')
const NoteCreateService = require('../services/Notes/NoteCreateService')
const NoteShowService = require('../services/Notes/NoteShowService')
const NoteIndexService = require('../services/Notes/NoteIndexService')
const NoteDeleteService = require('../services/Notes/NoteDeleteService')

class NotesController {

  async create(request, response) {
    const { title, description, tags, links } = request.body 
    const user_id = request.user.id
    const noteRepository = new NoteRepository()
    const linkRepository = new LinkRepository()
    const tagRepository = new TagRepository()
    const noteCreateService = new NoteCreateService(
      noteRepository,
      linkRepository,
      tagRepository
    )

    await noteCreateService.execute( {
      title, 
      description, 
      tags, 
      links,
      user_id
    })
    return response.status(201).json()
  }

  async show(request, response) {
    const { id } = request.params
    const noteRepository = new NoteRepository()
    const linkRepository = new LinkRepository()
    const tagRepository = new TagRepository()
    const noteShowService = new NoteShowService(
      noteRepository,
      linkRepository,
      tagRepository
    )
    const note = await noteShowService.execute(id)
    return response.json(note)
  }

  async delete(request, response) {
    const { id } = request.params 
    const noteRepository = new NoteRepository()
    const noteDeleteService = new NoteDeleteService(noteRepository)
    await noteDeleteService.execute(id)
    return response.json()
  }

  async index(request, response) {
    const { title, tags } = request.query 
    const user_id = request.user.id
    const noteRepository = new NoteRepository()
    const linkRepository = new LinkRepository()
    const tagRepository = new TagRepository()
    const noteIndexService = new NoteIndexService(
      noteRepository,
      linkRepository,
      tagRepository
    )

    const notes = await noteIndexService.execute({title, tags, user_id})
    return response.json(notes)
  }
}

module.exports = NotesController