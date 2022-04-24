/*
MySQL Backup
Source Server Version: 5.5.36
Source Database: honesty_contest
Date: 2022/4/18 12:08:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
--  Table structure for `admins`
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `admin_psw` varchar(30) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `contest2qst`
-- ----------------------------
DROP TABLE IF EXISTS `contest2qst`;
CREATE TABLE `contest2qst` (
  `contest_id` int(11) NOT NULL,
  `qst_id` int(11) NOT NULL,
  PRIMARY KEY (`contest_id`,`qst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `contests`
-- ----------------------------
DROP TABLE IF EXISTS `contests`;
CREATE TABLE `contests` (
  `contest_id` int(11) NOT NULL AUTO_INCREMENT,
  `contest_name` varchar(30) NOT NULL,
  `contest_time` int(11) NOT NULL,
  PRIMARY KEY (`contest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `qstch1`
-- ----------------------------
DROP TABLE IF EXISTS `qstch1`;
CREATE TABLE `qstch1` (
  `qst_id` int(11) NOT NULL AUTO_INCREMENT,
  `qst_type` int(11) NOT NULL,
  `qst_title` varchar(100) NOT NULL,
  `qst_op1` varchar(20) NOT NULL,
  `qst_op2` varchar(20) NOT NULL,
  `qst_op3` varchar(20) DEFAULT NULL,
  `qst_op4` varchar(20) DEFAULT NULL,
  `qst_op5` varchar(20) DEFAULT NULL,
  `qst_ans` varchar(10) NOT NULL,
  `qst_teach` varchar(150) DEFAULT NULL,
  `qst_score` int(11) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `qstch2`
-- ----------------------------
DROP TABLE IF EXISTS `qstch2`;
CREATE TABLE `qstch2` (
  `qst_id` int(11) NOT NULL AUTO_INCREMENT,
  `qst_type` int(11) NOT NULL,
  `qst_title` varchar(100) NOT NULL,
  `qst_op1` varchar(20) NOT NULL,
  `qst_op2` varchar(20) NOT NULL,
  `qst_op3` varchar(20) DEFAULT NULL,
  `qst_op4` varchar(20) DEFAULT NULL,
  `qst_op5` varchar(20) DEFAULT NULL,
  `qst_ans` varchar(10) NOT NULL,
  `qst_teach` varchar(50) DEFAULT NULL,
  `qst_score` int(11) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `qstch3`
-- ----------------------------
DROP TABLE IF EXISTS `qstch3`;
CREATE TABLE `qstch3` (
  `qst_id` int(11) NOT NULL AUTO_INCREMENT,
  `qst_type` int(11) NOT NULL,
  `qst_title` varchar(100) NOT NULL,
  `qst_op1` varchar(20) NOT NULL,
  `qst_op2` varchar(20) NOT NULL,
  `qst_op3` varchar(20) DEFAULT NULL,
  `qst_op4` varchar(20) DEFAULT NULL,
  `qst_op5` varchar(20) DEFAULT NULL,
  `qst_ans` varchar(10) NOT NULL,
  `qst_teach` varchar(50) DEFAULT NULL,
  `qst_score` int(11) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `qstch4`
-- ----------------------------
DROP TABLE IF EXISTS `qstch4`;
CREATE TABLE `qstch4` (
  `qst_id` int(11) NOT NULL AUTO_INCREMENT,
  `qst_type` int(11) NOT NULL,
  `qst_title` varchar(100) NOT NULL,
  `qst_op1` varchar(20) NOT NULL,
  `qst_op2` varchar(20) NOT NULL,
  `qst_op3` varchar(20) DEFAULT NULL,
  `qst_op4` varchar(20) DEFAULT NULL,
  `qst_op5` varchar(20) DEFAULT NULL,
  `qst_ans` varchar(10) NOT NULL,
  `qst_teach` varchar(50) DEFAULT NULL,
  `qst_score` int(11) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `qstch5`
-- ----------------------------
DROP TABLE IF EXISTS `qstch5`;
CREATE TABLE `qstch5` (
  `qst_id` int(11) NOT NULL AUTO_INCREMENT,
  `qst_type` int(11) NOT NULL,
  `qst_title` varchar(100) NOT NULL,
  `qst_op1` varchar(20) NOT NULL,
  `qst_op2` varchar(20) NOT NULL,
  `qst_op3` varchar(20) DEFAULT NULL,
  `qst_op4` varchar(20) DEFAULT NULL,
  `qst_op5` varchar(20) DEFAULT NULL,
  `qst_ans` varchar(10) NOT NULL,
  `qst_teach` varchar(50) DEFAULT NULL,
  `qst_score` int(11) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `qstch6`
-- ----------------------------
DROP TABLE IF EXISTS `qstch6`;
CREATE TABLE `qstch6` (
  `qst_id` int(11) NOT NULL AUTO_INCREMENT,
  `qst_type` int(11) NOT NULL,
  `qst_title` varchar(100) NOT NULL,
  `qst_op1` varchar(20) NOT NULL,
  `qst_op2` varchar(20) NOT NULL,
  `qst_op3` varchar(20) DEFAULT NULL,
  `qst_op4` varchar(20) DEFAULT NULL,
  `qst_op5` varchar(20) DEFAULT NULL,
  `qst_ans` varchar(10) NOT NULL,
  `qst_teach` varchar(50) DEFAULT NULL,
  `qst_score` int(11) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `qstch7`
-- ----------------------------
DROP TABLE IF EXISTS `qstch7`;
CREATE TABLE `qstch7` (
  `qst_id` int(11) NOT NULL AUTO_INCREMENT,
  `qst_type` int(11) NOT NULL,
  `qst_title` varchar(100) NOT NULL,
  `qst_op1` varchar(20) NOT NULL,
  `qst_op2` varchar(20) NOT NULL,
  `qst_op3` varchar(20) DEFAULT NULL,
  `qst_op4` varchar(20) DEFAULT NULL,
  `qst_op5` varchar(20) DEFAULT NULL,
  `qst_ans` varchar(10) NOT NULL,
  `qst_teach` varchar(50) DEFAULT NULL,
  `qst_score` int(11) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `qstforcontest`
-- ----------------------------
DROP TABLE IF EXISTS `qstforcontest`;
CREATE TABLE `qstforcontest` (
  `qst_id` int(11) NOT NULL AUTO_INCREMENT,
  `qst_type` int(11) NOT NULL,
  `qst_title` varchar(100) NOT NULL,
  `qst_op1` varchar(20) NOT NULL,
  `qst_op2` varchar(20) NOT NULL,
  `qst_op3` varchar(20) DEFAULT NULL,
  `qst_op4` varchar(20) DEFAULT NULL,
  `qst_op5` varchar(20) DEFAULT NULL,
  `qst_ans` varchar(10) NOT NULL,
  `qst_teach` varchar(150) DEFAULT NULL,
  `qst_score` int(11) NOT NULL,
  PRIMARY KEY (`qst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `stu2exers`
-- ----------------------------
DROP TABLE IF EXISTS `stu2exers`;
CREATE TABLE `stu2exers` (
  `stu_id` int(11) NOT NULL AUTO_INCREMENT,
  `ch_id` int(11) NOT NULL,
  `fin_num` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`stu_id`,`ch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=213201643 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `stu2wrongs`
-- ----------------------------
DROP TABLE IF EXISTS `stu2wrongs`;
CREATE TABLE `stu2wrongs` (
  `stu_id` int(11) NOT NULL,
  `ch_id` int(11) NOT NULL,
  `qst_id` int(11) NOT NULL,
  PRIMARY KEY (`stu_id`,`ch_id`,`qst_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `stuconfin`
-- ----------------------------
DROP TABLE IF EXISTS `stuconfin`;
CREATE TABLE `stuconfin` (
  `stu_id` int(11) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `time` bigint(19) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`stu_id`,`contest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `stucontime`
-- ----------------------------
DROP TABLE IF EXISTS `stucontime`;
CREATE TABLE `stucontime` (
  `stu_id` int(11) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `time` bigint(19) NOT NULL,
  PRIMARY KEY (`stu_id`,`contest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `students`
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `stu_card_id` int(11) NOT NULL,
  `stu_psw` char(50) DEFAULT NULL,
  PRIMARY KEY (`stu_card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records 
-- ----------------------------
INSERT INTO `admins` VALUES ('666666','seu');
INSERT INTO `contest2qst` VALUES ('1','1'), ('1','3'), ('1','5'), ('1','10'), ('2','1'), ('2','7'), ('3','1'), ('7','109'), ('7','110'), ('7','111'), ('7','112'), ('7','113'), ('7','114');
INSERT INTO `contests` VALUES ('1','东南大学诚信知识竞赛-初赛','50'), ('7','诚信知识竞赛-复赛','31');
INSERT INTO `qstch1` VALUES ('1','1','生源地信用助学贷款学生贷款宽限期后,由学生和家长按借款合同约定,按什么分期偿还贷款本息?','月季','季度','年度 ','半年度','undefined','C','无','1'), ('2','1','高等学校在定点扶贫工作中，可在（）等方面发挥积极作用','资金扶贫','人才扶贫 ','科技扶贫','智力扶贫 ','undefined','B','这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析这是答案解析','1'), ('3','2','下列哪些全日制毕业生符合申请求职补贴的','残疾人毕业生','享受城镇低保毕业生','享受农村低保毕业生','国家助学贷款毕业生','建档立卡贫困户毕业生','ABCDE','无','1'), ('4','2','高校在校生中，只有二年级以上（含二年级）的学生才有资格申请的项目为','国家奖学金  ','国家励志奖学金','自治区人民政府奖学金','国家助学金','校长奖学金','AB','无','1'), ('5','0','可以同时获得国家奖学金和国家励志奖学金。  ','对','错','undefined','undefined','undefined','B','这是答案解析2','1'), ('6','0','只有贫困生才有资格申请国家奖学金。','对','错','undefined','undefined','undefined','B','无','1'), ('7','1','这是一道测试题目','AAA','BBB','CCC','DDD','null','A','这是答案解析','1');
INSERT INTO `qstforcontest` VALUES ('1','1','高等学校在定点扶贫工作中，可在（）等方面发挥积极作用.资金扶贫','资金扶贫','人才扶贫 ','科技扶贫','智力扶贫 ','undefined','B','这是答案解析','1'), ('2','2','下列哪些全日制毕业生符合申请求职补贴的','残疾人毕业生','享受城镇低保毕业生','享受农村低保毕业生','国家助学贷款毕业生','建档立卡贫困户毕业生','ABCDE','无','1'), ('3','1','生源地信用助学贷款学生贷款宽限期后,由学生和家长按借款合同约定,按什么分期偿还贷款本息?','月季','季度','年度 ','半年度','undefined','C','无','1'), ('4','0','只有贫困生才有资格申请国家奖学金。','对','错','undefined','undefined','undefined','B','无','1'), ('5','0','可以同时获得国家奖学金和国家励志奖学金。  ','对','错','undefined','undefined','undefined','B','这是答案解析2','1'), ('6','2','高校在校生中，只有二年级以上（含二年级）的学生才有资格申请的项目为','国家奖学金  ','国家励志奖学金','自治区人民政府奖学金','国家助学金','校长奖学金','AB','无','1'), ('7','1','生源地信用助学贷款学生贷款宽限期后,由学生和家长按借款合同约定,按什么分期偿还贷款本息?','月季','季度','年度 ','半年度','undefined','C','无','1'), ('8','1','高等学校在定点扶贫工作中，可在（）等方面发挥积极作用.资金扶贫','资金扶贫','人才扶贫 ','科技扶贫','智力扶贫 ','undefined','B','这是答案解析','1'), ('9','2','下列哪些全日制毕业生符合申请求职补贴的','残疾人毕业生','享受城镇低保毕业生','享受农村低保毕业生','国家助学贷款毕业生','建档立卡贫困户毕业生','ABCDE','无','1'), ('10','2','高校在校生中，只有二年级以上（含二年级）的学生才有资格申请的项目为','国家奖学金  ','国家励志奖学金','自治区人民政府奖学金','国家助学金','校长奖学金','AB','无','1'), ('11','0','可以同时获得国家奖学金和国家励志奖学金。  ','对','错','undefined','undefined','undefined','B','这是答案解析2','1'), ('12','0','只有贫困生才有资格申请国家奖学金。','对','错','undefined','undefined','undefined','B','无','1'), ('109','2','下列哪些全日制毕业生符合申请求职补贴的','残疾人毕业生','享受城镇低保毕业生','享受农村低保毕业生','国家助学贷款毕业生','建档立卡贫困户毕业生','ABCDE','无','1'), ('110','1','生源地信用助学贷款学生贷款宽限期后,由学生和家长按借款合同约定,按什么分期偿还贷款本息?','月季','季度','年度 ','半年度','undefined','C','无','1'), ('111','1','高等学校在定点扶贫工作中，可在（）等方面发挥积极作用.资金扶贫','资金扶贫','人才扶贫 ','科技扶贫','智力扶贫 ','undefined','B','这是答案解析','1'), ('112','2','高校在校生中，只有二年级以上（含二年级）的学生才有资格申请的项目为','国家奖学金  ','国家励志奖学金','自治区人民政府奖学金','国家助学金','校长奖学金','AB','无','1'), ('113','0','可以同时获得国家奖学金和国家励志奖学金。  ','对','错','undefined','undefined','undefined','B','这是答案解析2','1'), ('114','0','只有贫困生才有资格申请国家奖学金。','对','错','undefined','undefined','undefined','B','无','1');
INSERT INTO `stu2exers` VALUES ('111','1','3');
INSERT INTO `stu2wrongs` VALUES ('111','1','3'), ('111','1','4'), ('111','1','6');
INSERT INTO `stuconfin` VALUES ('111','1','1650173826161','1'), ('111','7','2213232','2'), ('222','1','12321321321','3');
INSERT INTO `stucontime` VALUES ('111','1','1650173103758');
INSERT INTO `students` VALUES ('111','123qwe'), ('222',NULL), ('333',NULL), ('444',NULL), ('555',NULL), ('213201642','123qwe');
