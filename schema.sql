CREATE DATABASE newsfeed_app;

\c newsfeed_app

CREATE TABLE Articles (
    id serial primary key,
    title varchar(255),
    author varchar(255),
    content text
  );

ALTER TABLE Articles ADD COLUMN fiction boolean;