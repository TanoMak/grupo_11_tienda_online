-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sanmigue_entrecasa
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sanmigue_entrecasa
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sanmigue_entrecasa` DEFAULT CHARACTER SET latin1 ;
USE `sanmigue_entrecasa` ;

-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`category_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`category_product` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`colors` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`line_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`line_product` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_code` INT(11) NOT NULL,
  `product_name` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `price` INT(11) NOT NULL,
  `line_id` INT(100) UNSIGNED NOT NULL,
  `category_id` INT(100) UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `line_id_fk` USING BTREE (`line_id`) ,
  INDEX `category_id_fk` USING BTREE (`category_id`) ,
  INDEX `product_code` (`product_code` ASC) ,
  CONSTRAINT `category_id_fk`
    FOREIGN KEY (`category_id`)
    REFERENCES `sanmigue_entrecasa`.`category_product` (`id`),
  CONSTRAINT `line_id_fk`
    FOREIGN KEY (`line_id`)
    REFERENCES `sanmigue_entrecasa`.`line_product` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 603
DEFAULT CHARACTER SET = latin1
COMMENT = 'productos';


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`color_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`color_product` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `color_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id_idx` (`product_id` ASC) ,
  INDEX `color_id_idx` (`color_id` ASC) ,
  CONSTRAINT `color_id`
    FOREIGN KEY (`color_id`)
    REFERENCES `sanmigue_entrecasa`.`colors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `productfk`
    FOREIGN KEY (`product_id`)
    REFERENCES `sanmigue_entrecasa`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 55
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `prductid` (`product_id` ASC) ,
  CONSTRAINT `prductid`
    FOREIGN KEY (`product_id`)
    REFERENCES `sanmigue_entrecasa`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `profile_photo` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `password` VARCHAR(10) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `users_id` INT(11) NOT NULL,
  `subtotal` INT(11) NOT NULL,
  `delivery_cost` INT(11) NOT NULL,
  `total_order` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  INDEX `users` (`users_id` ASC) ,
  CONSTRAINT `users`
    FOREIGN KEY (`users_id`)
    REFERENCES `sanmigue_entrecasa`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`sizes` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`orders_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`orders_details` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `product_code` INT(11) NOT NULL,
  `item_color_id` INT(11) NOT NULL,
  `item_size_id` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  INDEX `order_id` (`order_id` ASC, `product_code` ASC, `item_color_id` ASC, `item_size_id` ASC, `user_id` ASC) ,
  INDEX `item_color_idFK` (`item_color_id` ASC) ,
  INDEX `item_size_idFK` (`item_size_id` ASC) ,
  INDEX `product_code` (`product_code` ASC) ,
  INDEX `usersfk` (`user_id` ASC) ,
  CONSTRAINT `item_color_idFK`
    FOREIGN KEY (`item_color_id`)
    REFERENCES `sanmigue_entrecasa`.`colors` (`id`),
  CONSTRAINT `item_size_idFK`
    FOREIGN KEY (`item_size_id`)
    REFERENCES `sanmigue_entrecasa`.`sizes` (`id`),
  CONSTRAINT `order`
    FOREIGN KEY (`order_id`)
    REFERENCES `sanmigue_entrecasa`.`orders` (`id`),
  CONSTRAINT `product_code`
    FOREIGN KEY (`product_code`)
    REFERENCES `sanmigue_entrecasa`.`products` (`product_code`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `usersfk`
    FOREIGN KEY (`user_id`)
    REFERENCES `sanmigue_entrecasa`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sanmigue_entrecasa`.`product_size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sanmigue_entrecasa`.`product_size` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `size_id` INT(11) NULL DEFAULT NULL,
  `product_id` INT(11) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `size_id_idx` (`size_id` ASC) ,
  INDEX `product_id_idx` (`product_id` ASC) ,
  CONSTRAINT `prducts`
    FOREIGN KEY (`product_id`)
    REFERENCES `sanmigue_entrecasa`.`products` (`id`),
  CONSTRAINT `size_id`
    FOREIGN KEY (`size_id`)
    REFERENCES `sanmigue_entrecasa`.`sizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
