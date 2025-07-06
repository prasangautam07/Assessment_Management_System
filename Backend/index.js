const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'})); 

const userRoutes = require('./routes/userroutes');
app.use('/api/users', userRoutes);

const middleware = require('./middleware/errorhandler');
app.use(middleware);



app.get('/', (req, res) => {
  res.send('Welcome to the Assessment Management System API');
});



 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
