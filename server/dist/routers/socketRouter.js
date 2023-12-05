"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketRouter = (io) => {
    io.on('connection', (socket) => {
        socket.on('conversation', (chatId) => {
            socket.join(chatId);
            socket.on('message', (content, receiverId) => {
                console.log(content);
                socket.in(chatId).to(receiverId).emit('message', content, receiverId);
            });
            socket.on('disconnect', () => {
                socket.leave(chatId);
            });
        });
    });
};
exports.default = socketRouter;
