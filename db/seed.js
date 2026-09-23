const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const mongodb = require('./connect');

const contacts = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@test.com",
    favoriteColor: "Blue",
    birthday: "1990-01-01"
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@test.com",
    favoriteColor: "Red",
    birthday: "1992-02-02"
  },
  {
    firstName: "Sarah",
    lastName: "Smith",
    email: "sarahsmith@test.com",
    favoriteColor: "Yellow",
    birthday: "1995-05-05"
  }
];

mongodb.initDb((err) => {
  if (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  } else {
    mongodb.getDb().collection('contacts').insertMany(contacts)
      .then((result) => {
        console.log(`${result.insertedCount} contatos inseridos com sucesso!`);
        process.exit();
      })
      .catch((error) => {
        console.error('Erro ao inserir contatos:', error);
        process.exit(1);
      });
  }
});