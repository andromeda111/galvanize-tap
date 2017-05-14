exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('scores').del()
        .then(function() {
            // Inserts seed entries
            return knex('scores').insert([{
                    id: 1,
                    name: 'n00b',
                    score: 0
                }
            ]);
        }).then(() => {
    return knex.raw(
      "SELECT setval('scores_id_seq', (SELECT MAX(id) FROM scores))"
    )
  })
};
