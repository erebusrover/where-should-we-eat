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
  user_id int NOT NULL AUTO_INCREMENT,
  userName varchar(25) NOT NULL UNIQUE,
  userStatus varchar(50),
  PRIMARY KEY (user_id)
);


--  table to see what the dietary restrictions of a user may be>>
CREATE TABLE dietaryRestrictions(
    user_id int NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES user(user_id),
    restriction varchar(100) NOT NULL UNIQUE
);

-- choice column should probably reference location id from api varchar is placeholder
CREATE TABLE groupp(
    groupp_id int NOT NULL AUTO_INCREMENT,
    groupName varchar(50) NOT NULL UNIQUE,
    active boolean NOT NULL,
    choice varchar(50),
    pricePoint int NOT NULL,
    PRIMARY KEY (groupp_id)
);

-- unsure if best way to create join table between user and group to know which user belongs to a group
CREATE TABLE user_group (
    userGroup_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    groupp_id int NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES user(user_id),
    FOREIGN KEY (groupp_id)
        REFERENCES groupp(groupp_id),
    PRIMARY KEY (userGroup_id)
);


-- table to save which image the user has chosen >>
CREATE TABLE userImages(
    user_id int NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES user(user_id),
    image int NOT NULL
);


-- table to store the past choices of a group location_id should come from the api
CREATE TABLE grouphistory (
    groupp_id int NOT NULL,
    FOREIGN KEY (groupp_id)
        REFERENCES groupp(groupp_id),
    location_id varchar (50)
);
