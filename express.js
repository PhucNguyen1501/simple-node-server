const express = require('express');
const db = require('./models');
const User = require('./models/user');
const Document = require('./models/document');
const Signature = require('./models/signature');
const Field = require('./models/field');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Get all documents
app.get('/documents', async (req, res) => {
  const documents = await Document.findAll();
  res.json(documents);
});

// Get a document by ID
app.get('/documents/:id', async (req, res) => {
  const document = await Document.findByPk(req.params.id, {
    include: [Signature, Field]
  });
  if (document) {
    res.json(document);
  } else {
    res.status(404).json({ error: 'Document not found' });
  }
});

// Create a new document
app.post('/documents', async (req, res) => {
  const { title, filePath } = req.body;
  try {
    const newDocument = await Document.create({ title, filePath });
    res.status(201).json(newDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a signature to a document
app.post('/signatures', async (req, res) => {
  const { signature, dateSigned, UserId, DocumentId } = req.body;
  try {
    const newSignature = await Signature.create({ signature, dateSigned, UserId, DocumentId });
    res.status(201).json(newSignature);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
