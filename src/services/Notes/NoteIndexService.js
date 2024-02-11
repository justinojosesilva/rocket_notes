class NoteIndexService {
  constructor(
    noteRepository,
    linkRepository,
    tagRepository
  ) {
    this.noteRepository = noteRepository
    this.linkRepository = linkRepository
    this.tagRepository = tagRepository
  }

  async execute({ title, tags, user_id }) {
    let notes 
    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())
      notes = await this.noteRepository.findByTagsUserId(title, filterTags, user_id)
    } else {
      notes = await this.noteRepository.findByTitleAndUserId(title, user_id)
    }

    const userTags = await this.tagRepository.findByUserId(user_id)
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)
      return {
        ...note,
        tags: noteTags
      }
    })
    return notesWithTags

  }

}

module.exports = NoteIndexService