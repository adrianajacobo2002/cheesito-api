/*
  Warnings:

  - Added the required column `image_url` to the `Platillo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `platillo` ADD COLUMN `image_url` VARCHAR(191) NOT NULL;
