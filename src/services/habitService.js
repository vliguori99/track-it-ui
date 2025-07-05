const API_URL = "http://localhost:8080/api/v1/habits";

/**
 * Function to retrieve the current user habits
 * @param {string} token - The JWT token of the user
 * @returns {Promise<Array>} - the habits array
 */
const getHabits = (token) => {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // this is the core for the protected apis
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Could not fetch habits");
    }
    return response.json();
  });
};


/**
 * Funtion to create a new Habit
 * @param {object} habitDto - the dto of the item to create
 * @param {string} token - JWT token of the user
 * @returns {Promise<object>} - the habit created
 */
const createHabit = (habitDto, token) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(habitDto)
  }).then(response => { 
    if (!response.ok) {
      throw new Error('Could not create habit');
    }
    return response.json();
  });
};

const habitService = {
  getHabits,
  createHabit
}

export default habitService;