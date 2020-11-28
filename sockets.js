const { json } = require("body-parser");
const { get } = require("mongoose");

 
module.exports = function(io) {
    let projects = new Map(); //

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
            let projectIDs = new Set();
            for(let [key,value] of projects){
                if(value.has(socket.id)){
                    projectIDs.add(key);
                    value.delete(socket.id);
                    io.to(key).emit('userList', Array.from(projects.get(key).keys())); 
                }
                if(value.size == 0) projects.delete(key);
                console.log(projects);
            }
        });

        socket.on('addMember', (data) => {
            if(!projects.has(data.projectID)){
                projects.set(data.projectID, new Map());
                projects.get(data.projectID).set(socket.id,data.name);
            }
            else{
                projects.get(data.projectID).set(socket.id,data.name);
            }
            socket.join(data.projectID);
            
            console.log(projects.get(data.projectID));
            // console.log(userList(data.projectID));

            io.to(data.projectID).emit('userJoin', data.name); 
            io.to(data.projectID).emit('userList', Array.from(projects.get(data.projectID).keys())); 
        });

        socket.on('reload', (data) => {
            if(!projects.has(data)){
               console.log("ERROR : we have not this project '" + data);
            }
            else{
                io.to(data).emit('reload', new Date().toLocaleString()); 
                console.log(new Date().toLocaleString());
            }
        });
      });
};