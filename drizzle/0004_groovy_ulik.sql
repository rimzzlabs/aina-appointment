CREATE TABLE `appoinment` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255),
	`doctor_id` varchar(255),
	`appointment_date` date NOT NULL,
	`status` text NOT NULL DEFAULT ('pending'),
	`age` tinyint NOT NULL,
	`remark` varchar(255),
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `appoinment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `appoinment` ADD CONSTRAINT `appoinment_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `appoinment` ADD CONSTRAINT `appoinment_doctor_id_doctor_id_fk` FOREIGN KEY (`doctor_id`) REFERENCES `doctor`(`id`) ON DELETE no action ON UPDATE no action;