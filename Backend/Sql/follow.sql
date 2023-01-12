CREATE TABLE `follow` (
	`follow_id` INT(10) auto_increment NOT NULL PRIMARY KEY,
	`user_id` INT(10) NOT NULL,
	`follower` INT(10) NOT NULL
);

ALTER TABLE `follow` ADD CONSTRAINT `FK_user_TO_follow_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);