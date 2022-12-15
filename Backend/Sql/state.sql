CREATE TABLE `state` (
	`state_code` TINYINT(1) NOT NULL PRIMARY KEY,
	`state`	VARCHAR(30)	NOT NULL
);

Insert Into VALUES(0, '활성화');
Insert Into VALUES(1, '탈퇴');
Insert Into VALUES(0, '정지');