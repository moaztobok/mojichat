import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { createExpressApp } from './config/express';
import { setupSocketIO } from './config/socket';
import { registeredRoutes } from './routes';
import { applyGlobalMiddleware } from './sockets/middleware/globalMiddleware';
dotenv.config();
async function startServer() {
    try {
        const app = createExpressApp();
        registeredRoutes(app);
        const server = http.createServer(app);
        applyGlobalMiddleware(app);
        const io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_URL || 'http://localhost:3000' || '*',
                methods: ['GET', 'POST'],
                credentials: true
            }
        });

        setupSocketIO(io);
        const PORT = process.env.PORT || 5000;
        server.on('error', (error) => {
            console.error('Failed to start server:', error);
            process.exit(1);
        })
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });


    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }

}

startServer();
