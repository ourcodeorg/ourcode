-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "archived" SET DEFAULT false,
ALTER COLUMN "approved" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "peopleAccepted" SET DEFAULT 0,
ALTER COLUMN "peopleApplied" SET DEFAULT 0;
