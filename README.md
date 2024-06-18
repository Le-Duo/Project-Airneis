# Airneis - Configuration pour démonstration

Installez mongodb Community Server avec MongoDB Compass (inclus dans l'installateur) 
* https://www.mongodb.com/try/download/community

Installez le module mongodb avec `npm install mongodb`.

Placez vous à la racine de ce projet et executez le script `import_data_demo.js` avec la commande `node import_data_demo.js`

Vérifiez que les données sont bien intégrées avec MongoDB Compass

Connexion de démonstration admin:
* user: admin@exemple.com
* password: password

# Airneis-project submodules

# Mettre à jour les sous-modules dans le  dépôt principal

Pour mettre à jour les sous-modules `services`, `webapp`, et `AirneisMobileApp` avec les derniers changements sur leurs branches `develop` ou `react-native-test` dans le cas de mobile, suivez ces étapes :

## Prérequis

### Se placer dans le dépôt principal

* `cd Project-Airneis`

### Executer ces commandes

* `git submodule update --remote services`
* `git submodule update --remote webapp`
* `git submodule update --remote AirneisMobileApp`

### Commit les changements suite à la mise à jour

* `git add services webapp AirneisMobileApp`
* `git commit -m "Mise à jour des sous-modules services, webapp, et AirneisMobileApp"`
* `git push`
