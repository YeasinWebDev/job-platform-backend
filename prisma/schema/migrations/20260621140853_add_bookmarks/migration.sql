-- CreateTable
CREATE TABLE "_BookmarkedJobs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookmarkedJobs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookmarkedJobs_B_index" ON "_BookmarkedJobs"("B");

-- AddForeignKey
ALTER TABLE "_BookmarkedJobs" ADD CONSTRAINT "_BookmarkedJobs_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookmarkedJobs" ADD CONSTRAINT "_BookmarkedJobs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
