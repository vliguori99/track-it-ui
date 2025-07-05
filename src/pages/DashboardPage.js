import React, { useState, useEffect } from "react";
import habitService from "../services/habitService";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { authData } = useAuth(); // retrieve authentication data from the context
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState("");

  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDescription, setNewHabitDescription] = useState("");

  // react method that gets executed after the component is built
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        if (authData && authData.accessToken) {
          const userHabits = await habitService.getHabits(authData.accessToken);
          setHabits(userHabits);
        } else {
        }
      } catch (error) {
        setError("Could not retrieve habits");
        console.error(error);
      }
    };

    fetchHabits();
  }, [authData]);

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    try {
      const habitDto = { name: newHabitName, desription: newHabitDescription };
      const newHabit = await habitService.createHabit(
        habitDto,
        authData.accessToken
      );

      // Refresh List of habit user
      setHabits([...habits, newHabit]);
      // Reset fields in the form
      setNewHabitName("");
      setNewHabitDescription("");
    } catch (err) {
      setError("Error during habit creation.");
    }
  };

  return (
    <div>
      {/* Form for creating new Habit */}
      <div className="create-habit-form">
        <h3>Create new habit</h3>
        <form onSubmit={handleCreateHabit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={newHabitDescription}
              onChange={(e) => setNewHabitDescription(e.target.value)}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h2>Your Habits</h2>
      {error && <p style={{ color: "red" }}></p>}
      <ul>
        {habits.length > 0 ? (
          habits.map((habit) => <li key={habit.id}>{habit.name}</li>)
        ) : (
          <p> No Habits found. Create your first!</p>
        )}
      </ul>
    </div>
  );
};

export default DashboardPage;
