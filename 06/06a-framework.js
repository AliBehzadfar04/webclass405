import {createServer} from "http";
function framework() {
    let controllers = []
    return {
        get: (path, func) => {
            controllers.push({name: path, func: func});
        },
        listen: (port, callback) => {
            function serverCallback(req, res) {
                let success = false;
                let data = ""
                req.on("data", (chunk) => {
                    data += chunk;
                })
                req.on("end", () => {
                    try {
                        req.data = JSON.parse(data);
                    } catch(err) {
                        req.data = data
                    }
                    for(const controller of controllers)
                        if (req.url.startsWith('/'+controller.name)) {
                            controller.func(req, res);
                            success = true;
                            break;
                        }
                    if (!success) {
                        res.writeHead(404);
                        res.write("No such controller found.");
                        res.end();
                    }

                })
            }
            let server = createServer(serverCallback);
            server.listen(port, callback);
        }
    }
}
export default framework;