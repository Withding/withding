CREATE TABLE `user` (
	`user_id`	INT(10) auto_increment NOT NULL PRIMARY KEY,
	`email`	VARCHAR(100)    NOT NULL,
	`id_type`	TINYINT(1)  NOT NULL,
	`password`	VARCHAR(100) NULL,
	`user`	VARCHAR(50) NOT NULL,
	`profile_image`	VARCHAR(100) NULL DEFAULT 'default.png',
	`created_at` TIMESTAMP NOT NULL,
	`logout_at` TIMESTAMP NOT NULL,
	`point`	BIGINT(1)	NOT NULL DEFAULT 0,
	`funding_list`	VARCHAR(300) NOT NULL DEFAULT '[]',
	`vote_list`	VARCHAR(100) NOT NULL DEFAULT '[]',
	`state_code`	TINYINT(1) NOT NULL
);


ALTER TABLE `user` ADD CONSTRAINT `FK_state_TO_user_1` FOREIGN KEY (
	`state_code`
)
REFERENCES `state` (
	`state_code`
);
