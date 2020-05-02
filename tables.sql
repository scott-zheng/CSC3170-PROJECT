
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
	User_id int(11) NOT NULL AUTO_INCREMENT,
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




CREATE TABLE Category (
	Category_id int(11) NOT NULL,
    Category_name varchar(40) NOT NULL,
    Category_desc varchar(128) DEFAULT NULL,
    PRIMARY KEY (Category_id)
)ENGINE=InnoDB;

CREATE TABLE Vendor (
  User_id int(11) NOT NULL,
    vname varchar(40) NOT NULL,
    vaddress varchar(150) DEFAULT NULL,
    vphoneNo char(10) DEFAULT NULL,
    vservice varchar(128) DEFAULT NULL,
    venueOpenTime time DEFAULT NULL,
    venueCloseTime time DEFAULT NULL,
    PRIMARY KEY (User_id),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE Vendor_category (
  User_id int(11) NOT NULL,
  Category_id int(11) NOT NULL,
  PRIMARY KEY (User_id, Category_id),
  FOREIGN KEY (User_id) REFERENCES Vendor(User_id),
  FOREIGN KEY (Category_id) REFERENCES Category(Category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE Preference_vendor (
  Customer_id int(11) NOT NULL,
  Vendor_id int(11) NOT NULL,
  PRIMARY KEY (Customer_id, Vendor_id),
  FOREIGN KEY (Customer_id) REFERENCES Customer(User_id),
  FOREIGN KEY (Vendor_id) REFERENCES Vendor(User_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO Vendor (Vendor_id, vname, vaddress, vphoneNo, vservice, venueOpenTime, venueCloseTime) VALUES
(1001, 'Pandora Plaza', 'Lower Campus - Student\'s Activity Bldg. 1F', '3122660302', 'High Quality Food Supply', '10:00:00', '23:00:00'),
(1002, 'LeTian #1 Cafeteria', 'Lower Campus - LeTian Bldg. 1F', '3122661240', 'Food Supply with Reasonable Price', '10:30:00', '21:00:00');

INSERT INTO Category (Category_id, Category_name, Category_desc) VALUES
(1, 'Consult', 'Offering Consulting Services'),
(2, 'Food Supply', 'Providing food supply');

INSERT INTO `preference_vendor` (Customer_id, Vendor_id) VALUES
(1, 1001),
(2, 1002);

INSERT INTO Vendor_category (User_id, Category_id) VALUES
(1001, 1),
(1002, 2);

-- Create Relation Person
CREATE TABLE Photo (
    Photo_id int(11) NOT NULL,
    Content varchar(50) NOT NULL,
    `Time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    User_id int(11) NOT NULL,
    PRIMARY KEY (Photo_id),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create Relation Comment
CREATE TABLE Comment (
    Comment_id int(11) NOT NULL,
    Vendor_id int(11) NOT NULL,
    Customer_id int(11) NOT NULL,
    Content varchar(250) NOT NULL,
    `Time` datetime NOT NULL,
    PRIMARY KEY (Comment_id),
    FOREIGN KEY (Vendor_id) REFERENCES Vendor(Vendor_id),
    FOREIGN KEY (Customer_id) REFERENCES Customer(User_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create Relation Attitude_toward
CREATE TABLE Attitude_toward (
    Comment_id int(11) NOT NULL,
    Customer_id int(11) NOT NULL,
    `Like` tinyint(1) NOT NULL,
    Dislike tinyint(1) NOT NULL,
    PRIMARY KEY (Comment_id, Customer_id),
    FOREIGN KEY (Comment_id) REFERENCES Comment(Comment_id),
    FOREIGN KEY (Customer_id) REFERENCES Customer(User_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
