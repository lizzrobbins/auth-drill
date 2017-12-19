var knex = require('./knex')

module.exports = {
  signIn: function(body) {
    return knex('my_user').select().where('agentName', body.agentId).first()
  },

  signUp: function(hash, body) {
    return knex('my_user').select().where('agentName', body.agentName).first()
    .then((data) => {
      if (data === undefined) {
        return knex('my_user').insert({
          'agentName': body.agentName,
          'password': hash
        }).returning('*')
      } else {
        return data
      }
    })
  }
}
