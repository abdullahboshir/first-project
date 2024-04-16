import express from 'express';
import { Schema, model } from 'mongoose';

const router = express.Router();

// Define the schema outside of the route handler
const todoSchema = new Schema({
  status: {
    type: String,
    enum: ['finished', 'pending'],
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
  },
});

// Create the model using the schema
const TodoModel = model('todo', todoSchema);

router.post('/', async (req, res) => {
  try {
    // Use the existing TodoModel to create a new document
    const data = await TodoModel.create(req.body);
    console.log('todossssssssssssssssss', data);
    res.json({ data });
  } catch (error: any) {
    console.log('got an error', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    // Use the existing TodoModel to create a new document
    const query = {};
    console.log('resultttttttttttt', query, req.query.priority);
    if (req.query.priority) {
      query.priority = req.query.priority;
    }
    const data = await TodoModel.find(query);

    res.json({ message: 'success', data });
  } catch (error: any) {
    console.log('got an error', error.message);
    res.status(500).json({ error: error.message });
  }
});

export const TestRoutes = router;
