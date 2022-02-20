const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(threadId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, message, author, created_at FROM chat WHERE thread_id = $1 ORDER BY created_at DESC OFFSET $2 LIMIT $3', 
    [threadId, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function create(threadId, chat) {
    // validateCreate(chat);

    const result = await db.query(
      'INSERT INTO chat(thread_id, message, username) VALUES ($1, $2, $3) RETURNING *',
      [threadId, chat.message, chat.username]
    );
    let message = 'Error in creating chat';
  
    if (result.length) {
      message = 'Chat created successfully';
    }
  
    return {message};
}


module.exports = {
  getMultiple,
  create
}
