import io from 'socket.io-client';

export const socket = io('ws://localhost:5000/private-chat', { autoConnect: false });

export default socket;
