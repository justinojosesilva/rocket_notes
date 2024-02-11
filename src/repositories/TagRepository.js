const knex = require('../database/knex')

class TagRepository {
  async create(tags) {
    await knex("tags").insert(tags)
  }

  async findByNoteId(note_id) {
    const tags = await knex("tags").where({ note_id }).orderBy("name")
    return tags
  }

  async findByUserId( user_id ) {
    const userTags = await knex("tags").where({ user_id })
    return userTags
  }
}

module.exports = TagRepository