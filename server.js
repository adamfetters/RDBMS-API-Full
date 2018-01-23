const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./database/db.js');

const server = express();

server.use(bodyParser.json());

server.post('/api/users', (req, res) => {
  const user = req.body;
  knex
    .insert(user)
    .into('users')
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/users', (req, res) => {
  const users = knex('users')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Could not get the Users' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const users = knex('users')
    .where({ id })
    .then(records => {
      res.status(200).json(records);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Could not get the User' });
    });
});

server.get('/api/users/:id/posts', (req, res) => {
  const { id } = req.params;

  const posts = knex('posts')
    .where('userId', id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Could not get the User' });
    });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  knex('users')
    .where({ id })
    .update(user)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  knex('users')
    .where({ id })
    .del()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

server.post('/api/posts', (req, res) => {
  const post = req.body;
  knex
    .insert(post)
    .into('posts')
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get('/api/posts', (req, res) => {
  const posts = knex('posts')
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  knex('posts')
    .where({ id })
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.json(err);
    });
});

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;

  knex('posts')
    .where({ id })
    .update(post)
    .then(post => {
      res.status(post);
    })
    .catch(err => {
      res.json(err);
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  knex('posts')
    .where({ id })
    .del()
    .then(deletedId => {
      res.json(deletedId);
    })
    .catch(err => {
      res.json({ errorMessage: err.message });
    });
});

server.post('/api/tags', (req, res) => {
  const tag = req.body;
  knex
    .insert(tag)
    .into('tags')
    .then(addedTag => {
      res.json(addedTag);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get('/api/tags', (req, res) => {
  knex('tags')
    .then(tags => {
      res.json(tags);
    })
    .catch(err => {
      res.json(err);
    });
});

server.get('/api/tags/:id', (req, res) => {
  const { id } = req.params;

  knex('tags')
    .where({ id })
    .then(tag => {
      res.json(tag);
    })
    .catch(err => {
      res.json(err);
    });
});

server.put('/api/tags/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;

  knex('tags')
    .where({ id })
    .update(tag)
    .then(newTag => {
      res.json(newTag);
    })
    .catch(err => {
      res.json(err);
    });
});

server.delete('/api/tags/:id', (req, res) => {
  const { id } = req.params;
  knex('tags')
    .where({ id })
    .del()
    .then(() => {
      res.json({ message: 'Tag Deleted' });
    })
    .catch(err => {
      res.json(err);
    });
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
