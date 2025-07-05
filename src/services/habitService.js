const API_URL = "localhost://8080/api/v1/habits";

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

const habitService = {
  getHabits,
}

export default habitService;