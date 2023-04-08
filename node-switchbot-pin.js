const { exec } = require("child_process");
const fs = require('fs');

/* CONFIGURATION SECTION START - CHANGE ACCORDING TO YOUR NEEDS */
const http = require('http');
const hostname = '';
const port = 3008;
const presscode = 1234;
const switchbotmac = "11:11:11:11:11:11";
const switchbotcmd = "press";
const switchbotcommand = "sudo python switchbot_py3.py --device " + switchbotmac + " -c " + switchbotcmd;
/* CONFIGURATION SECTION END - CHANGE ACCORDING TO YOUR NEEDS */

/* SERVES A FILE FROM THE webassets FOLDER */
function createResponse(url, response) {

  let startindex = url.indexOf(".");
  let endindex = url.indexOf("?") !== -1 ? url.indexOf("?") : url.length;
  let fileEnding = url.substring(startindex, endindex);
  let filename = url.substring(0, endindex);

  let fileMappings = {
    ".js": {m: "application/javascript", e: 'utf8'},
    ".png": {m: "image/png", e: null},
    ".ico": {m: "image/x-icon", e: null},
    ".json": {m: "application/json", e: 'utf8'},
    ".html": {m: "text/html", e: 'utf8'}
  };
  if(fileMappings[fileEnding] === undefined){
    response.statusCode = 500;
    response.end();
  } else {
    response.statusCode = 200;
    response.setHeader("Content-Type", fileMappings[fileEnding].m);
    let file = fs.readFileSync("./webassets" + filename, fileMappings[fileEnding].e);
    response.end(file);
  }
  
}

/* RUNS THE SERVER DEFINITION */
async function run() {

  const server = http.createServer();

  server.on('request', (request, response) => {
    //console.log(request.url);

    //serve root
    if (request.url === "/") {
      createResponse("/index.html", response);
      return;
    }
    //serving a file
    if (request.url.indexOf(".") !== -1) {
      createResponse(request.url, response);
      return;
    }

    if (request.url.indexOf("presscode=") !== -1) {
      if (request.url === ("/presscode=" + presscode)) {
        console.log("correct code");
        exec(switchbotcommand, (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });

      } else {
        console.log("wrong code");
      }
      return;
    }

  });

  server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

}

/* RUNS THE SERVER CALL */
run();