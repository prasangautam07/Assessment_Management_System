import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { swaggerUiMiddleware, swaggerDocs } from './swagger.js';
import userRoutes from './routes/userroutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}))

app.use('/api-docs', swaggerUiMiddleware, swaggerDocs);
app.use('/api/users', userRoutes);
app.use('/api/teacher', teacherRoutes);

import middleware from './middleware/errorhandler.js';
app.use(middleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Assessment Management System API');
});



 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
