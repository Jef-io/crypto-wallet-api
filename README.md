# Crypto wallet api

Ce projet Express est la partie back end de [Crypto wallet app](https://github.com/Jef-io/crypto-wallet-app).

## Utiliser l'application

Pour que l'api fonctionne, il faut qu'une base de données MySQL soit en fonctionnement.
Vous trouverez un script sql permettant d'initialiser cette dernière.

### `npm install`

Installe toutes les dépendances pour l'application

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