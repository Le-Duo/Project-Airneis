const fs = require('fs');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

// URL de connexion à la base de données MongoDB locale
const url = 'mongodb://localhost:27017';

// Nom de la base de données
const dbName = 'Airneis';

// Nom du répertoire contenant les fichiers JSON
const directoryPath = path.join(__dirname, 'dataDbDemo');

// Fonction pour convertir les champs spéciaux MongoDB
function convertSpecialFields(obj) {
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      if (obj[key].$oid) {
        obj[key] = new ObjectId(obj[key].$oid);
      } else if (obj[key].$date) {
        obj[key] = new Date(obj[key].$date);
      } else {
        convertSpecialFields(obj[key]);
      }
    }
  }
  return obj;
}

// Fonction pour importer les fichiers JSON dans MongoDB
async function importJsonFiles(directoryPath, dbName) {
  const client = new MongoClient(url, { useUnifiedTopology: true });

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
            let jsonData = JSON.parse(data);
            if (Array.isArray(jsonData)) {
              jsonData = jsonData.map(convertSpecialFields);
              await db.collection(path.basename(file, path.extname(file))).insertMany(jsonData);
            } else {
              jsonData = convertSpecialFields(jsonData);
              await db.collection(path.basename(file, path.extname(file))).insertOne(jsonData);
            }

            console.log(`Données importées dans la collection "${path.basename(file, path.extname(file))}" avec succès.`);
          } catch (err) {
            console.error('Erreur lors de l\'insertion des données:', err);
          }
        });
      });
    });
  } catch (err) {
    console.error('Erreur lors de la connexion à MongoDB:', err);
  } finally {
    if (client.isConnected) {
      await client.close();
      console.log('Connexion à MongoDB fermée.');
    } else {
      console.log('MongoDB client n\'est pas connecté.');
    }
  }
}

// Exécuter la fonction pour importer les fichiers JSON
importJsonFiles(directoryPath, dbName);