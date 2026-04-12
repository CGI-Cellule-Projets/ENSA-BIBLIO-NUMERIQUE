CREATE DATABASE IF NOT EXISTS ensa_biblio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ensa_biblio;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    type ENUM('course', 'td', 'tp', 'exam') NOT NULL,
    fichier_url VARCHAR(500) NOT NULL,
    uploade_par INT NOT NULL,
    statut ENUM('en_attente', 'approuve', 'refuse') DEFAULT 'en_attente',
    date_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploade_par) REFERENCES users(id)
);

CREATE TABLE downloads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    resource_id INT NOT NULL,
    date_download TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (resource_id) REFERENCES resources(id)
);