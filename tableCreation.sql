CREATE DATABASE MoodApp;

USE MoodApp;

CREATE TABLE IF NOT EXISTS Users(
	username varchar(20),
	displayName varchar(20),
	password varchar(20),
	creationDate datetime,
	PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS UserDefinedEvent(
	eventID int,
	username varchar(20),
	event varchar(20),
	PRIMARY KEY (eventID)
);

CREATE TABLE IF NOT EXISTS MoodColor(
	moodID int,
	mood varchar(20),
	color varchar(20),
	PRIMARY KEY (moodID)
);

CREATE TABLE IF NOT EXISTS UserMoodsByTime(
	username varchar(20),
	entryTime datetime,
	moodID int,
	durationInHours int,
	PRIMARY KEY (username, entryTime),
	FOREIGN KEY (moodID) REFERENCES MoodColor(MoodID)
);

CREATE TABLE IF NOT EXISTS UserEventsByTime(
	username varchar(20),
	entryTime datetime,
	eventID int,
	durationInHours int,
	PRIMARY KEY (username, entryTime),
	FOREIGN KEY (eventID) REFERENCES UserDefinedEvent(eventID)
);

