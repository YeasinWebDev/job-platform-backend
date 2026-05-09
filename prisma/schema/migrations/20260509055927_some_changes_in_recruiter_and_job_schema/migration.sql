/*
  Warnings:

  - The `Other_requirements` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `image` on the `Recruiter` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Recruiter` table. All the data in the column will be lost.
  - Made the column `Who_can_apply` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `CompanyImage` to the `Recruiter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyName` to the `Recruiter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "Who_can_apply" SET NOT NULL,
DROP COLUMN "Other_requirements",
ADD COLUMN     "Other_requirements" TEXT[];

-- AlterTable
ALTER TABLE "Recruiter" DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "CompanyImage" TEXT NOT NULL,
ADD COLUMN     "CompanyName" TEXT NOT NULL;
