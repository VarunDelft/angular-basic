// server.js

const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom POST /login route
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db; // lowdb instance
  const user = db.get('users').find({ email, password }).value();

  if (user) {
    res.status(200).json({ success: true, username: user.username });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Fallback to default routes (like /users)
server.use(router);

server.listen(3000, () => {
  console.log('🚀 JSON Server running at http://localhost:3000');
});
