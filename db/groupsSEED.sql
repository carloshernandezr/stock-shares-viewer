USE watchlist_db;
INSERT INTO `watchlist_db`.`Groups` (`groupName`, `isWatchlist`, `createdAt`, `updatedAt`) 
VALUES ('Auto WL', 1, '2016-01-10 14:37:44','2016-01-10 14:37:44'),
('Tech WL', 1, '2016-01-10 14:37:44','2016-01-10 14:37:44'),
('Biotech WL', 1, '2016-01-10 14:37:44','2016-01-10 14:37:44'),
('Auto PF', 0, '2016-01-10 14:37:44','2016-01-10 14:37:44'),
('Tech PF', 0, '2016-01-10 14:37:44','2016-01-10 14:37:44'),
('Biotech PF', 0, '2016-01-10 14:37:44','2016-01-10 14:37:44');
SELECT * FROM watchlist_db.Groups;