import express from 'express';
import usersRoutes from './routes/users.routes';
import postRoutes from './routes/posts.router'
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Application level middleware
app.use(express.json()); // parse request body buffer to json and assign to req.body

// routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postRoutes);


app.use(errorHandler); // error handler middleware => 1 only in the server => catch all errors

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`).then(() => {
    console.log('✅✅ Connected to MongoDB');
  }).catch((err) => {
    console.log('❌❌ Connected to MongoDB');
    console.log(err);
  });
});