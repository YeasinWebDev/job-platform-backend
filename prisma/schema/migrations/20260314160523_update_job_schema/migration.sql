/*
  Warnings:

  - You are about to drop the column `salary` on the `Job` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceLevel` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxSalary` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minSalary` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('Entry', 'Mid', 'Senior', 'Lead');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "salary",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "experienceLevel" "ExperienceLevel" NOT NULL,
ADD COLUMN     "maxSalary" TEXT NOT NULL,
ADD COLUMN     "minSalary" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
