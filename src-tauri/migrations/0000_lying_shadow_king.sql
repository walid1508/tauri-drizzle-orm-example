CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (current_timestamp),
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);