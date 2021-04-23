-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 23 avr. 2021 à 12:11
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `rtai_crypto_wallet`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `username` varchar(50) NOT NULL,
  `crypto_id` varchar(50) NOT NULL,
  `ammount` double NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `value` double NOT NULL,
  PRIMARY KEY (`username`,`crypto_id`,`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cache`
--

INSERT INTO `cache` (`username`, `crypto_id`, `ammount`, `date`, `value`) VALUES
('admin', 'bitcoin', 7, '2021-04-19 15:23:47', 321041),
('admin', 'ethereum', 10, '2021-04-19 15:23:00', 16892),
('admin', 'bitcoin', 3, '2021-04-19 15:16:36', 137921),
('admin', 'bitcoin', 8, '2021-04-19 15:17:54', 366881),
('admin', 'ethereum', 150, '2021-04-19 15:13:04', 266436),
('admin', 'bitcoin', 4, '2021-04-19 15:09:18', 183866),
('admin', 'bitcoin', 3, '2021-04-19 15:09:02', 137928),
('admin', 'bitcoin', 6, '2021-04-19 15:08:54', 275856),
('admin', 'bitcoin', 1, '2021-04-19 15:08:40', 45976),
('admin', 'ethereum', 65, '2021-04-19 15:23:52', 114927),
('admin', 'dogecoin', 100000, '2021-04-19 15:33:32', 29570),
('admin', 'ethereum', 55, '2021-04-19 15:33:56', 97113),
('admin', 'dogecoin', 90000, '2021-04-19 15:36:21', 26510),
('admin', 'sushi', 300, '2021-04-19 16:09:00', 3054),
('admin', 'dogecoin', 190000, '2021-04-19 16:10:39', 58210),
('admin', 'bitcoin', 2, '2021-04-19 22:13:12', 87516),
('admin', 'bitcoin', 12, '2021-04-19 22:16:26', 553636),
('admin', 'ethereum', 5, '2021-04-19 22:46:50', 5397),
('admin', 'bitcoin', 15, '2021-04-19 23:44:08', 692653),
('admin', 'dogecoin', 100000, '2021-04-19 23:44:41', 27761),
('admin', 'sushi', 10300, '2021-04-19 23:55:34', 104854),
('admin', 'bitcoin', 13, '2021-04-20 10:44:05', 599193),
('admin', 'ethereum', 0, '2021-04-20 10:48:29', -3676),
('admin', 'ethereum', 200, '2021-04-20 10:49:29', 359246),
('admin', 'bitcoin', 18, '2021-04-23 11:53:51', 807603),
('admin', 'ethereum', 150, '2021-04-23 12:01:40', 263810);

-- --------------------------------------------------------

--
-- Structure de la table `followed_cryptos`
--

DROP TABLE IF EXISTS `followed_cryptos`;
CREATE TABLE IF NOT EXISTS `followed_cryptos` (
  `username` varchar(50) NOT NULL,
  `crypto_id` varchar(50) NOT NULL,
  PRIMARY KEY (`username`,`crypto_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `followed_cryptos`
--

INSERT INTO `followed_cryptos` (`username`, `crypto_id`) VALUES
('admin', 'bitcoin'),
('admin', 'dogecoin'),
('admin', 'ethereum'),
('admin', 'sushi');

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `username` varchar(50) NOT NULL,
  `crypto_id` varchar(50) NOT NULL,
  `type` enum('buy','sell') NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ammount` double NOT NULL,
  `value` double NOT NULL,
  PRIMARY KEY (`username`,`crypto_id`,`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`username`, `crypto_id`, `type`, `date`, `ammount`, `value`) VALUES
('admin', 'ethereum', 'sell', '2021-04-19 15:23:00', 140, 249544.4),
('admin', 'bitcoin', 'buy', '2021-04-19 15:17:54', 5, 228960),
('admin', 'ethereum', 'buy', '2021-04-19 15:13:04', 150, 266436),
('admin', 'bitcoin', 'sell', '2021-04-19 15:16:36', 1, 45945),
('admin', 'bitcoin', 'buy', '2021-04-19 15:09:18', 1, 45938),
('admin', 'bitcoin', 'sell', '2021-04-19 15:09:02', 3, 137928),
('admin', 'bitcoin', 'buy', '2021-04-19 15:08:54', 5, 229880),
('admin', 'bitcoin', 'buy', '2021-04-19 15:08:40', 1, 45976),
('admin', 'bitcoin', 'sell', '2021-04-19 15:23:47', 1, 45840),
('admin', 'ethereum', 'buy', '2021-04-19 15:23:52', 55, 98035.3),
('admin', 'dogecoin', 'buy', '2021-04-19 15:33:32', 100000, 29570.7),
('admin', 'ethereum', 'sell', '2021-04-19 15:33:56', 10, 17814.5),
('admin', 'dogecoin', 'sell', '2021-04-19 15:36:21', 10000, 3060.08),
('admin', 'sushi', 'buy', '2021-04-19 16:09:00', 300, 3054),
('admin', 'dogecoin', 'buy', '2021-04-19 16:10:39', 100000, 31700.1),
('admin', 'bitcoin', 'sell', '2021-04-19 22:13:12', 5, 233525),
('admin', 'bitcoin', 'buy', '2021-04-19 22:16:26', 10, 466120),
('admin', 'ethereum', 'sell', '2021-04-19 22:46:50', 50, 91716),
('admin', 'bitcoin', 'buy', '2021-04-19 23:44:08', 3, 139017),
('admin', 'dogecoin', 'sell', '2021-04-19 23:44:41', 90000, 30449.97),
('admin', 'sushi', 'buy', '2021-04-19 23:55:34', 10000, 101800),
('admin', 'bitcoin', 'sell', '2021-04-20 10:44:05', 2, 93460),
('admin', 'ethereum', 'sell', '2021-04-20 10:48:29', 5, 9073.05),
('admin', 'ethereum', 'buy', '2021-04-20 10:49:29', 200, 362922),
('admin', 'bitcoin', 'buy', '2021-04-23 11:53:51', 5, 208410),
('admin', 'ethereum', 'sell', '2021-04-23 12:01:40', 50, 95436.5);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`username`, `password`) VALUES
('admin', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
