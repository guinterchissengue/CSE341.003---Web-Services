const mongodb = require('./connect');

const contacts = [
  {
    firstName: 'Ana',
    lastName: 'Machava',
    email: 'ana.machava@example.com',
    favoriteColor: 'Azul',
    birthday: '1998-04-12'
  },
  {
    firstName: 'Bruno',
    lastName: 'Sitoe',
    email: 'bruno.sitoe@example.com',
    favoriteColor: 'Verde',
    birthday: '1995-11-23'
  },
  {
    firstName: 'Carla',
    lastName: 'Nhantumbo',
    email: 'carla.nhantumbo@example.com',
    favoriteColor: 'Vermelho',
    birthday: '2000-07-05'
  }
];

mongodb.initDb((err) => {
  if (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }

  const db = mongodb.getDb();
  db.collection('contacts').insertMany(contacts)
    .then((result) => {
      console.log(`${result.insertedCount} contactos inseridos com sucesso.`);
      process.exit(0);
    })
    .catch((err) => {
      console.error('Erro ao inserir contactos:', err);
      process.exit(1);
    });
});