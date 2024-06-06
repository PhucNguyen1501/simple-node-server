const db = require('./models');
const User = require('./models/user');

const seed = async () => {
  await db.sequelize.sync({ force: true });

  await User.create({ name: 'John Doe', email: 'john@example.com' });
  await User.create({ name: 'Jane Doe', email: 'jane@example.com' });

  console.log('Database synced and data seeded');
};

seed();
