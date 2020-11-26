module.exports = function(io) {
    let members = [];
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('addMember', (name) => {
            members.push(name);
            console.log('add member ' + name);
        });
      });
};