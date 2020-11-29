const { json } = require("body-parser");
const { get } = require("mongoose");

 
module.exports = function(io) {
    let projects = new Map(); //
    let cnt = 1;
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
            }
        });

        socket.on('addMember', (data) => {
            socket.join(data.projectID);
            if(!projects.has(data.projectID)){
                projects.set(data.projectID, new Map());
                projects.get(data.projectID).set(socket.id,data.name);
                io.to(data.projectID).emit('userJoin', data.name); 
                io.to(data.projectID).emit('userList', Array.from(projects.get(data.projectID).keys())); 
            }
            else{
                if(!projects.get(data.projectID).has(socket.id)){
                    
                    projects.get(data.projectID).set(socket.id,data.name);
                    io.to(data.projectID).emit('userJoin', data.name); 
                    io.to(data.projectID).emit('userList', Array.from(projects.get(data.projectID).keys())); 
                }
            }
              //  console.log(projects.get(data.projectID));
        });

        socket.on('reload', (projectID) => {
            console.log("in reload -- > ");
            if(!projects.has(projectID)){
               console.log("ERROR : we have not this project '" + projectID);
            }
            else{
                console.log(socket.id);
                io.to(projectID).emit('reload', socket.id); 
            }
        });
        
        socket.on('reload complete', (projectID) => {
            console.log("in reload complete -- > ");
            if(!projects.has(projectID)){
               console.log("ERROR : we have not this project '" + projectID);
            }
            else{
                cnt++;
                if(projects.get(projectID).size == cnt){
                    console.log('complete~~!!');
                    cnt == 1;
                    io.to(projectID).emit('reload complete', projectID); 
                }
                
            }
        });

      });
};