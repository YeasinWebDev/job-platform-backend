/*
  Warnings:

  - You are about to drop the column `userId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `CompanyImage` on the `Recruiter` table. All the data in the column will be lost.
  - You are about to drop the column `CompanyName` on the `Recruiter` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Recruiter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_companyId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Recruiter" DROP COLUMN "CompanyImage",
DROP COLUMN "CompanyName",
DROP COLUMN "email",
ADD COLUMN     "companyImage" TEXT,
ADD COLUMN     "companyName" TEXT,
ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserInfo" ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "linkedin" DROP NOT NULL,
ALTER COLUMN "github" DROP NOT NULL,
ALTER COLUMN "resume" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_id_fkey" FOREIGN KEY ("id") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_id_fkey" FOREIGN KEY ("id") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
