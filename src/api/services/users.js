const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple() {
  const rows = await db.query(
    'SELECT id, username, email FROM users'
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}


function validateCreate(user) {
    let messages = [];
  
    console.log(user);
  
    if (!user) {
      messages.push('No object is provided');
    }
  
    if (!user.username) {
      messages.push('Username is empty');
    }
  
    if (!user.email) {
      messages.push('Email is empty');
    }
  
    if (user.username && user.username.length > 255) {
      messages.push('Username cannot be longer than 255 characters');
    }
  
    if (user.email && user.email.length > 255) {
      messages.push('Email cannot be longer than 255 characters');
    }
  
    if (messages.length) {
      let error = new Error(messages.join());
      error.statusCode = 400;
  
      throw error;
    }
  }
  
async function create(user) {
    validateCreate(user);

    const result = await db.query(
      'INSERT INTO users(username, email) VALUES ($1, $2) RETURNING *',
      [user.username, user.email]
    );
    let message = 'Error in creating user';
  
    if (result.length) {
      message = 'User created successfully';
    }
  
    return {message};
}

module.exports = {
    getMultiple,
    create
}

