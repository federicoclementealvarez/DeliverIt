import dotenv from 'dotenv';
import { getApp } from './appConfig.js';

dotenv.config();

const app = getApp()


app.listen(process.env.API_PORT, () => {
    console.log(`Server running on ${process.env.API_SERVER}:${process.env.API_PORT}`)
})
