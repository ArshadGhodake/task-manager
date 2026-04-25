import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://task-manager-backend-bjyg.onrender.com";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔒 PROTECT ROUTE
  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
    } else {
      loadTasks();
    }
  }, []);

  // FETCH TASKS
  const loadTasks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  // ADD TASK
  const addTask = async () => {
    if (!title) return;

    await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    loadTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadTasks();
  };

  // TOGGLE STATUS
  const toggleStatus = async (task) => {
    await fetch(`${BASE_URL}/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    loadTasks();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Tasks</h2>

      <input
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            <p>
              {task.title} — {task.completed ? "✅ Completed" : "⏳ Pending"}
            </p>

            <button onClick={() => toggleStatus(task)}>
              Toggle Status
            </button>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;