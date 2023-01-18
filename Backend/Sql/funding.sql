CREATE TABLE `funding` (
	`funding_id` INT(10) auto_increment NOT NULL PRIMARY KEY,
	`funding_category_id` TINYINT(1) NULL,
	`title` VARCHAR(100) NULL,
	`content` VARCHAR(1000) NULL,
	`image` VARCHAR(100) NULL,
	`max_amount` BIGINT(2) NOT NULL DEFAULT 0,
	`now_amount` BIGINT(2) NOT NULL DEFAULT 0,
	`view_count` INT NOT NULL DEFAULT 0,
	`vote_count` INT NOT NULL DEFAULT 0,
	`user_id` INT(10) NOT NULL,
	`created_at` TimeStamp NULL,
	`open_at` TimeStamp NULL,
	`deadline` TimeStamp NULL,
	`article_id_1` INT(10) NULL DEFAULT null,
	`article_id_2` INT(10) NULL DEFAULT null,
	`article_id_3` INT(10) NULL DEFAULT null,
	`article_id_4` INT(10) NULL DEFAULT null,
	`article_id_5` INT(10) NULL DEFAULT null,
	`state_code` TINYINT NULL DEFAULT 4
);


ALTER TABLE `funding` ADD CONSTRAINT `FK_funding_category_TO_funding_1` FOREIGN KEY (
	`funding_category_id`
)
REFERENCES `funding_category` (
	`funding_category_id`
);

ALTER TABLE `funding` ADD CONSTRAINT `FK_thumbnail_TO_funding_1` FOREIGN KEY (
	`image`
)
REFERENCES `thumbnail` (
	`image`
);

ALTER TABLE `funding` ADD CONSTRAINT `FK_user_TO_funding_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);



ALTER TABLE `funding` ADD CONSTRAINT `FK_article_TO_funding_1` FOREIGN KEY (
	`article_id_1`
)
REFERENCES `article` (
	`article_id`
);

ALTER TABLE `funding` ADD CONSTRAINT `FK_article_TO_funding_2` FOREIGN KEY (
	`article_id_2`
)
REFERENCES `article` (
	`article_id`
);

ALTER TABLE `funding` ADD CONSTRAINT `FK_article_TO_funding_3` FOREIGN KEY (
	`article_id_3`
)
REFERENCES `article` (
	`article_id`
);

ALTER TABLE `funding` ADD CONSTRAINT `FK_article_TO_funding_4` FOREIGN KEY (
	`article_id_4`
)
REFERENCES `article` (
	`article_id`
);

ALTER TABLE `funding` ADD CONSTRAINT `FK_article_TO_funding_5` FOREIGN KEY (
	`article_id_5`
)
REFERENCES `article` (
	`article_id`
);

ALTER TABLE `funding` ADD CONSTRAINT `FK_funding_state_code_TO_funding_1` FOREIGN KEY (
	`state_code`
)
REFERENCES `funding_state_code` (
	`state_code`
);