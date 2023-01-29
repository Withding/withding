CREATE TABLE `funding_state_code` (
	`state_code` TINYINT NOT NULL PRIMARY KEY,
	`state` VARCHAR(50) NOT NULL
);
INSERT INTO funding_state_code VALUES(0, '진행대기');
INSERT INTO funding_state_code VALUES(1, '진행중');
INSERT INTO funding_state_code VALUES(2, '종료');
INSERT INTO funding_state_code VALUES(3, '정지');
INSERT INTO funding_state_code VALUES(4, '임시저장');

CREATE TABLE `funding_category` (
	`funding_category_id` TINYINT NOT NULL PRIMARY KEY,
	`category` VARCHAR(30) NOT NULL
);
Insert Into funding_category VALUES(-1, '카테고리');
Insert Into funding_category VALUES(0, 'BEST 펀딩');
Insert Into funding_category VALUES(1,'테크·가전');
Insert Into funding_category VALUES(2, '패션·잡화');
Insert Into funding_category VALUES(3, '뷰티');
Insert Into funding_category VALUES(4, '푸드');
Insert Into funding_category VALUES(5, '홈·리빙');
Insert Into funding_category VALUES(6, '여행·레져');
Insert Into funding_category VALUES(7, '스포츠·모빌리티');
Insert Into funding_category VALUES(8, '캐릭터·굿즈');
Insert Into funding_category VALUES(9, '베이비·키즈');
Insert Into funding_category VALUES(10, '반려동물');
Insert Into funding_category VALUES(11, '게임·취미');
Insert Into funding_category VALUES(12, '컬쳐·아티스트');
Insert Into funding_category VALUES(13, '클래스·컨설팅');
Insert Into funding_category VALUES(14, '출판');
Insert Into funding_category VALUES(15, '기부·캠페인');
Insert Into funding_category VALUES(16, '후원');
Insert Into funding_category VALUES(17, '모임');


CREATE TABLE `state` (
	`state_code` TINYINT(1) NOT NULL PRIMARY KEY,
	`state`	VARCHAR(30)	NOT NULL
);

Insert Into `state` VALUES(0, '활성화');
Insert Into `state` VALUES(1, '탈퇴');
Insert Into `state` VALUES(2, '정지');


CREATE TABLE `id_type` (
	`id_type_code`	TINYINT(1) NOT NULL PRIMARY KEY,
	`id_type`	VARCHAR(30)	NOT NULL
);

Insert Into `id_type` VALUES(0, 'withding');
Insert Into `id_type` VALUES(1, 'kakao');
Insert Into `id_type` VALUES(2, 'naver');


CREATE TABLE `profileimage` (
	`profile_image` VARCHAR(100) NOT NULL PRIMARY KEY,
	`origin_profile_image` VARCHAR(100) NOT NULL
);
Insert into profileimage VALUES('default.png', 'default.png');

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
INSERT INTO `user` VALUES(1, '0mFYBZug7mDw6/ST5H+o8msxk3VjU+lQu+xSwq8+1lw=', 0, '$2a$10$yoCwaLuNSKUHFoE9AR6mg.v2D4JnxJ8MPIAaNDO2LpDeal94aTCW.', '전국노예자랑', 'default.png', '2023-01-24 20:47:19', null, 0, 0);




CREATE TABLE `funding_details` (
	`funding_details_id`	INT(10) auto_increment NOT NULL PRIMARY KEY,
	`user_id`	INT(10)	NOT NULL,
	`funding_id`	INT(10)	NOT NULL,
	`amount`	BIGINT(1)	NOT NULL DEFAULT 0,
	`funding_at`	TimeStamp NOT NULL
);


CREATE TABLE `article_image` (
	`image` VARCHAR(100) NOT NULL PRIMARY KEY,
	`origin_image` VARCHAR(100) NOT NULL
);
INSERT INTO `article_image` VALUES('default.png', 'default.png');


CREATE TABLE `article` (
	`article_id` INT(10) auto_increment NOT NULL PRIMARY KEY,
	`image` VARCHAR(100) NOT NULL DEFAULT 'default.png',
	`article_name` VARCHAR(100) NOT NULL,
	`comment` VARCHAR(100) NOT NULL,
	`price` INT(10) NOT NULL,
	`shipping` INT(10) NOT NULL DEFAULT 0,
	`start_send` TimeStamp NULL,
	`inventory` INT(2) NOT NULL DEFAULT 0,
	`funding_id` INT(10) NOT NULL
);


CREATE TABLE `thumbnail` (
	`image` VARCHAR(100) NOT NULL PRIMARY KEY,
	`origin_image` VARCHAR(100) NOT NULL
);


CREATE TABLE `funding` (
	`funding_id` INT(10) auto_increment NOT NULL PRIMARY KEY,
	`funding_category_id` TINYINT NULL DEFAULT -1,
	`title` VARCHAR(100) NULL DEFAULT '',
	`content` VARCHAR(1000) NULL DEFAULT '',
	`image` VARCHAR(100) NULL DEFAULT NULL,
	`max_amount` BIGINT(2) NOT NULL DEFAULT 0,
	`now_amount` BIGINT(2) NOT NULL DEFAULT 0,
	`view_count` INT NOT NULL DEFAULT 0,
	`vote_count` INT NOT NULL DEFAULT 0,
	`user_id` INT(10) NULL DEFAULT NULL,
	`created_at` TimeStamp NULL,
	`open_at` TimeStamp NULL DEFAULT NULL,
	`deadline` TimeStamp NULL DEFAULT NULL,
	`state_code` TINYINT NULL DEFAULT 4
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

ALTER TABLE `user` ADD CONSTRAINT `FK_profileimage_TO_user_1` FOREIGN KEY (
	`profile_image`
)
REFERENCES `profileimage` (
	`profile_image`
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



ALTER TABLE `funding` ADD CONSTRAINT `FK_funding_state_code_TO_funding_1` FOREIGN KEY (
	`state_code`
)
REFERENCES `funding_state_code` (
	`state_code`
);

ALTER TABLE `article` ADD CONSTRAINT `FK_article_image_TO_article_1` FOREIGN KEY (
	`image`
)
REFERENCES `article_image` (
	`image`
);

ALTER TABLE `article` ADD CONSTRAINT `FK_funding_TO_article_1` FOREIGN KEY (
	`funding_id`
)
REFERENCES `funding` (
	`funding_id`
);




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

