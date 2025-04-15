-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dbapi
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dbapi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbapi` DEFAULT CHARACTER SET utf8 ;
USE `dbapi` ;

-- -----------------------------------------------------
-- Table `dbapi`.`Pessoas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbapi`.`Pessoas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `idade` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SELECT * FROM Pessoas;

INSERT INTO Pessoas (nome, idade) VALUES ("João", 37);
INSERT INTO Pessoas (nome, idade) VALUES ("Marcos", 83);
INSERT INTO Pessoas (nome, idade) VALUES ("Claudia", 45);
INSERT INTO Pessoas (nome, idade) VALUES ("Eliza", 23);
INSERT INTO Pessoas (nome, idade) VALUES ("Lola", 19);