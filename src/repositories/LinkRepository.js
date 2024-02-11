const knex = require('../database/knex')

class LinkRepository {
  async create(links) {
    await knex("links").insert(links)
  }

  async findByNoteId(note_id) {
    const links = await knex("links").where({ note_id }).orderBy("created_at")
    return links
  }

  async findByUserId( user_id ) {
    const userLinks = await knex("links").where({ user_id })
    return userLinks
  }
}

module.exports = LinkRepository