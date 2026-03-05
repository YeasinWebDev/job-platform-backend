/*
  Warnings:

  - Added the required column `resume` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "resume" TEXT NOT NULL;
