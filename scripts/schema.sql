CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) UNIQUE,
    `user_flags` INTEGER,
    `fname` VARCHAR(255),
    `lname` VARCHAR(255),
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`)
);
CREATE TABLE `workhours` (
    `submission_id` INTEGER AUTO_INCREMENT,
    `time_in` DATETIME,
    `time_out` DATETIME,
    `user_id` INTEGER,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `under_review` BOOLEAN,
    `accepted` BOOLEAN,
    PRIMARY KEY (`submission_id`)
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);