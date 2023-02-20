CREATE TABLE `point_ history` (
	`point_history_id` INT(10) auto_increment NOT NULL PRIMARY KEY,
	`user_id` INT(10) NOT NULL,
	`point` BIGINT(1) NOT NULL,
	`at_time` TimeStamp NOT NULL,
	`type_code` TINYINT(1) NOT NULL,
	`source` VARCHAR(50) NOT NULL
);

ALTER TABLE `point_ history` ADD CONSTRAINT `FK_user_TO_point_ history_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `point_ history` ADD CONSTRAINT `FK_point_type_TO_point_ history_1` FOREIGN KEY (
	`type_code`
)
REFERENCES `point_type` (
	`type_code`
);