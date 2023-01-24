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
	`state_code` TINYINT(1) NOT NULL
);


ALTER TABLE `user` ADD CONSTRAINT `FK_state_TO_user_1` FOREIGN KEY (
	`state_code`
)
REFERENCES `state` (
	`state_code`
);

INSERT INTO `user` VALUES(1, '0mFYBZug7mDw6/ST5H+o8msxk3VjU+lQu+xSwq8+1lw=', 0, '$2a$10$OzYF7ZFqL4mP.riwtL5GsOD.IC5jHw6Avl8G32Ed6kV0AVdToGqzK', '전국노예자랑', 'default.png', '2023-01-24 20:47:19', null, 0, 0);
