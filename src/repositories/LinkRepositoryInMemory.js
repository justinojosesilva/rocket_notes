class LinkRepositoryInMemory {
  links = []
  async create(links) {
    this.links.push(links)
  }

  async findByNoteId(note_id) {
    return this.links.filter(link => link.note_id === note_id)
  }

  async findByUserId(user_id) { 
    return this.links.filter(link => link.user_id === user_id)
  }
}

module.exports = LinkRepositoryInMemory