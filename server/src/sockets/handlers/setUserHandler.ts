import { DefaultEventsMap, Socket } from "socket.io";
interface UserData {
    username: string;
}
interface ServerToClientEvents {
    setUser: (data: UserData) => void;
}

interface ClientToServerEvents {
    setUser: (data: UserData) => void;
}
module.exports = (socket : Socket<ServerToClientEvents, DefaultEventsMap, DefaultEventsMap, any>)=>{


    socket.on('setUser', (data: UserData) => {
        console.log('setUser', data);
        (socket as any).username = data.username; // Using type assertion since username is custom property
        socket.emit('userSet', data);
    })
};