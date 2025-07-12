import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { swaggerUiMiddleware, swaggerDocs } from './swagger.js';
import userRoutes from './routes/userroutes.js';
import adminRoutes from './routes/adminroutes.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}))

app.use('/api-docs', swaggerUiMiddleware, swaggerDocs);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

import middleware from './middleware/errorhandler.js';
app.use(middleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Assessment Management System API');
});



 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
