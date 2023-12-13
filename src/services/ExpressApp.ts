import express, { Application } from 'express'
import path from 'path';

import { api } from '../routes/api.routes';

export default async(app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use('/images', express.static(path.join(__dirname, 'images')))

    app.use('/api', api)

    return app;
}