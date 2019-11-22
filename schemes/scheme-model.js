const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
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
  return db('steps')
    .orderBy('step_number')
    .join('schemes', 'steps.scheme_id', 'schemes.id')
    .where({ scheme_id: id })
    .select(
      'steps.id',
      'schemes.scheme_name',
      'steps.step_number',
      'steps.instructions'
    );
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then((ids) => {
      return findById(ids[0]);
    });
}

function addStep(step, scheme_id) {
  return db('steps')
    .join('schemes', 'steps.scheme_id', 'schemes.id')
    .insert({...step, scheme_id})


}

function update(changes, id) {
  return db('schemes')
    .where({ id: id })
    .update(changes)
    .then((changed) => {
      return findById(id);
    });
}

function remove(id) {
  return db('schemes')
    .where({ id: id })
    .del();
}
