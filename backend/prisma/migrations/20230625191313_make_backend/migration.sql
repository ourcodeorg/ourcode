/*
  Warnings:

  - Added the required column `approved` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleAccepted` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peopleApplied` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "approved" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "peopleAccepted" INTEGER NOT NULL,
ADD COLUMN     "peopleApplied" INTEGER NOT NULL;
