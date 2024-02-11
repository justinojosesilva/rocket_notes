class TagRepositoryInMemory {
  tags = []
  async create(tags) {
    this.tags.push(tags)
  }

  async findByNoteId(note_id) {
    return this.tags.filter(tag => tag.note_id === note_id)
  }

  async findByUserId(user_id) { 
    return this.tags.filter(tag => tag.user_id === user_id)
  }

}

module.exports = TagRepositoryInMemory