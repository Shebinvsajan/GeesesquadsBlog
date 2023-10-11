const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


const db = require('./db')
const bodyParser = require('body-parser');
const userRoutes = require('./Route/UserRouter');
const LoginRoutes = require('./Route/LoginRouter');
const BlogPostRoutes = require('./Route/BlogPostRoute');
const BlogAllRoutes = require('./Route/BlogAllRoute');
const BlogSingleRoutes = require('./Route/BlogSingleRoute');


// Middleware
app.use(cors({origin: '*'}))
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/user', userRoutes);
app.use('/api/user', LoginRoutes);
app.use('/api/blog', BlogPostRoutes);
app.use('/api/blog', BlogAllRoutes);
app.use('/api/blog', BlogSingleRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
