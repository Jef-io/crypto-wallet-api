# Crypto wallet api

Ce répertoire est la partie back-end en Express de l'application REACT [Crypto wallet app](https://github.com/Jef-io/crypto-wallet-app).

## Installer l'API

Pour que l'api fonctionne, il faut qu'une base de données MySQL soit en fonctionnement.
Pour cela, via un service tel que WAMP créez une nouvelle base de données. Pour plus de simplicité, nommez la 'rtai_crypto_wallet'. Une fois la base créée, importez le script sql permettant d'initialiser cette dernière. Si vous avez choisi un nom différent pour la base de données, modifiez le fichier src>services>database.js. Ligne 7, changer le nom de la base de données pour le votre.

Une fois la base de données installée, vous pouvez lancer la commande suivante :

### `npm install`

Installe toutes les dépendances pour l'application

## Démarrer l'API

Pour lancer l'API, faite la commande suivante :

### `npm start`

Démarre l'application en mode développement.\
Ecoute les requêtes sur le port 3001.

## Fonctionnement

Crypto Wallet api permet de gérer les requêtes de crypto wallet app.
Dans cette version il n'y a pas d'authentification par jwt.

Cette API a 4 points d'entrée : cache, coins, follow, transaction.

- cache permet de gérer les montants des cryptos au fil du temps, stockées dans le cache.
- coins permet de recevoir des informations sur les 100 cryptos les plus répandues.
- follow permet de gérer les cryptos suivies
- transactions permet d'acheter, vendre des cryptos ou voir l'historique.

Pour avoir toutes ces informations, Crypto Wallet Api utilise l'api de coinGecko, qui est gratuite mais on ne peut pas dépasser 100 requêtes par minute.
