class NoteShowService {
  constructor(
    noteRepository,
    linkRepository,
    tagRepository
  ) {
    this.noteRepository = noteRepository
    this.linkRepository = linkRepository
    this.tagRepository = tagRepository
  }

  async execute(note_id) {
    const note = await this.noteRepository.findById(note_id)
    const tags = await this.tagRepository.findByNoteId(note_id)
    const links = await this.linkRepository.findByNoteId(note_id)

    return {
      ...note,
      tags,
      links
    }
  }
}

module.exports = NoteShowService