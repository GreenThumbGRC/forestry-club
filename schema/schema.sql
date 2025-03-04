CREATE TABLE `users` (
    `user_id` integer PRIMARY KEY,
    `username` integer UNIQUE,
    `user_flags` integer,
    `fname` varchar(255),
    `lname` varchar(255),
    `create_date` timestamp,
    `password` hash
);
CREATE TABLE `workhours` (
    `submission_id` integer PRIMARY KEY,
    `time_in` datetime,
    `time_out` datetime,
    `user_id` integer,
    `create_date` timestamp,
    `under_review` boolean,
    `accepted` boolean
);
ALTER TABLE `workhours`
ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);