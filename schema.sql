/**
 * Execute this file from the command line by typing:
 *   mysql -u root < schema.sql
    sudo mysql -u root < schema.sql
 */
--  groupp has 2 p's for now because otherwise excaping reserved words was frustrating

DROP DATABASE IF EXISTS wswe;
CREATE DATABASE wswe;

USE wswe;
-- >>
CREATE TABLE user (
  userid int NOT NULL AUTO_INCREMENT,
  userName varchar(25) NOT NULL,
  userStatus varchar(50) NOT NULL,
  PRIMARY KEY (userid)
);


--  table to see what the dietary restrictions of a user may be>>
CREATE TABLE dietaryRestrictions(
    userid int NOT NULL,
    FOREIGN KEY (userid)
        REFERENCES user(userid),
    restriction varchar(100) NOT NULL   
);

-- choice column should probably reference location id from api varchar is placeholder
CREATE TABLE groupp(
    grouppid int NOT NULL AUTO_INCREMENT,
    groupName varchar(20) NOT NULL,
    active boolean NOT NULL,
    choice varchar(50) NOT NULL,
    pricePoint int NOT NULL,
    PRIMARY KEY (grouppid)
);

-- unsure if best way to create join table between user and group to know which user belongs to a group
CREATE TABLE user_group (
    userGroup_id int NOT NULL AUTO_INCREMENT,
    userid int NOT NULL,
    grouppid int NOT NULL,
    FOREIGN KEY (userid)
        REFERENCES user(userid),
    FOREIGN KEY (grouppid)
        REFERENCES groupp(grouppid),
    PRIMARY KEY (userGroup_id)
);


-- table to save which image the user has chosen >>
CREATE TABLE userImages(
    userid int NOT NULL,
    FOREIGN KEY (userid)
        REFERENCES user(userid),
    image int NOT NULL
);


-- table to store the past choices of a group location_id should come from the api
CREATE TABLE grouphistory (
    grouppid int NOT NULL,
    FOREIGN KEY (grouppid)
        REFERENCES groupp(grouppid),
    location_id varchar (50)
);
