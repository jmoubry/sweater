const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, title, project, created_at, updated_at FROM thread OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getById(threadId) {
    const data = await db.query(
        'SELECT id, title, project, created_at, updated_at FROM thread WHERE id = $1', 
        [threadId]
      );

      return data.length > 0 ? data[0] : {};
}


async function create(thread) {
    // validateCreate(thread);

    const result = await db.query(
      'INSERT INTO thread(title, project) VALUES ($1, $2) RETURNING *',
      [thread.title, thread.project]
    );
    let message = 'Error in creating thread';
  
    if (result.length) {
      message = 'Thread created successfully';
    }
  
    return {message};
}


module.exports = {
  getMultiple,
  getById,
  create
}
