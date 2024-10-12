ALTER TABLE `doctor` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `doctor` MODIFY COLUMN `available_dates` json NOT NULL;--> statement-breakpoint
ALTER TABLE `doctor` ADD PRIMARY KEY(`id`);