CREATE TABLE `funding_details` (
	`funding_details_id`	INT(10) auto_increment NOT NULL PRIMARY KEY,
	`user_id`	INT(10)	NOT NULL,
	`funding_id`	INT(10)	NOT NULL,
	`amount`	BIGINT(1)	NOT NULL DEFAULT 0,
	`funding_at`	TimeStamp NOT NULL
);


ALTER TABLE `funding_details` ADD CONSTRAINT `FK_user_TO_funding_details_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `funding_details` ADD CONSTRAINT `FK_funding_TO_funding_details_1` FOREIGN KEY (
	`funding_id`
)
REFERENCES `funding` (
	`funding_id`
);