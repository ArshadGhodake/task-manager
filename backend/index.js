const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/task-manager')
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err);
    process.exit(1);
  });

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// ✅ Home Route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// ✅ Error Handling Middleware (important)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
});

// ✅ Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});