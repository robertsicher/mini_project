const fs = require("fs")
const http = require("http")
const port = 3000

const handleRequest = (request,response) => {
    switch(request.url){
        case '/':
            response.end('<html><h1>Hello and welcome<h1/></html>');
          break;
        case '/pageone':
            writeHTMLPage('pageone.html', res) ;
          break;
        case '/pagetwo': 
            writeHTMLPage('pagetwo.html', res) ;
          break;
        case '/pagethree':
            writeHTMLPage('pagethree.html', res) ;
          break;
    }
}
function writeHTMLPage(pagename, res){
    fs.readFile(`${pagename}`, function(err, data){
        if (err) {console.log('error reading pageone', err)}
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    })
}


const server = http.createServer(handleRequest)
server.listen(port, () => {
    console.log("I am listening on port",port)
})