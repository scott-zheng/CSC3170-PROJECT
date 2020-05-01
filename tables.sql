
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
--
-- Veritabanı: `databaseproject`
--
CREATE DATABASE IF NOT EXISTS `databaseproj` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `databaseproj`;


-- Create Relation Person
CREATE TABLE User (
	User_id int(11) NOT NULL,
    Person_Name varchar(40) NOT NULL,
    Phone_number varchar(11) DEFAULT NULL,
    Person_Password varchar(30) NOT NULL,
    PRIMARY KEY (User_id)
)ENGINE=InnoDB;

-- Create Relation School
CREATE TABLE School (
	School_id int(11) NOT NULL,
	School_name enum('SSE', 'SME', 'HSS', 'LHS') NOT NULL,
    Director varchar(20),
    Contact varchar(20),
    PRIMARY KEY (School_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create Relation College
CREATE TABLE College (
	College_id int(11) NOT NULL,
	College_name enum('MUSE', 'DILLIGENT', 'SHAW', 'HARMONIA') NOT NULL,
    Director varchar(20),
    Contact varchar(20),
    PRIMARY KEY (College_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create Relation User
CREATE TABLE Customer (
	User_id int(11) NOT NULL,
    Email varchar(50) NOT NULL,
    Birthday date NOT NULL,
    School int(11) NOT NULL,
    College int(11) NOT NULL,
    Gender enum('male', 'female') NOT NULL,
    -- Age date as (TIMESTAMPDIF(YEAR, Birthday, NOW())),
    PRIMARY KEY (User_id),
    FOREIGN KEY (User_id) REFERENCES User(User_id),
    FOREIGN KEY (School) REFERENCES School(School_id),
    FOREIGN KEY (College) REFERENCES College(College_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create Relation Tag
CREATE TABLE Tag (
	Tag_id int(11) NOT NULL,
    Tag_name varchar(20),
    PRIMARY KEY (Tag_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;




-- Create Relation Vendor-tag
CREATE TABLE Vendor_tag (
	Tag_id int(11) NOT NULL,
    User_id int(11) NOT NULL,
    PRIMARY KEY (Tag_id, User_id),
    FOREIGN KEY (Tag_id) REFERENCES Tag(Tag_id),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create Relation Preference-tag
CREATE TABLE Preference_tag (
	Tag_id int(11) NOT NULL,
    User_id int(11) NOT NULL,
    PRIMARY KEY (Tag_id, User_id),
    FOREIGN KEY (Tag_id) REFERENCES Tag(Tag_id),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create Relation Follow
CREATE TABLE Follow(
	Following_id int(11) NOT NULL,
    Follower_id int(11) NOT NULL,
    PRIMARY KEY (Following_id, Follower_id),
    FOREIGN KEY (Following_id) REFERENCES User(User_id),
    FOREIGN KEY (Follower_id) REFERENCES User(User_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `category` (
  `categoryID` int(11) NOT NULL,
  `categoryName` varchar(40) NOT NULL,
  `categoryDesc` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `vendor_category` (
  `vendorID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `preference_vendor` (
  `userID` int(11) NOT NULL,
  `vendorID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `vendor` (
  `vendorID` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `address` varchar(150) DEFAULT NULL,
  `phoneNo` char(10) DEFAULT NULL,
  `service` varchar(128) DEFAULT NULL,
  `venueOpenTime` time DEFAULT NULL,
  `venueCloseTime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `vendor` (`vendorID`, `name`, `address`, `phoneNo`, `service`, `venueOpenTime`, `venueCloseTime`) VALUES
(1, 'Pandora Plaza', 'Lower Campus - Student\'s Activity Bldg. 1F', '3122660302', 'High Quality Food Supply', '10:00:00', '23:00:00'),
(2, 'LeTian #1 Cafeteria', 'Lower Campus - LeTian Bldg. 1F', '3122661240', 'Food Supply with Reasonable Price', '10:30:00', '21:00:00');

INSERT INTO `category` (`categoryID`, `categoryName`, `categoryDesc`) VALUES
(1, 'Consult', 'Offering Consulting Services'),
(2, 'Food Supply', 'Providing food supply');

INSERT INTO `preference_vendor` (`userID`, `vendorID`) VALUES
(1, 1),
(2, 2);

INSERT INTO `vendor_category` (`vendorID`, `categoryID`) VALUES
(1, 1),
(2, 2);

ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

ALTER TABLE `vendor_category`
  ADD PRIMARY KEY (`vendorID`,`categoryID`),
  ADD KEY `categoryID` (`categoryID`);

ALTER TABLE `preference_vendor`
  ADD PRIMARY KEY (`userID`, `vendorID`),
  ADD KEY `vendorID` (`vendorID`);

ALTER TABLE `vendor`
  ADD PRIMARY KEY (`vendorId`);

ALTER TABLE `category`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `vendor`
  MODIFY `vendorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `vendor_category`
  ADD CONSTRAINT `cat_vendor_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`),
  ADD CONSTRAINT `cat_vendor_ibfk_2` FOREIGN KEY (`vendorID`) REFERENCES `vendor` (`vendorID`);
