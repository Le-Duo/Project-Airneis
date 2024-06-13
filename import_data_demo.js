const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// URL de connexion à la base de données MongoDB locale
const url = 'mongodb://localhost:27017';

// Nom de la base de données
const dbName = 'Airneis';

// Nom du répertoire contenant les fichiers JSON
const directoryPath = path.join(__dirname, 'dataDbDemo');

// Fonction pour importer les fichiers JSON dans MongoDB
async function importJsonFiles(directoryPath, dbName) {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connexion à MongoDB réussie.');

    const db = client.db(dbName);

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error('Erreur lors de la lecture du répertoire:', err);
        return;
      }

      files.forEach(file => {
        const filePath = path.join(directoryPath, file);

        fs.readFile(filePath, 'utf8', async (err, data) => {
          if (err) {
            console.error('Erreur lors de la lecture du fichier:', err);
            return;
          }

          try {
            const jsonData = JSON.parse(data);
            const collectionName = path.basename(file, path.extname(file));
            const collection = db.collection(collectionName);

            if (Array.isArray(jsonData)) {
              await collection.insertMany(jsonData);
            } else {
              await collection.insertOne(jsonData);
            }

            console.log(`Données importées dans la collection "${collectionName}" avec succès.`);
          } catch (err) {
            console.error('Erreur lors de l\'insertion des données:', err);
          }
        });
      });
    });
  } catch (err) {
    console.error('Erreur lors de la connexion à MongoDB:', err);
  } finally {
    await client.close();
  }
}

// Exécuter la fonction pour importer les fichiers JSON
importJsonFiles(directoryPath, dbName);