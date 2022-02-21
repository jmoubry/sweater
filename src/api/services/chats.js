const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(threadId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT c.id, c.message, u.username, c.user_id, c.created_at FROM chats c JOIN users u ON c.user_id = u.id WHERE thread_id = $1 AND parent_chat_id IS NULL ORDER BY created_at OFFSET $2 LIMIT $3', 
    [threadId, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getMultipleReplies(chatId, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, message, user_id, created_at FROM chats WHERE parent_chat_id = $1 ORDER BY created_at OFFSET $2 LIMIT $3', 
    [chatId, offset, config.listPerPage]
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
      'INSERT INTO chats(thread_id, message, user_id) VALUES ($1, $2, $3) RETURNING *',
      [threadId, chat.message, chat.user_id]
    );
    let message = 'Error in creating chat';
  
    if (result.length) {
      message = 'Chat created successfully';
    }
  
    return {message};
}


module.exports = {
  getMultiple,
  getMultipleReplies,
  create
}
