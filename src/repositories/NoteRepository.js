const knex = require('../database/knex')

class NoteRepository {
  async create({ title, description, user_id }) {
    const [ note_id ] = await knex("notes").insert({
      title,
      description,
      user_id
    })
    return note_id
  }

  async findById(id) {
    const note = await knex("notes").where({ id }).first()
    return note
  }

  async findByTagsUserId(title, filterTags, user_id) {
    const notes = await knex("tags")
      .select([
        "notes.id",
        "notes.title",
        "notes.user_id",
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("notes", "notes.id", "tags.note_id")
      .groupBy("notes.id")
      .orderBy("notes.title")
    return notes
  }

  async findByTitleAndUserId(title, user_id) {
    const notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    return notes
  }

  async delete(id) {
    await knex("notes").where({ id }).delete()
  }
}

module.exports = NoteRepository