-- Archivo: init.sql

CREATE DATABASE IF NOT EXISTS sistema_web_db;
USE sistema_web_db;

-- Tabla de estados (debe ir primero: usuarios depende de ella)
CREATE TABLE estados_usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO estados_usuario (descripcion)
VALUES ('Activo'), ('Inactivo');

-- Tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  estado_id INT NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (estado_id) REFERENCES estados_usuario(id)
);

-- Tabla de publicaciones
CREATE TABLE publicaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  contenido TEXT NOT NULL,
  autor_id INT NOT NULL,
  FOREIGN KEY (autor_id) REFERENCES usuarios(id)
);