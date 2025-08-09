const express = require('express');
const studentRoutes = require('./routes/student');

const app = express();
app.use(express.json());

// mock user plan middleware
app.use((req, res, next) => {
  // In real application, user data would come from auth system
  req.user = { plan: 'premium' };
  next();
});

app.use('/student', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
