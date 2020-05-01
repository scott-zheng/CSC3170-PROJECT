
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
--
-- Veritabanı: `databaseproject`
--
CREATE DATABASE IF NOT EXISTS `databaseproject` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `databaseproject`;


-- Create Relation Person
CREATE TABLE Person (
	Person_id int(11) NOT NULL,
    Person_Name varchar(40) NOT NULL,
    Phone_number varchar(11) DEFAULT NULL,
    Person_Password varchar(30) NOT NULL,
    PRIMARY KEY (Person_id)
);

-- Create Relation User
CREATE TABLE Users (
	User_id int(11) NOT NULL,
    Email varchar(50) NOT NULL,
    Birthday date NOT NULL,
    School varchar(8) NOT NULL,
    College varchar(3) NOT NULL,
    Gender enum('male', 'female') NOT NULL,
    Age date as (TIMESTAMPDIF(YEAR, Birthday, NOW())),
    PRIMARY KEY (User_id),
    FOREIGN KEY (User_id) REFERENCES Person(Person_id),
    FOREIGN KEY (School) REFERENCES School(School_name),
    FOREIGN KEY (College) REFERENCES College(College_name)
);

-- Create Relation Tag
CREATE TABLE Tag (
	Tag_id int(11) NOT NULL,
    Tag_name varchar(20),
    PRIMARY KEY (Tag_id)
);


-- Create Relation School
CREATE TABLE School (
	School_name enum('SSE', 'SME', 'HSS', 'LHS') NOT NULL,
    Director varchar(20),
    Contact varchar(20),
    PRIMARY KEY (School_name)
);

-- Create Relation College
CREATE TABLE College (
	College_name enum('MUSE', 'DILLIGENT', 'SHAW') NOT NULL,
    Director varchar(20),
    Contact varchar(20),
    PRIMARY KEY (College_name)
);

-- Create Relation Vendor-tag
CREATE TABLE Vendor_tag (
	Tag_id int(11) NOT NULL,
    Vendor_id int(11) NOT NULL,
    PRIMARY KEY (Tag_id, Vendor_id),
    FOREIGN KEY (Tag_id) REFERENCES Tag(Tag_id),
    FOREIGN KEY (Vendor_id) REFERENCES Vendor(Vendor_id)
);

-- Create Relation Preference-tag
CREATE TABLE Preference_tag (
	Tag_id int(11) NOT NULL,
    User_id int(11) NOT NULL,
    PRIMARY KEY (Tag_id, User_id),
    FOREIGN KEY (Tag_id) REFERENCES Tag(Tag_id),
    FOREIGN KEY (User_id) REFERENCES Users(User_id)
);

-- Create Relation Follow
CREATE TABLE Follow(
	Following_id int(11) NOT NULL,
    Follower_id int(11) NOT NULL,
    PRIMARY KEY (Following_id, Follower_id),
    FOREIGN KEY (Following_id, Folloer_id) REFERENCES Users(User_id)
);

		 
-- Vendor Part --

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

INSERT INTO `vendor` (`vendorID`, `venueName`, `address`, `phoneNo`, `service`, `street_name`, `venueOpenTime`, `venueCloseTime`) VALUES
(1, 'Pandora Plaza', 'Lower Campus - Student\'s Activity Bldg. 1F', '3122660302', `High Quality Food Supply`, '10:00:00', '23:00:00'),
(2, 'LeTian #1 Cafeteria', 'Lower Campus - LeTian Bldg. 1F', '3122661240', 'Food Supply with Reasonable Price', '10:30:00', '21:00:00');


ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

ALTER TABLE `vendor_category`
  ADD PRIMARY KEY (`vendorID`,`categoryID`),
  ADD KEY `categoryID` (`categoryID`);

ALTER TABLE `preference_vendor`
  ADD PRIMARY KEY (`userID`, `vendorID`),
  ADD KEY `vendorID` (`vendorID`);

ALTER TABLE `vendor`
  ADD PRIMARY KEY (`vendorId`),

ALTER TABLE `category`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `vendor`
  MODIFY `vendorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `vendor_category`
  ADD CONSTRAINT `cat_vendor_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`),
  ADD CONSTRAINT `cat_vendor_ibfk_2` FOREIGN KEY (`vendorID`) REFERENCES `vendor` (`venueID`);
