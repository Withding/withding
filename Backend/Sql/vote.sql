CREATE TABLE `vote` (
	`user_id`	INT(10)	NOT NULL,
	`funding_id`	INT(10)	NOT NULL,
	PRIMARY KEY(`user_id`,`funding_id`)
);
ALTER TABLE `vote` ADD CONSTRAINT `FK_user_TO_vote_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

ALTER TABLE `vote` ADD CONSTRAINT `FK_funding_TO_vote_1` FOREIGN KEY (
	`funding_id`
)
REFERENCES `funding` (
	`funding_id`
);