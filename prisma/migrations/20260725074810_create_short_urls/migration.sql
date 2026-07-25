-- CreateTable
CREATE TABLE `short_urls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shortCode` VARCHAR(10) NOT NULL,
    `originalUrl` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `short_urls_shortCode_key`(`shortCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
