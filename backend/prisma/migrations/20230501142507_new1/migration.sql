/*
  Warnings:

  - Added the required column `user` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "user" JSONB NOT NULL;
