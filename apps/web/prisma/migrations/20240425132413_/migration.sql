/*
  Warnings:

  - You are about to alter the column `createAt` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updateAt` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `createAt` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `updateAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();
