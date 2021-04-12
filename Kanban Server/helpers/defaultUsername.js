const defaultUsername = (email) => {
  let username = '';

  for (let i = 0; i < email.length; i++) {
    if (email[i] === '@') {
      break;
    }

    if (email[i] !== '.' && email[i] !== '_' && email[i] !== '-') {
      username += email[i];
    }
  }

  return username;
};

module.exports = defaultUsername;
