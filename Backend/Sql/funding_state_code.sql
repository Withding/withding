CREATE TABLE `funding_state_code` (
	`state_code` TINYINT NOT NULL PRIMARY KEY,
	`state` VARCHAR(50) NOT NULL
);
INSERT INTO funding_state_code VALUES(0, '진행대기');
INSERT INTO funding_state_code VALUES(1, '진행중');
INSERT INTO funding_state_code VALUES(2, '종료');
INSERT INTO funding_state_code VALUES(3, '정지');
INSERT INTO funding_state_code VALUES(4, '임시저장');