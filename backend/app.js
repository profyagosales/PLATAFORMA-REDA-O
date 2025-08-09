const express = require('express');
const studentRoutes = require('./routes/student');

const app = express();

app.use(express.json());
app.use('/student', studentRoutes);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;
