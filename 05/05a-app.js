import framework from "./05a-framework.js";
import { unlink } from 'node:fs';

let app = framework();
let port = 3000;
app.get("sum", function (request, response){
    let items = request.url.split("/");
    response.writeHead(200);
    response.write((Number(items[2]) + Number(items[3])).toString());
    response.end();
});

app.get("delete", function (request, response){
    let items = request.url.split("/");
    response.writeHead(200);
    unlink(items[2], function (err){
        if(err){
            console.log('error', err);
            response.writeHead(500);
            response.write("delete error");
            response.end();
        }else{
            console.log("delete done");

            response.writeHead(200);
            response.write("delete done");
            response.end();
        }
    })
    response.end();
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})