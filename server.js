const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

const port = 5000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
