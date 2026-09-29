// Some networks fail to resolve MongoDB Atlas SRV records, so public DNS servers are set
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const mongodb = require('./connect');

// At least five contacts are required by the assignment rubric
const contacts = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@test.com',
    favoriteColor: 'Blue',
    birthday: '1990-01-01'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@test.com',
    favoriteColor: 'Red',
    birthday: '1992-02-02'
  },
  {
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarahsmith@test.com',
    favoriteColor: 'Yellow',
    birthday: '1995-05-05'
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michaeljohnson@test.com',
    favoriteColor: 'Green',
    birthday: '1988-08-15'
  },
  {
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emilybrown@test.com',
    favoriteColor: 'Purple',
    birthday: '1998-11-23'
  }
];

mongodb.initDb(async (err, db) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }

  try {
    // Upsert by email so running the seed several times never creates duplicates
    const operations = contacts.map((contact) => ({
      updateOne: {
        filter: { email: contact.email },
        update: { $setOnInsert: contact },
        upsert: true
      }
    }));

    const result = await db.collection('contacts').bulkWrite(operations);
    console.log(`Seed finished: ${result.upsertedCount} new contact(s) inserted.`);
    process.exit(0);
  } catch (error) {
    console.error('Error inserting contacts:', error);
    process.exit(1);
  }
});
