import framework from "./04d-framework.js";
import { writeFile, readFile, unlink, rmdir, statSync } from "node:fs";
const app = framework();

app.get('sum', (request, response) => {
            let items = request.url.split("/");
            response.writeHead(200);
            response.write((Number(items[2]) + Number(items[3])).toString());
            response.end();
})

app.get('createFile', (request, response) => {
            let items = request.url.split("/");

            writeFile(items[2], items[3], (error) => {
                if(error){
                    console.log("createFile error");

                    response.writeHead(500);
                    response.write("createFile error");
                }else{
                    console.log("createFile done");

                    response.writeHead(200);
                    response.write("createFile done");
                }
                response.end();
            });
            
        })

app.get('readFile', (request, response) => {
            let items = request.url.split("/");

            readFile(items[2], (error, body) => {
                if(error){
                    console.log("readFile error");

                    response.writeHead(500);
                    response.write("readFile error");
                }else{
                    console.log("readFile done");

                    response.writeHead(200);
                    response.write(body);
                }
                response.end();
            });
            
        })

        app.get('delete', (request, response) => {
            let items = request.url.split("/");
            
            if(statSync(items[1]) === 'deleteDirectory'){
                rmdir(items[2], (error) => {
                if(error){
                    console.log("deletedirectory error");

                    response.writeHead(500);
                    response.write("deletedirectory error");
                }else{
                    console.log("deletedirectory done");

                    response.writeHead(200);
                    response.write(items[2] + ' deleted');
                }
                response.end();
            });
            }else if (statSync(items[1]) === "deleteFile"){
                unlink(items[2], (error) => {
                    if(error){
                        console.log("deleteFile error");

                        response.writeHead(500);
                        response.write("deleteFile error");
                    }else{
                        console.log("deleteFile done");

                        response.writeHead(200);
                        response.write(items[2] + ' deleted');
                    }
                    response.end();
                });
            }
            
        })

app.listen(80, () => {});