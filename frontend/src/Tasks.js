import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // 🔒 Protect route
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
      loadTasks();
    }
  }, []);

  // 📥 Load tasks
  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ➕ Add task
  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(
        "http://localhost:5000/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔄 Toggle task
  const toggleTask = async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:5000/tasks/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">My Tasks</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          className="border p-2 mr-2 rounded w-64"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>
              {task.title}{" "}
              <span className={task.completed ? "text-green-600" : "text-gray-500"}>
                ({task.completed ? "done" : "pending"})
              </span>
            </span>

            <div>
              <button
                onClick={() => toggleTask(task._id, task.completed)}
                className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
              >
                ✔
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Tasks;