-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `price` DOUBLE NOT NULL,
    `shortDesc` VARCHAR(255) NOT NULL,
    `detailDesc` TEXT NOT NULL,
    `category` VARCHAR(100) NOT NULL DEFAULT 'Fruits',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
