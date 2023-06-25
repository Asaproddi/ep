const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/search' && req.method === 'POST') {
    let requestBody = '';
    req.on('data', chunk => {
      requestBody += chunk.toString();
    });
    req.on('end', () => {
      const keyword = JSON.parse(requestBody).keyword;
      const dictionary = {
        'videohosting': ['https://www.youtube.com/', 'https://hd.kinopoisk.ru'],
        'shoes': ['https://images-eu.ssl-images-amazon.com/images/I/41jJSQgKcWL._UL1000_.jpg', 'https://mannenstyle.nl/wp-content/uploads/off-white-out-of-office-sneaker-for-walking-white-black-gum-virgil-abloh-fall-winter-2020-1.jpg']
      };
      const urls = dictionary[keyword] || [];

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(urls));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
