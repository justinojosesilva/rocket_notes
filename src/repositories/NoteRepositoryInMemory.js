class NoteRepositoryInMemory {
  notes = []
  async create({ title, description, user_id }) {
    const note = {
      id: Math.floor(Math.random() * 1000) + 1,
      title,
      description,
      user_id
    }
    this.notes.push(note)
    return note
  }

  async findById(id) {
    return this.notes.filter(note => note.id === id)
  }

  async delete(id) {
    return this.notes.filter(note => note.id !== id)
  }
}

module.exports = NoteRepositoryInMemory