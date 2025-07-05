const API_URL = 'http://localhost:8080/api/auth';


/**
 * Function for registering a new user.
 * @param {object} registerDto - the item with username and pwd
 * @returns {Promise<object>} - DTO of the registered user
 */
const register = (registerDto) => {
  return fetch(API_URL + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerDto),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};

/**
 * Function for logging in.
 * @param {object} loginDto - the item with username and password
 * @returns {Promise<object>} - the DTO with the access token.
 */
const login = (loginDto) => {
  return fetch(API_URL+ '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginDto),
  }).then(response => {
    if(!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  });
};

// export functions in order to use them in other scopes
const authService = {
  register,
  login,
};

export default authService;