/*
  Warnings:

  - You are about to drop the column `Other_requirements` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "Other_requirements",
ADD COLUMN     "other_requirements" TEXT[];
