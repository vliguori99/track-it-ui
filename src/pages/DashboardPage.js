import React, { useState, useEffect } from "react";
import habitService from "../services/habitService";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { authData } = useAuth(); // retrieve authentication data from the context
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState("");

  // react method that gets executed after the component is built
  useEffect(() => {
    console.log("1. useEffect in Dashboard is getting executed...")
    const fetchHabits = async () => {
      try {
        console.log("2. try loading habits. Authentication Data:", authData);
        if (authData && authData.accessToken) {
          console.log("3. Token found: ", authData.accessToken);
          const userHabits = await habitService.getHabits(authData.accessToken);
          setHabits(userHabits);
        } else {
          console.log("4. token not found")
        }
      } catch (error) {
        setError("Could not retrieve habits");
        console.error(error);
      }
    };

    fetchHabits();
  }, [authData]);

  return (
    <div>
      <h2>Your Habits</h2>
      {error && <p style={{ color: 'red' }}></p>}
      <ul>
        {habits.length > 0 ? (
          habits.map(habit => <li key={habit.id}>{habit.name}</li>)
        ) : (
          <p> No Habits found. Create your first!</p>
        )}
      </ul>
    </div>
  );
};

export default DashboardPage;
