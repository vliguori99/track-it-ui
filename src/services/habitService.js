const API_URL = "http://localhost:8080/api/v1/habits";

/**
 * Generic Function to handle fetch response.
 * Checks if the response is ok, otherwise read and throw the error in the JSON
 * @param {Response} response - the object returned by the fetch operation
 * @returns {Promise<any>} - JSON data if response is ok
 * @throws {object} - the error item if the JSON is not ok
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};

/**
 * Function to retrieve the current user habits
 * @param {string} token - The JWT token of the user
 * @returns {Promise<Array>} - the habits array
 */
const getHabits = async (token) => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // this is the core for the protected apis
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

  /**
   * Funtion to create a new Habit
   * @param {object} habitDto - the dto of the item to create
   * @param {string} token - JWT token of the user
   * @returns {Promise<object>} - the habit created
   */
  const createHabit = async (habitDto, token) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(habitDto),
    });
    return handleResponse(response);
  };

  /**
   * Function to modify a habit
   * @param {object} habitDto - the dto of the updated data
   * @param {number} id - the habit id 
   * @param {string} token - jwt token
   * @returns {Promise<object>} - the updated habit
   */
  const updateHabit = async (habitDto, id, token) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(habitDto)
    });
    return handleResponse(response);
  }

const habitService = {
  getHabits,
  createHabit,
  updateHabit
};

export default habitService;