import React, { useState, useEffect } from "react";
import habitService from "../services/habitService";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { authData } = useAuth(); // retrieve authentication data from the context
  const [habits, setHabits] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDescription, setNewHabitDescription] = useState("");

  const [editedHabitId, setEditedHabitId] = useState(null); // ID of the habit being modified
  const [editedHabitName, setEditedHabitName] = useState("");
  const [editedHabitDescription, setEditedHabitDescription] = useState("");

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
        console.error(error);
      }
    };

    fetchHabits();
  }, [authData]);

  const handleCreateHabit = async (e) => {
    e.preventDefault();

    setFormErrors({}); // always reset previous errors

    try {
      const habitDto = { name: newHabitName, description: newHabitDescription };
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
      console.error("Validation error:", err);
      setFormErrors(err);
    }
  };

  const handleEditClick = (habit) => {
    setEditedHabitId(habit.id);
    setEditedHabitName(habit.name); // this precompiles the input with the current value
    setEditedHabitDescription(habit.description); // this precompiles the input with the current value
  };

  const handleUpdateHabit = async (e, habitId) => {
    e.preventDefault();
    setFormErrors({});

    try {
      const habitDto = {
        name: editedHabitName,
        description: editedHabitDescription,
      };
      const updatedHabit = await habitService.updateHabit(
        habitDto,
        habitId,
        authData.accessToken
      );

      setHabits(habits.map((h) => (h.id === editedHabitId ? updatedHabit : h)));

      setEditedHabitId(null);
      setEditedHabitName("");
      setEditedHabitDescription("");
    } catch (err) {
      console.error("Validation error:", err);
      setFormErrors(err);
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
            {/* Show the error if it exists for the current field */}
            {formErrors.name && (
              <span style={{ color: "red" }}>{formErrors.name}</span>
            )}
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={newHabitDescription}
              onChange={(e) => setNewHabitDescription(e.target.value)}
            />
            {formErrors.description && (
              <span style={{ color: "red" }}>{formErrors.description}</span>
            )}
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h2>Your Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {editedHabitId === habit.id ? (
              // if we are in edit mode, show input field and save button
              <form onSubmit={(e) => handleUpdateHabit(e, habit.id)}>
                <input
                  type="text"
                  value={editedHabitName}
                  onChange={(e) => setEditedHabitName(e.target.value)}
                />
                <input
                  type="text"
                  value={editedHabitDescription}
                  onChange={(e) => setEditedHabitDescription(e.target.value)}
                />

                <button type="submit">save</button>
                <button type="button" onClick={() => setEditedHabitId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              // otherwise, show name and modify button
              <>
                {habit.name} - {habit.description}
                <button
                  onClick={() => handleEditClick(habit)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
