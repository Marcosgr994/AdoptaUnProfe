create or replace database adoptaunprofe;

use adoptaunprofe;

create table profesores (
	id		INT(10) AUTO_INCREMENT primary key,
    nombre	varchar(15),
    materia	varchar(20)
);

insert INTO profesores (nombre, materia) 
values 
('Jaimito', 'Matemáticas'),
('Paquito', 'Química'), 
('Unai', 'Lengua Castellana');

ALTER TABLE `profesores` ADD `apellidos` VARCHAR(30) NOT NULL AFTER `nombre`;

ALTER TABLE `profesores` ADD `rangos`VARCHAR(40) not NULL AFTER `materia`;

ALTER TABLE `profesores` ADD `descripcion` VARCHAR(200);

ALTER TABLE `profesores`ADD `contrasena` VARCHAR(40);

CREATE USER 'AUP'@'localhost' IDENTIFIED BY 'Abrete01';
GRANT ALL PRIVILEGES ON adoptaunprofe.* TO 'AUP'@'localhost';
FLUSH PRIVILEGES;