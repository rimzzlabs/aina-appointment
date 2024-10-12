CREATE TABLE `product` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`price` int NOT NULL,
	`updated_at` timestamp(3) NOT NULL DEFAULT (now()),
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
