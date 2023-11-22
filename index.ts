import express from 'express'
import { AdminRoute } from './routes/admin.routes';
import { VenderRoute } from './routes/vendor.routes';
import mongoose from 'mongoose';
import { MONGO_URI } from './config/db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/admin', AdminRoute);
app.use('/vendor', VenderRoute);

mongoose.connect(MONGO_URI).then(() => console.log("✅ Mongodb connection established")).catch(err => console.log(err))

app.listen(8000, () =>{
    console.clear()
    console.log("✅ Server connection established")
})