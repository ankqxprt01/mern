const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require("path")
// const addTestUser = require('./utils/seedUsers');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); //

// Call the user insertion function
// addTestUser();

// static files
app.use(express.static(path.join(__dirname,'./frontend/build')))

const frontendPath = path.join(__dirname, './frontend/build');

app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: frontendPath });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
