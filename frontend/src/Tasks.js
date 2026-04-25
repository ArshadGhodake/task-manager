import React, { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // FETCH TASKS
  const loadTasks = () => {
    fetch("https://task-manager-backend-bjyg.onrender.com/tasks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      })
      .catch(() => setTasks([]));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!title) return;

    await fetch("https://task-manager-backend-bjyg.onrender.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    loadTasks();
  };

  return (
    <div>
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
            <p>{task.title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;