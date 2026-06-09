-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_id_fkey";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
