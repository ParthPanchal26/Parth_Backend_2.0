import express, { json } from 'express';
import {config} from 'dotenv';
import userRouter from './routes/users.route.js';

export const app = express();

config({
    path: "./config/config.env"
});

app.use(json());
app.use("/api/v1/users" ,userRouter);

// Empty route GET API
app.get('/', (req, res) => {
    res.send("Server is running!");
});