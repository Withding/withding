CREATE TABLE `emailauth` (
	`emailauth_id` INT(5) auto_increment NOT NULL PRIMARY KEY,
	`email` VARCHAR(100) NOT NULL,
	`code` VARCHAR(50) NOT NULL,
	`deadline` TimeStamp NOT NULL
);