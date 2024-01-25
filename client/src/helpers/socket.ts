import io from 'socket.io-client';

export const socket = io('ws://localhost:4000/private-chat', { autoConnect: false });
