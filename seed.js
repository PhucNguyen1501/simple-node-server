const db = require('./models');
const User = require('./models/user');
const Document = require('./models/document');
const Signature = require('./models/signature');
const Field = require('./models/field');

const seed = async () => {
  await db.sequelize.sync({ force: true });

  const user1 = await User.create({ name: 'John Doe', email: 'john@example.com' });
  const user2 = await User.create({ name: 'Jane Doe', email: 'jane@example.com' });

  const document = await Document.create({ title: 'Sample Document', filePath: 'path/to/sample.pdf' });

  await Signature.create({ signature: 'John Doe Signature', dateSigned: new Date(), UserId: user1.id, DocumentId: document.id });
  await Signature.create({ signature: 'Jane Doe Signature', dateSigned: new Date(), UserId: user2.id, DocumentId: document.id });

  await Field.create({ fieldName: 'Signature Field', value: 'John Doe Signature', DocumentId: document.id });
  await Field.create({ fieldName: 'Date Field', value: new Date().toISOString(), DocumentId: document.id });

  console.log('Database synced and data seeded');
};

seed();
