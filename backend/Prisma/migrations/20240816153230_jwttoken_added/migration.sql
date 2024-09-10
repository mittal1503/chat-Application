/*
  Warnings:

  - A unique constraint covering the columns `[jwtToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jwtToken` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `jwtToken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Token_jwt_token_key` ON `user`(`jwtToken`);
