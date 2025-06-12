// Import required dependencies
// const express = require('express');
import express from 'express'
const router = express.Router();

// const { createPaymentIntent } = require('../controllers/paymentController');
// import createPaymentIntent from '../controllers/paymentController';

// Route for creating a new payment intent
// POST /api/create-payment-intent
// Body: { amount: number, plan: string }
// router.post('/create-payment-intent', createPaymentIntent);

// Test route to verify the router is working
router.get('/test', (req, res) => {
  res.json({ message: 'Payment routes are working' });
});

// Log all incoming requests
router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

module.exports = router; 