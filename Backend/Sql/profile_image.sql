CREATE TABLE `profileimage` (
	`profile_image` VARCHAR(100) NOT NULL,
	`origin_profile_image` VARCHAR(100) NULL
);

ALTER TABLE `user` ADD CONSTRAINT `FK_profileimage_TO_user_1` FOREIGN KEY (
	`profile_image`
)
REFERENCES `profileimage` (
	`profile_image`
);

Insert into profileimage VALUES('default.png', 'default.png');