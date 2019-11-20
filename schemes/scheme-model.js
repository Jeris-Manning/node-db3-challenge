const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findSteps
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id: id })
    .first();
}

function findSteps(id) {
  return (
    db('steps')
      .orderBy('step_number')
      .join('schemes', 'steps.scheme_id', 'schemes.id')
      .where({ scheme_id: id })
      // .select('scheme.scheme_name', 'steps.step_number', "steps.instructions" )
      .select(
        'steps.id',
        'schemes.scheme_name',
        'steps.step_number',
        'steps.instructions'
      )
  );


  
}
