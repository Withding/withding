CREATE TABLE `funding` (
	`funding_id`	INT(10) auto_increment NOT NULL PRIMARY KEY,
	`funding_category_id`	TINYINT(1) NOT NULL,
	`title`	VARCHAR(100)	NOT NULL,
	`content`	VARCHAR(1000)	NOT NULL,
	`max_amount`	BIGINT(2)	NOT NULL DEFAULT 0,
	`now_amount`	BIGINT(2)	NOT NULL DEFAULT 0,
	`deadline`	TimeStamp NOT NULL,
	`view_count`	INT(1)	NOT NULL DEFAULT 0,
	`vote_count`	INT(1)	NOT NULL DEFAULT 0,
	`created_at`	TimeStamp NOT NULL,
	`open_at`	TimeStamp NOT NULL
);


ALTER TABLE `funding` ADD CONSTRAINT `FK_funding_category_TO_funding_1` FOREIGN KEY (
	`funding_category_id`
)
REFERENCES `funding_category` (
	`funding_category_id`
);