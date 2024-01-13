import express, { Application } from 'express'
import path from 'path';

import { api } from '../routes/api.routes';
import { errorHandler } from '../middlewares';

export default async(app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use('/api', api)

    app.use(errorHandler)

    return app;
}