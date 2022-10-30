// to use environment variables
require('dotenv').config();

import express from 'express';
import { connectDB } from './config/db'
import AppRouter from './routes';
const cors = require("cors");

// initiating express app
const app = express();
const port = process.env.PORT || 8000;
const router = new AppRouter(app);
connectDB();

app.use(express.json());
app.use(cors());
router.init();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});