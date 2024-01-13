import express from "express";
import App from './services/ExpressApp';
import dbConnection from './services/Database';
import dotenv from 'dotenv'
dotenv.config()

const startServer = async () => {
    
    const app = express()
    await dbConnection()
    await App(app)
    
    app.listen(process.env.PORT || 8000, () =>{
        console.clear()
        console.log("✅ Server connection established")
        console.log(process.env.MONGO_URI)
    })
}

startServer()