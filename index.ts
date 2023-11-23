import express from 'express'
import mongoose from 'mongoose';
import { MONGO_URI } from './config/db';
import { api } from './routes/api.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', api)

mongoose.connect(MONGO_URI).then(() => console.log("✅ Mongodb connection established")).catch(err => console.log(err))

app.listen(8000, () =>{
    console.clear()
    console.log("✅ Server connection established")
})