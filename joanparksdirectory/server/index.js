const express = require('express');
const app = express();
const parksRouter = require('./routes/parks'); // 👈 updated path

app.use('/api/parks', parksRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🌲 Server is running at http://localhost:${PORT}`);
});