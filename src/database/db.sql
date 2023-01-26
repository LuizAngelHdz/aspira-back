
CREATE DATABASE toys;

USE toys

CREATE TABLE products(
  id INT(6) UNSIGNED  AUTO_INCREMENT  PRIMARY   KEY,
  name VARCHAR(50) NULL,
  description VARCHAR(100),
  minAge INT(2),
  enterprise VARCHAR(50) NULL,
  price DECIMAL(5, 2)
);


SHOW TABLES;

DESCRIBE toys