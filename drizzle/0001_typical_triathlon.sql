CREATE TABLE `doctor` (
	`id` varchar(255),
	`name` varchar(255) NOT NULL,
	`specialist` varchar(120) NOT NULL,
	`available_dates` json,
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	`created_at` timestamp(3) NOT NULL DEFAULT (now())
);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `updated_at` timestamp(3) NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created_at` timestamp(3) NOT NULL DEFAULT (now());