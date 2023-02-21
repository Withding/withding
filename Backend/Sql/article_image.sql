CREATE TABLE `article_image` (
	`image` VARCHAR(100) NOT NULL PRIMARY KEY,
	`origin_image` VARCHAR(100) NOT NULL
);

INSERT INTO `article_image` VALUES('default.png', 'default.png');