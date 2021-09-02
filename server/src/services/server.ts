import express from 'express';
import * as http from 'http';
import apiRouter from '../routes/index';

const app = express();
const server = new http.Server(app);

app.use(express.json()); // Indica que el body viene como JSON
app.use(express.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string
app.use('/api', apiRouter);

export default server;
