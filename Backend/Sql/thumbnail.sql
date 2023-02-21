CREATE TABLE `thumbnail` (
	`image` VARCHAR(100) NOT NULL PRIMARY KEY,
	`origin_image` VARCHAR(100) NOT NULL
);

INSERT INTO `thumbnail` VALUES('default.jpeg', 'default.jpeg');