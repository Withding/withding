CREATE TABLE `article` (
	`article_id` INT(10) auto_increment NOT NULL PRIMARY KEY,
	`image` VARCHAR(100) NOT NULL DEFAULT 'default.png',
	`article_name` VARCHAR(100) NOT NULL,
	`comment` VARCHAR(100) NOT NULL,
	`price` INT(10) NOT NULL,
	`shipping` INT(10) NOT NULL DEFAULT 0,
	`start_send` TimeStamp NULL,
	`inventory` INT(2) NOT NULL DEFAULT 0
);

ALTER TABLE `article` ADD CONSTRAINT `FK_article_image_TO_article_1` FOREIGN KEY (
	`image`
)
REFERENCES `article_image` (
	`image`
);
