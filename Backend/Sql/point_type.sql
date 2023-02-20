CREATE TABLE `point_type` (
	`type_code`	TINYINT(1) NOT NULL PRIMARY KEY,
	`type`	VARCHAR(15) NULL
);

INSERT INTO `point_type` VALUES(0, '충전');
INSERT INTO `point_type` VALUES(1, '사용');