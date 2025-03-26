import helmet from "helmet";
import compression from 'compression';
import morgan from 'morgan';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { clerkMiddleware } from "@clerk/express";
export const applyGlobalMiddleware = (app: Express) => {
    app.use(helmet()); // Security headers
    app.use(morgan('dev')); // Request logging
    app.use(express.json()); // Parse JSON bodies
    app.use(compression()); // Compress
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
    app.use(cookieParser()); // Parse cookies
    app.use(clerkMiddleware())
}