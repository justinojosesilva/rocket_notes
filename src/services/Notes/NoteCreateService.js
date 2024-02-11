class NoteCreateService {

  constructor(
    noteRepository,
    linkRepository,
    tagRepository
  ) {
    this.noteRepository = noteRepository
    this.linkRepository = linkRepository
    this.tagRepository = tagRepository
  }

  async execute( {title, description, tags, links, user_id } ) {
    const note = await this.noteRepository.create({
      title,
      description,
      user_id
    })
    const linksInsert = links.map(link => {
      return {
        note_id: note.id,
        url: link
      }
    })

    await this.linkRepository.create(linksInsert)

    const tagsInsert = tags.map(name => {
      return {
        note_id: note.id,
        name,
        user_id
      }
    })

    await this.tagRepository.create(tagsInsert)

    return {
      ...note,
      links: linksInsert,
      tags: tagsInsert
    }
  }
}

module.exports = NoteCreateService