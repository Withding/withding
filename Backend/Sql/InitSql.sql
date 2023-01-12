CREATE TABLE `funding_category` (
	`funding_category_id`	TINYINT(1) auto_increment NOT NULL PRIMARY KEY,
	`category`	VARCHAR(30)	NOT NULL
);

/**
Insert funding_category Into VALUES(0,'BEST 펀딩');
Insert funding_category Into VALUES(1,'테크·가전');
Insert funding_category Into VALUES(2,'패션·잡화');
Insert funding_category Into VALUES(3,'');
Insert funding_category Into VALUES(4,'');
Insert funding_category Into VALUES(5,'');
Insert funding_category Into VALUES(6,'');
Insert funding_category Into VALUES(7,'');
Insert funding_category Into VALUES(8,'');
Insert funding_category Into VALUES(9,'');
*/

CREATE TABLE `state` (
	`state_code` TINYINT(1) NOT NULL PRIMARY KEY,
	`state`	VARCHAR(30)	NOT NULL
);

Insert Into `state` VALUES(0, '활성화');
Insert Into `state` VALUES(1, '탈퇴');
Insert Into `state` VALUES(2, '정지');


CREATE TABLE `id_type` (
	`id_type_code`	TINYINT(1) NOT NULL PRIMARY KEY,
	`id_type`	VARCHAR(30)	NOT NULL DEFAULT '자체'
);

Insert Into `id_type` VALUES(0, 'withding');
Insert Into `id_type` VALUES(1, 'kakao');
Insert Into `id_type` VALUES(2, 'naver');

CREATE TABLE `user` (
	`user_id`	INT(10) auto_increment NOT NULL PRIMARY KEY,
	`email`	VARCHAR(100)    NOT NULL,
	`id_type_code`	TINYINT(1)  NOT NULL,
	`password`	VARCHAR(100) NULL,
	`user`	VARCHAR(50) NOT NULL,
	`profile_image`	VARCHAR(100) NULL DEFAULT 'default.png',
	`created_at` TIMESTAMP NOT NULL,
	`logout_at` TIMESTAMP NULL,
	`point`	BIGINT(1) NULL DEFAULT 0,
	`state_code`	TINYINT(1) NOT NULL
);

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

CREATE TABLE `funding_details` (
	`funding_details_id`	INT(10) auto_increment NOT NULL PRIMARY KEY,
	`user_id`	INT(10)	NOT NULL,
	`funding_id`	INT(10)	NOT NULL,
	`amount`	BIGINT(1)	NOT NULL DEFAULT 0,
	`funding_at`	TimeStamp NOT NULL
);


ALTER TABLE `user` ADD CONSTRAINT `FK_id_type_TO_user_1` FOREIGN KEY (
	`id_type_code`
)
REFERENCES `id_type` (
	`id_type_code`
);

ALTER TABLE `user` ADD CONSTRAINT `FK_state_TO_user_1` FOREIGN KEY (
	`state_code`
)
REFERENCES `state` (
	`state_code`
);

ALTER TABLE `funding` ADD CONSTRAINT `FK_funding_category_TO_funding_1` FOREIGN KEY (
	`funding_category_id`
)
REFERENCES `funding_category` (
	`funding_category_id`
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


/**
Insert Into VALUES()
*/

CREATE TABLE `emailauth` (
	`emailauth_id` INT(5) auto_increment NOT NULL PRIMARY KEY,
	`email` VARCHAR(100) NOT NULL,
	`code` VARCHAR(50) NOT NULL,
	`secretkey` VARCHAR(200) NOT NULL,
	`deadline` TimeStamp NOT NULL
);



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

