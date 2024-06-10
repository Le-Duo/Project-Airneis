# Airneis-project submodules

# Mettre à jour les sous-modules dans le  dépôt principal

Pour mettre à jour les sous-modules `services`, `webapp`, et `mobile` avec les derniers changements sur leurs branches `develop` ou `react-native-test` dans le cas de mobile, suivez ces étapes :

## Prérequis

- Se placer dans le dépôt principal

`cd Airneis-project`

- Executer ces commandes

`git submodule update --remote services`
`git submodule update --remote webapp`
`git submodule update --remote mobile`


- Commit les changements suite à la mise à jour

`git add services webapp mobile`
`git commit -m "Mise à jour des sous-modules services, webapp, et mobile"`
`git push`