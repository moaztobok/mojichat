import { DefaultEventsMap, Server } from "socket.io";

export const setupSocketIO = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    let users = new Map();

    io.on('connection', (socket) => {
        const id = socket.id;
        users.set(id, { id });
            console.log(`User ${id} connected`);
            console.log(
                `Total number of users connected: ${users.size}`
            )
            io.emit('users', { users: Array.from(users.values()) });
            // Notify all clients about the new connection
            io.emit('user_connected', { id });

            socket.on('disconnect', () => {
                users.delete(id);
                console.log(`User ${id} disconnected`);

                // Notify all clients about the disconnection
                io.emit('user_disconnected', { id });
            });
    });

}