const express = require('express');
const cors = require('cors');
const parksRoutes = require('./routes/parks');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/parks', parksRoutes);

app.get('/', (req, res) => {
  res.send('Backend is live!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));