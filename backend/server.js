const express = require('express');
const path = require('path');
const teacherRouter = require('./routes/teacher');

const app = express();

app.use('/teacher', teacherRouter);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
