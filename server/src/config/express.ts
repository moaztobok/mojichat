import express from 'express';
import cors from 'cors';
export const createExpressApp = () => {

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    return app;
}

