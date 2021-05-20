CREATE DATABASE  IF NOT EXISTS `csc317db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `csc317db`;
-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `postID` varchar(255) NOT NULL,
  `authorID` varchar(255) DEFAULT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `postID` (`postID`),
  KEY `authorID` (`authorID`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `post` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`authorID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES ('dPyLA13pax35QtEBS3FVd','Forget $1, he\'s taking us to $100!','a2vRU79F_4y5oIDjpOovA','f169ffbf-8ba1-41a8-9170-590ea03f564c',NULL,0,'2021-05-18 22:15:22'),('h7PiNsBI5exvRCqGRdEp8','Huh, I commented on my own post','sNqwDEYOqLYBvVPRv0bXQ','195816c8-f1ee-40b9-b39e-4b6221691fe6',NULL,0,'2021-05-18 22:20:23'),('hum8Kx0C6pGhp69J-NF3F','Forget mars, we\'re going farther!','sNqwDEYOqLYBvVPRv0bXQ','195816c8-f1ee-40b9-b39e-4b6221691fe6',NULL,0,'2021-05-18 22:20:07'),('VHRHpIfN4HFoCSFJrgcrT','I\'m with you, HODL forever!','dN6x23NRZ5pMsmEYS4-iN','195816c8-f1ee-40b9-b39e-4b6221691fe6',NULL,0,'2021-05-18 22:19:47');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES ('5TekXyvNwPi5budVTJoVH','f169ffbf-8ba1-41a8-9170-590ea03f564c','The meme that started it all','What a classic','upload/f8ad7f40-b826-11eb-8a33-cfc53218817a','2021-05-18 22:18:28'),('a2vRU79F_4y5oIDjpOovA','195816c8-f1ee-40b9-b39e-4b6221691fe6','All hail the Dogefather','Elon will get us to $1','upload/af182260-b824-11eb-8a33-cfc53218817a','2021-05-18 22:02:06'),('dN6x23NRZ5pMsmEYS4-iN','f169ffbf-8ba1-41a8-9170-590ea03f564c','HODL','Dont be sutpid, HODL! ','upload/9befe3b0-b826-11eb-8a33-cfc53218817a','2021-05-18 22:15:52'),('sNqwDEYOqLYBvVPRv0bXQ','195816c8-f1ee-40b9-b39e-4b6221691fe6','Musk will take us to mars','He is the chosen one','upload/13a010d0-b825-11eb-8a33-cfc53218817a','2021-05-18 22:04:54'),('wgflTwwG4MSeyNIVZ1juZ','195816c8-f1ee-40b9-b39e-4b6221691fe6','I love doge!','Doge is the best dog','upload/88cea6b0-b824-11eb-8a33-cfc53218817a','2021-05-18 22:01:01');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('195816c8-f1ee-40b9-b39e-4b6221691fe6','erick123','erick@gmail.com','1e9021296d8e80dc46c5addc615da4ead2d189c4907b2f61b5c04af4267ff352211fb632cc57d0bf51870181bbf20a69340306e7a5b5d7164da106b9814f7e86','2021-05-18 21:56:38','69fb7039f47d8d657ce10a9c154f40ce'),('f169ffbf-8ba1-41a8-9170-590ea03f564c','dogel0rd','dogelord@gmail.com','7af0c0da44c571324baecc41691f12e17176775b0b555c2694ec643de69c88025fb5c63b836a85e0a0eb2a1a5486ba9fa664fb78cc5be4318592022f48b37a6d','2021-05-18 22:14:56','78046a40019b666116c8134e596e765f');