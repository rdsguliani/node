

const http = require('http');

const server = http.createServer( (req, res) => {
    // console.log(req);

    const url = req.url;

    if(url === '/') {
        res.write(`<h1> Welcome to First Node server !!!!'
                    <form action='/createUser' method='POST'>
                    <input type='text' name='newUser' />
                    <button type='submit'> add New user </button>
                </form>`);
        return res.end();
    }
    if(url === '/users') {
        res.write(`<body><ul> <li> raman </li> <li> nitin </li></ul>
       
        </body>`);
        return res.end();
    }
    if (url === '/createUser' && req.method === 'POST') {
        var a = [];
        req.on('data', (chunk) => {
            a.push(chunk);
        })
        return req.on('end', () => {
            const user = Buffer.concat(a).toString().split('=')[1];
        //   console.log(user);
        res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        });
    }

    return res.end();

});

server.listen(3000, () => {
    console.log('started on port 3000');
});