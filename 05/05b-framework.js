
import { createServer } from 'node:http';

export default function framework() {
    let controllers = [];

    let app = {
        get: function(path, func) {
            controllers.push({
                name: path,
                func: func
            });
        },

        listen: function(port, userCallback) {

            function serverCallback(request, response) {

                console.log("------------------------");
                console.log("url: ", request.url);

                let data = "";

                request
                    .on("data", function(chunk) {
                        data += chunk;
                    })
                    .on("end", function() {

                        request.data = data;

                        console.log("Received data:", request.data);

                        let found = false;

                        for (let item of controllers) {

                            if (request.url.startsWith('/' + item.name)) {
                                found = true;
                                item.func(request, response);
                                break;
                            }
                        }

                        if (!found) {
                            response.writeHead(404);
                            response.end("path not found");
                        }

                    });
            }

            let server = createServer(serverCallback);
            server.listen(port, userCallback);
        }
    };

    return app;
}