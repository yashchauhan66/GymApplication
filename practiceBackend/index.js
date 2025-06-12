import express from 'express';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import exercises from './routes/exercises.js';
import cors from 'cors';
// import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express API');
});


// Auth routes
app.use('/api/auth', auth);
app.use('/api/exercises', exercises);
// app.use('/api/payment', paymentRoutes);


// Start server
app.listen(8000, () => {
  connectDB();
  console.log('API running at http://localhost:8000');
});   



