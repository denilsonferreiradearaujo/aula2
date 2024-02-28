create database db_clientes;

use db_clientes;

desc clientes;

SELECT * FROM clientes;

CREATE TABLE clientes (
id INT NOT NULL AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
idade int not null,
PRIMARY KEY (id));

insert into clientes (nome, idade) value('Denilson', 36)
