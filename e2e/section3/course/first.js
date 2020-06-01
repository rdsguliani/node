const fs = require('fs');




const http = require('http');
const server = http.createServer( (req, res) => {
    console.log(req.url, req.method);
    
    if (req.url === '/') {
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"/><button type="submit">submit</button></form></body>');
        return res.end();
    } 
    
    if (req.url === '/message' && req.method === 'POST') {
        const d = [];
        
        req.on('data', (chunk) => {
            console.log(chunk);
            d.push(chunk);
        }) 
        return req.on('end', () => {
            const data = Buffer.concat(d).toString();
            console.log(data);
            fs.writeFile('hello.txt', data, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                console.log('sebd');
                return res.end();
            });
        });
    }

    res.setHeader('content-type', 'text/html');
    res.end();

})
server.listen(3000);


// const server = http.